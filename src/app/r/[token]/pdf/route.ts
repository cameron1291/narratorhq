import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { generateReportPdf } from '@/lib/pdf/generate-pdf'
import type { NarrativeSection, CanonicalMetrics, Anomaly } from '@/lib/normalization/types'

type Params = { params: Promise<{ token: string }> }

export async function GET(_request: NextRequest, { params }: Params) {
  const { token } = await params
  const supabase = createServiceClient()

  const { data: report } = await supabase
    .from('reports')
    .select('client_id, agency_id, period_start, period_end, narrative_sections, raw_metrics, anomalies')
    .eq('share_token', token)
    .eq('status', 'sent')
    .single()

  if (!report) return new NextResponse('Not found', { status: 404 })

  const [{ data: client }, { data: agency }] = await Promise.all([
    supabase.from('clients').select('name').eq('id', report.client_id).single(),
    supabase.from('agencies').select('name, brand_color, logo_url').eq('id', report.agency_id).single(),
  ])

  const sections = (report.narrative_sections ?? []) as NarrativeSection[]
  const metrics = (report.raw_metrics as { current: CanonicalMetrics } | null)?.current
  const anomalies = (report.anomalies ?? []) as Anomaly[]

  const start = new Date(report.period_start)
  const end = new Date(report.period_end)
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()
  const periodLabel = sameMonth
    ? start.toLocaleString('en-GB', { month: 'long', year: 'numeric' })
    : `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`

  const clientName = client?.name ?? 'Client'
  const agencyName = agency?.name ?? 'Agency'
  const brandColor = agency?.brand_color ?? '#2563eb'

  if (!metrics) return new NextResponse('Metrics not available', { status: 422 })

  let pdfBuffer: Buffer
  try {
    pdfBuffer = await generateReportPdf({
      agencyName,
      agencyLogo: agency?.logo_url,
      brandColor,
      clientName,
      periodLabel,
      sections,
      metrics,
      anomalies,
    })
  } catch {
    return new NextResponse('PDF generation failed', { status: 500 })
  }

  const filename = `${clientName} - ${periodLabel} Report.pdf`

  return new NextResponse(new Uint8Array(pdfBuffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': pdfBuffer.length.toString(),
    },
  })
}
