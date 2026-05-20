import { NextRequest, NextResponse } from 'next/server'
import { getStripeClient } from '@/lib/stripe/client'
import { createServiceClient } from '@/lib/supabase/server'
import type Stripe from 'stripe'

const PLAN_LIMITS: Record<string, { plan: string; clientLimit: number }> = {
  starter: { plan: 'starter', clientLimit: 5 },
  growth: { plan: 'growth', clientLimit: 15 },
  agency: { plan: 'agency', clientLimit: 999 },
}

async function syncSubscription(subscription: Stripe.Subscription) {
  const supabase = createServiceClient()
  const agencyId = subscription.metadata?.agency_id
  const planKey = subscription.metadata?.plan ?? 'starter'

  if (!agencyId) return

  const planConfig = PLAN_LIMITS[planKey] ?? PLAN_LIMITS.starter
  const isActive = ['active', 'trialing'].includes(subscription.status)

  await supabase
    .from('agencies')
    .update({
      stripe_subscription_id: subscription.id,
      plan: isActive ? planConfig.plan : 'cancelled',
      client_limit: isActive ? planConfig.clientLimit : 0,
    })
    .eq('id', agencyId)
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!
  const stripe = getStripeClient()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      await syncSubscription(event.data.object as Stripe.Subscription)
      break

    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      if (session.mode === 'subscription' && session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
        await syncSubscription(subscription)
      }
      break
    }

    case 'invoice.payment_failed': {
      // Optionally notify the agency owner — for now just log
      break
    }
  }

  return NextResponse.json({ received: true })
}
