import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateNarrative } from '@/lib/reports/generate'
import type { NarrativeSection } from '@/lib/normalization/types'
import type { ClientReportContext } from '@/lib/reports/generate'

type Params = { params: Promise<{ id: string }> }

export async function POST(request: NextRequest, { params }: Params) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id')
    .eq('id', user.id)
    .single()
  if (!agencyUser) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  let body: { section: string; instruction?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
  if (!body.section) return NextResponse.json({ error: 'section required' }, { status: 400 })

  const { data: report } = await supabase
    .from('reports')
    .select('id, agency_id, client_id, narrative_sections, raw_metrics, anomalies, period_start, period_end, status')
    .eq('id', id)
    .eq('agency_id', agencyUser.agency_id)
    .single()

  if (!report) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (report.status === 'sent') return NextResponse.json({ error: 'Already sent' }, { status: 409 })

  // PDF-sourced reports have no stored metrics, so regeneration is not supported
  const rawMetrics = report.raw_metrics as { source?: string } | null
  if (rawMetrics?.source === 'pdf') {
    return NextResponse.json({ error: 'Section regeneration is not available for PDF-imported reports. Edit the section directly instead.' }, { status: 422 })
  }

  const { data: client } = await supabase
    .from('clients')
    .select('name, tone_override, goals')
    .eq('id', report.client_id)
    .single()

  const { data: agency } = await supabase
    .from('agencies')
    .select('tone')
    .eq('id', agencyUser.agency_id)
    .single()

  const { data: contextItems } = await supabase
    .from('client_context')
    .select('context_type, content')
    .eq('client_id', report.client_id)
    .eq('is_active', true)

  const { data: instructions } = await supabase
    .from('report_instructions')
    .select('instruction')
    .eq('client_id', report.client_id)
    .eq('is_active', true)

  const { data: connections } = await supabase
    .from('data_connections')
    .select('platform')
    .eq('client_id', report.client_id)
    .eq('is_active', true)

  const connectedPlatforms: ('ga4' | 'google_ads' | 'meta_ads' | 'tiktok_ads')[] = ['ga4']
  if (connections?.find(c => c.platform === 'google_ads')) connectedPlatforms.push('google_ads')
  if (connections?.find(c => c.platform === 'meta_ads')) connectedPlatforms.push('meta_ads')
  if (connections?.find(c => c.platform === 'tiktok_ads')) connectedPlatforms.push('tiktok_ads')

  const metrics = report.raw_metrics as { current: Parameters<typeof generateNarrative>[0]['comparison']['current']; previous: Parameters<typeof generateNarrative>[0]['comparison']['previous'] }

  const reusableInstructions = [
    ...(instructions?.map(i => i.instruction) ?? []),
    ...(body.instruction ? [`For the ${body.section} section specifically: ${body.instruction}`] : []),
  ]

  const periodStart = new Date(report.period_start)
  const periodEnd = new Date(report.period_end)
  const sameMonth = periodStart.getMonth() === periodEnd.getMonth() && periodStart.getFullYear() === periodEnd.getFullYear()
  const reportPeriodLabel = sameMonth
    ? periodStart.toLocaleString('en-GB', { month: 'long', year: 'numeric' })
    : `${periodStart.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${periodEnd.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`

  const context: ClientReportContext = {
    clientName: client?.name ?? '',
    reportPeriodLabel,
    tone: (client?.tone_override ?? agency?.tone ?? 'professional') as ClientReportContext['tone'],
    goals: [
      ...(client?.goals ? [client.goals] : []),
      ...(contextItems?.filter(c => c.context_type === 'goal').map(c => c.content) ?? []),
    ],
    sensitivities: contextItems?.filter(c => c.context_type === 'sensitivity').map(c => c.content) ?? [],
    reusableInstructions,
    previousNarrativeSummary: null,
    multiMonthTrends: null,
    agencyMemory: null,
    recentChanges: [],
    wins: [],
    primaryKPIs: [],
    connectedPlatforms,
  }

  // Build a minimal comparison from stored raw_metrics
  const { buildComparison } = await import('@/lib/normalization/anomalies')
  const changes = buildComparison(metrics.current, metrics.previous)
  const comparison = { current: metrics.current, previous: metrics.previous, changes }
  const anomalies = ((report.anomalies ?? []) as Parameters<typeof generateNarrative>[0]['anomalies'])

  // Generate only the requested section by overriding connectedPlatforms to exclude others
  const freshSections = await generateNarrative({ comparison, anomalies, context })
  const regenerated = freshSections.find(s => s.section === body.section)

  if (!regenerated) {
    return NextResponse.json({ error: 'Section not generated' }, { status: 500 })
  }

  // Replace just the target section in the report
  const existing = (report.narrative_sections as NarrativeSection[]) ?? []
  const merged = existing.map(s => s.section === body.section ? { ...regenerated, isApproved: false, editedContent: null } : s)
  // If section didn't exist before, append it
  if (!existing.find(s => s.section === body.section)) merged.push(regenerated)

  await supabase
    .from('reports')
    .update({ narrative_sections: merged, status: 'draft' })
    .eq('id', id)

  return NextResponse.json({ section: regenerated })
}
