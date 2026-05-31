import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ClientContextPanel } from '@/components/clients/client-context-panel'
import { ClientConnectionsPanel } from '@/components/clients/client-connections-panel'
import { ClientSettingsPanel } from '@/components/clients/client-settings-panel'
import { GenerateReportButton } from '@/components/clients/generate-report-button'
import { ConnectionToast } from '@/components/clients/connection-toast'
import { PromiseTracker } from '@/components/clients/promise-tracker'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Suspense } from 'react'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('clients').select('name').eq('id', id).single()
  return { title: data?.name ? `${data.name} — NarratorHQ` : 'Client — NarratorHQ' }
}

export default async function ClientDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ tab?: string }>
}) {
  const [{ id }, { tab }] = await Promise.all([params, searchParams])
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id')
    .eq('id', user.id)
    .single()

  const { data: client } = await supabase
    .from('clients')
    .select(`
      *,
      data_connections(id, platform, property_id, property_name, is_active, last_sync),
      client_context(id, context_type, content, is_active, created_at),
      report_instructions(id, instruction, is_active)
    `)
    .eq('id', id)
    .eq('agency_id', agencyUser?.agency_id)
    .single()

  if (!client) notFound()

  const connections = client.data_connections as { id: string; platform: string; property_id: string | null; property_name: string | null; is_active: boolean; last_sync: string | null }[]
  const contextItems = client.client_context as { id: string; context_type: string; content: string; is_active: boolean; created_at: string }[]
  const instructions = client.report_instructions as { id: string; instruction: string; is_active: boolean }[]

  // Fetch report history for Promise Tracker + recent reports strip
  const { data: reportHistory } = await supabase
    .from('reports')
    .select('id, period_start, period_end, status, narrative_sections, raw_metrics')
    .eq('client_id', id)
    .in('status', ['approved', 'sent', 'draft'])
    .order('period_start', { ascending: false })
    .limit(24)

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Suspense fallback={null}><ConnectionToast /></Suspense>
      <Link href="/clients" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" />
        All clients
      </Link>
      <div className="flex items-center gap-4 mb-8">
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
          {client.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            {client.industry && (
              <span className="text-sm text-gray-500">{client.industry}</span>
            )}
            <Badge variant="secondary" className="text-xs capitalize">
              {client.report_frequency} reports
            </Badge>
          </div>
        </div>
        <GenerateReportButton
          clientId={id}
          hasGa4={connections.some(c => c.platform === 'ga4' && c.is_active)}
        />
      </div>

      <Tabs defaultValue={(['connections','context','intelligence','settings'].includes(tab ?? '') ? tab : 'connections') as string}>
        <TabsList className="mb-6 overflow-x-auto flex-nowrap">
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="context">Context</TabsTrigger>
          <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="connections">
          <ClientConnectionsPanel
            clientId={id}
            connections={connections}
          />
        </TabsContent>

        <TabsContent value="context">
          <ClientContextPanel
            clientId={id}
            contextItems={contextItems}
            instructions={instructions}
          />
        </TabsContent>

        <TabsContent value="intelligence">
          <PromiseTracker
            reports={(reportHistory ?? []) as Parameters<typeof PromiseTracker>[0]['reports']}
            contextItems={contextItems.filter(c => c.is_active)}
          />
        </TabsContent>

        <TabsContent value="settings">
          <ClientSettingsPanel client={client} />
        </TabsContent>
      </Tabs>

      {/* Recent reports strip */}
      {reportHistory && reportHistory.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Report history</h3>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {reportHistory.slice(0, 6).map(r => {
              const metrics = (r.raw_metrics as { current: { sessions: number; conversions: number; cpa: number | null } } | null)?.current
              const start = new Date(r.period_start)
              const end = new Date(r.period_end)
              const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()
              const period = sameMonth
                ? start.toLocaleString('en-GB', { month: 'short', year: 'numeric' })
                : `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}–${end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
              const statusColor = r.status === 'sent' ? 'text-green-600' : r.status === 'approved' ? 'text-blue-600' : 'text-amber-600'
              return (
                <Link key={r.id} href={`/reports/${r.id}`} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{period}</p>
                    <p className={`text-xs capitalize ${statusColor}`}>{r.status}</p>
                  </div>
                  {metrics && (
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{metrics.sessions.toLocaleString()} sessions</p>
                      <p className="text-xs text-gray-400">{metrics.conversions} conv.</p>
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
