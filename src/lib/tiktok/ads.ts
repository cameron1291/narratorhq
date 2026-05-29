import type { CanonicalMetrics, ChannelBreakdown } from '@/lib/normalization/types'

const BASE = 'https://business-api.tiktok.com/open_api/v1.3'

interface TikTokTokenSet {
  access_token: string
}

interface TikTokMetricRow {
  spend?: string
  impressions?: string
  clicks?: string
  ctr?: string
  cpc?: string
  conversion?: string
  cost_per_conversion?: string
  value?: string
  roas?: string
}

interface TikTokCampaignRow {
  campaign_name?: string
  metrics?: TikTokMetricRow
}

async function tikTokGet(path: string, token: string, params: Record<string, string>) {
  const url = new URL(`${BASE}${path}`)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetch(url.toString(), {
    headers: { 'Access-Token': token },
  })
  if (!res.ok) throw new Error(`TikTok API error: ${res.status}`)
  const json = await res.json() as { code: number; message: string; data?: unknown }
  if (json.code !== 0) throw new Error(`TikTok API error: ${json.message}`)
  return json.data
}

export async function fetchTikTokAdsMetrics(
  tokens: TikTokTokenSet,
  advertiserId: string,
  startDate: string,
  endDate: string
): Promise<Partial<CanonicalMetrics>> {
  const token = tokens.access_token

  // Account-level integrated metrics
  const accountData = await tikTokGet('/report/integrated/get/', token, {
    advertiser_id: advertiserId,
    report_type: 'BASIC',
    dimensions: JSON.stringify(['stat_time_day']),
    metrics: JSON.stringify([
      'spend', 'impressions', 'clicks', 'ctr', 'cpc',
      'conversion', 'cost_per_conversion', 'value', 'roas',
    ]),
    start_date: startDate,
    end_date: endDate,
    page_size: '1000',
  }) as { list?: { metrics?: TikTokMetricRow }[] } | null

  const rows = accountData?.list ?? []

  // Sum across days
  let spend = 0, impressions = 0, clicks = 0, conversions = 0, revenue = 0
  for (const row of rows) {
    const m = row.metrics ?? {}
    spend += parseFloat(m.spend ?? '0')
    impressions += parseInt(m.impressions ?? '0', 10)
    clicks += parseInt(m.clicks ?? '0', 10)
    conversions += parseFloat(m.conversion ?? '0')
    revenue += parseFloat(m.value ?? '0')
  }

  const ctr = impressions > 0 ? clicks / impressions : null
  const cpc = clicks > 0 ? spend / clicks : null
  const cpa = conversions > 0 ? spend / conversions : null
  const roas = spend > 0 && revenue > 0 ? revenue / spend : null

  // Campaign breakdown
  let channelBreakdown: ChannelBreakdown[] = []
  try {
    const campaignData = await tikTokGet('/report/integrated/get/', token, {
      advertiser_id: advertiserId,
      report_type: 'BASIC',
      dimensions: JSON.stringify(['campaign_id', 'campaign_name']),
      metrics: JSON.stringify(['spend', 'clicks', 'conversion']),
      start_date: startDate,
      end_date: endDate,
      page_size: '10',
    }) as { list?: TikTokCampaignRow[] } | null

    channelBreakdown = (campaignData?.list ?? []).map(row => ({
      channel: `TikTok: ${row.campaign_name ?? 'Campaign'}`,
      sessions: 0,
      conversions: parseFloat(row.metrics?.conversion ?? '0'),
      spend: parseFloat(row.metrics?.spend ?? '0'),
    }))
  } catch {
    // Campaign breakdown is non-fatal
  }

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
    conversionSource: 'tiktok_ads',
    channelBreakdown,
    attributionNotes: [
      'TikTok Ads uses 7-day click + 1-day view attribution by default.',
    ],
  }
}
