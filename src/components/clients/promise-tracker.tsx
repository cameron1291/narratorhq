'use client'

import { CheckCircle, Clock, AlertCircle, Brain } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HistoricalReport {
  id: string
  period_start: string
  period_end: string
  status: string
  narrative_sections: Array<{ section: string; content: string; editedContent?: string | null }> | null
}

interface ContextItem {
  id: string
  context_type: string
  content: string
  created_at: string
}

interface Props {
  reports: HistoricalReport[]
  contextItems: ContextItem[]
}

function periodLabel(start: string, end: string): string {
  const s = new Date(start)
  const e = new Date(end)
  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()
  return sameMonth
    ? s.toLocaleString('en-GB', { month: 'long', year: 'numeric' })
    : `${s.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}–${e.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
}

export function PromiseTracker({ reports, contextItems }: Props) {
  const sentReports = reports.filter(r => ['approved', 'sent'].includes(r.status))

  // Build timeline from report history
  const timeline = sentReports
    .sort((a, b) => new Date(a.period_start).getTime() - new Date(b.period_start).getTime())
    .map(r => {
      const sections = r.narrative_sections ?? []
      const nextSteps = sections.find(s => s.section === 'next_steps')
      const overview = sections.find(s => s.section === 'overview')
      return {
        id: r.id,
        period: periodLabel(r.period_start, r.period_end),
        periodEnd: r.period_end,
        nextSteps: nextSteps ? (nextSteps.editedContent ?? nextSteps.content) : null,
        overview: overview ? (overview.editedContent ?? overview.content) : null,
      }
    })
    .filter(t => t.nextSteps || t.overview)

  // Active wins and changes from context
  const wins = contextItems.filter(c => c.context_type === 'win')
  const changes = contextItems.filter(c => c.context_type === 'change')
  const kpis = contextItems.filter(c => c.context_type === 'kpi')
  const promises = contextItems.filter(c => c.context_type === 'promise')

  if (timeline.length === 0 && wins.length === 0 && changes.length === 0) {
    return (
      <div className="text-center py-12">
        <Brain className="h-10 w-10 text-gray-200 mx-auto mb-3" />
        <p className="text-sm font-medium text-gray-600">No history yet</p>
        <p className="text-xs text-gray-400 mt-1">Once reports are approved and sent, the full commitment timeline appears here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Active context */}
      {(kpis.length > 0 || promises.length > 0 || changes.length > 0) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {kpis.length > 0 && (
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide mb-2">Primary KPIs</p>
              <ul className="space-y-1">
                {kpis.map(k => (
                  <li key={k.id} className="text-sm text-purple-900 flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0" />
                    {k.content}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {changes.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide mb-2">Recent Changes</p>
              <ul className="space-y-1">
                {changes.map(c => (
                  <li key={c.id} className="text-sm text-orange-900 flex items-start gap-2">
                    <AlertCircle className="h-3.5 w-3.5 text-orange-500 shrink-0 mt-0.5" />
                    {c.content}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Wins */}
      {wins.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-3">Recorded Wins</p>
          <ul className="space-y-2">
            {wins.map(w => (
              <li key={w.id} className="flex items-start gap-2 text-sm text-emerald-900">
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                {w.content}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Timeline */}
      {timeline.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Commitment timeline</p>
          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-6">
              {timeline.map((entry, i) => (
                <div key={entry.id} className="relative pl-10">
                  <div className={cn(
                    'absolute left-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold',
                    i === timeline.length - 1
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  )}>
                    {i === timeline.length - 1 ? <Clock className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-xs font-semibold text-gray-500 mb-2">{entry.period}</p>
                    {entry.overview && (
                      <p className="text-sm text-gray-700 leading-relaxed mb-3 border-b border-gray-100 pb-3">
                        {entry.overview.length > 200 ? `${entry.overview.slice(0, 200)}…` : entry.overview}
                      </p>
                    )}
                    {entry.nextSteps && (
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Committed to:</p>
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{entry.nextSteps}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
