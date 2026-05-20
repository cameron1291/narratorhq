'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ExternalLink, ChevronRight, ChevronLeft, CheckCircle2, Copy, Check } from 'lucide-react'

const APP_ID = '2198866694213454'

const STEPS = [
  {
    title: 'Open Meta Business Manager',
    instruction: 'Go to your Meta Business Manager and navigate to System Users.',
    detail: 'System users are special accounts that let tools like NarratorHQ read your ad data without using your personal Facebook login.',
    action: {
      label: 'Open Business Manager',
      url: 'https://business.facebook.com/settings/system-users',
    },
    tip: "Make sure you're logged in as an Admin of your Business Manager.",
  },
  {
    title: 'Create a system user',
    instruction: 'Click "Add" to create a new system user.',
    detail: null,
    fields: [
      { label: 'System username', value: 'NarratorHQ' },
      { label: 'System user role', value: 'Employee' },
    ],
    tip: 'Click "Create system user" to confirm.',
  },
  {
    title: 'Add your ad account',
    instruction: 'With the NarratorHQ system user selected, click "Add assets".',
    detail: null,
    subSteps: [
      'Select "Ad accounts" from the asset type list',
      'Tick the ad account(s) you want NarratorHQ to report on',
      'Set the permission to "Analyst" (read-only)',
      'Click "Save changes"',
    ],
    tip: 'Analyst access is read-only — NarratorHQ can never modify or spend your budget.',
  },
  {
    title: 'Generate the access token',
    instruction: 'Click "Generate new token" on the system user page.',
    detail: null,
    subSteps: [
      `When asked to select an app, enter App ID: ${APP_ID}`,
      'Tick the "ads_read" permission',
      'Click "Generate token"',
      'Copy the token — it will only be shown once',
    ],
    tip: 'This token never expires, so you only need to do this once.',
    copyValue: APP_ID,
    copyLabel: 'Copy App ID',
  },
  {
    title: 'Paste your token',
    instruction: 'Paste the token you just copied from Meta below.',
    detail: 'We\'ll verify it connects to your ad account before saving.',
    isTokenStep: true,
  },
]

interface Props {
  clientId: string
  onClose: () => void
}

export function MetaTokenConnectModal({ clientId, onClose }: Props) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  async function handleConnect() {
    if (!token.trim()) {
      setError('Please paste your token first.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/connections/meta_ads/connect-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, token: token.trim() }),
      })
      const data = await res.json() as { ok?: boolean; error?: string; adAccountName?: string }
      if (!res.ok) {
        setError(data.error ?? 'Connection failed. Please try again.')
        return
      }
      onClose()
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="font-semibold text-gray-900">Connect Meta Ads</h2>
            <p className="text-xs text-gray-500 mt-0.5">Step {step + 1} of {STEPS.length}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-1 bg-blue-600 transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
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

          {'fields' in current && current.fields && (
            <div className="space-y-2">
              {current.fields.map(f => (
                <div key={f.label} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                  <span className="text-sm text-gray-500">{f.label}</span>
                  <span className="text-sm font-medium text-gray-900">{f.value}</span>
                </div>
              ))}
            </div>
          )}

          {'subSteps' in current && current.subSteps && (
            <ol className="space-y-2">
              {current.subSteps.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          )}

          {'copyValue' in current && current.copyValue && (
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <code className="text-sm font-mono text-gray-900 flex-1">{current.copyValue}</code>
              <button
                onClick={() => copyToClipboard(current.copyValue!)}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied!' : current.copyLabel}
              </button>
            </div>
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
            <div className="space-y-2">
              <textarea
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
                placeholder="Paste your Meta system user token here…"
                value={token}
                onChange={e => setToken(e.target.value)}
              />
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
            <Button onClick={handleConnect} disabled={loading}>
              {loading ? 'Connecting…' : 'Connect Meta Ads'}
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
