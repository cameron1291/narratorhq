import { Sidebar } from '@/components/layout/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('full_name, agency_id')
    .eq('id', user.id)
    .single()

  if (agencyUser?.agency_id) {
    const { data: agency } = await supabase
      .from('agencies')
      .select('plan, trial_ends_at, stripe_subscription_id')
      .eq('id', agencyUser.agency_id)
      .single()

    const trialExpired =
      agency?.plan === 'trial' &&
      !agency?.stripe_subscription_id &&
      agency?.trial_ends_at != null &&
      new Date(agency.trial_ends_at) < new Date()

    if (trialExpired) {
      const headersList = await headers()
      const pathname = headersList.get('x-pathname') ?? ''
      // Allow settings so users can upgrade; redirect everything else
      if (!pathname.startsWith('/settings')) {
        redirect('/settings?expired=1')
      }
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar userEmail={user.email ?? ''} userName={agencyUser?.full_name ?? null} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      <Toaster position="bottom-right" />
    </div>
  )
}
