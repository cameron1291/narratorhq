// Canonical metric schema — all platform data maps to this before touching the AI layer

export interface CanonicalMetrics {
  period: { start: string; end: string }

  // Traffic
  sessions: number
  users: number
  newUsers: number
  pageviews: number
  bounceRate: number | null
  avgSessionDuration: number | null

  // Conversions
  conversions: number
  conversionRate: number | null
  conversionSource: 'ga4' | 'google_ads' | 'meta_ads'

  // Paid (null if platform not connected)
  spend: number | null
  impressions: number | null
  clicks: number | null
  ctr: number | null
  cpc: number | null
  cpa: number | null
  roas: number | null
  revenue: number | null

  // Channel breakdown
  channelBreakdown: ChannelBreakdown[]

  // Attribution disclosure — never blend silently
  attributionNotes: string[]
}

export interface ChannelBreakdown {
  channel: string
  sessions: number
  conversions: number
  spend: number | null
}

export interface PeriodComparison {
  current: CanonicalMetrics
  previous: CanonicalMetrics
  changes: MetricChanges
}

export interface MetricChanges {
  sessions: PercentChange
  users: PercentChange
  conversions: PercentChange
  conversionRate: PercentChange | null
  spend: PercentChange | null
  cpa: PercentChange | null
  roas: PercentChange | null
}

export interface PercentChange {
  absolute: number
  percent: number
  direction: 'up' | 'down' | 'flat'
}

export interface Anomaly {
  type: 'divergence' | 'spike' | 'drop' | 'correlation_break'
  metric: string
  description: string
  severity: 'low' | 'medium' | 'high'
  supportingData: Record<string, number | string>
}

// Structured narrative section output from Claude
export interface NarrativeSection {
  section: 'overview' | 'organic' | 'paid_search' | 'paid_social' | 'anomalies' | 'next_steps'
  content: string
  confidence: 'high' | 'medium' | 'low'
  supportingMetrics: string[]
  isApproved: boolean
  editedContent: string | null
}
