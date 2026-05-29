import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const metadata: Metadata = { title: 'Settings — NarratorHQ' }
import { AgencySettingsPanel } from '@/components/settings/agency-settings-panel'
import { BillingPanel } from '@/components/settings/billing-panel'
import { TeamPanel } from '@/components/settings/team-panel'

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ expired?: string; cancelled?: string; billing?: string }>
}) {
  const { expired, cancelled, billing } = await searchParams
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
      .select('id, name, brand_color, tone, plan, stripe_subscription_id, stripe_customer_id, trial_ends_at, client_limit, logo_url')
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

  const defaultTab = (expired === '1' || cancelled === '1') ? 'billing' : 'agency'

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Settings</h1>

      {expired === '1' && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 text-sm text-red-800">
          <strong>Your trial has expired.</strong> Upgrade to a paid plan below to continue using NarratorHQ.
        </div>
      )}

      {cancelled === '1' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 text-sm text-amber-800">
          <strong>Your subscription has been cancelled.</strong> Reactivate below to continue generating and sending reports.
        </div>
      )}

      {billing === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-4 text-sm text-green-800">
          <strong>Subscription activated!</strong> Your plan is now live.
        </div>
      )}

      {billing === 'cancelled' && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 text-sm text-gray-600">
          Checkout cancelled — your plan hasn&apos;t changed.
        </div>
      )}

      <Tabs defaultValue={defaultTab}>
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
            stripeCustomerId={agency.stripe_customer_id ?? null}
            trialEndsAt={agency.trial_ends_at}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
