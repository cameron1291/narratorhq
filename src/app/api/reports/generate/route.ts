import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { fetchGA4Metrics } from '@/lib/google/ga4'
import { fetchGoogleAdsMetrics } from '@/lib/google/ads'
import { fetchMetaAdsMetrics } from '@/lib/meta/ads'
import { fetchTikTokAdsMetrics } from '@/lib/tiktok/ads'
import { buildComparison, detectAnomalies } from '@/lib/normalization/anomalies'
import { generateNarrative } from '@/lib/reports/generate'
import type { ClientReportContext } from '@/lib/reports/generate'
import type { CanonicalMetrics } from '@/lib/normalization/types'
import { decrypt } from '@/lib/encryption'

function previousPeriod(start: string, end: string): { start: string; end: string } {
  const s = new Date(start)
  const e = new Date(end)
  const days = Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1
  const prevEnd = new Date(s)
  prevEnd.setDate(prevEnd.getDate() - 1)
  const prevStart = new Date(prevEnd)
  prevStart.setDate(prevStart.getDate() - days + 1)
  return {
    start: prevStart.toISOString().split('T')[0],
    end: prevEnd.toISOString().split('T')[0],
  }
}

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
  const isCron = request.headers.get('x-cron-secret') === process.env.CRON_SECRET

  let callerAgencyId: string | null = null

  if (!isCron) {
    const userSupabase = await createClient()
    const { data: { user } } = await userSupabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { data: agencyUser } = await userSupabase
      .from('agency_users')
      .select('agency_id')
      .eq('id', user.id)
      .single()
    if (!agencyUser) return NextResponse.json({ error: 'Agency not found' }, { status: 403 })
    callerAgencyId = agencyUser.agency_id
  }

  // Always use service role for DB ops — auth is checked above
  const supabase = createServiceClient()

  let body: { clientId: string; startDate: string; endDate: string; _cron?: boolean }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { clientId, startDate, endDate } = body
  if (!clientId || !startDate || !endDate) {
    return NextResponse.json({ error: 'clientId, startDate, endDate required' }, { status: 400 })
  }

  const { data: client } = await supabase
    .from('clients')
    .select('id, name, tone_override, goals, is_archived, agency_id')
    .eq('id', clientId)
    .eq('is_archived', false)
    .single()

  if (!client) {
    return NextResponse.json({ error: 'Client not found' }, { status: 404 })
  }

  if (!isCron && callerAgencyId && client.agency_id !== callerAgencyId) {
    return NextResponse.json({ error: 'Client not found' }, { status: 404 })
  }

  // Prevent duplicate generation: reject if a report for this period was created in the last 10 minutes
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

  const { data: agency } = await supabase
    .from('agencies')
    .select('tone, plan, trial_ends_at, stripe_subscription_id')
    .eq('id', client.agency_id)
    .single()

  if (!isCron) {
    const activePaidPlan = ['starter', 'growth', 'agency'].includes(agency?.plan ?? '')
    const validTrial = agency?.plan === 'trial' && agency.trial_ends_at && new Date(agency.trial_ends_at) > new Date()
    if (!activePaidPlan && !validTrial) {
      return NextResponse.json({ error: 'Your trial has expired. Upgrade to continue generating reports.' }, { status: 402 })
    }
  }

  // Load data connections
  const { data: connections } = await supabase
    .from('data_connections')
    .select('platform, property_id, access_token, refresh_token, token_expiry')
    .eq('client_id', clientId)
    .eq('is_active', true)

  const ga4Connection = connections?.find(c => c.platform === 'ga4')
  if (!ga4Connection?.property_id) {
    return NextResponse.json({ error: 'GA4 not connected for this client' }, { status: 422 })
  }

  // Decrypt tokens before use (handles both encrypted enc: and legacy plaintext)
  const decryptedConnections = connections?.map(c => ({
    ...c,
    access_token: c.access_token ? decrypt(c.access_token) : c.access_token,
    refresh_token: c.refresh_token ? decrypt(c.refresh_token) : c.refresh_token,
  })) ?? []
  const decryptedGa4 = decryptedConnections.find(c => c.platform === 'ga4')!
  const decryptedAds = decryptedConnections.find(c => c.platform === 'google_ads')
  const decryptedMeta = decryptedConnections.find(c => c.platform === 'meta_ads')
  const decryptedTiktok = decryptedConnections.find(c => c.platform === 'tiktok_ads')

  // Load client context (goals, sensitivities, promises, notes)
  const { data: contextItems } = await supabase
    .from('client_context')
    .select('context_type, content')
    .eq('client_id', clientId)
    .eq('is_active', true)

  const { data: instructions } = await supabase
    .from('report_instructions')
    .select('instruction')
    .eq('client_id', clientId)
    .eq('is_active', true)

  // Load last approved report for context continuity
  const { data: lastReport } = await supabase
    .from('reports')
    .select('narrative_sections')
    .eq('client_id', clientId)
    .eq('status', 'approved')
    .order('period_end', { ascending: false })
    .limit(1)
    .single()

  // Create report row with status 'generating'
  const { data: report, error: insertError } = await supabase
    .from('reports')
    .insert({
      client_id: clientId,
      agency_id: client.agency_id,
      period_start: startDate,
      period_end: endDate,
      status: 'generating',
    })
    .select('id')
    .single()

  if (insertError || !report) {
    return NextResponse.json({ error: 'Failed to create report record' }, { status: 500 })
  }

  // Fetch metrics for current and previous periods
  const prev = previousPeriod(startDate, endDate)

  let currentMetrics, previousMetrics
  try {
    ;[currentMetrics, previousMetrics] = await Promise.all([
      fetchGA4Metrics(
        {
          access_token: decryptedGa4.access_token,
          refresh_token: decryptedGa4.refresh_token,
          token_expiry: decryptedGa4.token_expiry,
        },
        decryptedGa4.property_id,
        startDate,
        endDate
      ),
      fetchGA4Metrics(
        {
          access_token: decryptedGa4.access_token,
          refresh_token: decryptedGa4.refresh_token,
          token_expiry: decryptedGa4.token_expiry,
        },
        decryptedGa4.property_id,
        prev.start,
        prev.end
      ),
    ])
  } catch (err) {
    await supabase
      .from('reports')
      .update({
        status: 'failed',
        generation_error: err instanceof Error ? err.message : 'GA4 fetch failed',
      })
      .eq('id', report.id)
    return NextResponse.json({ error: 'Failed to fetch GA4 data' }, { status: 502 })
  }

  async function fetchPaidMetrics(period: { start: string; end: string }): Promise<Partial<CanonicalMetrics>> {
    const results: Partial<CanonicalMetrics>[] = []

    if (decryptedAds?.property_id) {
      try {
        const ads = await fetchGoogleAdsMetrics(
          { access_token: decryptedAds.access_token, refresh_token: decryptedAds.refresh_token! },
          decryptedAds.property_id,
          period.start,
          period.end
        )
        results.push(ads)
      } catch { /* non-fatal */ }
    }

    if (decryptedMeta?.property_id) {
      try {
        const meta = await fetchMetaAdsMetrics(
          { access_token: decryptedMeta.access_token },
          decryptedMeta.property_id,
          period.start,
          period.end
        )
        results.push(meta)
      } catch { /* non-fatal */ }
    }

    if (decryptedTiktok?.property_id) {
      try {
        const tiktok = await fetchTikTokAdsMetrics(
          { access_token: decryptedTiktok.access_token },
          decryptedTiktok.property_id,
          period.start,
          period.end
        )
        results.push(tiktok)
      } catch { /* non-fatal */ }
    }

    if (results.length === 0) return {}

    // Merge: sum spend, impressions, clicks; merge channel breakdowns; combine attribution notes
    return results.reduce<Partial<CanonicalMetrics>>((acc, r) => ({
      spend: (acc.spend ?? 0) + (r.spend ?? 0) || null,
      impressions: r.impressions != null ? (acc.impressions ?? 0) + r.impressions : acc.impressions,
      clicks: r.clicks != null ? (acc.clicks ?? 0) + r.clicks : acc.clicks,
      ctr: null, // recalculate after merge if needed
      cpc: null,
      cpa: r.cpa !== null ? r.cpa : acc.cpa, // use last platform's CPA
      roas: r.roas !== null ? r.roas : acc.roas,
      revenue: r.revenue != null ? (acc.revenue ?? 0) + r.revenue : acc.revenue,
      conversions: r.conversions ?? acc.conversions ?? 0,
      conversionSource: r.conversionSource ?? acc.conversionSource ?? 'ga4',
      channelBreakdown: [...(acc.channelBreakdown ?? []), ...(r.channelBreakdown ?? [])],
      attributionNotes: [...(acc.attributionNotes ?? []), ...(r.attributionNotes ?? [])],
    }), {})
  }

  const [currentPaid, previousPaid] = await Promise.all([
    fetchPaidMetrics({ start: startDate, end: endDate }),
    fetchPaidMetrics(prev),
  ])

  const fullCurrent: CanonicalMetrics = {
    ...currentMetrics,
    spend: currentPaid.spend ?? null,
    cpa: currentPaid.cpa ?? null,
    roas: currentPaid.roas ?? null,
    revenue: currentPaid.revenue ?? null,
    impressions: currentPaid.impressions ?? null,
    clicks: currentPaid.clicks ?? null,
    ctr: currentPaid.ctr ?? null,
    cpc: currentPaid.cpc ?? null,
    channelBreakdown: [
      ...currentMetrics.channelBreakdown,
      ...(currentPaid.channelBreakdown ?? []),
    ],
    attributionNotes: [
      ...currentMetrics.attributionNotes,
      ...(currentPaid.attributionNotes ?? []),
    ],
  }
  const fullPrevious: CanonicalMetrics = {
    ...previousMetrics,
    spend: previousPaid.spend ?? null,
    cpa: previousPaid.cpa ?? null,
    roas: previousPaid.roas ?? null,
    revenue: previousPaid.revenue ?? null,
    impressions: previousPaid.impressions ?? null,
    clicks: previousPaid.clicks ?? null,
    ctr: previousPaid.ctr ?? null,
    cpc: previousPaid.cpc ?? null,
    channelBreakdown: [
      ...previousMetrics.channelBreakdown,
      ...(previousPaid.channelBreakdown ?? []),
    ],
    attributionNotes: [
      ...previousMetrics.attributionNotes,
      ...(previousPaid.attributionNotes ?? []),
    ],
  }

  const changes = buildComparison(fullCurrent, fullPrevious)
  const comparison = { current: fullCurrent, previous: fullPrevious, changes }
  const anomalies = detectAnomalies(comparison)

  // Build client context for the prompt
  const connectedPlatforms: ('ga4' | 'google_ads' | 'meta_ads' | 'tiktok_ads')[] = ['ga4']
  if (connections?.find(c => c.platform === 'google_ads')) connectedPlatforms.push('google_ads')
  if (connections?.find(c => c.platform === 'meta_ads')) connectedPlatforms.push('meta_ads')
  if (connections?.find(c => c.platform === 'tiktok_ads')) connectedPlatforms.push('tiktok_ads')

  const effectiveTone = (client.tone_override ?? agency?.tone ?? 'professional') as ClientReportContext['tone']

  // Summarise last report's narrative for continuity context
  let previousNarrativeSummary: string | null = null
  if (lastReport?.narrative_sections) {
    const sections = lastReport.narrative_sections as Array<{ section: string; content: string; editedContent?: string | null }>
    const overviewSection = sections.find(s => s.section === 'overview')
    previousNarrativeSummary = overviewSection
      ? (overviewSection.editedContent ?? overviewSection.content)
      : null
  }

  const context: ClientReportContext = {
    clientName: client.name,
    reportPeriodLabel: periodLabel(startDate, endDate),
    tone: effectiveTone,
    goals: [
      ...(client.goals ? [client.goals] : []),
      ...(contextItems?.filter(c => c.context_type === 'goal').map(c => c.content) ?? []),
    ],
    sensitivities: contextItems?.filter(c => c.context_type === 'sensitivity').map(c => c.content) ?? [],
    reusableInstructions: instructions?.map(i => i.instruction) ?? [],
    previousNarrativeSummary,
    connectedPlatforms,
  }

  // Generate the narrative
  let narrativeSections
  try {
    narrativeSections = await generateNarrative({ comparison, anomalies, context })
  } catch (err) {
    await supabase
      .from('reports')
      .update({
        status: 'failed',
        generation_error: err instanceof Error ? err.message : 'Narrative generation failed',
        raw_metrics: { current: fullCurrent, previous: fullPrevious },
        anomalies,
      })
      .eq('id', report.id)
    return NextResponse.json({ error: 'Narrative generation failed' }, { status: 500 })
  }

  // Store the completed draft
  await supabase
    .from('reports')
    .update({
      status: 'draft',
      raw_metrics: { current: fullCurrent, previous: fullPrevious },
      anomalies,
      narrative_sections: narrativeSections,
      original_narrative: narrativeSections,
    })
    .eq('id', report.id)

  return NextResponse.json({ reportId: report.id })
}
