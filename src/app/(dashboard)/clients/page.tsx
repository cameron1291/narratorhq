import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Users, Archive } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { AddClientDialog } from '@/components/clients/add-client-dialog'

export const metadata: Metadata = { title: 'Clients — NarratorHQ' }

export default async function ClientsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id, agencies(name, plan, client_limit, trial_ends_at)')
    .eq('id', user.id)
    .single()

  const { data: clients } = await supabase
    .from('clients')
    .select('id, name, industry, report_frequency, is_archived, data_connections(platform)')
    .eq('agency_id', agencyUser?.agency_id)
    .eq('is_archived', false)
    .order('created_at', { ascending: false })

  const agency = agencyUser?.agencies as unknown as { name: string; plan: string; client_limit: number; trial_ends_at: string } | null

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-sm text-gray-500 mt-1">
            {clients?.length ?? 0} of {agency?.client_limit ?? 5} on your plan
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/clients/archived" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors">
            <Archive className="h-3.5 w-3.5" />
            Archived
          </Link>
          <AddClientDialog
            agencyId={agencyUser?.agency_id ?? ''}
            clientCount={clients?.length ?? 0}
            clientLimit={agency?.client_limit ?? 5}
          />
        </div>
      </div>

      {!clients?.length ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Users className="h-12 w-12 text-gray-300 mb-4" />
          <h2 className="text-lg font-semibold text-gray-700">Add your first client</h2>
          <p className="text-sm text-gray-500 mt-1 mb-6 max-w-sm">
            Connect a client&apos;s GA4 and ad accounts, set their goals and context — then generate your first narrative report in minutes.
          </p>
          <AddClientDialog
            agencyId={agencyUser?.agency_id ?? ''}
            clientCount={clients?.length ?? 0}
            clientLimit={agency?.client_limit ?? 5}
          />
        </div>
      ) : (
        <div className="grid gap-3">
          {clients.map(client => {
            const platforms = (client.data_connections as { platform: string }[] | null)?.map(c => c.platform) ?? []
            return (
              <Link
                key={client.id}
                href={`/clients/${client.id}`}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{client.name}</p>
                    <p className="text-sm text-gray-500">{client.industry ?? 'No industry set'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {platforms.includes('ga4') && (
                    <Badge variant="outline" className="text-xs">GA4</Badge>
                  )}
                  {platforms.includes('google_ads') && (
                    <Badge variant="outline" className="text-xs">Google Ads</Badge>
                  )}
                  {platforms.includes('meta_ads') && (
                    <Badge variant="outline" className="text-xs">Meta</Badge>
                  )}
                  {platforms.includes('tiktok_ads') && (
                    <Badge variant="outline" className="text-xs">TikTok</Badge>
                  )}
                  {!platforms.length && (
                    <Badge variant="outline" className="text-xs text-amber-600 border-amber-300">
                      No connections
                    </Badge>
                  )}
                  <Badge variant="secondary" className="text-xs capitalize">
                    {client.report_frequency}
                  </Badge>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
