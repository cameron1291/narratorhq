import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Users, Archive, FileUp } from 'lucide-react'
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
        <div className="max-w-xl mx-auto py-12">
          <div className="text-center mb-8">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-700">Get your first report in 5 minutes</h2>
            <p className="text-sm text-gray-500 mt-1">Follow these steps to send your first automated client report.</p>
          </div>
          <div className="space-y-3 mb-8">
            {[
              { step: 1, title: 'Add a client', desc: 'Enter their name, industry, and report email address.', done: false },
              { step: 2, title: 'Connect GA4 — or upload an existing PDF', desc: 'Connect GA4 via OAuth in under 2 minutes. Or skip straight to "Import from PDF" on the client page to analyse a report you already have.', done: false },
              { step: 3, title: 'Add client context (optional)', desc: 'Goals, sensitivities, promises — the system carries these into every report.', done: false },
              { step: 4, title: 'Generate the first report', desc: 'Select the date range. Generation takes 15–40 seconds.', done: false },
              { step: 5, title: 'Review, approve, and send', desc: 'Edit any section inline. Approve it. Send white-labeled to your client.', done: false },
            ].map(item => (
              <div key={item.step} className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-xl">
                <div className="h-7 w-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <FileUp className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>Already using Looker Studio, AgencyAnalytics, Whatagraph, or DashThis?</strong>{' '}
              Add a client, then click <strong>Import from PDF</strong> on their page. Upload your existing monthly PDF export and get a NarratorHQ draft in under 60 seconds — no OAuth needed.
            </p>
          </div>

          <div className="text-center">
            <AddClientDialog
              agencyId={agencyUser?.agency_id ?? ''}
              clientCount={clients?.length ?? 0}
              clientLimit={agency?.client_limit ?? 5}
            />
          </div>
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
