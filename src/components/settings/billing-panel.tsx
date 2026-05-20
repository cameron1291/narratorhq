'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const PLANS = [
  {
    key: 'starter',
    name: 'Starter',
    price: 149,
    limit: '5 clients',
    features: ['GA4 + Google Ads + Meta', 'AI narrative generation', 'PDF reports', 'Email delivery'],
  },
  {
    key: 'growth',
    name: 'Growth',
    price: 249,
    limit: '15 clients',
    features: ['Everything in Starter', 'Priority generation', 'Custom branding'],
    highlighted: true,
  },
  {
    key: 'agency',
    name: 'Agency',
    price: 399,
    limit: 'Unlimited clients',
    features: ['Everything in Growth', 'Team members', 'White-label email domain'],
  },
]

interface BillingPanelProps {
  currentPlan: string
  hasSubscription: boolean
  trialEndsAt: string | null
}

export function BillingPanel({ currentPlan, hasSubscription, trialEndsAt }: BillingPanelProps) {
  const [loading, setLoading] = useState<string | null>(null)

  const trialDaysLeft = trialEndsAt
    ? Math.max(0, Math.ceil((new Date(trialEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0
  const onTrial = currentPlan === 'trial' && trialDaysLeft > 0

  async function startCheckout(plan: string) {
    setLoading(plan)
    const res = await fetch('/api/billing/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    })
    if (res.ok) {
      const { url } = await res.json() as { url: string }
      window.location.href = url
    }
    setLoading(null)
  }

  async function openPortal() {
    setLoading('portal')
    const res = await fetch('/api/billing/portal', { method: 'POST' })
    if (res.ok) {
      const { url } = await res.json() as { url: string }
      window.location.href = url
    }
    setLoading(null)
  }

  return (
    <div className="space-y-6">
      {onTrial && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-800">
          You have <strong>{trialDaysLeft} days</strong> left on your free trial.
        </div>
      )}

      {hasSubscription && (
        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          <div>
            <p className="text-sm font-medium text-green-800 capitalize">
              {currentPlan} plan — active
            </p>
            <p className="text-xs text-green-600 mt-0.5">Manage invoices, update payment method, or cancel</p>
          </div>
          <Button variant="outline" size="sm" onClick={openPortal} disabled={loading === 'portal'}>
            {loading === 'portal' ? 'Opening…' : 'Manage billing'}
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map(plan => {
          const isCurrent = currentPlan === plan.key
          return (
            <div
              key={plan.key}
              className={cn(
                'rounded-xl border p-5 space-y-4',
                plan.highlighted ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200',
                isCurrent && 'border-green-400 bg-green-50'
              )}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                  {isCurrent && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {plan.highlighted && !isCurrent && (
                    <span className="text-xs text-blue-600 bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5">Popular</span>
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  £{plan.price}<span className="text-sm font-normal text-gray-500">/mo</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{plan.limit}</p>
              </div>

              <ul className="space-y-1.5">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                    <CheckCircle className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              {isCurrent ? (
                <p className="text-xs text-center text-green-700 font-medium">Current plan</p>
              ) : (
                <Button
                  className="w-full"
                  variant={plan.highlighted ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => startCheckout(plan.key)}
                  disabled={!!loading}
                >
                  {loading === plan.key ? 'Opening…' : hasSubscription ? 'Switch plan' : 'Start free trial'}
                </Button>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-xs text-gray-400 text-center">
        14-day free trial included. No credit card required to start. Cancel any time.
      </p>
    </div>
  )
}
