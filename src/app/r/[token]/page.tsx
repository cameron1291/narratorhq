import { createServiceClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { NarrativeSection, CanonicalMetrics } from '@/lib/normalization/types'
import type { Metadata } from 'next'
import Link from 'next/link'

const SECTION_LABELS: Record<NarrativeSection['section'], string> = {
  overview: 'Overview',
  organic: 'Organic',
  paid_search: 'Paid Search',
  paid_social: 'Paid Social',
  tiktok: 'TikTok Ads',
  anomalies: 'Key Observations',
  next_steps: "What We're Doing Next",
}

function fmtN(n: number | null | undefined): string {
  if (n == null) return '—'
  return n.toLocaleString('en-GB')
}
function fmtGBP(n: number | null | undefined): string {
  if (n == null) return '—'
  return `£${n.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}
function fmtPct(n: number | null | undefined): string {
  if (n == null) return '—'
  return `${(n * 100).toFixed(1)}%`
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>
}): Promise<Metadata> {
  const { token } = await params
  const supabase = createServiceClient()
  const { data } = await supabase
    .from('reports')
    .select('period_start, period_end, client_id')
    .eq('share_token', token)
    .eq('status', 'sent')
    .single()

  if (!data) return { title: 'Report' }

  const { data: client } = await supabase
    .from('clients')
    .select('name')
    .eq('id', data.client_id)
    .single()

  const start = new Date(data.period_start)
  const periodLabel = start.toLocaleString('en-GB', { month: 'long', year: 'numeric' })

  return {
    title: `${client?.name ?? 'Report'} — ${periodLabel} Performance Report`,
    robots: { index: false, follow: false },
  }
}

export default async function PublicReportPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const supabase = createServiceClient()

  const { data: report } = await supabase
    .from('reports')
    .select('id, client_id, agency_id, period_start, period_end, narrative_sections, raw_metrics, sent_at')
    .eq('share_token', token)
    .eq('status', 'sent')
    .single()

  if (!report) notFound()

  const [{ data: client }, { data: agency }] = await Promise.all([
    supabase.from('clients').select('name').eq('id', report.client_id).single(),
    supabase.from('agencies').select('name, brand_color, logo_url').eq('id', report.agency_id).single(),
  ])

  const sections = (report.narrative_sections ?? []) as NarrativeSection[]
  const metrics = (report.raw_metrics as { current: CanonicalMetrics } | null)?.current

  const start = new Date(report.period_start)
  const end = new Date(report.period_end)
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()
  const periodLabel = sameMonth
    ? start.toLocaleString('en-GB', { month: 'long', year: 'numeric' })
    : `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`

  const brandColor = agency?.brand_color ?? '#2563eb'
  const agencyName = agency?.name ?? 'Your Agency'
  const clientName = client?.name ?? 'Client'

  const mainSections = sections.filter(s => s.section !== 'next_steps')
  const nextSteps = sections.find(s => s.section === 'next_steps')

  const keyMetrics = metrics ? [
    { label: 'Sessions', value: fmtN(metrics.sessions) },
    { label: 'Conversions', value: fmtN(metrics.conversions) },
    { label: 'Conv. Rate', value: fmtPct(metrics.conversionRate) },
    ...(metrics.spend != null ? [{ label: 'Spend', value: fmtGBP(metrics.spend) }] : []),
    ...(metrics.roas != null ? [{ label: 'ROAS', value: `${metrics.roas.toFixed(2)}x` }] : []),
    ...(metrics.cpa != null ? [{ label: 'CPA', value: fmtGBP(metrics.cpa) }] : []),
  ] : []

  const preparedDate = report.sent_at
    ? new Date(report.sent_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 16px 64px' }}>

        {/* Card */}
        <div style={{ background: '#ffffff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>

          {/* Header band */}
          <div style={{ background: brandColor, padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            {agency?.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={agency.logo_url} alt={agencyName} style={{ height: 40, width: 'auto', objectFit: 'contain' }} />
            ) : (
              <span style={{ fontSize: 20, fontWeight: 700, color: '#ffffff' }}>{agencyName}</span>
            )}
            <a
              href={`/r/${token}/pdf`}
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: brandColor,
                background: '#ffffff',
                padding: '8px 16px',
                borderRadius: 8,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              Download PDF
            </a>
          </div>

          {/* Report title */}
          <div style={{ padding: '28px 32px 0' }}>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#111827' }}>{clientName}</h1>
            <p style={{ margin: '4px 0 0', fontSize: 14, color: '#6b7280' }}>
              {periodLabel} Performance Report
              {preparedDate && <span style={{ marginLeft: 12, color: '#d1d5db' }}>·</span>}
              {preparedDate && <span style={{ marginLeft: 8 }}>Prepared {preparedDate}</span>}
            </p>
          </div>

          {/* Key metrics */}
          {keyMetrics.length > 0 && (
            <div style={{ margin: '24px 32px 0', background: '#f9fafb', borderRadius: 10, padding: '16px 20px', display: 'flex', flexWrap: 'wrap', gap: 20 }}>
              {keyMetrics.map(m => (
                <div key={m.label}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: brandColor }}>{m.value}</div>
                  <div style={{ fontSize: 11, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Sections */}
          <div style={{ padding: '28px 32px' }}>
            {mainSections.map((section, idx) => (
              <div key={section.section} style={{ marginBottom: idx < mainSections.length - 1 ? 28 : 0 }}>
                <h3 style={{ margin: '0 0 8px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: brandColor, fontWeight: 600 }}>
                  {SECTION_LABELS[section.section]}
                </h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: '#374151', whiteSpace: 'pre-wrap' }}>
                  {section.editedContent ?? section.content}
                </p>
                {section.confidence === 'low' && (
                  <p style={{ margin: '6px 0 0', fontSize: 12, color: '#dc2626', background: '#fef2f2', borderRadius: 4, padding: '4px 8px', display: 'inline-block' }}>
                    Note: limited data available for this section — treat as indicative.
                  </p>
                )}
              </div>
            ))}

            {/* Next steps */}
            {nextSteps && (
              <div style={{ background: '#f9fafb', borderRadius: 10, padding: '20px 24px', marginTop: 28 }}>
                <h3 style={{ margin: '0 0 10px', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: brandColor, fontWeight: 600 }}>
                  {SECTION_LABELS['next_steps']}
                </h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: '#374151', whiteSpace: 'pre-wrap' }}>
                  {nextSteps.editedContent ?? nextSteps.content}
                </p>
              </div>
            )}

            {/* Attribution notes */}
            {metrics?.attributionNotes && metrics.attributionNotes.length > 0 && (
              <div style={{ marginTop: 20 }}>
                {metrics.attributionNotes.map((note, i) => (
                  <p key={i} style={{ margin: '4px 0', fontSize: 12, color: '#9ca3af', fontStyle: 'italic' }}>{note}</p>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ padding: '16px 32px 24px', borderTop: '1px solid #e5e7eb' }}>
            <p style={{ margin: 0, fontSize: 12, color: '#9ca3af' }}>
              This report was prepared by {agencyName}. It is intended solely for {clientName}.
            </p>
          </div>
        </div>

        {/* Discreet powered-by */}
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 11, color: '#d1d5db' }}>
          Delivered via{' '}
          <Link href="/" style={{ color: '#d1d5db' }}>NarratorHQ</Link>
        </p>
      </div>
    </div>
  )
}
