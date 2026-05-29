import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { getStripeClient } from '@/lib/stripe/client'

export async function DELETE() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const serviceSupabase = createServiceClient()

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id, role')
    .eq('id', user.id)
    .single()

  if (!agencyUser) {
    // No agency record — just delete the auth user
    await serviceSupabase.auth.admin.deleteUser(user.id)
    return NextResponse.json({ ok: true })
  }

  if (agencyUser.role === 'owner') {
    // Check if they're the only member
    const { count } = await supabase
      .from('agency_users')
      .select('id', { count: 'exact', head: true })
      .eq('agency_id', agencyUser.agency_id)

    if ((count ?? 0) > 1) {
      return NextResponse.json(
        { error: 'Transfer ownership to another member before deleting your account' },
        { status: 409 }
      )
    }

    // Cancel active Stripe subscription before deleting so billing stops immediately
    const { data: agency } = await serviceSupabase
      .from('agencies')
      .select('stripe_subscription_id')
      .eq('id', agencyUser.agency_id)
      .single()

    if (agency?.stripe_subscription_id) {
      try {
        const stripe = getStripeClient()
        await stripe.subscriptions.cancel(agency.stripe_subscription_id)
      } catch {
        // Non-fatal — proceed with deletion even if Stripe cancel fails
      }
    }

    // Sole owner: delete the agency (cascades to all data) then the auth user
    await serviceSupabase.from('agencies').delete().eq('id', agencyUser.agency_id)
  } else {
    // Member/admin: just remove from the agency
    await serviceSupabase.from('agency_users').delete().eq('id', user.id)
  }

  await serviceSupabase.auth.admin.deleteUser(user.id)

  return NextResponse.json({ ok: true })
}
