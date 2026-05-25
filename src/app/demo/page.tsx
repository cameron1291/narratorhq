'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { CheckCircle, Circle, RefreshCw, ChevronDown, ChevronUp, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const BRAND_COLOR = '#2563eb'

const DEMO_SECTIONS = [
  {
    section: 'overview' as const,
    content: "April was Meridian's strongest month in 2026 — organic sessions up 18% and paid CPA down to £28.50, the lowest since Q3 2025. The content refresh across the garden furniture category drove 40% of the organic growth. One area to watch: branded search volume dipped 8% following the end of the March awareness campaign — we've outlined the plan below.",
    confidence: 'high' as const,
    isApproved: true,
    editedContent: null,
    supportingMetrics: ['Sessions +18%', 'CPA £28.50', 'ROAS 4.2x'],
  },
  {
    section: 'organic' as const,
    content: "Organic search delivered 14,200 sessions — up 21% from March and the channel's best performance this year. The 'outdoor furniture 2026' content cluster gained significant traction, contributing 3,100 sessions. Four target keywords moved from positions 8–12 into the top 5, with 'garden sofas UK' now ranking at position 3. Conversion rate from organic held at 1.4%, generating 199 goal completions.",
    confidence: 'high' as const,
    isApproved: true,
    editedContent: null,
    supportingMetrics: ['Organic sessions 14,200', 'Position 3 for garden sofas UK', 'Conversions 199'],
  },
  {
    section: 'paid_search' as const,
    content: "Google Ads delivered 187 conversions at a CPA of £28.50 — down from £34.20 in March, an improvement of 17%. ROAS improved to 4.2x (from 3.6x). We cut three underperforming ad groups targeting broad match gardening terms that were generating clicks but no conversions. Budget has been reallocated to the retargeting campaign which is converting at £18 CPA.",
    confidence: 'high' as const,
    isApproved: true,
    editedContent: null,
    supportingMetrics: ['CPA £28.50 (-17%)', 'ROAS 4.2x', 'Spend £3,240'],
  },
  {
    section: 'paid_social' as const,
    content: "Meta delivered 84 conversions at a CPA of £42, broadly flat from March's £44. The spring creative set — lifestyle imagery of garden spaces — outperformed the product-only creative by 34% on CTR. We're scaling the lifestyle set and testing a video variant in May. Note: Meta figures reflect 7-day click attribution — direct comparison with GA4 will show different conversion counts.",
    confidence: 'medium' as const,
    isApproved: false,
    editedContent: null,
    supportingMetrics: ['CPA £42', 'Spend £1,800', 'CTR +34% on lifestyle creative'],
  },
  {
    section: 'anomalies' as const,
    content: "Branded search volume dipped 8% in the second half of April, consistent with the pattern we see when above-the-line brand activity goes quiet. The March email campaign drove a branded search spike that has now normalised. This is expected and not a cause for concern — if it continues through May, we would recommend a small Display budget to maintain brand visibility.",
    confidence: 'medium' as const,
    isApproved: false,
    editedContent: null,
    supportingMetrics: ['Branded search -8%', 'Post-campaign normalisation'],
  },
  {
    section: 'next_steps' as const,
    content: "1. Launch the video creative test on Meta by 10 May. 2. Publish three remaining articles in the outdoor furniture content cluster — expected to drive a further 1,500 organic sessions by end of May. 3. Apply bid modifier adjustments to mobile campaigns in Google Ads — mobile CPA is currently 23% above desktop, with room to improve through audience layering.",
    confidence: 'high' as const,
    isApproved: false,
    editedContent: null,
    supportingMetrics: ['3 actions', 'Mobile CPA 23% above desktop'],
  },
]

const SECTION_LABELS: Record<string, string> = {
  overview: 'Overview',
  organic: 'Organic',
  paid_search: 'Paid Search',
  paid_social: 'Paid Social',
  anomalies: 'Anomalies',
  next_steps: 'Next Steps',
}

const CONFIDENCE_CONFIG = {
  high: { label: 'High confidence', color: 'text-green-700 bg-green-50 border-green-200' },
  medium: { label: 'Review recommended', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
  low: { label: 'Low confidence — please review carefully', color: 'text-red-700 bg-red-50 border-red-200' },
}

interface SignupPromptProps {
  onClose: () => void
}

function SignupPrompt({ onClose }: SignupPromptProps) {
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
            Connect your GA4, Google Ads and Meta accounts. Your first real report generates in under 30 seconds.
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
          <Link href="/" className="font-bold text-gray-900 text-lg">NarratorHQ</Link>
          <Link
            href="/signup"
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start free trial
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">Demo Report</p>
            <h1 className="text-xl font-bold text-gray-900">Meridian Home & Garden</h1>
            <p className="text-sm text-gray-500 mt-0.5">April 2026 · {DEMO_SECTIONS.length} sections · Generated in 28 seconds</p>
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

            return (
              <div
                key={section.section}
                className={cn(
                  'rounded-xl border bg-white overflow-hidden transition-all',
                  state.isApproved ? 'border-green-300' : 'border-gray-200'
                )}
              >
                {/* Section header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
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

                  {wasEdited && (
                    <span className="text-xs text-blue-600 bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5">
                      Edited
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
            Raw metrics reference
            {showMetrics ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showMetrics && (
            <div className="px-4 pb-4 border-t border-gray-100">
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: 'Sessions', value: '24,847', change: '+18%' },
                  { label: 'Conversions', value: '312', change: '+22%' },
                  { label: 'Paid CPA', value: '£28.50', change: '-17%' },
                  { label: 'ROAS', value: '4.2x', change: '+0.6x' },
                  { label: 'Organic sessions', value: '14,200', change: '+21%' },
                  { label: 'Google Ads spend', value: '£3,240', change: '' },
                  { label: 'Meta spend', value: '£1,800', change: '' },
                  { label: 'Total conversions', value: '471', change: '+19%' },
                ].map(m => (
                  <div key={m.label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">{m.label}</p>
                    <p className="text-sm font-semibold text-gray-900">{m.value}</p>
                    {m.change && (
                      <p className={cn('text-xs font-medium mt-0.5', m.change.startsWith('-') && m.label !== 'Paid CPA' ? 'text-red-600' : 'text-green-600')}>
                        {m.change}
                      </p>
                    )}
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
            Connect GA4 in under 2 minutes. Your first real report generates automatically. 14-day free trial, no credit card.
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
