import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getStripeClient, PLANS } from '@/lib/stripe/client'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body: { plan: keyof typeof PLANS } = await request.json()
  const plan = PLANS[body.plan]
  if (!plan) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id')
    .eq('id', user.id)
    .single()
  if (!agencyUser) return NextResponse.json({ error: 'No agency found' }, { status: 403 })

  const { data: agency } = await supabase
    .from('agencies')
    .select('id, name, stripe_customer_id, trial_ends_at')
    .eq('id', agencyUser.agency_id)
    .single()
  if (!agency) return NextResponse.json({ error: 'Agency not found' }, { status: 404 })

  const stripe = getStripeClient()

  // Get or create Stripe customer
  let customerId = agency.stripe_customer_id
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email!,
      name: agency.name,
      metadata: { agency_id: agency.id, user_id: user.id },
    })
    customerId = customer.id
    await supabase
      .from('agencies')
      .update({ stripe_customer_id: customerId })
      .eq('id', agency.id)
  }

  // Honor remaining trial days — don't grant a fresh 14-day trial to someone who already had one
  let trialDays: number | undefined
  if (agency.trial_ends_at) {
    const remaining = Math.floor((new Date(agency.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    if (remaining > 0) trialDays = remaining
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{ price: plan.priceId, quantity: 1 }],
    allow_promotion_codes: true,
    subscription_data: {
      ...(trialDays !== undefined ? { trial_period_days: trialDays } : {}),
      metadata: { agency_id: agency.id, plan: body.plan },
    },
    success_url: `${appUrl}/settings?billing=success`,
    cancel_url: `${appUrl}/settings?billing=cancelled`,
  })

  return NextResponse.json({ url: session.url })
}
