import Link from 'next/link'
import { ArrowRight, CheckCircle, Zap } from 'lucide-react'

const PAIN_STATS = [
  { value: '20 hrs', label: 'average time agencies spend on client reports per month' },
  { value: '1–3 hrs', label: 'per client, per report, just writing the narrative' },
  { value: '£0', label: 'in billable revenue generated from that time' },
]

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Connect your client accounts',
    desc: 'Link GA4, Google Ads, and Meta Ads via OAuth in under 2 minutes. No manual data exports.',
  },
  {
    step: '2',
    title: 'Add client context once',
    desc: 'Set goals, sensitivities, and standing instructions. The system remembers them every month.',
  },
  {
    step: '3',
    title: 'Review and approve',
    desc: 'Each report arrives as a draft in your queue. Edit any section in-line, then approve with one click.',
  },
  {
    step: '4',
    title: 'Send to your client',
    desc: 'White-labeled PDF and email, sent from your agency name. Your client never sees NarratorHQ.',
  },
]

const PLANS = [
  { name: 'Starter', price: '£149', limit: 'Up to 5 clients', highlighted: false },
  { name: 'Growth', price: '£249', limit: 'Up to 15 clients', highlighted: true },
  { name: 'Agency', price: '£399', limit: 'Unlimited clients', highlighted: false },
]

const FEATURES = [
  'GA4, Google Ads, and Meta Ads connected',
  'AI narrative — not just a dashboard',
  'Section-level review and inline editing',
  'White-labeled PDF + email delivery',
  'Anomaly detection and explanation',
  'Client memory: goals, promises, sensitivities',
  'Scheduled reports (weekly or monthly)',
  'Team roles: owner, admin, member',
]

const FAQ = [
  {
    q: 'Does my client see NarratorHQ branding?',
    a: "No. Reports are sent from your agency name and email address. The PDF shows your logo and brand colour. Your client sees your work — not our tool.",
  },
  {
    q: 'Can I edit the AI-generated copy before it goes out?',
    a: "Yes, and that's the point. Every report comes to you as a draft first. Click any section to edit, regenerate with different instructions, or approve as written. Nothing sends without your approval.",
  },
  {
    q: 'What if the AI gets something wrong?',
    a: 'Every section is grounded in the actual data and includes a confidence score. Low-confidence sections are flagged clearly. You review every report before it goes out — there is no auto-send for new accounts.',
  },
  {
    q: 'How does it handle clients with both GA4 and Google Ads?',
    a: "All platform data is normalised to a single canonical schema before the AI sees it. Attribution differences are disclosed in the report — GA4 last-click vs Meta 7-day click+view window are never blended silently.",
  },
  {
    q: 'Is there a minimum contract?',
    a: 'No contract, no minimum term. Monthly billing, cancel any time. Every plan includes a 14-day free trial.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-bold text-lg text-gray-900">NarratorHQ</span>
          <div className="flex items-center gap-4">
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

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 mb-6">
          <Zap className="h-3.5 w-3.5" />
          14-day free trial · No credit card required
        </div>
        <h1 className="text-5xl font-bold text-gray-900 leading-tight tracking-tight">
          Stop writing client reports.<br />
          <span className="text-blue-600">Start sending them.</span>
        </h1>
        <p className="text-xl text-gray-500 mt-5 max-w-2xl mx-auto leading-relaxed">
          NarratorHQ connects to your clients&apos; GA4, Google Ads, and Meta Ads accounts,
          writes the performance narrative, and delivers white-labeled reports — so your team
          stops spending 20 hours a month on copy-paste.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link
            href="/signup"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-base"
          >
            Start free trial
            <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="text-sm text-gray-400">14 days free, then from £149/mo</span>
        </div>
      </section>

      {/* Pain stats */}
      <section className="bg-gray-50 border-y border-gray-100 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {PAIN_STATS.map(s => (
              <div key={s.value}>
                <p className="text-4xl font-bold text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What it does */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Not a dashboard. A narrative.</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Your clients don&apos;t want more charts. They want to know if their money is working
            and what you&apos;re doing about it. That&apos;s what NarratorHQ writes.
          </p>
        </div>

        {/* Example narrative */}
        <div className="bg-gray-900 rounded-2xl p-8 text-white max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="text-xs text-gray-500 ml-2">April 2025 — Thornton Kitchens</span>
          </div>
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              <span className="text-blue-400 font-semibold uppercase text-xs tracking-wider block mb-1">Overview</span>
              April was a strong month — organic sessions up 18% driven by your kitchen renovation content cluster finally gaining traction. CPA dropped from £42 to £35 as we cut two underperforming ad groups.
            </p>
            <p>
              <span className="text-blue-400 font-semibold uppercase text-xs tracking-wider block mb-1">Key observation</span>
              Branded search volume is down 8% for the second consecutive month. This typically signals a brand awareness gap following reduced Display activity. We&apos;ve drafted a campaign to address this in May.
            </p>
            <p>
              <span className="text-blue-400 font-semibold uppercase text-xs tracking-wider block mb-1">Next steps</span>
              Launch Display awareness campaign targeting in-market homeowners · Continue scaling the &apos;kitchen renovation ideas&apos; content cluster · Review mobile bid adjustments — mobile CPA is 34% above desktop
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 border-y border-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HOW_IT_WORKS.map(step => (
              <div key={step.step} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for agency account managers, not data analysts
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              The approval flow is designed to take under 5 minutes per client. Section-level editing,
              confidence indicators, one-click approve. You&apos;re in control — the system just does
              the heavy lifting.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline text-sm"
            >
              Start your free trial <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {FEATURES.map(f => (
              <div key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 border-y border-gray-100 py-20" id="pricing">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Simple pricing</h2>
            <p className="text-gray-500 mt-3">14-day free trial on every plan. No credit card required to start.</p>
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

      {/* CTA */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Stop writing. Start sending.</h2>
          <p className="text-blue-100 mt-3 mb-8">
            Join agencies that have reclaimed 20+ hours a month. 14-day trial, no credit card.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Start your free trial
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span className="font-semibold text-gray-600">NarratorHQ</span>
          <div className="flex gap-6">
            <Link href="/login" className="hover:text-gray-600 transition-colors">Sign in</Link>
            <Link href="/signup" className="hover:text-gray-600 transition-colors">Sign up</Link>
            <a href="mailto:hello@narratorhq.com" className="hover:text-gray-600 transition-colors">Contact</a>
          </div>
          <span>© {new Date().getFullYear()} NarratorHQ</span>
        </div>
      </footer>
    </div>
  )
}
