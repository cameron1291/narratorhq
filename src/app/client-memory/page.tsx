import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Brain, Target, Heart, Star, AlertTriangle, Users, GitBranch } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Client Memory — NarratorHQ',
  description: 'How NarratorHQ stores and uses client context across every report, review and handover. Every goal, promise, decision and stakeholder preference — remembered permanently.',
  alternates: { canonical: 'https://narratorhq.com/client-memory' },
  openGraph: {
    title: 'Client Memory — NarratorHQ',
    description: 'Every goal, promise, decision and stakeholder preference — stored permanently and used automatically in every report.',
    url: 'https://narratorhq.com/client-memory',
    type: 'website',
  },
}

const MEMORY_TYPES = [
  {
    icon: Target,
    type: 'goal',
    label: 'Goal',
    color: 'bg-green-100 text-green-800 border-green-200',
    iconColor: 'text-green-600',
    bg: 'bg-green-50',
    title: 'Client goals',
    desc: 'What the client is actually trying to achieve — not just vanity metrics. Explicitly evaluated in every report overview.',
    example: 'Reach 100 qualified leads/month by Q3 2026',
    usedIn: 'Overview section every month — "You are currently at 76 leads, 76% of the Q3 target."',
  },
  {
    icon: CheckCircle,
    type: 'promise',
    label: 'Promise',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    iconColor: 'text-blue-600',
    bg: 'bg-blue-50',
    title: 'Promises made',
    desc: 'Commitments made in previous reports. Tracked until explicitly resolved. Every future report references them.',
    example: 'Reduce mobile CPA — currently 41% above desktop',
    usedIn: '"Following our commitment last month to address mobile CPA, bid modifiers were adjusted on 12 May..."',
  },
  {
    icon: Users,
    type: 'stakeholder',
    label: 'Stakeholder',
    color: 'bg-violet-100 text-violet-800 border-violet-200',
    iconColor: 'text-violet-600',
    bg: 'bg-violet-50',
    title: 'Stakeholder preferences',
    desc: 'Who reads the report and what they care about. The report adapts its framing and metric prioritisation automatically.',
    example: 'CFO prefers plain English — always lead with cost per lead and ROI, never mention CTR or impressions',
    usedIn: 'Every section prioritises cost per lead and ROI. CTR is never mentioned. Jargon is replaced with plain language.',
  },
  {
    icon: AlertTriangle,
    type: 'change',
    label: 'Change',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    iconColor: 'text-orange-600',
    bg: 'bg-orange-50',
    title: 'Campaign changes',
    desc: 'Budget changes, tracking updates, campaign restructures. Flagged in every report that covers the affected period.',
    example: 'Google Ads budget increased 20% on 14 March — pre/post comparisons affected',
    usedIn: '"Note: budget increased 20% on 14 March. Period-over-period comparisons reflect this change."',
  },
  {
    icon: Star,
    type: 'win',
    label: 'Win',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    iconColor: 'text-emerald-600',
    bg: 'bg-emerald-50',
    title: 'Recorded wins',
    desc: 'Agency successes recorded and referenced longitudinally. Builds a narrative of consistent agency value over time.',
    example: 'Mobile CPA reduced 41% following bid modifier restructure in April',
    usedIn: '"This initiative began in January when mobile CPA was running 41% above desktop. Following the April restructure, parity has now been achieved."',
  },
  {
    icon: GitBranch,
    type: 'recommendation',
    label: 'Recommendation',
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    iconColor: 'text-amber-600',
    bg: 'bg-amber-50',
    title: 'Previous recommendations',
    desc: 'Actions recommended but not yet implemented. Surfaced every month until acted on — never quietly dropped.',
    example: 'Landing page redesign for the bathroom category recommended in March — not yet implemented',
    usedIn: '"The landing page recommendation first raised in March has not yet been implemented — this remains one of the highest-impact opportunities available."',
  },
  {
    icon: Heart,
    type: 'sensitivity',
    label: 'Sensitivity',
    color: 'bg-rose-100 text-rose-800 border-rose-200',
    iconColor: 'text-rose-600',
    bg: 'bg-rose-50',
    title: 'Sensitivities',
    desc: 'Topics to handle carefully. Metrics the client is anxious about. Language they dislike. Never forgotten.',
    example: 'Client is anxious about branded search volume — always contextualise any drops carefully',
    usedIn: 'Branded search drops are explained with full context. No raw numbers without framing.',
  },
]

const TIMELINE_MONTHS = [
  {
    month: 'January',
    color: 'bg-gray-100 text-gray-800',
    events: [
      { type: 'goal', label: 'Goal', color: 'bg-green-100 text-green-800', text: 'Reach 100 leads/month by Q3. Currently at 64.' },
      { type: 'promise', label: 'Promise', color: 'bg-blue-100 text-blue-800', text: 'Will address mobile CPA — 41% above desktop.' },
    ],
  },
  {
    month: 'February',
    color: 'bg-blue-100 text-blue-800',
    events: [
      { type: 'change', label: 'Change', color: 'bg-orange-100 text-orange-800', text: 'Budget increased 20% on 14 Feb.' },
      { type: 'win', label: 'Win', color: 'bg-emerald-100 text-emerald-800', text: 'Leads up to 81. Best month so far.' },
    ],
  },
  {
    month: 'March',
    color: 'bg-purple-100 text-purple-800',
    events: [
      { type: 'recommendation', label: 'Recommendation', color: 'bg-amber-100 text-amber-800', text: 'Landing page redesign proposed — est. +18% conversion rate.' },
      { type: 'promise', label: 'Promise kept ✓', color: 'bg-emerald-100 text-emerald-800', text: 'Mobile CPA now at parity with desktop. Resolved.' },
    ],
  },
  {
    month: 'June',
    color: 'bg-green-100 text-green-800',
    events: [
      { type: 'win', label: 'Win', color: 'bg-emerald-100 text-emerald-800', text: 'Goal achieved — 103 leads. Q3 target hit in June.' },
      { type: 'recommendation', label: 'Still open', color: 'bg-amber-100 text-amber-800', text: 'Landing page redesign still not implemented — surfaced again.' },
    ],
  },
]

export default function ClientMemoryPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/"><img src="/logo.png" alt="NarratorHQ" className="h-14 w-auto" /></Link>
          <div className="flex items-center gap-4">
            <Link href="/demo" className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">See demo</Link>
            <Link href="/signup" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Start free trial
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-purple-700 bg-purple-50 border border-purple-200 rounded-full px-3 py-1 mb-6">
            <Brain className="h-3.5 w-3.5" />
            The Agency Memory Layer
          </div>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-5">
            Every client relationship.<br />Fully remembered.
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8">
            NarratorHQ stores every goal, promise, campaign decision and stakeholder preference across every client relationship —
            and automatically uses that context in every report, review and handover you produce.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Start free trial
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/demo" className="flex items-center gap-2 text-gray-700 border border-gray-200 bg-white px-6 py-3 rounded-lg font-semibold hover:border-gray-300 hover:bg-gray-50 transition-colors">
              See it in action
            </Link>
          </div>
        </section>

        {/* What gets stored */}
        <section className="bg-gray-50 border-y border-gray-100 py-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Seven things NarratorHQ remembers</h2>
              <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                Each type is stored once and applied automatically — to reports, handovers, reviews, and briefings.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {MEMORY_TYPES.map(m => (
                <div key={m.type} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`h-9 w-9 rounded-lg ${m.bg} flex items-center justify-center shrink-0`}>
                      <m.icon className={`h-4.5 w-4.5 ${m.iconColor}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${m.color}`}>{m.label}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900">{m.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3 leading-relaxed">{m.desc}</p>
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">Example</p>
                    <p className="text-sm text-gray-700 italic">&ldquo;{m.example}&rdquo;</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">How it appears in reports</p>
                    <p className="text-sm text-blue-800 italic">&ldquo;{m.usedIn}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Timeline */}
        <section className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">The Strategic Timeline</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Every client builds a timeline of goals, decisions, wins and promises. NarratorHQ reads the full history when generating each new report.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-[2.75rem] top-8 bottom-8 w-px bg-gray-200 hidden md:block" />
            <div className="space-y-6">
              {TIMELINE_MONTHS.map(month => (
                <div key={month.month} className="flex gap-5 items-start">
                  <div className={`h-14 w-14 rounded-full text-sm font-bold flex items-center justify-center shrink-0 z-10 border-4 border-white shadow ${month.color}`}>
                    {month.month.slice(0, 3)}
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 flex-1 space-y-2">
                    {month.events.map((event, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${event.color}`}>{event.label}</span>
                        <p className="text-sm text-gray-700">{event.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 bg-purple-50 border border-purple-200 rounded-xl p-5 text-center">
            <p className="text-sm text-purple-800 leading-relaxed">
              <strong>In June, NarratorHQ writes:</strong> &ldquo;This initiative began in January when we set a target of 100 leads per month.
              Following the budget increase in February and the bid modifier work completed in March, leads have reached 103 — the Q3 target achieved three months early.
              The landing page recommendation first raised in March remains the highest-impact open opportunity.&rdquo;
            </p>
            <p className="text-xs text-purple-600 mt-2 font-medium">Written automatically — from 6 months of stored context.</p>
          </div>
        </section>

        {/* The handover case */}
        <section className="bg-gray-50 border-y border-gray-100 py-20">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10">
              <div className="inline-flex items-center gap-2 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 mb-5">
                The handover problem — solved
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                New account manager. Full context. Day one.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The most expensive thing that happens in any agency is an account manager leaving. Not because of the salary replacement cost —
                because of the client knowledge that walks out with them.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The new AM reads the last report. It tells them what happened last month. It doesn&apos;t tell them what was promised
                six months ago, what the CFO cares about, which recommendations are still outstanding, or what the client said
                on the call in March that changed the strategy.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                NarratorHQ holds all of that. When a new account manager takes over a client, they open the Intelligence tab
                and see the full history: every goal, every promise, every stakeholder preference, every decision.
                The client doesn&apos;t notice the switch. That&apos;s the point.
              </p>
              <Link
                href="/blog/account-manager-handover"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 text-sm"
              >
                Read the full handover case study
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Switching cost */}
        <section className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">The longer you use it, the harder it is to leave</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
            Every approved report adds to the memory graph. A client with 12 months of history has 12 months of goals, promises,
            decisions and wins stored. Switching tools means starting that memory from zero. That&apos;s the moat.
          </p>
          <div className="grid sm:grid-cols-3 gap-5 mb-10 text-left">
            {[
              { months: '3 months', desc: 'Goals tracked, first promises resolved, basic continuity established' },
              { months: '12 months', desc: 'Full year of context, seasonal patterns visible, longitudinal narrative writing' },
              { months: '3 years', desc: 'Every campaign, every promise, every stakeholder, every recommendation — irreplaceable' },
            ].map(item => (
              <div key={item.months} className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                <p className="font-bold text-gray-900 text-lg mb-2">{item.months}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <Link href="/signup" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Start building your agency memory
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-sm text-gray-400 mt-3">14-day free trial. No credit card required.</p>
        </section>
      </main>

      <footer className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-wrap gap-4 text-sm text-gray-400 justify-between">
          <Link href="/"><img src="/logo.png" alt="NarratorHQ" className="h-6 w-auto" /></Link>
          <div className="flex gap-4">
            <Link href="/demo" className="hover:text-gray-600 transition-colors">Demo</Link>
            <Link href="/blog/account-manager-handover" className="hover:text-gray-600 transition-colors">Handover guide</Link>
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
