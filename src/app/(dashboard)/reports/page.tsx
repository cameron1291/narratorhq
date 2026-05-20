import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { CheckCircle, Clock, AlertCircle, Send, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

const STATUS_CONFIG = {
  generating: { label: 'Generating', icon: Clock, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  draft: { label: 'Needs review', icon: FileText, color: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
  approved: { label: 'Approved', icon: CheckCircle, color: 'text-green-700 bg-green-50 border-green-200' },
  sent: { label: 'Sent', icon: Send, color: 'text-gray-600 bg-gray-50 border-gray-200' },
  failed: { label: 'Failed', icon: AlertCircle, color: 'text-red-700 bg-red-50 border-red-200' },
}

export default async function ReportsPage() {
  const supabase = await createClient()

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id')
    .eq('id', (await supabase.auth.getUser()).data.user?.id ?? '')
    .single()

  if (!agencyUser) return null

  const { data: reports } = await supabase
    .from('reports')
    .select(`
      id, status, period_start, period_end, created_at, approved_at, sent_at,
      clients ( id, name )
    `)
    .eq('agency_id', agencyUser.agency_id)
    .order('created_at', { ascending: false })
    .limit(50)

  type ReportRow = NonNullable<typeof reports>[number]

  const drafts = reports?.filter(r => r.status === 'draft' || r.status === 'generating') ?? []
  const rest = reports?.filter(r => r.status !== 'draft' && r.status !== 'generating') ?? []

  function ReportRow({ report }: { report: ReportRow }) {
    const status = STATUS_CONFIG[report.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.draft
    const Icon = status.icon
    const clientArr = report.clients as { id: string; name: string }[] | null
    const client = Array.isArray(clientArr) ? clientArr[0] : clientArr
    const start = new Date(report.period_start)
    const end = new Date(report.period_end)
    const sameMonth = start.getMonth() === end.getMonth()
    const period = sameMonth
      ? start.toLocaleString('en-GB', { month: 'long', year: 'numeric' })
      : `${start.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}`

    return (
      <Link
        href={`/reports/${report.id}`}
        className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{client?.name ?? '—'}</p>
          <p className="text-xs text-gray-500 mt-0.5">{period}</p>
        </div>
        <span className={cn('text-xs border rounded-full px-2.5 py-0.5 flex items-center gap-1', status.color)}>
          <Icon className="h-3 w-3" />
          {status.label}
        </span>
      </Link>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-xl font-bold text-gray-900">Reports</h1>

      {drafts.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Needs attention</h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
            {drafts.map(r => <ReportRow key={r.id} report={r} />)}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">All reports</h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {rest.map(r => <ReportRow key={r.id} report={r} />)}
          </div>
        </section>
      )}

      {(!reports || reports.length === 0) && (
        <div className="text-center py-16 text-gray-400">
          <FileText className="h-8 w-8 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No reports yet.</p>
          <Link href="/clients" className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block">
            Go to Clients to generate your first report →
          </Link>
        </div>
      )}
    </div>
  )
}
