'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { CheckCircle, Circle, RefreshCw, ChevronDown, ChevronUp, AlertTriangle, Info, X, Brain, ChevronRight, Wifi, Sparkles, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const CLIENT_MEMORY = [
  {
    type: 'kpi',
    label: 'Primary KPI',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    content: 'Qualified leads (cost per lead target: under £35). Client does not care about impressions or clicks.',
    resolved: false,
    resolvedIn: null,
    resolvedMonthsAgo: null,
  },
  {
    type: 'promise',
    label: 'Promise',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    content: 'Fix the mobile CPC issue — mobile CPA is currently 41% above desktop',
    resolved: true,
    resolvedIn: 'Google Ads',
    resolvedMonthsAgo: 1,
  },
  {
    type: 'win',
    label: 'Win',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    content: 'TikTok Ads hit sub-£40 CPA in April for the first time — 27% improvement since campaign launch in February',
    resolved: false,
    resolvedIn: null,
    resolvedMonthsAgo: null,
  },
  {
    type: 'change',
    label: 'What Changed',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    content: 'Conversion tracking updated 15 March — pre/post comparisons for March affected by this change',
    resolved: false,
    resolvedIn: null,
    resolvedMonthsAgo: null,
  },
  {
    type: 'sensitivity',
    label: 'Sensitivity',
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    content: 'Client hates jargon — always use plain English, explain any acronyms',
    resolved: false,
    resolvedIn: null,
    resolvedMonthsAgo: null,
  },
  {
    type: 'note',
    label: 'Note',
    color: 'bg-gray-100 text-gray-700 border-gray-200',
    content: 'Decision maker is the CFO — always lead with cost per lead and ROI. Not sessions or impressions.',
    resolved: false,
    resolvedIn: null,
    resolvedMonthsAgo: null,
  },
]

const PLATFORMS = [
  { key: 'ga4', label: 'GA4', status: 'live' as const, color: 'text-orange-600 bg-orange-50 border-orange-200', dot: 'bg-orange-500' },
  { key: 'google_ads', label: 'Google Ads', status: 'live' as const, color: 'text-blue-600 bg-blue-50 border-blue-200', dot: 'bg-blue-500' },
  { key: 'meta_ads', label: 'Meta Ads', status: 'live' as const, color: 'text-indigo-600 bg-indigo-50 border-indigo-200', dot: 'bg-indigo-500' },
  { key: 'tiktok_ads', label: 'TikTok Ads', status: 'live' as const, color: 'text-gray-900 bg-gray-50 border-gray-300', dot: 'bg-gray-900' },
]

const SECTION_SOURCE: Record<string, { key: string; label: string; color: string }[]> = {
  overview: [
    { key: 'ga4', label: 'GA4', color: 'text-orange-600 bg-orange-50 border-orange-200' },
    { key: 'google_ads', label: 'Google Ads', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { key: 'meta_ads', label: 'Meta', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { key: 'tiktok_ads', label: 'TikTok', color: 'text-gray-900 bg-gray-50 border-gray-300' },
  ],
  organic: [{ key: 'ga4', label: 'GA4', color: 'text-orange-600 bg-orange-50 border-orange-200' }],
  paid_search: [{ key: 'google_ads', label: 'Google Ads', color: 'text-blue-600 bg-blue-50 border-blue-200' }],
  paid_social: [{ key: 'meta_ads', label: 'Meta', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' }],
  tiktok: [{ key: 'tiktok_ads', label: 'TikTok', color: 'text-gray-900 bg-gray-50 border-gray-300' }],
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
  supportingMetrics: string[]
  promiseKept?: string
  opportunities?: { title: string; rationale: string; expectedImpact: string }[]
}[] = [
  {
    section: 'overview',
    content: "April was Meridian's strongest month in 2026 — organic sessions up 18%, paid CPA down to £28.50, and TikTok Ads delivered its first profitable month with a CPA of £38. The content refresh across the garden furniture category drove 40% of the organic growth. One area to watch: branded search volume dipped 8% following the end of the March awareness campaign — we've outlined the plan below.",
    confidence: 'high',
    isApproved: true,
    supportingMetrics: ['Sessions +18%', 'CPA £28.50', 'ROAS 4.2x', 'TikTok CPA £38'],
  },
  {
    section: 'organic',
    content: "Organic search delivered 14,200 sessions — up 21% from March and the channel's best performance this year. The 'outdoor furniture 2026' content cluster gained significant traction, contributing 3,100 sessions. Four target keywords moved from positions 8–12 into the top 5, with 'garden sofas UK' now ranking at position 3. Conversion rate from organic held at 1.4%, generating 199 goal completions.",
    confidence: 'high',
    isApproved: true,
    supportingMetrics: ['Organic sessions 14,200', 'Position 3 for garden sofas UK', 'Conversions 199'],
  },
  {
    section: 'paid_search',
    content: "Google Ads delivered 187 conversions at a CPA of £28.50 — down from £34.20 in March, an improvement of 17%. ROAS improved to 4.2x.\n\nThis result continues a four-month improvement trend that began in January when we identified inefficient broad match terms driving high CPA. Since implementing the keyword restructure in February, CPA has improved from £48 to £28.50 — a 41% reduction over four reporting periods and well below the £35 cost-per-lead target.\n\nAs we committed last month, we applied bid modifier adjustments to mobile campaigns. Mobile CPA has improved from 41% above desktop to 23% above desktop — meaningful progress that we'll continue tightening in May.\n\nSearch campaigns are currently driving 82% of all conversions at 54% of total spend — the highest efficiency channel in the account.",
    confidence: 'high',
    isApproved: true,
    supportingMetrics: ['CPA £28.50 (-41% since Jan)', 'ROAS 4.2x', 'Spend £3,240', 'Mobile CPA improving'],
    promiseKept: 'Fix mobile CPC issue — mobile CPA is currently 41% above desktop',
    opportunities: [
      {
        title: 'Increase search budget by 20%',
        rationale: 'Search drives 82% of conversions at 54% of spend — highest efficiency channel',
        expectedImpact: 'Est. +35 conversions/month at current £28.50 CPA',
      },
    ],
  },
  {
    section: 'paid_social',
    content: "Meta delivered 84 conversions at a CPA of £42, broadly flat from March's £44. The spring creative set — lifestyle imagery of garden spaces — outperformed the product-only creative by 34% on CTR. We're scaling the lifestyle set and testing a video variant in May. Note: Meta figures reflect 7-day click attribution — direct comparison with GA4 will show different conversion counts.",
    confidence: 'medium',
    isApproved: false,
    supportingMetrics: ['CPA £42', 'Spend £1,800', 'CTR +34% on lifestyle creative'],
  },
  {
    section: 'tiktok',
    content: "TikTok Ads delivered 62 conversions at a CPA of £38 — down from £52 in March as the spring creative set gained traction. This is the first month TikTok has hit a sub-£40 CPA, making it a viable performance channel alongside Meta.\n\nThe 'garden transformation' video (15-second format) drove a CTR of 2.8%, significantly above the platform average of 1.1%. We scaled this creative mid-month and it now accounts for 68% of TikTok spend. The product carousel format underperformed and has been paused.\n\nNote: TikTok figures reflect a 7-day click, 1-day view attribution window.",
    confidence: 'high',
    isApproved: false,
    supportingMetrics: ['CPA £38 (-27%)', 'CTR 2.8%', 'Spend £1,200', '62 conversions'],
  },
  {
    section: 'anomalies',
    content: "Branded search volume dipped 8% in the second half of April, consistent with the pattern we see when above-the-line brand activity goes quiet. The March email campaign drove a branded search spike that has now normalised. This is expected and not a cause for concern — if it continues through May, we would recommend a small Display budget to maintain brand visibility.",
    confidence: 'medium',
    isApproved: false,
    supportingMetrics: ['Branded search -8%', 'Post-campaign normalisation'],
  },
  {
    section: 'next_steps',
    content: "1. Scale the TikTok 'garden transformation' video creative — test a 30-second cut by 10 May. 2. Launch the Meta video creative test by 10 May. 3. Publish three remaining articles in the outdoor furniture content cluster — expected to drive a further 1,500 organic sessions by end of May. 4. Continue mobile bid modifier work in Google Ads — mobile CPA is 23% above desktop, with room to improve through audience layering.",
    confidence: 'high',
    isApproved: false,
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

const MEMORY_TIMELINE = [
  {
    id: 'jan',
    label: 'Month 1',
    month: 'January',
    cpa: '£52',
    status: 'Goal set',
    statusColor: 'text-gray-600 bg-gray-100 border-gray-300',
    excerpt: "January was a solid month for lead volume, but CPA remains a concern at £52 — above our £45 target. The primary driver of high cost is inefficient broad match terms pulling in low-intent traffic. We have set a clear objective for Q1: get CPA below £45. We will begin with a keyword restructure in February and report back on progress.",
    highlight: null,
    annotation: null,
    memoryItems: [
      { type: 'goal', label: 'Goal', color: 'bg-green-100 text-green-800', text: 'Reduce CPA below £45 before end of Q1.' },
    ],
    memoryExplainer: "Month 1 — nothing has been referenced yet. The goal is now stored and will inform every report from here.",
  },
  {
    id: 'feb',
    label: 'Month 2',
    month: 'February',
    cpa: '£47',
    status: 'Progress made',
    statusColor: 'text-amber-700 bg-amber-50 border-amber-200',
    excerpt: "Following our January commitment to address the high CPA, the keyword restructure was completed on 8 February. CPA has improved from £52 to £47 — meaningful progress, but the £45 target is not yet achieved. We expect to reach it in March as the restructured campaigns build quality score. We will report back on this specifically next month.",
    highlight: "Following our January commitment to address the high CPA",
    annotation: "Referenced January's stored goal — automatically, without prompting",
    memoryItems: [
      { type: 'goal', label: 'Goal', color: 'bg-green-100 text-green-800', text: 'Reduce CPA below £45 before end of Q1.' },
      { type: 'promise', label: 'Promise', color: 'bg-blue-100 text-blue-800', text: 'Keyword restructure complete — targeting sub-£45 CPA by March.' },
    ],
    memoryExplainer: "NarratorHQ knew about January's goal and referenced it in the February draft. You didn't remind it — it remembered.",
  },
  {
    id: 'mar',
    label: 'Month 3',
    month: 'March',
    cpa: '£42',
    status: 'Goal achieved ✓',
    statusColor: 'text-green-700 bg-green-50 border-green-200',
    excerpt: "CPA reached £42 this month — below the £45 target we set in January for the first time. This closes the objective we committed to two months ago. The keyword restructure completed in February delivered a £10 CPA reduction from the January baseline. We have recorded this as a win and will continue optimising toward the next milestone.",
    highlight: "below the £45 target we set in January for the first time. This closes the objective we committed to two months ago.",
    annotation: "Closed the loop on January's goal — said \"two months ago\" because it knew the timeline",
    memoryItems: [
      { type: 'goal', label: 'Goal', color: 'bg-green-100 text-green-800', text: 'Reduce CPA below £45 — achieved March.' },
      { type: 'promise', label: 'Promise', color: 'bg-blue-100 text-blue-800', text: 'Keyword restructure complete — CPA target achieved.' },
      { type: 'win', label: 'Win', color: 'bg-emerald-100 text-emerald-800', text: 'CPA £42 — below £45 target, first time. March.' },
    ],
    memoryExplainer: "NarratorHQ knew the goal was set in January and the promise made in February. It closed the loop explicitly — including the months — without being told to.",
  },
  {
    id: 'jun',
    label: 'Month 6',
    month: 'June',
    cpa: '£40',
    status: '6-month memory',
    statusColor: 'text-purple-700 bg-purple-50 border-purple-200',
    excerpt: "This initiative began in January when CPA was running at £52 against a £45 target. Following the keyword restructure completed in February and the landing page improvements we proposed in March, CPA has now reached £40 — a 23% reduction over six reporting periods. What started as a flagged problem in the first report has become one of the most significant performance improvements in this account.",
    highlight: "This initiative began in January when CPA was running at £52 against a £45 target. Following the keyword restructure completed in February and the landing page improvements we proposed in March, CPA has now reached £40 — a 23% reduction over six reporting periods.",
    annotation: "Wrote the full initiative arc — start, actions, outcome, months, percentages — from 6 months of stored context",
    memoryItems: [
      { type: 'goal', label: 'Goal', color: 'bg-green-100 text-green-800', text: 'Reduce CPA below £45 — achieved March.' },
      { type: 'win', label: 'Win', color: 'bg-emerald-100 text-emerald-800', text: 'CPA £42 — below £45 target, first time. March.' },
      { type: 'promise', label: 'Promise', color: 'bg-blue-100 text-blue-800', text: 'Landing page improvements proposed March — referenced June.' },
      { type: 'win', label: 'Win', color: 'bg-emerald-100 text-emerald-800', text: 'CPA £40 — 23% reduction from January baseline.' },
    ],
    memoryExplainer: "No account manager writes this consistently across 15 clients. NarratorHQ read 6 months of approved reports and wrote the full initiative arc — specific months, specific numbers, specific actions — automatically.",
  },
]

function WithHighlight({ text, highlight }: { text: string; highlight: string | null }) {
  if (!highlight) return <span className="text-gray-300">{text}</span>
  const idx = text.indexOf(highlight)
  if (idx === -1) return <span className="text-gray-300">{text}</span>
  return (
    <>
      <span className="text-gray-300">{text.slice(0, idx)}</span>
      <mark className="bg-purple-500/30 text-purple-200 rounded px-0.5 not-italic">{highlight}</mark>
      <span className="text-gray-300">{text.slice(idx + highlight.length)}</span>
    </>
  )
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

// The "holy shit" callout — shown inside the Paid Search section
function PromiseCallout({ promise }: { promise: string }) {
  const [revealed, setRevealed] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true) },
      { threshold: 0.7 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'mb-4 rounded-lg border border-purple-200 bg-purple-50 p-3 transition-all duration-500',
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      )}
    >
      <div className="flex items-start gap-2.5">
        <Brain className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-purple-800 mb-1">NarratorHQ remembered a promise from last month</p>
          <p className="text-sm text-purple-900 italic">&ldquo;{promise}&rdquo;</p>
          <div className="flex items-center gap-1.5 mt-2">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
            <p className="text-xs font-semibold text-emerald-700">Addressed in the section below — automatically</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DemoPage() {
  const [sectionStates, setSectionStates] = useState<Record<string, { isApproved: boolean; editedContent: string | null; content: string }>>(
    Object.fromEntries(DEMO_SECTIONS.map(s => [s.section, {
      isApproved: s.isApproved,
      editedContent: null,
      content: s.content,
    }]))
  )
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [showMetrics, setShowMetrics] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [regenSection, setRegenSection] = useState<string | null>(null)
  const [memoryExpanded, setMemoryExpanded] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState('jan')

  const approvedCount = Object.values(sectionStates).filter(s => s.isApproved).length
  const allApproved = approvedCount === DEMO_SECTIONS.length

  function toggleApprove(section: string) {
    setSectionStates(prev => ({ ...prev, [section]: { ...prev[section], isApproved: !prev[section].isApproved } }))
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
      [section]: { ...prev[section], editedContent: newContent !== original ? newContent : null, content: newContent },
    }))
    setEditingSection(null)
  }

  function approveAll() {
    setSectionStates(prev => Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, { ...v, isApproved: true }])))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showSignup && <SignupPrompt onClose={() => setShowSignup(false)} />}

      {/* Demo banner */}
      <div className="bg-blue-600 text-white text-center py-2.5 text-sm font-medium">
        Interactive demo — edits are local only.{' '}
        <Link href="/signup" className="underline hover:no-underline font-semibold">Start your free trial →</Link>
      </div>

      {/* Nav */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/"><img src="/logo.png" alt="NarratorHQ" className="h-14 w-auto" /></Link>
          <Link href="/signup" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Start free trial
          </Link>
        </div>
      </nav>

      {/* ── CLIENT MEMORY PANEL — first thing users see ── */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-7">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 rounded-full px-3 py-1 mb-4">
              <Brain className="h-3.5 w-3.5" />
              Client Intelligence
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">This is what NarratorHQ stores for every client</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Set once. Used in every report, review and handover — automatically.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-semibold text-gray-900">Meridian Home &amp; Garden — Client Memory</span>
              </div>
              <span className="text-xs text-purple-700 bg-purple-50 border border-purple-200 rounded-full px-2.5 py-0.5 font-medium">5 items active</span>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                { label: 'Goal', color: 'bg-green-100 text-green-800', text: 'Reach 100 qualified leads/month by Q2 2026' },
                { label: 'Promise', color: 'bg-blue-100 text-blue-800', text: 'Reduce mobile CPA — currently 41% above desktop' },
                { label: 'Stakeholder', color: 'bg-violet-100 text-violet-800', text: 'CFO prefers plain English — never mention CTR or impressions' },
                { label: 'Change', color: 'bg-orange-100 text-orange-800', text: 'Google Ads budget increased 20% on 14 March' },
                { label: 'Win', color: 'bg-emerald-100 text-emerald-800', text: 'Mobile CPA reduced 41% following bid modifier restructure' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3 px-5 py-3.5">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${item.color}`}>{item.label}</span>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-gray-100 bg-purple-50 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-purple-600 shrink-0" />
              <p className="text-xs text-purple-800 font-medium">All 5 items referenced in this month&apos;s report — automatically, without prompting</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT MEMORY TIMELINE ── */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4">

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 rounded-full px-3 py-1 mb-4">
              <Brain className="h-3.5 w-3.5" />
              Client Memory in action
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Watch how 6 months of memory changes the writing</h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">
              Hartley Bathrooms. One CPA goal set in January. Click through the months and watch how NarratorHQ remembers, tracks, and references it — automatically.
            </p>
          </div>

          {/* CPA journey */}
          <div className="flex items-center justify-center gap-2 mb-7">
            {MEMORY_TIMELINE.map((m, i) => (
              <div key={m.id} className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedMonth(m.id)}
                  className={cn(
                    'flex flex-col items-center px-4 py-2.5 rounded-xl border transition-all text-center',
                    selectedMonth === m.id
                      ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  )}
                >
                  <span className={cn('text-lg font-bold', selectedMonth === m.id ? 'text-white' : 'text-gray-900')}>{m.cpa}</span>
                  <span className={cn('text-xs', selectedMonth === m.id ? 'text-gray-300' : 'text-gray-500')}>{m.month}</span>
                </button>
                {i < MEMORY_TIMELINE.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-gray-300 shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Active month */}
          {MEMORY_TIMELINE.filter(m => m.id === selectedMonth).map(m => (
            <div key={m.id} className="grid md:grid-cols-5 gap-4">

              {/* Report excerpt */}
              <div className="md:col-span-3 bg-gray-900 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Hartley Bathrooms — {m.month} 2026</p>
                    <p className="text-xs text-gray-600">Google Ads · AI-generated draft</p>
                  </div>
                  <span className={cn('text-xs font-semibold border rounded-full px-2.5 py-1 shrink-0', m.statusColor)}>
                    {m.status}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">
                  <WithHighlight text={m.excerpt} highlight={m.highlight} />
                </p>
                {m.annotation && (
                  <div className="flex items-start gap-2 mt-4 pt-4 border-t border-gray-800">
                    <Brain className="h-3.5 w-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-purple-400 leading-relaxed">{m.annotation}</p>
                  </div>
                )}
              </div>

              {/* Memory panel */}
              <div className="md:col-span-2 flex flex-col gap-3">
                <div className="bg-white border border-gray-200 rounded-2xl p-4 flex-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Stored in memory</p>
                  <div className="space-y-2">
                    {m.memoryItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className={cn('text-xs font-medium px-1.5 py-0.5 rounded shrink-0', item.color)}>{item.label}</span>
                        <p className="text-xs text-gray-600 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
                  <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider mb-2">What this enabled</p>
                  <p className="text-xs text-purple-800 leading-relaxed">{m.memoryExplainer}</p>
                </div>
              </div>

            </div>
          ))}

          <p className="text-center text-sm text-gray-500 mt-7">
            No agency account manager writes this consistently across 15 clients every month.
            <Link href="/signup" className="text-blue-600 hover:underline ml-1 font-medium">Start your free trial →</Link>
          </p>
        </div>
      </section>

      {/* ── APPROVAL QUEUE DEMO ── */}
      <div className="bg-blue-600 text-white text-center py-2.5 text-sm font-medium">
        Now see how you review and approve in minutes
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">

        {/* Connected sources — compact */}
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3 flex-wrap">
          <Wifi className="h-4 w-4 text-green-500 shrink-0" />
          <span className="text-sm font-semibold text-gray-900">Data sources</span>
          {PLATFORMS.map(p => (
            <span key={p.key} className={`flex items-center gap-1.5 text-xs border rounded-full px-2.5 py-1 font-medium ${p.color}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${p.dot}`} />
              {p.label}
            </span>
          ))}
          <span className="text-xs text-gray-400 ml-auto">Last sync: 2 min ago</span>
        </div>

        {/* Report header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">Demo Report · April 2026</p>
            <h1 className="text-xl font-bold text-gray-900">Meridian Home &amp; Garden</h1>
            <p className="text-sm text-gray-500 mt-0.5">{DEMO_SECTIONS.length} sections · Generated in 28 seconds</p>
            <p className="text-xs text-purple-600 mt-1.5 flex items-center gap-1">
              <Brain className="h-3 w-3" />
              6 memory items used · 4-month CPA history referenced · 1 opportunity identified
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm text-gray-500">{approvedCount}/{DEMO_SECTIONS.length} approved</span>
            {allApproved ? (
              <button onClick={() => setShowSignup(true)} className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Send to client
              </button>
            ) : (
              <button disabled className="text-sm bg-gray-100 text-gray-400 px-4 py-2 rounded-lg font-medium cursor-not-allowed">
                Approve report
              </button>
            )}
          </div>
        </div>

        {/* ── CLIENT MEMORY PANEL ── */}
        {/* Collapsed by default — teases 1 promise. Opens to show all 4 items. */}
        <div className={cn(
          'rounded-xl border overflow-hidden transition-all',
          memoryExpanded ? 'border-purple-300 bg-purple-50' : 'border-purple-200 bg-purple-50 hover:border-purple-300'
        )}>
          <button
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
            onClick={() => setMemoryExpanded(v => !v)}
          >
            <Brain className="h-4 w-4 text-purple-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-purple-900">
                What this AI remembered about Meridian
              </span>
              {!memoryExpanded && (
                <span className="ml-2 text-xs text-purple-500">
                  6 items · KPIs, promises, wins, changes
                </span>
              )}
            </div>
            <ChevronRight className={cn('h-4 w-4 text-purple-400 transition-transform shrink-0', memoryExpanded && 'rotate-90')} />
          </button>

          {memoryExpanded && (
            <div className="px-4 pb-4 space-y-2 border-t border-purple-200">
              <p className="text-xs text-purple-600 pt-3 pb-1">
                These items were stored from previous reports. NarratorHQ reads all of this before writing every section. Nothing slips through the cracks.
              </p>
              {CLIENT_MEMORY.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-white rounded-lg p-3 border border-purple-100">
                  <span className={`text-xs font-semibold px-1.5 py-0.5 rounded border shrink-0 mt-0.5 ${item.color}`}>
                    {item.label}
                  </span>
                  <p className="text-sm text-gray-700 flex-1">{item.content}</p>
                  {item.resolved && (
                    <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5 shrink-0 flex items-center gap-1 mt-0.5 whitespace-nowrap">
                      <CheckCircle className="h-3 w-3" />
                      Addressed in {item.resolvedIn}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick approve */}
        {!allApproved && (
          <button onClick={approveAll} className="w-full text-sm text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 rounded-lg py-2 transition-colors bg-blue-50 hover:bg-blue-100">
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
                    className={cn('shrink-0 transition-colors', state.isApproved ? 'text-green-500' : 'text-gray-300 hover:text-gray-400')}
                    title={state.isApproved ? 'Approved — click to un-approve' : 'Click to approve'}
                  >
                    {state.isApproved ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                  </button>
                  <span className="font-semibold text-gray-900 text-sm">{SECTION_LABELS[section.section]}</span>
                  {sources.map(src => (
                    <span key={src.key} className={`text-xs border rounded px-1.5 py-0.5 font-medium ${src.color}`}>{src.label}</span>
                  ))}
                  {wasEdited && (
                    <span className="text-xs text-blue-600 bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5">Edited</span>
                  )}
                  {section.promiseKept && (
                    <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Promise addressed
                    </span>
                  )}
                  <span className={cn('text-xs border rounded px-1.5 py-0.5 ml-auto', confidence.color)}>
                    {section.confidence === 'low' && <AlertTriangle className="inline h-3 w-3 mr-1" />}
                    {section.confidence === 'medium' && <Info className="inline h-3 w-3 mr-1" />}
                    {confidence.label}
                  </span>
                </div>

                {/* Content */}
                <div className="px-4 pt-4 pb-2">
                  {/* ── THE "HOLY SHIT" MOMENT ── */}
                  {/* For the paid_search section, show the stored promise inline BEFORE the narrative */}
                  {section.promiseKept && !isEditing && (
                    <PromiseCallout promise={section.promiseKept} />
                  )}

                  {isEditing ? (
                    <div className="space-y-3">
                      <textarea
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        className="w-full min-h-[120px] text-sm text-gray-800 leading-relaxed border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                        autoFocus
                      />
                      <div className="flex gap-2 pb-2">
                        <button onClick={() => saveEdit(section.section)} className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">Save</button>
                        <button onClick={() => setEditingSection(null)} className="text-sm text-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">Cancel</button>
                        {wasEdited && (
                          <button
                            className="text-sm text-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors ml-auto"
                            onClick={() => { setSectionStates(prev => ({ ...prev, [section.section]: { ...prev[section.section], editedContent: null, content: section.content } })); setEditingSection(null) }}
                          >
                            Revert to original
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p
                      className="text-sm text-gray-700 leading-relaxed cursor-text hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors whitespace-pre-wrap mb-2"
                      onClick={() => startEdit(section.section)}
                      title="Click to edit"
                    >
                      {displayContent}
                    </p>
                  )}
                </div>

                {/* Opportunities */}
                {section.opportunities && section.opportunities.length > 0 && (
                  <div className="mx-4 mb-3 rounded-lg border border-blue-200 bg-blue-50 overflow-hidden">
                    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-blue-100">
                      <Zap className="h-3.5 w-3.5 text-blue-500" />
                      <p className="text-xs font-semibold text-blue-700">Opportunity identified</p>
                    </div>
                    {section.opportunities.map((opp, i) => (
                      <div key={i} className="px-3 py-2.5">
                        <p className="text-xs font-semibold text-blue-900">{opp.title}</p>
                        <p className="text-xs text-blue-700 mt-0.5">{opp.rationale}</p>
                        <p className="text-xs text-blue-500 mt-0.5 italic">{opp.expectedImpact}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Supporting metrics */}
                {section.supportingMetrics.length > 0 && (
                  <div className="px-4 pb-3 flex flex-wrap gap-1">
                    {section.supportingMetrics.map(m => (
                      <span key={m} className="text-xs text-gray-500 bg-gray-100 rounded px-1.5 py-0.5">{m}</span>
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
                        <button onClick={() => setShowSignup(true)} className="flex items-center gap-1.5 text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 hover:bg-gray-50 transition-colors">
                          <RefreshCw className="h-3 w-3" />Regenerate
                        </button>
                        <button onClick={() => setRegenSection(null)} className="text-sm text-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setRegenSection(section.section)} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                      <RefreshCw className="h-3 w-3" />Regenerate section
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
            Raw metrics — all sources
            {showMetrics ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showMetrics && (
            <div className="px-4 pb-4 border-t border-gray-100">
              <div className="mt-4 space-y-4">
                {[
                  { source: 'GA4', color: 'text-orange-600', metrics: [{ label: 'Total sessions', value: '24,847', change: '+18%' }, { label: 'Conversions', value: '199', change: '+22%' }, { label: 'Organic sessions', value: '14,200', change: '+21%' }, { label: 'Branded search', value: '-8%', change: '' }] },
                  { source: 'Google Ads', color: 'text-blue-600', metrics: [{ label: 'Spend', value: '£3,240', change: '' }, { label: 'Conversions', value: '187', change: '+14%' }, { label: 'CPA', value: '£28.50', change: '-17%' }, { label: 'ROAS', value: '4.2x', change: '+0.6x' }] },
                  { source: 'Meta Ads', color: 'text-indigo-600', metrics: [{ label: 'Spend', value: '£1,800', change: '' }, { label: 'Conversions', value: '84', change: '+2%' }, { label: 'CPA', value: '£42', change: '-5%' }, { label: 'CTR', value: '2.1%', change: '+34%' }] },
                  { source: 'TikTok Ads', color: 'text-gray-900', metrics: [{ label: 'Spend', value: '£1,200', change: '' }, { label: 'Conversions', value: '62', change: '+19%' }, { label: 'CPA', value: '£38', change: '-27%' }, { label: 'CTR', value: '2.8%', change: '+154%' }] },
                ].map(group => (
                  <div key={group.source}>
                    <p className={`text-xs font-semibold mb-2 ${group.color}`}>{group.source}</p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {group.metrics.map(m => (
                        <div key={m.label} className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500 mb-1">{m.label}</p>
                          <p className="text-sm font-semibold text-gray-900">{m.value}</p>
                          {m.change && <p className={cn('text-xs font-medium mt-0.5', m.change.startsWith('-') && m.label !== 'CPA' ? 'text-red-600' : 'text-green-600')}>{m.change}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PDF import callout */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">Already using Looker Studio, AgencyAnalytics, Whatagraph, or DashThis?</p>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Upload an existing PDF report and see this in 60 seconds.</h2>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            If your team already exports monthly PDF reports from another tool, you can upload one directly. NarratorHQ reads it, extracts the KPIs, and generates this exact draft structure — Executive Summary, Wins, Issues, and Recommendations. No GA4 connections, no OAuth setup. Your existing report is enough to get started.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Try it with a PDF
          </Link>
        </div>

        {/* CTA */}
        <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Ready to do this for your clients?</h2>
          <p className="text-blue-100 text-sm mb-6 max-w-sm mx-auto">
            Connect GA4, Google Ads, Meta and TikTok in minutes. Your first real report generates automatically. 14-day free trial, no credit card.
          </p>
          <Link href="/signup" className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm">
            Start free trial
          </Link>
        </div>
      </div>
    </div>
  )
}
