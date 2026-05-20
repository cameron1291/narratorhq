import { google } from 'googleapis'
import { getOAuthClient } from './oauth'
import type { CanonicalMetrics, ChannelBreakdown } from '@/lib/normalization/types'

interface TokenSet {
  access_token: string
  refresh_token?: string | null
  token_expiry?: string | null
}

export async function fetchGA4Metrics(
  tokens: TokenSet,
  propertyId: string,
  startDate: string,
  endDate: string
): Promise<Omit<CanonicalMetrics, 'spend' | 'impressions' | 'clicks' | 'ctr' | 'cpc' | 'cpa' | 'roas' | 'revenue'>> {
  const oauthClient = getOAuthClient()
  oauthClient.setCredentials({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token ?? undefined,
    expiry_date: tokens.token_expiry ? new Date(tokens.token_expiry).getTime() : undefined,
  })

  // Auto-refresh if expired
  if (tokens.token_expiry && new Date(tokens.token_expiry) < new Date()) {
    await oauthClient.refreshAccessToken()
  }

  const analyticsData = google.analyticsdata({ version: 'v1beta', auth: oauthClient })

  // Main metrics report
  const metricsResponse = await analyticsData.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'sessions' },
        { name: 'totalUsers' },
        { name: 'newUsers' },
        { name: 'screenPageViews' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
        { name: 'conversions' },
        { name: 'sessionConversionRate' },
      ],
    },
  })

  // Channel breakdown report
  const channelResponse = await analyticsData.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [
        { name: 'sessions' },
        { name: 'conversions' },
      ],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: '10',
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row = (metricsResponse as any).data?.rows?.[0]?.metricValues ?? []

  const sessions = parseFloat(row[0]?.value ?? '0')
  const users = parseFloat(row[1]?.value ?? '0')
  const newUsers = parseFloat(row[2]?.value ?? '0')
  const pageviews = parseFloat(row[3]?.value ?? '0')
  const bounceRate = parseFloat(row[4]?.value ?? '0')
  const avgSessionDuration = parseFloat(row[5]?.value ?? '0')
  const conversions = parseFloat(row[6]?.value ?? '0')
  const conversionRate = parseFloat(row[7]?.value ?? '0')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const channelBreakdown: ChannelBreakdown[] = ((channelResponse as any).data?.rows ?? []).map((r: { dimensionValues?: { value?: string }[]; metricValues?: { value?: string }[] }) => ({
    channel: r.dimensionValues?.[0]?.value ?? 'Unknown',
    sessions: parseFloat(r.metricValues?.[0]?.value ?? '0'),
    conversions: parseFloat(r.metricValues?.[1]?.value ?? '0'),
    spend: null,
  }))

  return {
    period: { start: startDate, end: endDate },
    sessions,
    users,
    newUsers,
    pageviews,
    bounceRate: bounceRate || null,
    avgSessionDuration: avgSessionDuration || null,
    conversions,
    conversionRate: conversionRate || null,
    conversionSource: 'ga4',
    channelBreakdown,
    attributionNotes: ['GA4 uses data-driven attribution by default.'],
  }
}
