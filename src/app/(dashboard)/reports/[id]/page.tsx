import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ReportApproval } from '@/components/reports/report-approval'
import { GeneratingPoller } from '@/components/reports/generating-poller'
import type { NarrativeSection } from '@/lib/normalization/types'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data: report } = await supabase
    .from('reports')
    .select('period_start, clients(name)')
    .eq('id', id)
    .single()
  if (!report) return { title: 'Report — NarratorHQ' }
  const clientArr = report.clients as { name: string }[] | null
  const clientName = Array.isArray(clientArr) ? clientArr[0]?.name : (clientArr as { name: string } | null)?.name
  const start = new Date(report.period_start)
  const period = start.toLocaleString('en-GB', { month: 'long', year: 'numeric' })
  return { title: `${clientName ?? 'Report'} · ${period} — NarratorHQ` }
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id')
    .eq('id', (await supabase.auth.getUser()).data.user?.id ?? '')
    .single()

  if (!agencyUser) notFound()

  const { data: report } = await supabase
    .from('reports')
    .select('id, client_id, status, period_start, period_end, narrative_sections, original_narrative, created_at, share_token')
    .eq('id', id)
    .eq('agency_id', agencyUser.agency_id)
    .single()

  if (!report) notFound()

  const { data: client } = await supabase
    .from('clients')
    .select('name')
    .eq('id', report.client_id)
    .single()

  const sections = (report.narrative_sections ?? []) as NarrativeSection[]
  const originalSections = (report.original_narrative ?? report.narrative_sections ?? []) as NarrativeSection[]

  const start = new Date(report.period_start)
  const end = new Date(report.period_end)
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()
  const periodLabel = sameMonth
    ? start.toLocaleString('en-GB', { month: 'long', year: 'numeric' })
    : `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`

  if (report.status === 'generating') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <GeneratingPoller />
        <div className="inline-flex items-center gap-2 text-gray-600">
          <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          Generating report…
        </div>
        <p className="text-sm text-gray-400 mt-2">This usually takes 10–15 seconds.</p>
      </div>
    )
  }

  if (report.status === 'failed') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="font-medium text-red-800">Report generation failed</p>
          <p className="text-sm text-red-600 mt-1">Check your data connections and try generating again from the client page.</p>
          <Link href={`/clients/${report.client_id}`} className="mt-4 inline-block text-sm text-blue-600 hover:underline">
            Back to client
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 pt-4 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/reports" className="hover:text-gray-700 transition-colors">Reports</Link>
        <span>/</span>
        <Link href={`/clients/${report.client_id}`} className="hover:text-gray-700 transition-colors">
          {client?.name ?? 'Client'}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{periodLabel}</span>
      </div>

      <ReportApproval
        reportId={report.id}
        clientName={client?.name ?? 'Client'}
        periodLabel={periodLabel}
        initialSections={sections}
        originalSections={originalSections}
        status={report.status}
        shareToken={(report as { share_token?: string }).share_token}
      />
    </div>
  )
}
