import type { NarrativeSection } from '@/lib/normalization/types'
import { getResendClient } from '@/lib/resend/client'

const SECTION_LABELS: Record<NarrativeSection['section'], string> = {
  overview: 'Overview',
  organic: 'Organic',
  paid_search: 'Paid Search',
  paid_social: 'Paid Social',
  tiktok: 'TikTok Ads',
  anomalies: 'Key Observations',
  next_steps: 'Next Steps',
}

export interface SendReportEmailInput {
  to: string
  fromName: string
  fromEmail: string // must be a verified sender domain in Resend
  replyTo?: string
  clientName: string
  periodLabel: string
  agencyName: string
  brandColor: string
  sections: NarrativeSection[]
  pdfBuffer?: Buffer
  reportViewUrl?: string
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function safeBrandColor(color: string): string {
  return /^#[0-9a-fA-F]{3,8}$/.test(color) ? color : '#2563eb'
}

function buildHtml(input: SendReportEmailInput): string {
  const {
    clientName: rawClientName,
    periodLabel: rawPeriodLabel,
    agencyName: rawAgencyName,
    brandColor: rawBrandColor,
    sections,
    reportViewUrl,
  } = input
  const clientName = escapeHtml(rawClientName)
  const periodLabel = escapeHtml(rawPeriodLabel)
  const agencyName = escapeHtml(rawAgencyName)
  const brandColor = safeBrandColor(rawBrandColor)

  const sectionHtml = sections
    .filter(s => s.section !== 'next_steps')
    .map(s => `
      <div style="margin-bottom: 28px;">
        <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: ${brandColor}; margin: 0 0 8px 0; font-weight: 600;">
          ${SECTION_LABELS[s.section]}
        </h3>
        <p style="font-size: 15px; line-height: 1.7; color: #374151; margin: 0;">
          ${escapeHtml(s.editedContent ?? s.content).replace(/\n/g, '<br>')}
        </p>
      </div>
    `).join('')

  const nextSteps = sections.find(s => s.section === 'next_steps')
  const nextStepsHtml = nextSteps ? `
    <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-top: 28px;">
      <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: ${brandColor}; margin: 0 0 10px 0; font-weight: 600;">
        What We're Doing Next
      </h3>
      <p style="font-size: 15px; line-height: 1.7; color: #374151; margin: 0;">
        ${escapeHtml(nextSteps.editedContent ?? nextSteps.content).replace(/\n/g, '<br>')}
      </p>
    </div>
  ` : ''

  const viewButton = reportViewUrl ? `
    <div style="text-align: center; margin-top: 32px;">
      <a href="${reportViewUrl}" style="display: inline-block; background: ${brandColor}; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-size: 14px; font-weight: 600;">
        View full report
      </a>
    </div>
  ` : ''

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${periodLabel} Performance Report — ${clientName}</title>
</head>
<body style="margin: 0; padding: 0; background: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <div style="max-width: 640px; margin: 32px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

    <!-- Header -->
    <div style="background: ${brandColor}; padding: 28px 36px;">
      <p style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">${agencyName}</p>
    </div>

    <!-- Content -->
    <div style="padding: 36px;">
      <h1 style="font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 4px 0;">${clientName}</h1>
      <p style="font-size: 14px; color: #6b7280; margin: 0 0 32px 0;">${periodLabel} Performance Report</p>

      ${sectionHtml}
      ${nextStepsHtml}
      ${viewButton}
    </div>

    <!-- Footer -->
    <div style="padding: 20px 36px; background: #f9fafb; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0; font-size: 12px; color: #9ca3af;">
        This report was prepared by ${agencyName}. It is intended solely for ${clientName}.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

function buildText(input: SendReportEmailInput): string {
  const { clientName, periodLabel, agencyName, sections } = input
  const lines = [
    `${agencyName}`,
    `${clientName} — ${periodLabel} Performance Report`,
    '',
  ]
  for (const section of sections) {
    lines.push(`${SECTION_LABELS[section.section].toUpperCase()}`)
    lines.push(section.editedContent ?? section.content)
    lines.push('')
  }
  return lines.join('\n')
}

export async function sendReportEmail(input: SendReportEmailInput): Promise<string> {
  const resend = getResendClient()

  const attachments = input.pdfBuffer
    ? [{ filename: `${input.clientName} - ${input.periodLabel} Report.pdf`, content: input.pdfBuffer, content_type: 'application/pdf' }]
    : []

  const { data, error } = await resend.emails.send({
    from: `${input.fromName} <${input.fromEmail}>`,
    to: input.to,
    replyTo: input.replyTo,
    subject: `${input.clientName} — ${input.periodLabel} Performance Report`,
    html: buildHtml(input),
    text: buildText(input),
    attachments,
  })

  if (error) throw new Error(`Resend error: ${error.message}`)
  return data!.id
}
