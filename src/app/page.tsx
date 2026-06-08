import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Circle, Shield, AlertTriangle, BookOpen, Target, Heart, Star, Clock, Zap, TrendingUp, Brain, BarChart3, FileUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NarratorHQ — Every Client Relationship. Fully Remembered.',
  description: 'NarratorHQ remembers every goal, promise, campaign decision and stakeholder preference across every client. That context feeds automatically into every report, review and handover.',
  keywords: 'agency knowledge management, client context management, account manager handover, client reporting continuity, agency client intelligence, marketing report automation, white label reporting',
  alternates: {
    canonical: 'https://narratorhq.com',
  },
  openGraph: {
    title: 'NarratorHQ — Every Client Relationship. Fully Remembered.',
    description: 'NarratorHQ remembers every goal, promise, campaign decision and stakeholder preference across every client. That context feeds automatically into every report, review and handover.',
    url: 'https://narratorhq.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NarratorHQ — Every Client Relationship. Fully Remembered.',
    description: 'NarratorHQ remembers every goal, promise, campaign decision and stakeholder preference across every client — automatically.',
  },
}

const MEMORY_ITEMS = [
  {
    icon: Target,
    label: 'Client goals',
    desc: 'What success looks like for this specific client, referenced every month. Behind or ahead? The report says so.',
  },
  {
    icon: CheckCircle,
    label: 'Promises made',
    desc: '"We\'ll fix mobile CPA next month." The system tracks this across every future report until it\'s resolved.',
  },
  {
    icon: Brain,
    label: 'Primary KPIs',
    desc: 'This client only cares about qualified leads. Not clicks, not impressions. Every section leads with what they measure.',
  },
  {
    icon: AlertTriangle,
    label: 'What Changed',
    desc: 'Conversion tracking updated, budget cut, campaign restructured. Logged once and flagged in every report it affects.',
  },
  {
    icon: Star,
    label: 'Wins recorded',
    desc: 'CPA reduced 29% over Q1. Recorded and referenced in future reports so your agency looks brilliant, consistently.',
  },
  {
    icon: Heart,
    label: 'Sensitivities',
    desc: 'Topics to handle carefully, metrics they\'re anxious about, language they dislike. Never forgotten.',
  },
]

const COMPARISON_ROWS = [
  {
    traditional: 'Starts from scratch every month',
    narrator: 'Picks up where last month\'s report left off',
  },
  {
    traditional: 'Writer has to re-read last month\'s notes',
    narrator: 'Last month\'s promises auto-surface in this month\'s draft',
  },
  {
    traditional: 'No memory of what was promised 3 months ago',
    narrator: 'Full commitment history: "this initiative began in January..."',
  },
  {
    traditional: 'Just reports the data, no proactive recommendations',
    narrator: 'Identifies opportunities: "Search drives 82% of conversions at 54% of spend. Increase budget."',
  },
  {
    traditional: 'Bad months are written by whoever has time',
    narrator: 'Bad months explained consistently, with data and a plan',
  },
  {
    traditional: '90 minutes per client to produce the narrative',
    narrator: 'Under 10 minutes to review, edit, and approve',
  },
  {
    traditional: 'Context lives in the account manager\'s head',
    narrator: 'Context lives in the system, not in anyone\'s head. Survives staff changes.',
  },
]

const AGENCY_MEMORY_LAYER = {
  connect: [
    { label: 'GA4', desc: 'Sessions, conversions, organic performance' },
    { label: 'Google Ads', desc: 'Spend, CPA, ROAS, campaign performance' },
    { label: 'Meta Ads', desc: 'Campaign metrics, creative performance' },
    { label: 'TikTok Ads', desc: 'CPA, CTR, creative performance' },
  ],
  store: [
    'Goals & targets',
    'Promises made',
    'Decisions taken',
    'Campaign changes',
    'Stakeholder preferences',
    'Recorded wins',
    'Previous recommendations',
  ],
  generate: [
    'Monthly reports',
    'Account handover documents',
    'Quarterly reviews',
    'Client briefings',
    'QBR narratives',
  ],
}

const GUARDRAILS = [
  {
    title: 'Nothing sends without your approval',
    desc: 'Every report is a draft first. You review, edit, and approve each section before anything goes to your client.',
  },
  {
    title: 'Confidence scoring on every section',
    desc: 'Each section is rated High / Review Recommended / Low Confidence, so you know exactly where to focus your review.',
  },
  {
    title: 'Everything backed by your numbers',
    desc: 'Every statement is tied to the data provided. If something is uncertain, it\'s flagged — never presented as fact.',
  },
  {
    title: 'Edit or regenerate any section',
    desc: 'Click any sentence to rewrite it. Or regenerate with an instruction: "more cautious tone on the paid social section."',
  },
]

const PLANS = [
  { name: 'Starter', price: '£149', limit: 'Up to 5 clients', highlighted: false, roi: 'Saves ~50 hrs/mo' },
  { name: 'Growth', price: '£249', limit: 'Up to 15 clients', highlighted: true, roi: 'Saves ~150 hrs/mo' },
  { name: 'Agency', price: '£399', limit: 'Unlimited clients', highlighted: false, roi: 'Unlimited savings' },
]

const FAQ = [
  {
    q: 'Does my client see NarratorHQ branding?',
    a: 'No. Reports are sent from your agency name and email address. The PDF shows your logo and brand colour. Your client sees your work, not our tool.',
  },
  {
    q: 'How does the Agency Memory Graph work?',
    a: 'Every report you approve is stored. When the next report is generated, NarratorHQ reads the full history of commitments made and can write sentences like "This initiative began in January when we identified X. Since then, CPA has improved from £48 to £34 — a 29% reduction over four reporting periods." The longer you use it, the more longitudinal context it has. Switching to a competitor means starting that memory from zero.',
  },
  {
    q: 'Can I edit the draft before it goes out?',
    a: 'Yes, and that\'s the point. Every report comes to you as a draft first. Click any section to edit, regenerate with different instructions, or approve as written. Nothing sends without your approval.',
  },
  {
    q: 'What if it gets something wrong?',
    a: 'Every section includes a confidence score. Low-confidence sections are flagged clearly. Human review is required and there is no auto-send. The system cannot send anything without a person approving it first.',
  },
  {
    q: 'What platforms does it connect to?',
    a: 'GA4, Google Ads, Meta Ads, and TikTok Ads. Microsoft Ads and LinkedIn Ads are on the roadmap.',
  },
  {
    q: 'Can I try it without connecting my ad accounts?',
    a: 'Yes. Upload any existing client report PDF and NarratorHQ will read it, extract the KPIs, and generate a structured draft — Executive Summary, Wins, Issues, and Recommendations. It\'s the fastest way to see what the product does with a real client, before touching any OAuth connections.',
  },
  {
    q: 'Is there a minimum contract?',
    a: 'No contract, no minimum term. Monthly billing, cancel any time. Every plan includes a 14-day free trial.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'NarratorHQ',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'Client reporting automation for digital marketing agencies. Connect GA4, Google Ads, Meta, and TikTok — get white-labeled narrative reports that remember your client context and promises.',
  url: 'https://narratorhq.com',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'GBP',
    lowPrice: '149',
    highPrice: '399',
    offerCount: '3',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/"><img src="/logo.png" alt="NarratorHQ" className="h-14 w-auto" /></Link>
          <div className="flex items-center gap-4">
            <Link href="/client-memory" className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">
              Client Memory
            </Link>
            <Link href="/report-example" className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden md:block">
              Sample report
            </Link>
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start free trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Pilot exclusivity banner */}
      <div className="bg-blue-600 text-white text-center text-sm py-2.5 px-4">
        <span className="font-medium">Currently taking on 3–5 pilot agencies.</span>
        <span className="text-blue-200 ml-2">We&apos;ll onboard your first client account ourselves — free.</span>
        <Link href="/signup" className="ml-3 underline font-semibold hover:text-blue-100">
          Apply now →
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 mb-6">
          <Clock className="h-3.5 w-3.5" />
          14-day free trial · No credit card required
        </div>
        <h1 className="text-5xl font-bold text-gray-900 leading-tight tracking-tight">
          Every client relationship.<br />Fully remembered.
        </h1>
        <p className="text-xl text-gray-500 mt-5 max-w-2xl mx-auto leading-relaxed">
          NarratorHQ remembers every goal, promise, campaign decision and stakeholder preference
          across every client. That context feeds automatically into every report, review and handover.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link
            href="/signup"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-base"
          >
            Start free trial
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/demo"
            className="flex items-center gap-2 text-gray-700 border border-gray-200 bg-white px-6 py-3 rounded-lg font-semibold hover:border-gray-300 hover:bg-gray-50 transition-colors text-base"
          >
            See live demo
          </Link>
        </div>
        <p className="text-sm text-gray-400 mt-4">14 days free, then from £149/mo · No credit card required</p>
      </section>

      {/* Client Memory Panel — hero visual */}
      <section className="max-w-2xl mx-auto px-4 pb-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-semibold text-gray-900">Client Intelligence — Thornton Kitchens</span>
            </div>
            <span className="text-xs text-purple-700 bg-purple-50 border border-purple-200 rounded-full px-2.5 py-0.5 font-medium">5 items stored</span>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { label: 'Goal', color: 'bg-green-100 text-green-800', text: 'Reach 100 qualified leads/month by Q3 2026' },
              { label: 'Promise', color: 'bg-blue-100 text-blue-800', text: 'Reduce mobile CPA — currently 41% above desktop' },
              { label: 'Stakeholder', color: 'bg-violet-100 text-violet-800', text: 'MD prefers plain English — never mention impressions or CTR' },
              { label: 'Change', color: 'bg-orange-100 text-orange-800', text: 'Google Ads budget increased 20% on 14 March' },
              { label: 'Win', color: 'bg-emerald-100 text-emerald-800', text: 'Mobile CPA reduced 41% following bid modifier restructure in April' },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-3 px-5 py-3.5">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${item.color}`}>{item.label}</span>
                <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-gray-100 bg-purple-50 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-purple-600 shrink-0" />
            <p className="text-xs text-purple-800 font-medium">All 5 items referenced in this month&apos;s report — automatically</p>
          </div>
        </div>
        <p className="text-center mt-5 text-sm text-gray-500">
          Set once. Referenced every month. Survives any staff change.
          <Link href="/client-memory" className="text-blue-600 hover:underline ml-1">See how memory works →</Link>
        </p>
      </section>

      {/* What the system remembers */}
      <section className="bg-gray-50 border-y border-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What the system remembers</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              You set it once. Every report after that is written with full context of the relationship —
              not just last month&apos;s data.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MEMORY_ITEMS.map(item => (
              <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <item.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.label}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* Fifth item spans remaining */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 md:col-span-2 lg:col-span-1">
              <p className="text-sm text-blue-800 leading-relaxed font-medium">
                Context lives in the system — not in someone&apos;s head.
                When an account manager leaves, the next person picks up exactly where they left off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Promise tracking timeline */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How promise tracking works</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            When you make a commitment in a report, NarratorHQ carries it forward until it&apos;s resolved.
            Clients notice. It builds trust.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-blue-200 hidden md:block" />

            <div className="space-y-6">
              {/* Month 1 */}
              <div className="flex gap-6 items-start">
                <div className="h-16 w-16 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shrink-0 z-10 border-4 border-white shadow">
                  Month<br />1
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-5 flex-1">
                  <p className="font-semibold text-gray-900 text-sm mb-1">Promise made</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Account manager adds to standing instructions: <em className="text-blue-700">&ldquo;Mobile CPA is 34% above desktop — we&apos;ll address bid modifiers and report back next month.&rdquo;</em>
                  </p>
                </div>
              </div>

              {/* Month 2 */}
              <div className="flex gap-6 items-start">
                <div className="h-16 w-16 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center shrink-0 z-10 border-4 border-white shadow">
                  Month<br />2
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-5 flex-1">
                  <p className="font-semibold text-gray-900 text-sm mb-1">Auto-referenced in draft</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    The next report draft automatically surfaces: <em className="text-green-700">&ldquo;Following last month&apos;s commitment to address mobile CPA, bid modifiers were adjusted on 12 May. Mobile CPA has dropped from £49 to £38...&rdquo;</em>
                  </p>
                </div>
              </div>

              {/* Month 3 */}
              <div className="flex gap-6 items-start">
                <div className="h-16 w-16 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center shrink-0 z-10 border-4 border-white shadow">
                  Month<br />3
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-5 flex-1 border-green-200 bg-green-50">
                  <p className="font-semibold text-gray-900 text-sm mb-1 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Promise kept ✓
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Mobile CPA now matches desktop. The standing instruction is resolved and the report closes the loop:
                    <em className="text-green-700"> &ldquo;Mobile CPA has now reached parity with desktop — this objective is resolved.&rdquo;</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Memory Graph */}
      <section className="bg-gray-50 border-y border-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-sm text-purple-700 bg-purple-50 border border-purple-200 rounded-full px-3 py-1 mb-5">
              <Brain className="h-3.5 w-3.5" />
              The longer you use it, the smarter it gets
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Agency Memory Graph</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              NarratorHQ doesn&apos;t just remember last month. It remembers every commitment ever made —
              and can write sentences no agency account manager writes consistently.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Narrative example */}
            <div className="bg-gray-900 rounded-2xl p-6 mb-6 text-sm leading-relaxed">
              <p className="text-xs text-gray-500 mb-4 uppercase tracking-wider">April 2026 report — generated automatically</p>
              <p className="text-gray-200 leading-relaxed">
                <span className="text-purple-300">"This initiative began in January when we identified inefficient search terms driving high CPA.
                In February, following a keyword pruning exercise, CPA improved 12% to £38.
                In March, we began scaling the winning ad groups. This month, CPA has reached £34 —
                a </span><span className="text-green-300 font-semibold">29% reduction over four reporting periods</span>
                <span className="text-purple-300">, compared to the £48 baseline when the optimisation began."</span>
              </p>
              <p className="text-xs text-gray-600 mt-4">↑ No agency account manager writes this consistently across 15 clients. NarratorHQ does it automatically.</p>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-6 top-6 bottom-6 w-px bg-purple-200 hidden sm:block" />
              <div className="space-y-4">
                {[
                  { month: 'January', color: 'bg-purple-100 text-purple-800', label: 'Problem identified', text: 'Keyword pruning needed — CPA at £48, above target' },
                  { month: 'February', color: 'bg-blue-100 text-blue-800', label: 'Action taken', text: 'Keyword pruning complete. CPA dropped to £38 (–12%)' },
                  { month: 'March', color: 'bg-blue-100 text-blue-800', label: 'Scaling', text: 'Winning campaigns scaled. CPA at £36, trend positive' },
                  { month: 'April', color: 'bg-green-100 text-green-800', label: '✓ Objective achieved', text: 'CPA reaches £34 — 29% improvement from baseline' },
                ].map((item, i) => (
                  <div key={item.month} className="flex items-start gap-5">
                    <div className="h-12 w-12 rounded-full bg-white border-2 border-purple-200 text-purple-700 text-xs font-bold flex items-center justify-center shrink-0 z-10">
                      {item.month.slice(0, 3)}
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-4 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.color}`}>{item.label}</span>
                      </div>
                      <p className="text-sm text-gray-600">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center mt-6 text-sm text-gray-500">
              Switching to a competitor means starting this memory from zero.
              <span className="font-medium text-gray-700"> That&apos;s the moat.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Opportunity Engine */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 mb-5">
              <Zap className="h-3.5 w-3.5" />
              Not just reporting — advising
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Opportunity Engine
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              Every section surfaces specific, actionable opportunities — backed by the actual numbers, with the rationale shown.
            </p>
            <p className="text-gray-500 leading-relaxed mb-4">
              Your account managers look like strategists — not just reporters.
            </p>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                'Only shown when data directly supports it',
                'Includes expected impact, not just the recommendation',
                'Editable before the report is approved',
                'Based on your specific numbers — not generic advice',
              ].map(point => (
                <li key={point} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">Google Ads</span>
              <span className="ml-auto text-xs text-green-700 bg-green-50 border border-green-200 rounded px-1.5 py-0.5">High confidence</span>
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                Google Ads delivered 187 conversions at a CPA of £28.50 — down 17% from last month. ROAS improved to 4.2x.
                Search campaigns are producing 82% of all conversions at just 54% of total spend.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl overflow-hidden">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-blue-100">
                  <Zap className="h-3.5 w-3.5 text-blue-500" />
                  <p className="text-xs font-semibold text-blue-700">Opportunity identified</p>
                </div>
                <div className="px-3 py-2.5">
                  <p className="text-xs font-semibold text-blue-900">Increase search budget by 20%</p>
                  <p className="text-xs text-blue-700 mt-0.5">Search drives 82% of conversions at 54% of spend — highest efficiency channel</p>
                  <p className="text-xs text-blue-500 mt-0.5 italic">Est. +35 conversions/month at current CPA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Don't Forget Engine */}
      <section className="bg-gray-50 border-y border-gray-100 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 mb-5">
            <AlertTriangle className="h-3.5 w-3.5" />
            The thing most agencies miss
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The &ldquo;Don&apos;t Forget&rdquo; Engine</h2>
          <p className="text-gray-500 leading-relaxed mb-8 max-w-xl mx-auto">
            Recommended something three months ago that still hasn&apos;t been actioned? NarratorHQ surfaces it — every single month — until it&apos;s done.
          </p>
          <div className="bg-white border border-amber-200 rounded-xl p-5 text-left max-w-lg mx-auto">
            <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide">June 2026 — Google Ads section</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              <span className="text-amber-700 font-medium">&ldquo;The landing page recommendation first raised in March has not yet been implemented
              and remains one of the highest-impact opportunities available — estimated +18% conversion rate
              improvement based on comparable clients in this category.&rdquo;</span>
            </p>
          </div>
          <p className="text-sm text-gray-400 mt-5">This makes reports feel like a strategic account manager wrote them — not a template.</p>
        </div>
      </section>

      {/* Knowledge Loss section */}
      <section className="bg-gray-50 border-y border-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">The problem nobody talks about</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Client knowledge doesn&apos;t live in the CRM. It lives in the account manager&apos;s head.
              When they leave, it&apos;s gone.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl border border-red-200 p-6">
              <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-5">Without NarratorHQ</p>
              <div className="space-y-3">
                {[
                  'Account manager leaves — client history disappears',
                  'Promises made in January forgotten by March',
                  'New AM starts from scratch on every handover',
                  'Recommendations repeated because nobody logged them',
                  'Stakeholder preferences live in one person\'s memory',
                  'Context lives in someone\'s head and nowhere else',
                ].map(item => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="mt-0.5 h-4 w-4 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center shrink-0 font-bold">✕</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-green-300 ring-1 ring-green-100 p-6">
              <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-5">With NarratorHQ</p>
              <div className="space-y-3">
                {[
                  'Full client timeline preserved — survives any staff change',
                  'Every promise tracked until explicitly resolved',
                  'Handover takes minutes — new AM has full context on day one',
                  'Every recommendation logged and referenced in future reports',
                  'Stakeholder preferences stored and applied automatically',
                  'Context lives in the system. Not in anyone\'s head.',
                ].map(item => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-center mt-8 text-sm text-gray-500">
            <Link href="/blog/account-manager-handover" className="text-blue-600 hover:underline font-medium">
              Read the handover case study →
            </Link>
          </p>
        </div>
      </section>

      {/* Bad month — featured callout */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 mb-5">
              <AlertTriangle className="h-3.5 w-3.5" />
              The report most agencies dread
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bad months are where client relationships are won or lost.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              When numbers are down, most reports either bury it in caveats or go silent on the cause.
              Both lose client trust.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6">
              NarratorHQ explains what happened, what it means, and what you&apos;re doing about it —
              in a tone that keeps the relationship intact. Every time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/report-example"
                className="inline-flex items-center gap-2 text-sm border border-gray-200 rounded-lg px-4 py-2.5 font-medium hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                See a good month report
              </Link>
              <Link
                href="/report-example?scenario=bad"
                className="inline-flex items-center gap-2 text-sm border border-amber-300 bg-amber-50 text-amber-800 rounded-lg px-4 py-2.5 font-medium hover:bg-amber-100 transition-colors"
              >
                See a bad month report →
              </Link>
            </div>
          </div>

          {/* Bad month narrative example */}
          <div className="bg-gray-900 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2 w-2 rounded-full bg-red-400" />
              <div className="h-2 w-2 rounded-full bg-yellow-400" />
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <span className="text-xs text-gray-500 ml-2">March 2026 — difficult month</span>
            </div>
            <div className="space-y-4 text-sm leading-relaxed">
              <div>
                <span className="text-amber-400 font-semibold uppercase text-xs tracking-wider block mb-1.5">Overview</span>
                <p className="text-gray-300">March was a challenging month — organic sessions fell 14% and paid conversions dropped 19%. We want to be transparent about what happened and what we&apos;re doing about it.</p>
              </div>
              <div>
                <span className="text-amber-400 font-semibold uppercase text-xs tracking-wider block mb-1.5">What happened</span>
                <p className="text-gray-300">The drop in organic traffic is directly tied to a core update on March 5th that affected informational content in this category. Three of your top five landing pages lost significant position. We&apos;ve identified the pattern and have a content update plan in place.</p>
              </div>
              <div>
                <span className="text-amber-400 font-semibold uppercase text-xs tracking-wider block mb-1.5">What we&apos;re doing</span>
                <p className="text-gray-300">Content audit of affected pages by April 7th · Increase paid budget by 15% to cover organic shortfall while recovery happens · Weekly ranking check-ins until positions stabilise</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PDF import callout */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
              <FileUp className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full px-3 py-1 mb-3">
                No connections needed
              </div>
              <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">Already using Looker Studio, AgencyAnalytics, Whatagraph, or DashThis?</p>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Upload an existing client PDF and see the output in 60 seconds.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                If your team already exports monthly PDF reports from another tool, upload one directly. NarratorHQ reads it, extracts the KPIs, and generates a structured draft — Executive Summary, Wins, Issues, and Recommendations. No GA4, no OAuth, no reconnecting anything. Your existing report is enough to get started.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 mb-6 text-sm">
                {[
                  { label: 'Upload', desc: 'Any existing PDF report' },
                  { label: 'Read', desc: 'NarratorHQ extracts the KPIs' },
                  { label: 'Review', desc: 'Edit, approve, and send' },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-lg border border-blue-100 p-3">
                    <p className="font-semibold text-gray-900 text-xs uppercase tracking-wide mb-1">{item.label}</p>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Try it free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Memory Layer */}
      <section className="bg-gray-50 border-y border-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">The Agency Memory Layer</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Connect your data sources. Store what matters. Generate everything from reports to handovers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Connect */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mb-4">1</div>
              <h3 className="font-semibold text-gray-900 mb-3">Connect</h3>
              <div className="space-y-2">
                {AGENCY_MEMORY_LAYER.connect.map(p => (
                  <div key={p.label} className="flex items-start gap-2">
                    <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5 shrink-0">{p.label}</span>
                    <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Store */}
            <div className="bg-white rounded-xl border border-purple-200 ring-1 ring-purple-100 p-6">
              <div className="h-8 w-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center mb-4">2</div>
              <h3 className="font-semibold text-gray-900 mb-3">Store</h3>
              <div className="space-y-1.5">
                {AGENCY_MEMORY_LAYER.store.map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            {/* Generate */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="h-8 w-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center mb-4">3</div>
              <h3 className="font-semibold text-gray-900 mb-3">Generate</h3>
              <div className="space-y-1.5">
                {AGENCY_MEMORY_LAYER.generate.map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4 leading-relaxed">All of these draw from the same stored context — built once, used everywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Human review — trust section */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-gray-100 border border-gray-200 rounded-full px-3 py-1 mb-5">
            <Shield className="h-3.5 w-3.5" />
            Human review is required — always
          </div>
          <h2 className="text-3xl font-bold text-gray-900">The most important question agencies ask us</h2>
          <p className="text-xl text-gray-500 mt-4 max-w-xl mx-auto">
            &ldquo;What if it sends something wrong to my client?&rdquo;
          </p>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            It can&apos;t. Every report is a draft. You approve it. There is no exception.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {GUARDRAILS.map(g => (
            <div key={g.title} className="border border-gray-200 rounded-xl p-5 bg-white">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="h-3.5 w-3.5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{g.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{g.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Approval queue preview */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-gray-50 border border-gray-200 rounded-t-xl px-5 py-3 flex items-center justify-between border-b-0">
            <div>
              <span className="text-sm font-semibold text-gray-900">Meridian Home &amp; Garden — May 2026</span>
              <span className="text-xs text-gray-500 ml-3">6 sections</span>
            </div>
            <span className="text-xs text-gray-400">4 / 6 approved</span>
          </div>
          <div className="border border-gray-200 rounded-b-xl overflow-hidden divide-y divide-gray-100 bg-white">
            <div className="p-4 bg-green-50/50">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-sm font-semibold text-gray-900">Overview</span>
                <span className="text-xs border rounded px-1.5 py-0.5 ml-auto text-green-700 bg-green-50 border-green-200">High confidence</span>
              </div>
            </div>
            <div className="p-4 bg-green-50/50">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-sm font-semibold text-gray-900">Organic Search</span>
                <span className="text-xs border rounded px-1.5 py-0.5 ml-auto text-green-700 bg-green-50 border-green-200">High confidence</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2.5 mb-2">
                <Circle className="h-4 w-4 text-gray-300 shrink-0" />
                <span className="text-sm font-semibold text-gray-900">Paid Social</span>
                <span className="text-xs border rounded px-1.5 py-0.5 ml-auto text-yellow-700 bg-yellow-50 border-yellow-200">Review recommended</span>
              </div>
              <p className="text-sm text-gray-600 pl-6 line-clamp-1">Meta delivered 84 conversions at £42 CPA. Lifestyle creative outperformed product-only by 34%...</p>
              <div className="flex gap-1.5 mt-2 pl-6">
                <button className="text-xs text-blue-600 border border-blue-200 bg-blue-50 rounded px-2 py-0.5 cursor-default">Edit inline</button>
                <button className="text-xs text-gray-500 border border-gray-200 rounded px-2 py-0.5 cursor-default">Regenerate</button>
                <button className="text-xs text-green-600 border border-green-200 bg-green-50 rounded px-2 py-0.5 ml-auto cursor-default">Approve ✓</button>
              </div>
            </div>
            <div className="p-4 bg-gray-50 flex items-center justify-between">
              <span className="text-sm text-gray-500">4 / 6 sections approved</span>
              <button className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg font-medium opacity-40 cursor-default">Approve report</button>
            </div>
          </div>
          <p className="text-center mt-4">
            <Link href="/demo" className="text-sm text-blue-600 hover:underline">
              Try the fully interactive demo →
            </Link>
          </p>
        </div>
      </section>

      {/* Founder section */}
      <section className="bg-gray-50 border-y border-gray-100 py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="h-16 w-16 rounded-full bg-blue-600 text-white text-xl font-bold flex items-center justify-center shrink-0">
                C
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-600 mb-3">Why I built NarratorHQ</p>
                <blockquote className="text-gray-700 text-base leading-relaxed mb-4">
                  &ldquo;I watched agency account managers lose entire Fridays every month to report writing —
                  not because they were slow, but because writing a good report means holding all the
                  context in your head: what the client cares about, what was promised last month,
                  what went wrong and why. That&apos;s exhausting at 15 clients.
                </blockquote>
                <blockquote className="text-gray-700 text-base leading-relaxed mb-4">
                  The problem wasn&apos;t the writing. It was the memory.
                  NarratorHQ carries the context so the writing comes out right — every time,
                  for every client, even on a Friday afternoon with five more reports in the queue.&rdquo;
                </blockquote>
                <p className="text-sm text-gray-500 font-medium">Cameron — Founder, NarratorHQ</p>
                <p className="text-sm text-gray-400 mt-1">
                  Questions? Email me directly:{' '}
                  <a href="mailto:cameron@narratorhq.com" className="text-blue-600 hover:underline">
                    cameron@narratorhq.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White-glove onboarding CTA */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <div className="inline-flex items-center gap-2 text-sm text-blue-200 bg-blue-500/50 border border-blue-400/50 rounded-full px-3 py-1 mb-5">
            Only for the first 5 agencies
          </div>
          <h2 className="text-3xl font-bold mb-4">We&apos;ll onboard your first client account for you.</h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto mb-6 leading-relaxed">
            For the first cohort of pilot agencies, we&apos;ll personally set up your first client —
            connect the data, add the context, and walk you through the first report together.
            No learning curve. Just a working report in your hands.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Apply for pilot access
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="mailto:cameron@narratorhq.com"
              className="inline-flex items-center gap-2 text-white border border-blue-400 hover:border-blue-300 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Ask a question first
            </a>
          </div>
          <p className="text-blue-300 text-sm mt-4">14-day free trial · No credit card required · 3 spots remaining</p>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 border-y border-gray-100 py-20" id="pricing">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Simple pricing</h2>
            <p className="text-gray-500 mt-3">14-day free trial on every plan. No credit card required to start.</p>
            <p className="text-sm text-gray-400 mt-1.5">
              At £149/mo for 5 clients, you&apos;re paying £30 per client per month to reclaim 90 minutes per report.
              At £25/hr, that&apos;s a 30× return.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {PLANS.map(plan => (
              <div
                key={plan.name}
                className={`rounded-xl p-6 border ${
                  plan.highlighted
                    ? 'border-blue-500 ring-1 ring-blue-500 bg-white'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {plan.highlighted && (
                  <div className="text-xs font-semibold text-blue-600 mb-2">Most popular</div>
                )}
                <p className="font-bold text-gray-900 text-lg">{plan.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {plan.price}<span className="text-base font-normal text-gray-500">/mo</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">{plan.limit}</p>
                <p className="text-xs text-green-600 font-medium mt-1">{plan.roi}</p>
                <Link
                  href="/signup"
                  className={`mt-5 block text-center text-sm font-semibold py-2.5 rounded-lg transition-colors ${
                    plan.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  Start free trial
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Common questions</h2>
        <div className="space-y-6">
          {FAQ.map(item => (
            <div key={item.q} className="border-b border-gray-100 pb-6">
              <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Every client relationship.<br />Fully remembered.</h2>
          <p className="text-gray-400 mt-4 mb-8 leading-relaxed">
            The context that makes client reports good has always been in the account manager&apos;s head.
            Now it&apos;s in the system. It stays when people leave. 14-day trial, no credit card.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start your free trial
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/report-example"
              className="inline-flex items-center gap-2 text-gray-300 border border-gray-700 hover:border-gray-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              See a sample report
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
            <div>
              <img src="/logo.png" alt="NarratorHQ" className="h-14 w-auto mb-1" />
              <p className="text-sm text-gray-400 max-w-xs">Client reporting automation for digital marketing agencies.</p>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm text-gray-500">
              <div className="space-y-2">
                <p className="font-medium text-gray-700 text-xs uppercase tracking-wider">Product</p>
                <div className="space-y-1.5">
                  <Link href="/client-memory" className="block hover:text-gray-900 transition-colors">Client Memory</Link>
                  <Link href="/#pricing" className="block hover:text-gray-900 transition-colors">Pricing</Link>
                  <Link href="/report-example" className="block hover:text-gray-900 transition-colors">Sample report</Link>
                  <Link href="/demo" className="block hover:text-gray-900 transition-colors">Interactive demo</Link>
                  <Link href="/signup" className="block hover:text-gray-900 transition-colors">Start free trial</Link>
                  <Link href="/login" className="block hover:text-gray-900 transition-colors">Sign in</Link>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-gray-700 text-xs uppercase tracking-wider">Resources</p>
                <div className="space-y-1.5">
                  <Link href="/blog/account-manager-handover" className="block hover:text-gray-900 transition-colors">Account manager handover</Link>
                  <Link href="/blog/agency-knowledge-management" className="block hover:text-gray-900 transition-colors">Agency knowledge management</Link>
                  <Link href="/blog/client-reporting-continuity" className="block hover:text-gray-900 transition-colors">Reporting continuity</Link>
                  <Link href="/blog/how-to-automate-client-marketing-reports" className="block hover:text-gray-900 transition-colors">How to automate reports</Link>
                  <Link href="/blog/agencyanalytics-alternative" className="block hover:text-gray-900 transition-colors">AgencyAnalytics alternative</Link>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-gray-700 text-xs uppercase tracking-wider">Company</p>
                <div className="space-y-1.5">
                  <Link href="/about" className="block hover:text-gray-900 transition-colors">About</Link>
                  <Link href="/contact" className="block hover:text-gray-900 transition-colors">Contact</Link>
                  <Link href="/security" className="block hover:text-gray-900 transition-colors">Security</Link>
                  <Link href="/privacy" className="block hover:text-gray-900 transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="block hover:text-gray-900 transition-colors">Terms of Service</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 text-xs text-gray-400">
            © {new Date().getFullYear()} NarratorHQ. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
