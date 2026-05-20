import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ClientContextPanel } from '@/components/clients/client-context-panel'
import { ClientConnectionsPanel } from '@/components/clients/client-connections-panel'
import { ClientSettingsPanel } from '@/components/clients/client-settings-panel'
import { GenerateReportButton } from '@/components/clients/generate-report-button'
import { ConnectionToast } from '@/components/clients/connection-toast'
import { Suspense } from 'react'

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
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

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Suspense fallback={null}><ConnectionToast /></Suspense>
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

      <Tabs defaultValue="connections">
        <TabsList className="mb-6">
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="context">Client context</TabsTrigger>
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

        <TabsContent value="settings">
          <ClientSettingsPanel client={client} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
