import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FileText, Users, Clock, TrendingUp, AlertTriangle, CheckCircle, ArrowRight, Calendar, Zap } from 'lucide-react'

export const metadata: Metadata = { title: 'Dashboard — NarratorHQ' }

function nextReportDate(frequency: string, lastReportEnd: string | null): Date {
  if (!lastReportEnd) {
    const d = new Date()
    if (frequency === 'monthly') d.setDate(1)
    d.setMonth(d.getMonth() + 1)
    return d
  }
  const last = new Date(lastReportEnd)
  if (frequency === 'weekly') {
    last.setDate(last.getDate() + 7)
  } else {
    last.setMonth(last.getMonth() + 1)
    last.setDate(1)
  }
  return last
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id, full_name, agencies(name, plan, trial_ends_at)')
    .eq('id', user.id)
    .single()

  if (!agencyUser?.agency_id) redirect('/clients')

  const agencyId = agencyUser.agency_id
  const agency = agencyUser.agencies as unknown as { name: string; plan: string; trial_ends_at: string | null } | null

  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const [
    { data: clients },
    { data: needsReview },
    { count: sentThisMonthCount },
    { count: allSentCount },
    { data: recentDrafts },
  ] = await Promise.all([
    supabase.from('clients').select('id, name, report_frequency, data_connections(platform, is_active)').eq('agency_id', agencyId).eq('is_archived', false),
    supabase.from('reports').select('id, client_id, period_start, period_end, status, clients(name)').eq('agency_id', agencyId).in('status', ['draft']).order('created_at', { ascending: false }),
    supabase.from('reports').select('id', { count: 'exact', head: true }).eq('agency_id', agencyId).eq('status', 'sent').gte('sent_at', monthStart),
    supabase.from('reports').select('id', { count: 'exact', head: true }).eq('agency_id', agencyId).eq('status', 'sent'),
    supabase.from('reports').select('id, client_id, period_start, period_end, status, created_at, clients(name)').eq('agency_id', agencyId).in('status', ['draft', 'approved']).order('created_at', { ascending: false }).limit(5),
  ])

  // Clients at risk: active, has GA4, no sent report in last 30 days
  const { data: recentlySentClientIds } = await supabase
    .from('reports')
    .select('client_id')
    .eq('agency_id', agencyId)
    .eq('status', 'sent')
    .gte('sent_at', thirtyDaysAgo)

  const recentClientSet = new Set((recentlySentClientIds ?? []).map(r => r.client_id))
  const atRiskClients = (clients ?? []).filter(c => {
    const conns = c.data_connections as { platform: string; is_active: boolean }[] | null
    const hasGa4 = conns?.some(conn => conn.platform === 'ga4' && conn.is_active)
    return hasGa4 && !recentClientSet.has(c.id)
  })

  // Upcoming reports in next 14 days
  const { data: lastReports } = await supabase
    .from('reports')
    .select('client_id, period_end')
    .eq('agency_id', agencyId)
    .in('status', ['sent', 'approved'])
    .order('period_end', { ascending: false })

  const lastReportByClient = new Map<string, string>()
  for (const r of lastReports ?? []) {
    if (!lastReportByClient.has(r.client_id)) lastReportByClient.set(r.client_id, r.period_end)
  }

  const upcoming = (clients ?? [])
    .map(c => ({ client: c, next: nextReportDate(c.report_frequency, lastReportByClient.get(c.id) ?? null) }))
    .filter(({ next }) => next <= new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) && next >= now)
    .sort((a, b) => a.next.getTime() - b.next.getTime())
    .slice(0, 5)

  const timeSavedHours = Math.round(((allSentCount ?? 0) * 90) / 60)
  const displayName = agencyUser.full_name ?? user.email?.split('@')[0] ?? 'there'
  const hourOfDay = now.getHours()
  const greeting = hourOfDay < 12 ? 'Good morning' : hourOfDay < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{greeting}, {displayName}</h1>
          <p className="text-sm text-gray-500 mt-1">{agency?.name} · {now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
        {(needsReview?.length ?? 0) > 0 && (
          <Link href="/reports" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
            <FileText className="h-4 w-4" />
            {needsReview!.length} report{needsReview!.length !== 1 ? 's' : ''} to review
          </Link>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Needs review', value: needsReview?.length ?? 0, icon: AlertTriangle, color: (needsReview?.length ?? 0) > 0 ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-gray-500 bg-gray-50 border-gray-200', href: '/reports' },
          { label: 'Sent this month', value: sentThisMonthCount ?? 0, icon: CheckCircle, color: 'text-green-600 bg-green-50 border-green-200', href: '/reports' },
          { label: 'Active clients', value: clients?.length ?? 0, icon: Users, color: 'text-blue-600 bg-blue-50 border-blue-200', href: '/clients' },
          { label: 'Hours saved', value: timeSavedHours, icon: Clock, color: 'text-purple-600 bg-purple-50 border-purple-200', href: null },
        ].map(stat => (
          <div key={stat.label} className={`border rounded-xl p-4 ${stat.color}`}>
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="h-4 w-4" />
              {stat.href && <Link href={stat.href} className="text-xs opacity-60 hover:opacity-100">View →</Link>}
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs font-medium opacity-70 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Reports needing review */}
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Reports to review</h2>
            <Link href="/reports" className="text-xs text-blue-600 hover:text-blue-700">All reports →</Link>
          </div>
          {recentDrafts && recentDrafts.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {recentDrafts.map(r => {
                const client = r.clients as unknown as { name: string } | null
                const start = new Date(r.period_start)
                const end = new Date(r.period_end)
                const sameMonth = start.getMonth() === end.getMonth()
                const period = sameMonth
                  ? start.toLocaleString('en-GB', { month: 'long', year: 'numeric' })
                  : `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}–${end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
                return (
                  <Link key={r.id} href={`/reports/${r.id}`} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{client?.name ?? '—'}</p>
                      <p className="text-xs text-gray-500">{period}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                      r.status === 'approved' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {r.status === 'approved' ? 'Ready to send' : 'Needs review'}
                    </span>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center px-4">
              <CheckCircle className="h-8 w-8 text-green-400 mb-2" />
              <p className="text-sm font-medium text-gray-700">All caught up</p>
              <p className="text-xs text-gray-400 mt-1">No reports waiting for review</p>
            </div>
          )}
        </section>

        {/* At-risk clients + Upcoming */}
        <div className="space-y-4">

          {/* At risk */}
          {atRiskClients.length > 0 && (
            <section className="bg-white border border-amber-200 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-amber-100">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <h2 className="text-sm font-semibold text-amber-900">Clients without a recent report</h2>
              </div>
              <div className="divide-y divide-amber-50">
                {atRiskClients.slice(0, 4).map(c => (
                  <Link key={c.id} href={`/clients/${c.id}`} className="flex items-center justify-between px-4 py-3 hover:bg-amber-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-7 w-7 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-semibold text-xs">
                        {c.name.charAt(0)}
                      </div>
                      <p className="text-sm font-medium text-gray-900">{c.name}</p>
                    </div>
                    <span className="text-xs text-amber-600">No report in 30+ days</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Upcoming */}
          <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
              <Calendar className="h-4 w-4 text-gray-400" />
              <h2 className="text-sm font-semibold text-gray-900">Upcoming reports (14 days)</h2>
            </div>
            {upcoming.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {upcoming.map(({ client: c, next }) => (
                  <Link key={c.id} href={`/clients/${c.id}`} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
                    <p className="text-sm font-medium text-gray-900">{c.name}</p>
                    <span className="text-xs text-gray-500">{next.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-gray-400">No reports scheduled in the next 14 days</p>
              </div>
            )}
          </section>

          {/* Time saved callout */}
          {timeSavedHours > 0 && (
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 text-white">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-blue-200" />
                <p className="text-xs font-semibold text-blue-100 uppercase tracking-wide">NarratorHQ has saved you</p>
              </div>
              <p className="text-3xl font-bold">{timeSavedHours} hours</p>
              <p className="text-xs text-blue-200 mt-1">across {allSentCount ?? 0} reports sent · at ~90 min per report</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <section>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Add a client', href: '/clients', icon: Users },
            { label: 'View all reports', href: '/reports', icon: FileText },
            { label: 'Agency settings', href: '/settings', icon: TrendingUp },
            { label: 'Invite team member', href: '/settings', icon: ArrowRight },
          ].map(action => (
            <Link key={action.label} href={action.href} className="flex items-center gap-2.5 p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-colors group text-sm font-medium text-gray-700 group-hover:text-blue-700">
              <action.icon className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
              {action.label}
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
