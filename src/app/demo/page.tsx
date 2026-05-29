'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Circle, RefreshCw, ChevronDown, ChevronUp, AlertTriangle, Info, X, Brain, ChevronRight, Wifi } from 'lucide-react'
import { cn } from '@/lib/utils'

const BRAND_COLOR = '#2563eb'

const CLIENT_MEMORY = [
  {
    type: 'promise',
    label: 'Promise',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    content: 'Fix the mobile CPC issue — mobile CPA is currently 41% above desktop',
    resolved: true,
    resolvedIn: 'Paid Search',
  },
  {
    type: 'goal',
    label: 'Goal',
    color: 'bg-green-100 text-green-800 border-green-200',
    content: '100 qualified leads per month by end of Q2 2026',
    resolved: false,
    resolvedIn: null,
  },
  {
    type: 'sensitivity',
    label: 'Sensitivity',
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    content: 'Client hates jargon — always use plain English, explain any acronyms',
    resolved: false,
    resolvedIn: null,
  },
  {
    type: 'note',
    label: 'Note',
    color: 'bg-gray-100 text-gray-700 border-gray-200',
    content: 'Decision maker is the CFO, not the marketing lead — always lead with ROI and business outcomes',
    resolved: false,
    resolvedIn: null,
  },
]

const PLATFORMS = [
  {
    key: 'ga4',
    label: 'Google Analytics 4',
    shortLabel: 'GA4',
    status: 'live' as const,
    lastSync: '2 min ago',
    color: 'text-orange-600 bg-orange-50 border-orange-200',
    dot: 'bg-orange-500',
  },
  {
    key: 'google_ads',
    label: 'Google Ads',
    shortLabel: 'Google Ads',
    status: 'live' as const,
    lastSync: '2 min ago',
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    dot: 'bg-blue-500',
  },
  {
    key: 'meta_ads',
    label: 'Meta Ads',
    shortLabel: 'Meta Ads',
    status: 'live' as const,
    lastSync: '2 min ago',
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    dot: 'bg-indigo-500',
  },
  {
    key: 'tiktok_ads',
    label: 'TikTok Ads',
    shortLabel: 'TikTok Ads',
    status: 'live' as const,
    lastSync: '2 min ago',
    color: 'text-gray-900 bg-gray-50 border-gray-300',
    dot: 'bg-gray-900',
  },
  {
    key: 'microsoft_ads',
    label: 'Microsoft Ads',
    shortLabel: 'Microsoft Ads',
    status: 'soon' as const,
    lastSync: null,
    color: 'text-gray-400 bg-gray-50 border-gray-200',
    dot: 'bg-gray-300',
  },
  {
    key: 'linkedin_ads',
    label: 'LinkedIn Ads',
    shortLabel: 'LinkedIn Ads',
    status: 'soon' as const,
    lastSync: null,
    color: 'text-gray-400 bg-gray-50 border-gray-200',
    dot: 'bg-gray-300',
  },
]

const SECTION_SOURCE: Record<string, { key: string; label: string; color: string }[]> = {
  overview: [
    { key: 'ga4', label: 'GA4', color: 'text-orange-600 bg-orange-50 border-orange-200' },
    { key: 'google_ads', label: 'Google Ads', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { key: 'meta_ads', label: 'Meta', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { key: 'tiktok_ads', label: 'TikTok', color: 'text-gray-900 bg-gray-50 border-gray-300' },
  ],
  organic: [
    { key: 'ga4', label: 'GA4', color: 'text-orange-600 bg-orange-50 border-orange-200' },
  ],
  paid_search: [
    { key: 'google_ads', label: 'Google Ads', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  ],
  paid_social: [
    { key: 'meta_ads', label: 'Meta', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  ],
  tiktok: [
    { key: 'tiktok_ads', label: 'TikTok', color: 'text-gray-900 bg-gray-50 border-gray-300' },
  ],
  anomalies: [
    { key: 'ga4', label: 'GA4', color: 'text-orange-600 bg-orange-50 border-orange-200' },
    { key: 'google_ads', label: 'Google Ads', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  ],
  next_steps: [],
}

const DEMO_SECTIONS: {
  section: string
  content: string
  confidence: 'high' | 'medium' | 'low'
  isApproved: boolean
  editedContent: string | null
  supportingMetrics: string[]
  promiseKept?: string
}[] = [
  {
    section: 'overview',
    content: "April was Meridian's strongest month in 2026 — organic sessions up 18%, paid CPA down to £28.50, and TikTok Ads delivered its first profitable month with a CPA of £38. The content refresh across the garden furniture category drove 40% of the organic growth. One area to watch: branded search volume dipped 8% following the end of the March awareness campaign — we've outlined the plan below.",
    confidence: 'high',
    isApproved: true,
    editedContent: null,
    supportingMetrics: ['Sessions +18%', 'CPA £28.50', 'ROAS 4.2x', 'TikTok CPA £38'],
  },
  {
    section: 'organic',
    content: "Organic search delivered 14,200 sessions — up 21% from March and the channel's best performance this year. The 'outdoor furniture 2026' content cluster gained significant traction, contributing 3,100 sessions. Four target keywords moved from positions 8–12 into the top 5, with 'garden sofas UK' now ranking at position 3. Conversion rate from organic held at 1.4%, generating 199 goal completions.",
    confidence: 'high',
    isApproved: true,
    editedContent: null,
    supportingMetrics: ['Organic sessions 14,200', 'Position 3 for garden sofas UK', 'Conversions 199'],
  },
  {
    section: 'paid_search',
    content: "Google Ads delivered 187 conversions at a CPA of £28.50 — down from £34.20 in March, an improvement of 17%. ROAS improved to 4.2x (from 3.6x).\n\nAs we committed last month, we applied bid modifier adjustments to mobile campaigns. Mobile CPA has improved from 41% above desktop to 23% above desktop — meaningful progress, and we'll continue tightening this in May.\n\nWe also cut three underperforming ad groups targeting broad match gardening terms that were generating clicks but no conversions. That budget has been reallocated to the retargeting campaign, which is now converting at a CPA of £18.",
    confidence: 'high',
    isApproved: true,
    editedContent: null,
    supportingMetrics: ['CPA £28.50 (-17%)', 'ROAS 4.2x', 'Spend £3,240', 'Mobile CPA improved'],
    promiseKept: 'Fix mobile CPC issue',
  },
  {
    section: 'paid_social',
    content: "Meta delivered 84 conversions at a CPA of £42, broadly flat from March's £44. The spring creative set — lifestyle imagery of garden spaces — outperformed the product-only creative by 34% on CTR. We're scaling the lifestyle set and testing a video variant in May. Note: Meta figures reflect 7-day click attribution — direct comparison with GA4 will show different conversion counts.",
    confidence: 'medium',
    isApproved: false,
    editedContent: null,
    supportingMetrics: ['CPA £42', 'Spend £1,800', 'CTR +34% on lifestyle creative'],
  },
  {
    section: 'tiktok',
    content: "TikTok Ads delivered 62 conversions at a CPA of £38 — down from £52 in March as the spring creative set gained traction. This is the first month TikTok has hit a sub-£40 CPA, making it a viable performance channel alongside Meta.\n\nThe 'garden transformation' video (15-second format) drove a CTR of 2.8%, significantly above the platform average of 1.1%. We scaled this creative mid-month and it now accounts for 68% of TikTok spend. The product carousel format underperformed and has been paused.\n\nNote: TikTok figures reflect a 7-day click, 1-day view attribution window.",
    confidence: 'high',
    isApproved: false,
    editedContent: null,
    supportingMetrics: ['CPA £38 (-27%)', 'CTR 2.8%', 'Spend £1,200', '62 conversions'],
  },
  {
    section: 'anomalies',
    content: "Branded search volume dipped 8% in the second half of April, consistent with the pattern we see when above-the-line brand activity goes quiet. The March email campaign drove a branded search spike that has now normalised. This is expected and not a cause for concern — if it continues through May, we would recommend a small Display budget to maintain brand visibility.",
    confidence: 'medium',
    isApproved: false,
    editedContent: null,
    supportingMetrics: ['Branded search -8%', 'Post-campaign normalisation'],
  },
  {
    section: 'next_steps',
    content: "1. Scale the TikTok 'garden transformation' video creative — test a 30-second cut by 10 May. 2. Launch the Meta video creative test by 10 May. 3. Publish three remaining articles in the outdoor furniture content cluster — expected to drive a further 1,500 organic sessions by end of May. 4. Continue mobile bid modifier work in Google Ads — mobile CPA is 23% above desktop, with room to improve through audience layering.",
    confidence: 'high',
    isApproved: false,
    editedContent: null,
    supportingMetrics: ['4 actions', 'Mobile CPA 23% above desktop'],
  },
]

const SECTION_LABELS: Record<string, string> = {
  overview: 'Overview',
  organic: 'Organic Search',
  paid_search: 'Google Ads',
  paid_social: 'Meta Ads',
  tiktok: 'TikTok Ads',
  anomalies: 'Anomalies & Insights',
  next_steps: 'Next Steps',
}

const CONFIDENCE_CONFIG = {
  high: { label: 'High confidence', color: 'text-green-700 bg-green-50 border-green-200' },
  medium: { label: 'Review recommended', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
  low: { label: 'Low confidence — please review carefully', color: 'text-red-700 bg-red-50 border-red-200' },
}

function SignupPrompt({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
        <div className="text-center">
          <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to send your first report?</h2>
          <p className="text-gray-500 text-sm mb-6">
            Connect GA4, Google Ads, Meta and TikTok. Your first real report generates in under 30 seconds.
          </p>
          <Link
            href="/signup"
            className="block w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm mb-3"
          >
            Start 14-day free trial
          </Link>
          <p className="text-xs text-gray-400">No credit card required</p>
        </div>
      </div>
    </div>
  )
}

function ConnectedSourcesPanel() {
  const live = PLATFORMS.filter(p => p.status === 'live')
  const soon = PLATFORMS.filter(p => p.status === 'soon')

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
        <Wifi className="h-4 w-4 text-green-500" />
        <span className="text-sm font-semibold text-gray-900">Connected data sources</span>
        <span className="text-xs text-green-700 bg-green-50 border border-green-200 rounded-full px-2 py-0.5 ml-1">
          {live.length} live
        </span>
        <span className="text-xs text-gray-400 ml-auto">Last sync: 2 min ago</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {live.map(p => (
            <div key={p.key} className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 ${p.color}`}>
              <span className={`h-2 w-2 rounded-full shrink-0 ${p.dot} animate-pulse`} />
              <div className="min-w-0">
                <p className="text-xs font-semibold truncate">{p.shortLabel}</p>
                <p className="text-xs opacity-70">Live</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Coming soon:</span>
          {soon.map(p => (
            <span key={p.key} className="text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded px-2 py-0.5">
              {p.shortLabel}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ClientMemoryPanel() {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="rounded-xl border border-purple-200 bg-purple-50 overflow-hidden">
      <button
        className="w-full flex items-center gap-2.5 px-4 py-3 text-left hover:bg-purple-100/50 transition-colors"
        onClick={() => setExpanded(v => !v)}
      >
        <Brain className="h-4 w-4 text-purple-600 shrink-0" />
        <div className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-purple-900">Client memory — Meridian Home &amp; Garden</span>
          <span className="text-xs text-purple-600 ml-2">Fed into this report automatically</span>
        </div>
        <ChevronRight className={cn('h-4 w-4 text-purple-400 transition-transform', expanded && 'rotate-90')} />
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-2 border-t border-purple-200">
          <p className="text-xs text-purple-600 pt-3 pb-1">
            These items were stored from previous reports and conversations. The AI reads them before generating every section.
          </p>
          {CLIENT_MEMORY.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 bg-white rounded-lg p-3 border border-purple-100">
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded border shrink-0 mt-0.5 ${item.color}`}>
                {item.label}
              </span>
              <p className="text-sm text-gray-700 flex-1">{item.content}</p>
              {item.resolved && (
                <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5 shrink-0 flex items-center gap-1 mt-0.5">
                  <CheckCircle className="h-3 w-3" />
                  Addressed in {item.resolvedIn}
                </span>
              )}
            </div>
          ))}
          <p className="text-xs text-purple-500 pt-1">
            Promises, goals, sensitivities, and notes persist across every report. They&apos;re never lost when the account manager changes.
          </p>
        </div>
      )}
    </div>
  )
}

interface SectionState {
  isApproved: boolean
  editedContent: string | null
  content: string
}

export default function DemoPage() {
  const [sectionStates, setSectionStates] = useState<Record<string, SectionState>>(
    Object.fromEntries(DEMO_SECTIONS.map(s => [s.section, {
      isApproved: s.isApproved,
      editedContent: s.editedContent,
      content: s.content,
    }]))
  )
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [showMetrics, setShowMetrics] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [regenSection, setRegenSection] = useState<string | null>(null)

  const approvedCount = Object.values(sectionStates).filter(s => s.isApproved).length
  const allApproved = approvedCount === DEMO_SECTIONS.length

  function toggleApprove(section: string) {
    setSectionStates(prev => ({
      ...prev,
      [section]: { ...prev[section], isApproved: !prev[section].isApproved }
    }))
  }

  function startEdit(section: string) {
    const state = sectionStates[section]
    setEditText(state.editedContent ?? state.content)
    setEditingSection(section)
  }

  function saveEdit(section: string) {
    const original = DEMO_SECTIONS.find(s => s.section === section)!.content
    const newContent = editText.trim()
    setSectionStates(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        editedContent: newContent !== original ? newContent : null,
        content: newContent,
      }
    }))
    setEditingSection(null)
  }

  function approveAll() {
    setSectionStates(prev => Object.fromEntries(
      Object.entries(prev).map(([k, v]) => [k, { ...v, isApproved: true }])
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showSignup && <SignupPrompt onClose={() => setShowSignup(false)} />}

      {/* Demo banner */}
      <div className="bg-blue-600 text-white text-center py-2.5 text-sm font-medium">
        This is a live demo — all edits are local and not saved.{' '}
        <Link href="/signup" className="underline hover:no-underline font-semibold">
          Start your free trial →
        </Link>
      </div>

      {/* Nav */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/"><img src="/logo.png" alt="NarratorHQ" className="h-9 w-auto" /></Link>
          <Link
            href="/signup"
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start free trial
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">

        {/* Connected sources */}
        <ConnectedSourcesPanel />

        {/* Report header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">Demo Report</p>
            <h1 className="text-xl font-bold text-gray-900">Meridian Home &amp; Garden</h1>
            <p className="text-sm text-gray-500 mt-0.5">April 2026 · {DEMO_SECTIONS.length} sections · Generated in 28 seconds</p>
            <p className="text-xs text-purple-600 mt-1.5 flex items-center gap-1">
              <Brain className="h-3 w-3" />
              4 client memory items used · 1 promise referenced and resolved
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm text-gray-500">{approvedCount}/{DEMO_SECTIONS.length} approved</span>
            {allApproved ? (
              <button
                onClick={() => setShowSignup(true)}
                className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Send to client
              </button>
            ) : (
              <button
                disabled
                title="Approve all sections first"
                className="text-sm bg-gray-100 text-gray-400 px-4 py-2 rounded-lg font-medium cursor-not-allowed"
              >
                Approve report
              </button>
            )}
          </div>
        </div>

        {/* Client Memory Panel */}
        <ClientMemoryPanel />

        {/* Quick approve */}
        {!allApproved && (
          <button
            onClick={approveAll}
            className="w-full text-sm text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 rounded-lg py-2 transition-colors bg-blue-50 hover:bg-blue-100"
          >
            Approve all sections as written
          </button>
        )}

        {/* Sections */}
        <div className="space-y-4">
          {DEMO_SECTIONS.map(section => {
            const state = sectionStates[section.section]
            const confidence = CONFIDENCE_CONFIG[section.confidence]
            const isEditing = editingSection === section.section
            const wasEdited = state.editedContent !== null
            const displayContent = state.editedContent ?? state.content
            const isRegening = regenSection === section.section
            const sources = SECTION_SOURCE[section.section] ?? []

            return (
              <div
                key={section.section}
                className={cn(
                  'rounded-xl border bg-white overflow-hidden transition-all',
                  state.isApproved ? 'border-green-300' : 'border-gray-200'
                )}
              >
                {/* Section header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 flex-wrap">
                  <button
                    onClick={() => toggleApprove(section.section)}
                    className={cn(
                      'shrink-0 transition-colors',
                      state.isApproved ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'
                    )}
                    title={state.isApproved ? 'Approved — click to un-approve' : 'Click to approve'}
                  >
                    {state.isApproved
                      ? <CheckCircle className="h-5 w-5" />
                      : <Circle className="h-5 w-5" />
                    }
                  </button>

                  <span className="font-semibold text-gray-900 text-sm">
                    {SECTION_LABELS[section.section]}
                  </span>

                  {/* Platform source tags */}
                  {sources.map(src => (
                    <span key={src.key} className={`text-xs border rounded px-1.5 py-0.5 font-medium ${src.color}`}>
                      {src.label}
                    </span>
                  ))}

                  {wasEdited && (
                    <span className="text-xs text-blue-600 bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5">
                      Edited
                    </span>
                  )}

                  {section.promiseKept && (
                    <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Promise kept ✓
                    </span>
                  )}

                  <span className={cn('text-xs border rounded px-1.5 py-0.5 ml-auto', confidence.color)}>
                    {section.confidence === 'low' && <AlertTriangle className="inline h-3 w-3 mr-1" />}
                    {section.confidence === 'medium' && <Info className="inline h-3 w-3 mr-1" />}
                    {confidence.label}
                  </span>
                </div>

                {/* Content */}
                <div className="px-4 py-4">
                  {isEditing ? (
                    <div className="space-y-3">
                      <textarea
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        className="w-full min-h-[120px] text-sm text-gray-800 leading-relaxed border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveEdit(section.section)}
                          className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingSection(null)}
                          className="text-sm text-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          Cancel
                        </button>
                        {wasEdited && (
                          <button
                            className="text-sm text-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors ml-auto"
                            onClick={() => {
                              setSectionStates(prev => ({
                                ...prev,
                                [section.section]: { ...prev[section.section], editedContent: null, content: section.content }
                              }))
                              setEditingSection(null)
                            }}
                          >
                            Revert to original
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p
                      className="text-sm text-gray-700 leading-relaxed cursor-text hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors whitespace-pre-wrap"
                      onClick={() => startEdit(section.section)}
                      title="Click to edit"
                    >
                      {displayContent}
                    </p>
                  )}
                </div>

                {/* Supporting metrics */}
                {section.supportingMetrics.length > 0 && (
                  <div className="px-4 pb-3 flex flex-wrap gap-1">
                    {section.supportingMetrics.map(m => (
                      <span key={m} className="text-xs text-gray-500 bg-gray-100 rounded px-1.5 py-0.5">
                        {m}
                      </span>
                    ))}
                  </div>
                )}

                {/* Regenerate */}
                <div className="px-4 pb-3 border-t border-gray-100 pt-3">
                  {isRegening ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Optional: direction for this rewrite (e.g. 'more positive tone')"
                        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowSignup(true)}
                          className="flex items-center gap-1.5 text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <RefreshCw className="h-3 w-3" />
                          Regenerate
                        </button>
                        <button
                          onClick={() => setRegenSection(null)}
                          className="text-sm text-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setRegenSection(section.section)}
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Regenerate section
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Metrics reference */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setShowMetrics(v => !v)}
          >
            Raw metrics reference — all sources
            {showMetrics ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showMetrics && (
            <div className="px-4 pb-4 border-t border-gray-100">
              <div className="mt-4 space-y-4">
                {[
                  {
                    source: 'GA4',
                    color: 'text-orange-600',
                    metrics: [
                      { label: 'Total sessions', value: '24,847', change: '+18%' },
                      { label: 'Conversions', value: '199', change: '+22%' },
                      { label: 'Organic sessions', value: '14,200', change: '+21%' },
                      { label: 'Branded search', value: '-8%', change: '' },
                    ],
                  },
                  {
                    source: 'Google Ads',
                    color: 'text-blue-600',
                    metrics: [
                      { label: 'Spend', value: '£3,240', change: '' },
                      { label: 'Conversions', value: '187', change: '+14%' },
                      { label: 'CPA', value: '£28.50', change: '-17%' },
                      { label: 'ROAS', value: '4.2x', change: '+0.6x' },
                    ],
                  },
                  {
                    source: 'Meta Ads',
                    color: 'text-indigo-600',
                    metrics: [
                      { label: 'Spend', value: '£1,800', change: '' },
                      { label: 'Conversions', value: '84', change: '+2%' },
                      { label: 'CPA', value: '£42', change: '-5%' },
                      { label: 'CTR', value: '2.1%', change: '+34%' },
                    ],
                  },
                  {
                    source: 'TikTok Ads',
                    color: 'text-gray-900',
                    metrics: [
                      { label: 'Spend', value: '£1,200', change: '' },
                      { label: 'Conversions', value: '62', change: '+19%' },
                      { label: 'CPA', value: '£38', change: '-27%' },
                      { label: 'CTR', value: '2.8%', change: '+154%' },
                    ],
                  },
                ].map(group => (
                  <div key={group.source}>
                    <p className={`text-xs font-semibold mb-2 ${group.color}`}>{group.source}</p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {group.metrics.map(m => (
                        <div key={m.label} className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500 mb-1">{m.label}</p>
                          <p className="text-sm font-semibold text-gray-900">{m.value}</p>
                          {m.change && (
                            <p className={cn(
                              'text-xs font-medium mt-0.5',
                              m.change.startsWith('-') && !['CPA', 'Branded search'].includes(m.label)
                                ? 'text-red-600'
                                : 'text-green-600'
                            )}>
                              {m.change}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Ready to do this for your clients?</h2>
          <p className="text-blue-100 text-sm mb-6 max-w-sm mx-auto">
            Connect GA4, Google Ads, Meta and TikTok in minutes. Your first real report generates automatically. 14-day free trial, no credit card.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm"
          >
            Start free trial
          </Link>
        </div>
      </div>
    </div>
  )
}
