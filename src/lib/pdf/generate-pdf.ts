import { renderToBuffer, type DocumentProps } from '@react-pdf/renderer'
import { createElement, type ReactElement } from 'react'
import { ReportDocument } from './report-document'
import type { NarrativeSection, CanonicalMetrics, Anomaly } from '@/lib/normalization/types'

export interface PdfReportInput {
  agencyName: string
  agencyLogo?: string | null
  brandColor: string
  clientName: string
  periodLabel: string
  sections: NarrativeSection[]
  metrics: CanonicalMetrics
  anomalies: Anomaly[]
}

export async function generateReportPdf(input: PdfReportInput): Promise<Buffer> {
  const element = createElement(ReportDocument, input)
  return renderToBuffer(element as ReactElement<DocumentProps>)
}
