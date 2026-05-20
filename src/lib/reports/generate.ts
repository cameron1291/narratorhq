import { getAnthropicClient } from '@/lib/anthropic/client'
import type { CanonicalMetrics, NarrativeSection, Anomaly, PeriodComparison } from '@/lib/normalization/types'

export interface ClientReportContext {
  clientName: string
  reportPeriodLabel: string // e.g. "April 2025"
  tone: 'professional' | 'conversational' | 'data-heavy'
  goals: string[]
  sensitivities: string[] // things never to mention or frame negatively
  reusableInstructions: string[] // e.g. "always mention the team by name", "never use the word unfortunately"
  previousNarrativeSummary: string | null // one-paragraph summary of what was said last month
  connectedPlatforms: ('ga4' | 'google_ads' | 'meta_ads')[]
}

export interface GenerateReportInput {
  comparison: PeriodComparison
  anomalies: Anomaly[]
  context: ClientReportContext
}

interface RawSection {
  section: NarrativeSection['section']
  content: string
  confidence: NarrativeSection['confidence']
  supportingMetrics: string[]
}

interface RawNarrativeOutput {
  sections: RawSection[]
}

const TONE_INSTRUCTIONS: Record<ClientReportContext['tone'], string> = {
  professional: 'Write in a professional tone. Use complete sentences. Avoid contractions. Address the client respectfully.',
  conversational: 'Write in a warm, conversational tone. Use "we" and "your". Be approachable and human, not corporate.',
  'data-heavy': 'Lead every point with the specific number first. Be precise and analytical. Keep narrative prose minimal — let the data speak.',
}

function fmtN(n: number) {
  return n.toLocaleString('en-GB')
}

function fmtPct(n: number) {
  return `${Math.round(Math.abs(n))}%`
}

function fmtGBP(n: number) {
  return `£${n.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

function formatMetricBlock(label: string, m: CanonicalMetrics): string {
  const lines: string[] = [`## ${label} (${m.period.start} → ${m.period.end})`]
  lines.push(`Sessions: ${fmtN(m.sessions)} | Users: ${fmtN(m.users)} (${fmtN(m.newUsers)} new) | Pageviews: ${fmtN(m.pageviews)}`)
  lines.push(`Conversions: ${fmtN(m.conversions)}${m.conversionRate !== null ? ` | Rate: ${(m.conversionRate * 100).toFixed(2)}%` : ''}`)
  if (m.bounceRate !== null) lines.push(`Bounce rate: ${(m.bounceRate * 100).toFixed(1)}%`)
  if (m.avgSessionDuration !== null) lines.push(`Avg session: ${Math.round(m.avgSessionDuration)}s`)
  if (m.spend !== null) {
    const paidLine = [`Spend: ${fmtGBP(m.spend)}`]
    if (m.impressions !== null) paidLine.push(`Impressions: ${fmtN(m.impressions)}`)
    if (m.clicks !== null) paidLine.push(`Clicks: ${fmtN(m.clicks)}`)
    if (m.ctr !== null) paidLine.push(`CTR: ${(m.ctr * 100).toFixed(2)}%`)
    if (m.cpc !== null) paidLine.push(`CPC: £${m.cpc.toFixed(2)}`)
    if (m.cpa !== null) paidLine.push(`CPA: £${m.cpa.toFixed(2)}`)
    if (m.roas !== null) paidLine.push(`ROAS: ${m.roas.toFixed(2)}x`)
    if (m.revenue !== null) paidLine.push(`Revenue: ${fmtGBP(m.revenue)}`)
    lines.push(paidLine.join(' | '))
  }
  if (m.channelBreakdown.length > 0) {
    lines.push('Channel breakdown:')
    for (const ch of m.channelBreakdown) {
      lines.push(`  ${ch.channel}: ${fmtN(ch.sessions)} sessions, ${ch.conversions} conversions${ch.spend !== null ? `, ${fmtGBP(ch.spend)} spend` : ''}`)
    }
  }
  if (m.attributionNotes.length > 0) {
    lines.push(`Attribution: ${m.attributionNotes.join(' ')}`)
  }
  return lines.join('\n')
}

function formatChangeSummary(comparison: PeriodComparison): string {
  const { changes } = comparison
  const dir = (d: 'up' | 'down' | 'flat', pct: number) =>
    d === 'flat' ? 'flat' : `${d} ${fmtPct(pct)}`

  const lines = [
    `Sessions: ${dir(changes.sessions.direction, changes.sessions.percent)} (${changes.sessions.absolute >= 0 ? '+' : ''}${fmtN(changes.sessions.absolute)})`,
    `Users: ${dir(changes.users.direction, changes.users.percent)}`,
    `Conversions: ${dir(changes.conversions.direction, changes.conversions.percent)}`,
  ]
  if (changes.conversionRate) lines.push(`Conv. rate: ${dir(changes.conversionRate.direction, changes.conversionRate.percent)}`)
  if (changes.spend) lines.push(`Spend: ${dir(changes.spend.direction, changes.spend.percent)}`)
  if (changes.cpa) lines.push(`CPA: ${dir(changes.cpa.direction, changes.cpa.percent)}`)
  if (changes.roas) lines.push(`ROAS: ${dir(changes.roas.direction, changes.roas.percent)}`)
  return lines.join('\n')
}

function sectionsRequired(context: ClientReportContext, anomalies: Anomaly[]): NarrativeSection['section'][] {
  const sections: NarrativeSection['section'][] = ['overview', 'organic']
  if (context.connectedPlatforms.includes('google_ads')) sections.push('paid_search')
  if (context.connectedPlatforms.includes('meta_ads')) sections.push('paid_social')
  if (anomalies.length > 0) sections.push('anomalies')
  sections.push('next_steps')
  return sections
}

const SYSTEM_PROMPT = `You are a senior performance marketing analyst writing monthly client reports on behalf of a digital marketing agency. Your job is to explain what the numbers mean — not just list them.

CRITICAL RULES:
1. Every claim you make must be directly supported by data in the input. Never speculate or invent a cause unless you flag it as "likely" or "possible."
2. If data does not explain why something happened, say "we're investigating" rather than guessing.
3. Never fabricate numbers. Quote only from the data provided.
4. For each section, assess your own confidence: high (data clearly supports the claim), medium (directional but limited data), low (data is insufficient — flag this explicitly in the content).
5. In the supportingMetrics array, list only the exact metric names from the input data that your content references.

OUTPUT FORMAT: Respond with valid JSON only — no markdown, no preamble. Schema:
{
  "sections": [
    {
      "section": "<section_name>",
      "content": "<narrative text>",
      "confidence": "high" | "medium" | "low",
      "supportingMetrics": ["<metric_name>", ...]
    }
  ]
}`

export async function generateNarrative(input: GenerateReportInput): Promise<NarrativeSection[]> {
  const { comparison, anomalies, context } = input
  const required = sectionsRequired(context, anomalies)

  const sectionDescriptions: Record<NarrativeSection['section'], string> = {
    overview: '2-3 sentences. The headline story: what was the single most important thing that happened this month and did it move toward the client\'s goals?',
    organic: 'Organic and direct traffic: what drove sessions up or down, which channels performed, conversion rate from organic.',
    paid_search: 'Google Ads performance: spend efficiency, CPA/ROAS movement, what worked and what didn\'t. Be specific about bid strategy or audience changes if CPA moved.',
    paid_social: 'Meta Ads performance: reach, engagement, ROAS, spend efficiency. Explain any creative or audience changes that drove the result.',
    anomalies: 'Explain each anomaly directly. State the divergence, the most likely cause (cite the supporting data), and what action is being taken. If the cause is unclear, say so.',
    next_steps: 'Maximum 3 bullet points. Concrete actions the agency will take next month. Each bullet should reference a specific metric or outcome it targets.',
  }

  const userPrompt = [
    `CLIENT: ${context.clientName}`,
    `REPORT PERIOD: ${context.reportPeriodLabel}`,
    `TONE: ${TONE_INSTRUCTIONS[context.tone]}`,
    '',
    context.goals.length > 0 ? `CLIENT GOALS:\n${context.goals.map(g => `- ${g}`).join('\n')}` : null,
    context.sensitivities.length > 0 ? `SENSITIVITIES (never frame these negatively or mention without careful context):\n${context.sensitivities.map(s => `- ${s}`).join('\n')}` : null,
    context.reusableInstructions.length > 0 ? `STANDING INSTRUCTIONS:\n${context.reusableInstructions.map(r => `- ${r}`).join('\n')}` : null,
    context.previousNarrativeSummary ? `LAST MONTH'S NARRATIVE SUMMARY:\n${context.previousNarrativeSummary}` : null,
    '',
    '--- DATA ---',
    '',
    formatMetricBlock('Current period', comparison.current),
    '',
    formatMetricBlock('Previous period', comparison.previous),
    '',
    '## Period-over-period changes',
    formatChangeSummary(comparison),
    '',
    anomalies.length > 0 ? [
      '## Detected anomalies',
      ...anomalies.map(a => `[${a.severity.toUpperCase()}] ${a.type.toUpperCase()} — ${a.metric}: ${a.description}`),
    ].join('\n') : null,
    '',
    '--- SECTIONS TO WRITE ---',
    required.map(s => `${s}: ${sectionDescriptions[s]}`).join('\n'),
  ].filter(Boolean).join('\n')

  const anthropic = getAnthropicClient()

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    system: [
      {
        type: 'text',
        text: SYSTEM_PROMPT,
        // Cache the system prompt — it's the same structure every report
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [{ role: 'user', content: userPrompt }],
  })

  const rawText = response.content[0].type === 'text' ? response.content[0].text : ''

  let parsed: RawNarrativeOutput
  try {
    parsed = JSON.parse(rawText) as RawNarrativeOutput
  } catch {
    // Claude returned something unparseable — surface a degraded section rather than crashing
    return required.map(section => ({
      section,
      content: 'Report generation encountered an issue. Please regenerate this section.',
      confidence: 'low' as const,
      supportingMetrics: [],
      isApproved: false,
      editedContent: null,
    }))
  }

  // Validate and hydrate with approval fields
  return parsed.sections.map(raw => ({
    section: raw.section,
    content: raw.content ?? '',
    confidence: (['high', 'medium', 'low'] as const).includes(raw.confidence) ? raw.confidence : 'low',
    supportingMetrics: Array.isArray(raw.supportingMetrics) ? raw.supportingMetrics : [],
    isApproved: false,
    editedContent: null,
  }))
}
