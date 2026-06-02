import { getAnthropicClient } from '@/lib/anthropic/client'
import type { NarrativeSection } from '@/lib/normalization/types'
import type { ClientReportContext } from './generate'
import type { DocumentBlockParam } from '@anthropic-ai/sdk/resources/messages/messages'

export interface PdfReportInput {
  pdfBase64: string
  clientName: string
  reportPeriodLabel: string
  tone: ClientReportContext['tone']
  goals: string[]
  sensitivities: string[]
  reusableInstructions: string[]
  primaryKPIs: string[]
}

interface RawSection {
  section: NarrativeSection['section']
  content: string
  confidence: NarrativeSection['confidence']
  supportingMetrics: string[]
  opportunities?: { title: string; rationale: string; expectedImpact: string }[]
}

interface RawNarrativeOutput {
  sections: RawSection[]
  error?: string
}

const TONE_INSTRUCTIONS: Record<ClientReportContext['tone'], string> = {
  professional: 'Write in a professional tone. Use complete sentences. Avoid contractions. Address the client respectfully.',
  conversational: 'Write in a warm, conversational tone. Use "we" and "your". Be approachable and human, not corporate.',
  'data-heavy': 'Lead every point with the specific number first. Be precise and analytical. Keep narrative prose minimal — let the data speak.',
}

const PDF_SYSTEM_PROMPT = `You are a senior performance marketing analyst. An agency has uploaded an existing client report PDF.

Your job is to read it and produce a structured JSON analysis — not to rewrite or improve it, but to extract and re-present its key points in a clear, organised format.

EXTRACTION RULES:
1. Extract only facts explicitly stated in the PDF. Do not invent numbers or causes.
2. If the PDF does not contain readable text (e.g. it is a scanned image with no text layer), respond with exactly: {"error":"unreadable_pdf"}
3. For each metric you reference in supportingMetrics, use the exact figure from the PDF.
4. Set confidence based on data clarity: "high" if the PDF states it clearly, "medium" if you had to infer, "low" if absent or ambiguous.

SECTION MAPPING — generate exactly these four sections:
- overview: Executive summary synthesising the report's headline results. If goals or targets are mentioned, explicitly state whether performance is on track, ahead, or behind. Note the reporting period if stated.
- organic: All performance wins, strong results, and positive outcomes across any channel mentioned in the PDF.
- anomalies: All underperformance, declines, issues, concerns, or challenges raised in the PDF.
- next_steps: All recommendations, action items, or next steps from the PDF. If none are stated, propose up to 3 based strictly on the data shown.

Do NOT generate sections for paid_search, paid_social, or tiktok.

OUTPUT FORMAT: valid JSON only — no markdown, no preamble, no trailing text.
{
  "sections": [
    {
      "section": "<section_name>",
      "content": "<narrative text>",
      "confidence": "high" | "medium" | "low",
      "supportingMetrics": ["<metric name and value>"],
      "opportunities": [
        {
          "title": "<specific recommended action>",
          "rationale": "<data point that supports this>",
          "expectedImpact": "<what outcome this could produce>"
        }
      ]
    }
  ]
}

The "opportunities" array is optional but encouraged for the next_steps section when the data clearly supports a specific action. Max 2 per section.`

const PDF_SECTIONS: NarrativeSection['section'][] = ['overview', 'organic', 'anomalies', 'next_steps']

export async function generateNarrativeFromPdf(input: PdfReportInput): Promise<NarrativeSection[] | { error: string }> {
  const { pdfBase64, clientName, reportPeriodLabel, tone, goals, sensitivities, reusableInstructions, primaryKPIs } = input

  const userPromptLines = [
    `CLIENT: ${clientName}`,
    `REPORT PERIOD: ${reportPeriodLabel}`,
    `TONE: ${TONE_INSTRUCTIONS[tone]}`,
  ]

  if (goals.length > 0) userPromptLines.push(`\nCLIENT GOALS:\n${goals.map(g => `- ${g}`).join('\n')}`)
  if (sensitivities.length > 0) userPromptLines.push(`\nSENSITIVITIES (never frame these negatively):\n${sensitivities.map(s => `- ${s}`).join('\n')}`)
  if (reusableInstructions.length > 0) userPromptLines.push(`\nSTANDING INSTRUCTIONS:\n${reusableInstructions.map(r => `- ${r}`).join('\n')}`)
  if (primaryKPIs.length > 0) userPromptLines.push(`\nPRIMARY KPIs (lead every section with these):\n${primaryKPIs.map(k => `- ${k}`).join('\n')}`)

  userPromptLines.push('\nThe PDF report is attached above. Analyse it and produce the JSON output.')

  const anthropic = getAnthropicClient()

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4000,
    system: PDF_SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'document',
            source: {
              type: 'base64',
              media_type: 'application/pdf',
              data: pdfBase64,
            },
          } as DocumentBlockParam,
          {
            type: 'text',
            text: userPromptLines.join('\n'),
          },
        ],
      },
    ],
  })

  const rawText = response.content[0].type === 'text' ? response.content[0].text : ''

  let parsed: RawNarrativeOutput
  try {
    const cleaned = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
    parsed = JSON.parse(cleaned) as RawNarrativeOutput
  } catch {
    return PDF_SECTIONS.map(section => ({
      section,
      content: 'This section could not be extracted. Please edit or regenerate.',
      confidence: 'low' as const,
      supportingMetrics: [],
      isApproved: false,
      editedContent: null,
    }))
  }

  if (parsed.error === 'unreadable_pdf') {
    return { error: 'unreadable_pdf' }
  }

  return parsed.sections.map(raw => ({
    section: raw.section,
    content: raw.content ?? '',
    confidence: (['high', 'medium', 'low'] as const).includes(raw.confidence) ? raw.confidence : 'low',
    supportingMetrics: Array.isArray(raw.supportingMetrics) ? raw.supportingMetrics : [],
    opportunities: Array.isArray(raw.opportunities) ? raw.opportunities : [],
    isApproved: false,
    editedContent: null,
  }))
}
