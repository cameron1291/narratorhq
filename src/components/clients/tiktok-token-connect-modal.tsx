'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ExternalLink, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

const STEPS = [
  {
    title: 'Open TikTok Ads Manager',
    instruction: 'Log in to your TikTok Ads Manager and note the Advertiser ID in the URL.',
    detail: 'You\'ll need this ID in the final step. Look in the browser address bar for "aadvid=" followed by a long number — that\'s your Advertiser ID.',
    action: {
      label: 'Open TikTok Ads Manager',
      url: 'https://ads.tiktok.com',
    },
    tip: 'The Advertiser ID looks like: 7123456789012345678. Copy it somewhere handy.',
  },
  {
    title: 'Open TikTok Business Center',
    instruction: 'Go to TikTok Business Center and navigate to the API section.',
    detail: null,
    subSteps: [
      'Go to business.tiktok.com',
      'Click your profile icon (top right) → "Business Center Settings"',
      'In the left sidebar, click "API"',
    ],
    action: {
      label: 'Open Business Center',
      url: 'https://business.tiktok.com',
    },
  },
  {
    title: 'Generate your access token',
    instruction: 'In the API section, generate a long-lived access token.',
    detail: null,
    subSteps: [
      'Click "Generate Access Token"',
      'Select the advertiser account you want to connect',
      'Copy the token — you\'ll need to paste it in the next step',
    ],
    tip: 'This token is read-only and lets NarratorHQ pull your ad performance data. It never expires.',
  },
  {
    title: 'Paste your credentials',
    instruction: 'Enter your access token and Advertiser ID below.',
    detail: 'We\'ll verify the connection before saving.',
    isTokenStep: true,
  },
]

interface Props {
  clientId: string
  onClose: () => void
}

export function TikTokTokenConnectModal({ clientId, onClose }: Props) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [token, setToken] = useState('')
  const [advertiserId, setAdvertiserId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  async function handleConnect() {
    if (!token.trim() || !advertiserId.trim()) {
      setError('Please enter both your access token and Advertiser ID.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/connections/tiktok_ads/connect-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, token: token.trim(), advertiserId: advertiserId.trim() }),
      })
      const data = await res.json() as { ok?: boolean; error?: string; accountName?: string }
      if (!res.ok) {
        setError(data.error ?? 'Connection failed. Please check your credentials and try again.')
        return
      }
      toast.success('TikTok Ads connected successfully')
      onClose()
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="font-semibold text-gray-900">Connect TikTok Ads</h2>
            <p className="text-xs text-gray-500 mt-0.5">Step {step + 1} of {STEPS.length}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-1 bg-black transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-7 w-7 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold shrink-0">
              {step + 1}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{current.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{current.instruction}</p>
            </div>
          </div>

          {current.detail && (
            <p className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">{current.detail}</p>
          )}

          {'subSteps' in current && current.subSteps && (
            <ol className="space-y-2">
              {current.subSteps.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="h-5 w-5 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          )}

          {'action' in current && current.action && (
            <a
              href={current.action.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              <ExternalLink className="h-4 w-4" />
              {current.action.label}
            </a>
          )}

          {'isTokenStep' in current && current.isTokenStep && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">Access Token</label>
                <textarea
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                  rows={3}
                  placeholder="Paste your TikTok access token here…"
                  value={token}
                  onChange={e => setToken(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">Advertiser ID</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="e.g. 7123456789012345678"
                  value={advertiserId}
                  onChange={e => setAdvertiserId(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          )}

          {'tip' in current && current.tip && (
            <div className="flex items-start gap-2 text-xs text-gray-500 bg-amber-50 border border-amber-100 rounded-lg p-3">
              <span className="text-amber-500 shrink-0">💡</span>
              {current.tip}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => step === 0 ? onClose() : setStep(s => s - 1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {step === 0 ? 'Cancel' : 'Back'}
          </Button>

          {isLast ? (
            <Button onClick={handleConnect} disabled={loading} className="bg-black hover:bg-gray-800 text-white">
              {loading ? 'Connecting…' : 'Connect TikTok Ads'}
              {!loading && <CheckCircle2 className="h-4 w-4 ml-2" />}
            </Button>
          ) : (
            <Button onClick={() => setStep(s => s + 1)}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
