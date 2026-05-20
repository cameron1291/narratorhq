import type { CanonicalMetrics, ChannelBreakdown } from '@/lib/normalization/types'

const META_API_VERSION = 'v19.0'
const BASE = `https://graph.facebook.com/${META_API_VERSION}`

interface MetaTokenSet {
  access_token: string
}

interface AdInsight {
  impressions: string
  clicks: string
  spend: string
  actions?: { action_type: string; value: string }[]
  action_values?: { action_type: string; value: string }[]
  ctr: string
  cpc: string
  cpp: string
  reach: string
  frequency: string
  date_start: string
  date_stop: string
}

interface AdAccount {
  id: string
  name: string
  currency: string
}

function parseConversions(actions?: { action_type: string; value: string }[]): number {
  if (!actions) return 0
  // Purchase events are the primary conversion metric
  const purchase = actions.find(a => a.action_type === 'purchase' || a.action_type === 'offsite_conversion.fb_pixel_purchase')
  if (purchase) return parseFloat(purchase.value)
  // Fall back to leads
  const lead = actions.find(a => a.action_type === 'lead' || a.action_type === 'offsite_conversion.fb_pixel_lead')
  if (lead) return parseFloat(lead.value)
  // Fall back to total conversions
  const total = actions.find(a => a.action_type === 'offsite_conversion' || a.action_type === 'onsite_conversion')
  return total ? parseFloat(total.value) : 0
}

function parseRevenue(actionValues?: { action_type: string; value: string }[]): number {
  if (!actionValues) return 0
  const purchase = actionValues.find(a => a.action_type === 'purchase' || a.action_type === 'offsite_conversion.fb_pixel_purchase')
  return purchase ? parseFloat(purchase.value) : 0
}

export async function fetchMetaAdsMetrics(
  tokens: MetaTokenSet,
  adAccountId: string,
  startDate: string,
  endDate: string
): Promise<Partial<CanonicalMetrics>> {
  const token = tokens.access_token

  // Fetch account-level insights
  const insightFields = [
    'impressions', 'clicks', 'spend', 'actions', 'action_values',
    'ctr', 'cpc', 'reach', 'frequency',
  ].join(',')

  const insightParams = new URLSearchParams({
    fields: insightFields,
    time_range: JSON.stringify({ since: startDate, until: endDate }),
    level: 'account',
    access_token: token,
  })

  const insightRes = await fetch(`${BASE}/act_${adAccountId}/insights?${insightParams}`)
  if (!insightRes.ok) {
    throw new Error(`Meta Ads insights API error: ${insightRes.status}`)
  }
  const insightData = await insightRes.json() as { data?: AdInsight[] }
  const insight = insightData.data?.[0]

  const impressions = insight ? parseInt(insight.impressions, 10) : 0
  const clicks = insight ? parseInt(insight.clicks, 10) : 0
  const spend = insight ? parseFloat(insight.spend) : 0
  const conversions = parseConversions(insight?.actions)
  const revenue = parseRevenue(insight?.action_values)
  const ctr = insight ? parseFloat(insight.ctr) / 100 : null // Meta returns as percentage
  const cpc = insight ? parseFloat(insight.cpc) : null
  const cpa = conversions > 0 ? spend / conversions : null
  const roas = spend > 0 && revenue > 0 ? revenue / spend : null

  // Campaign breakdown
  const campaignFields = 'campaign_name,impressions,clicks,spend,actions'
  const campaignParams = new URLSearchParams({
    fields: campaignFields,
    time_range: JSON.stringify({ since: startDate, until: endDate }),
    level: 'campaign',
    limit: '10',
    access_token: token,
  })
  const campaignRes = await fetch(`${BASE}/act_${adAccountId}/insights?${campaignParams}`)
  const campaignData = campaignRes.ok
    ? await campaignRes.json() as { data?: (AdInsight & { campaign_name: string })[] }
    : { data: [] }

  const channelBreakdown: ChannelBreakdown[] = (campaignData.data ?? []).map(row => ({
    channel: `Meta: ${row.campaign_name ?? 'Campaign'}`,
    sessions: 0,
    conversions: parseConversions(row.actions),
    spend: parseFloat(row.spend ?? '0'),
  }))

  return {
    spend: spend || null,
    impressions: impressions || null,
    clicks: clicks || null,
    ctr,
    cpc,
    cpa,
    roas,
    revenue: revenue || null,
    conversions,
    conversionSource: 'meta_ads',
    channelBreakdown,
    attributionNotes: [
      'Meta Ads uses 7-day click + 1-day view attribution by default.',
      'Conversion counts may differ from GA4 due to attribution window differences.',
    ],
  }
}

export async function discoverMetaAdAccountId(accessToken: string): Promise<{ id: string; name: string } | null> {
  try {
    const res = await fetch(
      `${BASE}/me/adaccounts?fields=id,name,account_status&limit=1&access_token=${accessToken}`
    )
    if (!res.ok) return null
    const data = await res.json() as { data?: AdAccount[] }
    const first = data.data?.[0]
    if (!first) return null
    // id comes back as "act_XXXXXX" — strip the prefix
    return { id: first.id.replace('act_', ''), name: first.name }
  } catch {
    return null
  }
}
