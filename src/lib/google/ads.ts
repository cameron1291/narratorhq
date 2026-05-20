import { GoogleAdsApi } from 'google-ads-api'
import type { CanonicalMetrics, ChannelBreakdown } from '@/lib/normalization/types'

interface TokenSet {
  access_token: string
  refresh_token: string
  token_expiry?: string | null
}

function getGoogleAdsClient() {
  return new GoogleAdsApi({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  })
}

export async function fetchGoogleAdsMetrics(
  tokens: TokenSet,
  customerId: string,
  startDate: string,
  endDate: string
): Promise<Partial<CanonicalMetrics>> {
  const api = getGoogleAdsClient()
  const customer = api.Customer({
    customer_id: customerId.replace(/-/g, ''),
    refresh_token: tokens.refresh_token,
  })

  // Account-level totals
  const totalsResult = await customer.query(`
    SELECT
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions,
      metrics.conversions_value,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_per_conversion
    FROM customer
    WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
  `)

  const totalsRows = Array.isArray(totalsResult) ? totalsResult : []
  const metrics = totalsRows[0]?.metrics
  const impressions = Number(metrics?.impressions ?? 0)
  const clicks = Number(metrics?.clicks ?? 0)
  const costMicros = Number(metrics?.cost_micros ?? 0)
  const spend = costMicros / 1_000_000
  const conversions = Number(metrics?.conversions ?? 0)
  const conversionValue = Number(metrics?.conversions_value ?? 0)
  const ctr = Number(metrics?.ctr ?? 0)
  const avgCpc = Number(metrics?.average_cpc ?? 0) / 1_000_000
  const cpa = conversions > 0 ? spend / conversions : null
  const roas = spend > 0 ? conversionValue / spend : null

  // Campaign breakdown as channel proxy
  const campaignRows = await customer.query(`
    SELECT
      campaign.name,
      campaign.advertising_channel_type,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions
    FROM campaign
    WHERE
      campaign.status = 'ENABLED'
      AND segments.date BETWEEN '${startDate}' AND '${endDate}'
    ORDER BY metrics.cost_micros DESC
    LIMIT 10
  `)

  const channelBreakdown: ChannelBreakdown[] = campaignRows.map(row => ({
    channel: `${row.campaign?.name ?? 'Campaign'} (${row.campaign?.advertising_channel_type ?? ''})`,
    sessions: 0, // Google Ads doesn't give sessions; GA4 data provides this
    conversions: Number(row.metrics?.conversions ?? 0),
    spend: Number(row.metrics?.cost_micros ?? 0) / 1_000_000,
  }))

  return {
    spend: spend || null,
    impressions: impressions || null,
    clicks: clicks || null,
    ctr: ctr || null,
    cpc: avgCpc || null,
    cpa,
    roas,
    revenue: conversionValue || null,
    conversions,
    conversionSource: 'google_ads',
    channelBreakdown,
    attributionNotes: ['Google Ads uses last-click attribution by default. Conversions are counted at the time of the click.'],
  }
}

export async function discoverGoogleAdsCustomerId(accessToken: string): Promise<string | null> {
  // Use the REST endpoint directly — the SDK doesn't expose this method cleanly
  try {
    const res = await fetch(
      'https://googleads.googleapis.com/v17/customers:listAccessibleCustomers',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
        },
      }
    )
    if (!res.ok) return null
    const data = await res.json() as { resourceNames?: string[] }
    const first = data.resourceNames?.[0]
    return first ? first.replace('customers/', '') : null
  } catch {
    return null
  }
}
