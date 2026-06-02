import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { generateNarrativeFromPdf } from '@/lib/reports/generate-from-pdf'
import type { ClientReportContext } from '@/lib/reports/generate'

export const maxDuration = 60

function periodLabel(start: string, end: string): string {
  const s = new Date(start)
  const e = new Date(end)
  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()
  if (sameMonth) {
    return s.toLocaleString('en-GB', { month: 'long', year: 'numeric' })
  }
  return `${s.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${e.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
}

export async function POST(request: NextRequest) {
  const userSupabase = await createClient()
  const { data: { user } } = await userSupabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: agencyUser } = await userSupabase
    .from('agency_users')
    .select('agency_id')
    .eq('id', user.id)
    .single()
  if (!agencyUser) return NextResponse.json({ error: 'Agency not found' }, { status: 403 })

  const agencyId = agencyUser.agency_id
  const supabase = createServiceClient()

  let body: { clientId: string; storagePath: string; startDate: string; endDate: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { clientId, storagePath, startDate, endDate } = body
  if (!clientId || !storagePath || !startDate || !endDate) {
    return NextResponse.json({ error: 'clientId, storagePath, startDate, endDate required' }, { status: 400 })
  }

  // Ensure the storage path belongs to this agency (path starts with agencyId/)
  if (!storagePath.startsWith(`${agencyId}/`)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { data: client } = await supabase
    .from('clients')
    .select('id, name, tone_override, goals, is_archived, agency_id')
    .eq('id', clientId)
    .eq('agency_id', agencyId)
    .eq('is_archived', false)
    .single()

  if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 })

  const { data: agency } = await supabase
    .from('agencies')
    .select('tone, plan, trial_ends_at')
    .eq('id', agencyId)
    .single()

  const activePaidPlan = ['starter', 'growth', 'agency'].includes(agency?.plan ?? '')
  const validTrial = agency?.plan === 'trial' && agency.trial_ends_at && new Date(agency.trial_ends_at) > new Date()
  if (!activePaidPlan && !validTrial) {
    return NextResponse.json({ error: 'Your trial has expired. Upgrade to continue.' }, { status: 402 })
  }

  // Duplicate-period guard
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString()
  const { data: recentReport } = await supabase
    .from('reports')
    .select('id, status')
    .eq('client_id', clientId)
    .eq('period_start', startDate)
    .eq('period_end', endDate)
    .gte('created_at', tenMinutesAgo)
    .maybeSingle()

  if (recentReport) {
    return NextResponse.json(
      { error: 'A report for this period was recently generated', reportId: recentReport.id },
      { status: 429 }
    )
  }

  // Download the PDF from Supabase Storage
  const { data: fileData, error: downloadError } = await supabase.storage
    .from('client-pdf-uploads')
    .download(storagePath)

  if (downloadError || !fileData) {
    return NextResponse.json({ error: 'Failed to retrieve uploaded PDF' }, { status: 500 })
  }

  const pdfBase64 = Buffer.from(await fileData.arrayBuffer()).toString('base64')

  // Load client context
  const [{ data: contextItems }, { data: instructions }] = await Promise.all([
    supabase.from('client_context').select('context_type, content').eq('client_id', clientId).eq('is_active', true),
    supabase.from('report_instructions').select('instruction').eq('client_id', clientId).eq('is_active', true),
  ])

  const effectiveTone = (client.tone_override ?? agency?.tone ?? 'professional') as ClientReportContext['tone']

  // Create the report row
  const { data: report, error: insertError } = await supabase
    .from('reports')
    .insert({
      client_id: clientId,
      agency_id: agencyId,
      period_start: startDate,
      period_end: endDate,
      status: 'generating',
    })
    .select('id')
    .single()

  if (insertError || !report) {
    return NextResponse.json({ error: 'Failed to create report record' }, { status: 500 })
  }

  // Generate the narrative from the PDF
  const result = await generateNarrativeFromPdf({
    pdfBase64,
    clientName: client.name,
    reportPeriodLabel: periodLabel(startDate, endDate),
    tone: effectiveTone,
    goals: [
      ...(client.goals ? [client.goals] : []),
      ...(contextItems?.filter(c => c.context_type === 'goal').map(c => c.content) ?? []),
    ],
    sensitivities: contextItems?.filter(c => c.context_type === 'sensitivity').map(c => c.content) ?? [],
    reusableInstructions: instructions?.map(i => i.instruction) ?? [],
    primaryKPIs: contextItems?.filter(c => c.context_type === 'kpi').map(c => c.content) ?? [],
  })

  // Handle unreadable PDF
  if ('error' in result) {
    await supabase
      .from('reports')
      .update({
        status: 'failed',
        generation_error: 'The uploaded PDF does not contain readable text. Please ensure it is a text-based PDF, not a scanned image.',
      })
      .eq('id', report.id)

    // Clean up the file
    await supabase.storage.from('client-pdf-uploads').remove([storagePath]).catch(() => {})

    return NextResponse.json(
      { error: 'The PDF could not be read. Please upload a text-based PDF (not a scanned image).' },
      { status: 422 }
    )
  }

  // Save draft
  await supabase
    .from('reports')
    .update({
      status: 'draft',
      raw_metrics: { source: 'pdf', pdf_storage_path: storagePath },
      anomalies: [],
      narrative_sections: result,
      original_narrative: result,
    })
    .eq('id', report.id)

  // Delete the PDF now that analysis is complete (non-fatal)
  await supabase.storage.from('client-pdf-uploads').remove([storagePath]).catch(() => {})

  // Notify agency owner (non-fatal)
  try {
    const { data: owner } = await supabase
      .from('agency_users')
      .select('id, full_name')
      .eq('agency_id', agencyId)
      .eq('role', 'owner')
      .single()
    const { data: ownerAuth } = await supabase.auth.admin.getUserById(owner?.id ?? '')
    const ownerEmail = ownerAuth?.user?.email
    if (ownerEmail) {
      const { getResendClient } = await import('@/lib/resend/client')
      const resend = getResendClient()
      const reportUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reports/${report.id}`
      const period = periodLabel(startDate, endDate)
      const firstName = owner?.full_name?.split(' ')[0] ?? 'there'
      await resend.emails.send({
        from: `NarratorHQ <${process.env.DEFAULT_SENDER_EMAIL ?? 'noreply@narratorhq.com'}>`,
        to: ownerEmail,
        subject: `${client.name} — ${period} PDF analysis is ready to review`,
        html: `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px"><p style="color:#111827;font-size:16px;font-weight:600;margin:0 0 8px">Hi ${firstName},</p><p style="color:#6b7280;margin:0 0 24px">Your PDF report for <strong>${client.name}</strong> (${period}) has been analysed and is ready for review.</p><a href="${reportUrl}" style="display:inline-block;background:#2563eb;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">Review report →</a></div>`,
        text: `Hi ${firstName},\n\nYour PDF report for ${client.name} (${period}) has been analysed.\n\nReview it here: ${reportUrl}`,
      })
    }
  } catch {
    // Non-fatal
  }

  return NextResponse.json({ reportId: report.id })
}
