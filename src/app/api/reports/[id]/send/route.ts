import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateReportPdf } from '@/lib/pdf/generate-pdf'
import { sendReportEmail } from '@/lib/email/report-email'
import type { NarrativeSection, CanonicalMetrics, Anomaly } from '@/lib/normalization/types'

type Params = { params: Promise<{ id: string }> }

export async function POST(request: NextRequest, { params }: Params) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id, role')
    .eq('id', user.id)
    .single()
  if (!agencyUser) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  if (!['owner', 'admin'].includes(agencyUser.role)) {
    return NextResponse.json({ error: 'Only owners and admins can send reports' }, { status: 403 })
  }

  const { data: report } = await supabase
    .from('reports')
    .select('id, client_id, agency_id, status, period_start, period_end, narrative_sections, raw_metrics, anomalies, share_token')
    .eq('id', id)
    .eq('agency_id', agencyUser.agency_id)
    .single()

  if (!report) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (report.status !== 'approved' && report.status !== 'sent') {
    return NextResponse.json({ error: 'Report must be approved before sending' }, { status: 409 })
  }

  const { data: client } = await supabase
    .from('clients')
    .select('name, report_email')
    .eq('id', report.client_id)
    .single()

  if (!client?.report_email) {
    return NextResponse.json({ error: 'Client has no report email configured' }, { status: 422 })
  }

  const { data: agency } = await supabase
    .from('agencies')
    .select('name, brand_color, logo_url, plan, trial_ends_at')
    .eq('id', agencyUser.agency_id)
    .single()

  const activePaidPlan = ['starter', 'growth', 'agency'].includes(agency?.plan ?? '')
  const validTrial = agency?.plan === 'trial' && agency.trial_ends_at && new Date(agency.trial_ends_at) > new Date()
  if (!activePaidPlan && !validTrial) {
    return NextResponse.json({ error: 'Your trial has expired. Upgrade to continue sending reports.' }, { status: 402 })
  }

  const sections = (report.narrative_sections ?? []) as NarrativeSection[]
  const metrics = (report.raw_metrics as { current: CanonicalMetrics })?.current
  const anomalies = (report.anomalies ?? []) as Anomaly[]

  const start = new Date(report.period_start)
  const end = new Date(report.period_end)
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()
  const periodLabel = sameMonth
    ? start.toLocaleString('en-GB', { month: 'long', year: 'numeric' })
    : `${start.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}`

  const brandColor = agency?.brand_color ?? '#2563eb'
  const agencyName = agency?.name ?? 'Your Agency'

  // Generate PDF
  let pdfBuffer: Buffer | undefined
  try {
    pdfBuffer = await generateReportPdf({
      agencyName,
      agencyLogo: agency?.logo_url,
      brandColor,
      clientName: client.name,
      periodLabel,
      sections,
      metrics,
      anomalies,
    })
  } catch {
    // PDF generation failure is non-fatal — send without attachment
  }

  // Ensure the report has a share token — generate one if missing
  let shareToken = (report as { share_token?: string }).share_token
  if (!shareToken) {
    const { data: updated } = await supabase
      .from('reports')
      .update({ share_token: crypto.randomUUID() })
      .eq('id', id)
      .select('share_token')
      .single()
    shareToken = updated?.share_token ?? undefined
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://narratorhq.com'
  const reportViewUrl = shareToken ? `${appUrl}/r/${shareToken}` : undefined

  // Send email
  // fromEmail must be a Resend-verified sender — agencies configure this in settings
  // Default to a narratorhq.com sender until white-label is configured
  const fromEmail = process.env.DEFAULT_SENDER_EMAIL ?? 'reports@narratorhq.com'

  let messageId: string
  try {
    messageId = await sendReportEmail({
      to: client.report_email,
      fromName: agencyName,
      fromEmail,
      clientName: client.name,
      periodLabel,
      agencyName,
      brandColor,
      sections,
      pdfBuffer,
      reportViewUrl,
    })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Email send failed' },
      { status: 500 }
    )
  }

  // Mark as sent
  await supabase
    .from('reports')
    .update({
      status: 'sent',
      sent_at: new Date().toISOString(),
      email_message_id: messageId,
    })
    .eq('id', id)

  return NextResponse.json({ ok: true })
}
