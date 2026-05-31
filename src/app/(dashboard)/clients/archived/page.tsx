import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Archive } from 'lucide-react'
import { RestoreClientButton } from '@/components/clients/restore-client-button'

export const metadata: Metadata = { title: 'Archived Clients — NarratorHQ' }

export default async function ArchivedClientsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id')
    .eq('id', user.id)
    .single()

  const { data: clients } = await supabase
    .from('clients')
    .select('id, name, industry, created_at')
    .eq('agency_id', agencyUser?.agency_id)
    .eq('is_archived', true)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <Link href="/clients" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to clients
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
          <Archive className="h-5 w-5 text-gray-500" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Archived clients</h1>
          <p className="text-sm text-gray-500">{clients?.length ?? 0} client{clients?.length !== 1 ? 's' : ''} archived</p>
        </div>
      </div>

      {!clients?.length ? (
        <div className="text-center py-16">
          <Archive className="h-10 w-10 text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-500">No archived clients</p>
        </div>
      ) : (
        <div className="space-y-2">
          {clients.map(client => (
            <div key={client.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-semibold text-sm">
                  {client.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{client.name}</p>
                  <p className="text-xs text-gray-400">{client.industry ?? 'No industry'} · Archived</p>
                </div>
              </div>
              <RestoreClientButton clientId={client.id} clientName={client.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
