import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Circle, Shield, AlertTriangle, BookOpen, Target, Heart, Star, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NarratorHQ — Client Reports That Remember',
  description: 'NarratorHQ remembers your client goals, promises, and sensitivities — so every monthly report feels like it was written by someone who has been there from the start. White-labeled, human-reviewed, delivered automatically.',
  keywords: 'client reporting automation, agency reporting software, marketing report automation, automated client reports, white label reporting, GA4 reporting, Google Ads reports, Meta Ads reports',
  alternates: {
    canonical: 'https://narratorhq.com',
  },
  openGraph: {
    title: 'NarratorHQ — Client Reports That Remember',
    description: 'Most reporting tools show last month\'s numbers. NarratorHQ remembers what you promised, what you changed, and why — so every report builds on the last.',
    url: 'https://narratorhq.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NarratorHQ — Client Reports That Remember',
    description: 'Most reporting tools show last month\'s numbers. NarratorHQ remembers what you promised, what you changed, and why.',
  },
}

const MEMORY_ITEMS = [
  {
    icon: Target,
    label: 'Client goals',
    desc: 'What success looks like for this specific client — referenced every month.',
  },
  {
    icon: CheckCircle,
    label: 'Promises made',
    desc: '"We\'ll address the mobile CPA issue next month." The system tracks this and follows up automatically.',
  },
  {
    icon: Heart,
    label: 'Sensitivities',
    desc: 'Topics to handle carefully, metrics they\'re anxious about, language they dislike.',
  },
  {
    icon: BookOpen,
    label: 'Tone preference',
    desc: 'Each client relationship has a different register. Professional, conversational, data-heavy.',
  },
  {
    icon: Star,
    label: 'Strategic priorities',
    desc: 'This quarter\'s focus areas, retainer scope, active campaigns — not just the raw numbers.',
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
    traditional: 'Bad months are written by whoever has time',
    narrator: 'Bad months explained consistently — with data and a plan',
  },
  {
    traditional: 'Tone varies by account manager and how tired they are',
    narrator: 'Same strategic voice, every client, every month',
  },
  {
    traditional: '90 minutes per client to produce the narrative',
    narrator: 'Under 10 minutes to review, edit, and approve',
  },
  {
    traditional: 'Context lives in the account manager\'s head',
    narrator: 'Context lives in the system — survives staff changes',
  },
]

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Connect your client accounts',
    desc: 'Link GA4, Google Ads, Meta, and TikTok via OAuth in under 2 minutes. No manual data exports.',
  },
  {
    step: '2',
    title: 'Add client context once',
    desc: 'Set goals, sensitivities, promises, and standing instructions. The system carries these forward every month.',
  },
  {
    step: '3',
    title: 'Review the draft',
    desc: 'Each report arrives section by section. Confidence scores show where to look. Edit anything in-line.',
  },
  {
    step: '4',
    title: 'Send white-labeled',
    desc: 'White-labeled PDF and email from your agency name. Your client never sees NarratorHQ.',
  },
]

const GUARDRAILS = [
  {
    title: 'Nothing sends without your approval',
    desc: 'Every report is a draft first. You review, edit, and approve each section before anything goes to your client.',
  },
  {
    title: 'Confidence scoring on every section',
    desc: 'Each section is rated High / Review Recommended / Low Confidence — so you know where to spend your review time.',
  },
  {
    title: 'Claims grounded in actual data',
    desc: 'Every statement is backed by the numbers provided. No speculation without being flagged as such.',
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
    a: 'No. Reports are sent from your agency name and email address. The PDF shows your logo and brand colour. Your client sees your work — not our tool.',
  },
  {
    q: 'How does the "promise tracking" work?',
    a: 'When you add a standing instruction like "follow up on the mobile CPA improvement promised in March", the system carries that forward into every subsequent draft until you remove it. It\'s not magic — it\'s structured context that the system uses every time it writes.',
  },
  {
    q: 'Can I edit the draft before it goes out?',
    a: 'Yes, and that\'s the point. Every report comes to you as a draft first. Click any section to edit, regenerate with different instructions, or approve as written. Nothing sends without your approval.',
  },
  {
    q: 'What if it gets something wrong?',
    a: 'Every section includes a confidence score. Low-confidence sections are flagged clearly. Human review is required — there is no auto-send. The system can\'t send anything without a person approving it first.',
  },
  {
    q: 'What platforms does it connect to?',
    a: 'GA4, Google Ads, Meta Ads, and TikTok Ads. Microsoft Ads and LinkedIn Ads are on the roadmap.',
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
            <Link href="/report-example" className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">
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
          Reports that remember.
        </h1>
        <p className="text-xl text-gray-500 mt-5 max-w-2xl mx-auto leading-relaxed">
          Most reporting tools show last month&apos;s numbers.
          NarratorHQ remembers what you promised, what you changed, and why —
          so every report builds on the last and your clients always feel informed, not just sent data.
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

      {/* Promise kept — inline demo mockup */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
          {/* Window chrome */}
          <div className="bg-gray-800 px-5 py-3 flex items-center gap-2 border-b border-gray-700">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="text-xs text-gray-500 ml-3">May 2026 Report — Thornton Kitchens</span>
          </div>

          <div className="p-8 space-y-6 text-sm leading-relaxed">
            {/* Overview section */}
            <div>
              <span className="text-blue-400 font-semibold uppercase text-xs tracking-wider block mb-2">Overview</span>
              <p className="text-gray-300">
                May was a strong month across the board — organic sessions up 22% and paid CPA fell to £31,
                the lowest since we launched the Google Ads restructure in February. The kitchen renovation
                content cluster we prioritised in Q1 is now the top converting entry point on the site.
              </p>
            </div>

            {/* Promise kept callout */}
            <div className="bg-green-900/40 border border-green-700/50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-300 font-semibold text-sm mb-1">Promise kept ✓</p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    In April&apos;s report we committed to addressing mobile CPA, which was running 34% above desktop.
                    This month, mobile CPA dropped from £49 to £38 following bid modifier adjustments —
                    still above desktop but trending in the right direction. We&apos;ll continue optimising in June.
                  </p>
                </div>
              </div>
            </div>

            {/* Next steps */}
            <div>
              <span className="text-blue-400 font-semibold uppercase text-xs tracking-wider block mb-2">What we&apos;re doing next</span>
              <p className="text-gray-300">
                Continue scaling the content cluster · Expand the Display awareness campaign into the 35–54 demographic ·
                Review branded search volume — down 6% for the second month running, which warrants a dedicated campaign
              </p>
            </div>

            {/* Confidence + approval row */}
            <div className="flex items-center justify-between border-t border-gray-700 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-green-400 bg-green-900/50 border border-green-700/50 rounded px-2 py-0.5">High confidence</span>
                <span className="text-xs text-gray-600">Backed by GA4 + Google Ads data</span>
              </div>
              <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg font-medium cursor-default">Approve section ✓</button>
            </div>
          </div>
        </div>

        <p className="text-center mt-5 text-sm text-gray-500">
          The <span className="text-green-600 font-medium">Promise kept ✓</span> block was generated automatically — the system remembered what was written in April.
          <Link href="/demo" className="text-blue-600 hover:underline ml-1">Try the live demo →</Link>
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

      {/* Why agencies switch */}
      <section className="bg-gray-50 border-y border-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why agencies switch to NarratorHQ</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              The problem isn&apos;t finding the data. It&apos;s carrying the context.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Traditional reporting</p>
              <div className="space-y-3">
                {COMPARISON_ROWS.map(row => (
                  <div key={row.traditional} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="mt-0.5 h-4 w-4 rounded-full bg-red-100 text-red-600 text-xs flex items-center justify-center shrink-0 font-bold">✕</span>
                    {row.traditional}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-blue-300 ring-1 ring-blue-100 p-5">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-4">NarratorHQ</p>
              <div className="space-y-3">
                {COMPARISON_ROWS.map(row => (
                  <div key={row.narrator} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    {row.narrator}
                  </div>
                ))}
              </div>
            </div>
          </div>
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
          <h2 className="text-3xl font-bold text-white">Reports that remember.<br />Clients who stay.</h2>
          <p className="text-gray-400 mt-4 mb-8 leading-relaxed">
            The context that makes client reports good has always been in the account manager&apos;s head.
            Now it&apos;s in the system. 14-day trial, no credit card.
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
                  <Link href="/blog/how-to-automate-client-marketing-reports" className="block hover:text-gray-900 transition-colors">How to automate reports</Link>
                  <Link href="/blog/agencyanalytics-alternative" className="block hover:text-gray-900 transition-colors">AgencyAnalytics alternative</Link>
                  <Link href="/blog/dashthis-alternative" className="block hover:text-gray-900 transition-colors">DashThis alternative</Link>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-gray-700 text-xs uppercase tracking-wider">Company</p>
                <div className="space-y-1.5">
                  <Link href="/about" className="block hover:text-gray-900 transition-colors">About</Link>
                  <Link href="/privacy" className="block hover:text-gray-900 transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="block hover:text-gray-900 transition-colors">Terms of Service</Link>
                  <a href="mailto:cameron@narratorhq.com" className="block hover:text-gray-900 transition-colors">Contact</a>
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
