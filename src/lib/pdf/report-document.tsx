import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
import type { NarrativeSection, CanonicalMetrics, Anomaly } from '@/lib/normalization/types'

const SECTION_LABELS: Record<NarrativeSection['section'], string> = {
  overview: 'Overview',
  organic: 'Organic Performance',
  paid_search: 'Paid Search',
  paid_social: 'Paid Social',
  tiktok: 'TikTok Ads',
  anomalies: 'Key Observations',
  next_steps: 'Next Steps',
}

interface ReportDocumentProps {
  agencyName: string
  agencyLogo?: string | null
  brandColor: string
  clientName: string
  periodLabel: string
  sections: NarrativeSection[]
  metrics: CanonicalMetrics
  anomalies: Anomaly[]
}

function makeStyles(brandColor: string) {
  return StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      backgroundColor: '#ffffff',
      padding: 48,
      fontSize: 10,
      color: '#1a1a1a',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 32,
      paddingBottom: 20,
      borderBottomWidth: 2,
      borderBottomColor: brandColor,
    },
    agencyName: {
      fontSize: 18,
      fontFamily: 'Helvetica-Bold',
      color: brandColor,
    },
    reportMeta: {
      textAlign: 'right',
    },
    clientName: {
      fontSize: 14,
      fontFamily: 'Helvetica-Bold',
      color: '#1a1a1a',
    },
    period: {
      fontSize: 9,
      color: '#6b7280',
      marginTop: 3,
    },
    metricsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 28,
      backgroundColor: '#f9fafb',
      borderRadius: 6,
      padding: 16,
    },
    metricCell: {
      width: '22%',
    },
    metricValue: {
      fontSize: 16,
      fontFamily: 'Helvetica-Bold',
      color: brandColor,
    },
    metricLabel: {
      fontSize: 8,
      color: '#6b7280',
      marginTop: 2,
      textTransform: 'uppercase',
    },
    section: {
      marginBottom: 22,
    },
    sectionTitle: {
      fontSize: 11,
      fontFamily: 'Helvetica-Bold',
      color: brandColor,
      marginBottom: 6,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    sectionContent: {
      fontSize: 10,
      lineHeight: 1.6,
      color: '#374151',
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: '#e5e7eb',
      marginVertical: 16,
    },
    footer: {
      position: 'absolute',
      bottom: 32,
      left: 48,
      right: 48,
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize: 8,
      color: '#9ca3af',
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
      paddingTop: 8,
    },
    confidenceLow: {
      fontSize: 8,
      color: '#dc2626',
      backgroundColor: '#fef2f2',
      padding: '2 4',
      borderRadius: 2,
      marginTop: 4,
    },
    attributionNote: {
      fontSize: 8,
      color: '#6b7280',
      fontStyle: 'italic',
      marginTop: 4,
    },
  })
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

export function ReportDocument({
  agencyName,
  brandColor,
  clientName,
  periodLabel,
  sections,
  metrics,
}: ReportDocumentProps) {
  const styles = makeStyles(brandColor)
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  const keyMetrics = [
    { label: 'Sessions', value: fmtN(metrics.sessions) },
    { label: 'Conversions', value: fmtN(metrics.conversions) },
    { label: 'Conv. Rate', value: fmtPct(metrics.conversionRate) },
    ...(metrics.spend != null ? [{ label: 'Spend', value: fmtGBP(metrics.spend) }] : []),
    ...(metrics.roas != null ? [{ label: 'ROAS', value: `${metrics.roas.toFixed(2)}x` }] : []),
    ...(metrics.cpa != null ? [{ label: 'CPA', value: fmtGBP(metrics.cpa) }] : []),
    ...(metrics.revenue != null ? [{ label: 'Revenue', value: fmtGBP(metrics.revenue) }] : []),
    { label: 'Users', value: fmtN(metrics.users) },
  ]

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.agencyName}>{agencyName}</Text>
          <View style={styles.reportMeta}>
            <Text style={styles.clientName}>{clientName}</Text>
            <Text style={styles.period}>{periodLabel}</Text>
            <Text style={styles.period}>Prepared {today}</Text>
          </View>
        </View>

        {/* Key metrics summary */}
        <View style={styles.metricsGrid}>
          {keyMetrics.map(m => (
            <View key={m.label} style={styles.metricCell}>
              <Text style={styles.metricValue}>{m.value}</Text>
              <Text style={styles.metricLabel}>{m.label}</Text>
            </View>
          ))}
        </View>

        {/* Narrative sections */}
        {sections.map((section, idx) => (
          <View key={section.section} style={styles.section}>
            <Text style={styles.sectionTitle}>{SECTION_LABELS[section.section]}</Text>
            <Text style={styles.sectionContent}>
              {section.editedContent ?? section.content}
            </Text>
            {section.confidence === 'low' && (
              <Text style={styles.confidenceLow}>
                Note: limited data available for this section — treat as indicative.
              </Text>
            )}
            {idx < sections.length - 1 && <View style={styles.divider} />}
          </View>
        ))}

        {/* Attribution notes */}
        {metrics.attributionNotes.length > 0 && (
          <View style={{ marginTop: 12 }}>
            {metrics.attributionNotes.map((note, i) => (
              <Text key={i} style={styles.attributionNote}>{note}</Text>
            ))}
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text>{agencyName} — Confidential</Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  )
}
