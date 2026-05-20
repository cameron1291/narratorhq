import type { PeriodComparison, Anomaly, MetricChanges, PercentChange, CanonicalMetrics } from './types'

export function detectAnomalies(comparison: PeriodComparison): Anomaly[] {
  const anomalies: Anomaly[] = []
  const { changes, current, previous } = comparison

  // 1. Traffic up but conversions down (quality shift)
  if (changes.sessions.direction === 'up' && changes.sessions.percent > 5 &&
      changes.conversions.direction === 'down' && changes.conversions.percent < -5) {
    anomalies.push({
      type: 'divergence',
      metric: 'sessions_vs_conversions',
      description: `Sessions up ${fmt(changes.sessions.percent)}% but conversions down ${fmt(Math.abs(changes.conversions.percent))}% — likely a traffic quality shift.`,
      severity: Math.abs(changes.conversions.percent) > 20 ? 'high' : 'medium',
      supportingData: {
        sessionChange: changes.sessions.percent,
        conversionChange: changes.conversions.percent,
        currentSessions: current.sessions,
        previousSessions: previous.sessions,
      },
    })
  }

  // 2. Conversions up but sessions flat/down (efficiency win)
  if (changes.conversions.direction === 'up' && changes.conversions.percent > 10 &&
      changes.sessions.percent < 5) {
    anomalies.push({
      type: 'divergence',
      metric: 'conversions_without_traffic',
      description: `Conversions up ${fmt(changes.conversions.percent)}% while sessions ${changes.sessions.direction === 'down' ? 'fell' : 'stayed flat'} — conversion rate improvement.`,
      severity: 'low',
      supportingData: {
        conversionChange: changes.conversions.percent,
        sessionChange: changes.sessions.percent,
      },
    })
  }

  // 3. CPA spike
  if (changes.cpa && changes.cpa.direction === 'up' && changes.cpa.percent > 20) {
    anomalies.push({
      type: 'spike',
      metric: 'cpa',
      description: `CPA rose ${fmt(changes.cpa.percent)}% — paid efficiency dropped. Check bid strategy and audience changes.`,
      severity: changes.cpa.percent > 50 ? 'high' : 'medium',
      supportingData: {
        currentCpa: current.cpa ?? 0,
        previousCpa: previous.cpa ?? 0,
        change: changes.cpa.percent,
      },
    })
  }

  // 4. ROAS drop
  if (changes.roas && changes.roas.direction === 'down' && changes.roas.percent < -20) {
    anomalies.push({
      type: 'drop',
      metric: 'roas',
      description: `ROAS dropped ${fmt(Math.abs(changes.roas.percent))}% — revenue per pound spent has declined significantly.`,
      severity: Math.abs(changes.roas.percent) > 40 ? 'high' : 'medium',
      supportingData: {
        currentRoas: current.roas ?? 0,
        previousRoas: previous.roas ?? 0,
        change: changes.roas.percent,
      },
    })
  }

  // 5. Large session drop (>20%)
  if (changes.sessions.direction === 'down' && changes.sessions.percent < -20) {
    anomalies.push({
      type: 'drop',
      metric: 'sessions',
      description: `Sessions dropped ${fmt(Math.abs(changes.sessions.percent))}% — significant traffic decline. Check for technical issues or algorithm changes.`,
      severity: changes.sessions.percent < -40 ? 'high' : 'medium',
      supportingData: {
        currentSessions: current.sessions,
        previousSessions: previous.sessions,
        change: changes.sessions.percent,
      },
    })
  }

  // 6. Spend up but conversions flat (media waste)
  if (current.spend && previous.spend && changes.spend) {
    if (changes.spend.direction === 'up' && changes.spend.percent > 20 &&
        Math.abs(changes.conversions.percent) < 5) {
      anomalies.push({
        type: 'divergence',
        metric: 'spend_vs_conversions',
        description: `Spend increased ${fmt(changes.spend.percent)}% but conversions stayed flat — diminishing returns on paid investment.`,
        severity: 'medium',
        supportingData: {
          spendChange: changes.spend.percent,
          conversionChange: changes.conversions.percent,
          currentSpend: current.spend,
          previousSpend: previous.spend,
        },
      })
    }
  }

  return anomalies.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 }
    return order[a.severity] - order[b.severity]
  })
}

export function buildComparison(
  current: CanonicalMetrics,
  previous: CanonicalMetrics
): MetricChanges {
  return {
    sessions: pctChange(current.sessions, previous.sessions),
    users: pctChange(current.users, previous.users),
    conversions: pctChange(current.conversions, previous.conversions),
    conversionRate: current.conversionRate !== null && previous.conversionRate !== null
      ? pctChange(current.conversionRate, previous.conversionRate)
      : null,
    spend: current.spend !== null && previous.spend !== null
      ? pctChange(current.spend, previous.spend)
      : null,
    cpa: current.cpa !== null && previous.cpa !== null
      ? pctChange(current.cpa, previous.cpa)
      : null,
    roas: current.roas !== null && previous.roas !== null
      ? pctChange(current.roas, previous.roas)
      : null,
  }
}

function pctChange(current: number, previous: number): PercentChange {
  if (previous === 0) {
    return { absolute: current, percent: 100, direction: current > 0 ? 'up' : 'flat' }
  }
  const percent = ((current - previous) / previous) * 100
  return {
    absolute: current - previous,
    percent: Math.round(percent * 10) / 10,
    direction: percent > 1 ? 'up' : percent < -1 ? 'down' : 'flat',
  }
}

function fmt(n: number) {
  return Math.round(Math.abs(n)).toString()
}
