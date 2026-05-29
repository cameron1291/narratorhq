import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const metadata: Metadata = { title: 'Settings — NarratorHQ' }
import { AgencySettingsPanel } from '@/components/settings/agency-settings-panel'
import { BillingPanel } from '@/components/settings/billing-panel'
import { TeamPanel } from '@/components/settings/team-panel'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id, role')
    .eq('id', user.id)
    .single()

  if (!agencyUser) return null

  const [agencyResult, membersResult, invitesResult] = await Promise.all([
    supabase
      .from('agencies')
      .select('id, name, brand_color, tone, plan, stripe_subscription_id, trial_ends_at, client_limit, logo_url')
      .eq('id', agencyUser.agency_id)
      .single(),
    supabase
      .from('agency_users')
      .select('id, full_name, role, created_at')
      .eq('agency_id', agencyUser.agency_id)
      .order('created_at'),
    supabase
      .from('agency_invites')
      .select('id, email, role, expires_at')
      .eq('agency_id', agencyUser.agency_id)
      .is('accepted_at', null)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false }),
  ])

  const agency = agencyResult.data
  if (!agency) return null

  const members = (membersResult.data ?? []) as { id: string; full_name: string | null; role: string; created_at: string }[]
  const pendingInvites = (invitesResult.data ?? []) as { id: string; email: string; role: string; expires_at: string }[]

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Settings</h1>

      <Tabs defaultValue="agency">
        <TabsList className="mb-6">
          <TabsTrigger value="agency">Agency</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="agency">
          <AgencySettingsPanel agency={agency} />
        </TabsContent>

        <TabsContent value="team">
          <TeamPanel
            currentUserId={user.id}
            currentUserRole={agencyUser.role}
            members={members}
            pendingInvites={pendingInvites}
          />
        </TabsContent>

        <TabsContent value="billing">
          <BillingPanel
            currentPlan={agency.plan}
            hasSubscription={!!agency.stripe_subscription_id}
            trialEndsAt={agency.trial_ends_at}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
