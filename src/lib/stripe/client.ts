import Stripe from 'stripe'

let client: Stripe | null = null

export function getStripeClient() {
  if (!client) {
    client = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-04-22.dahlia' as const,
    })
  }
  return client
}

export const PLANS = {
  starter: {
    name: 'Starter',
    priceId: process.env.STRIPE_PRICE_STARTER!,
    price: 149,
    clientLimit: 5,
  },
  growth: {
    name: 'Growth',
    priceId: process.env.STRIPE_PRICE_GROWTH!,
    price: 249,
    clientLimit: 15,
  },
  agency: {
    name: 'Agency',
    priceId: process.env.STRIPE_PRICE_AGENCY!,
    price: 399,
    clientLimit: 999,
  },
} as const
