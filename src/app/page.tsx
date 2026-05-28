import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Circle, Zap, Shield, Info, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NarratorHQ — Client Reporting Automation for Digital Marketing Agencies',
  description: 'NarratorHQ automates client performance reports for digital marketing agencies. Connect GA4, Google Ads, and Meta. Get a polished, white-labeled narrative report in minutes — not hours. 14-day free trial.',
  keywords: 'client reporting automation, agency reporting software, marketing report automation, automated client reports, white label reporting, GA4 reporting, Google Ads reports, Meta Ads reports',
  alternates: {
    canonical: 'https://narratorhq.com',
  },
  openGraph: {
    title: 'NarratorHQ — Client Reporting Automation for Agencies',
    description: 'Stop spending 20 hours a month writing client reports. NarratorHQ connects to GA4, Google Ads, and Meta and writes the narrative automatically.',
    url: 'https://narratorhq.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NarratorHQ — Client Reporting Automation for Agencies',
    description: 'Stop spending 20 hours a month writing client reports. NarratorHQ connects to GA4, Google Ads, and Meta and writes the narrative automatically.',
  },
}

const PAIN_STATS = [
  { value: '20 hrs', label: 'average time agencies spend on client reports per month' },
  { value: '1–3 hrs', label: 'per client, per report, just writing the narrative' },
  { value: '£0', label: 'in billable revenue generated from that time' },
]

const BEFORE_ITEMS = [
  '90 minutes per client, every month, just writing the narrative',
  '15 clients means losing an entire working day to reports',
  'Inconsistent quality — depends who wrote it that week',
  'Explaining anomalies is the hardest part and takes the longest',
  'Reports go out late, which erodes client trust',
]

const AFTER_ITEMS = [
  'Under 10 minutes per client to review, edit, and approve',
  'First draft ready automatically — on your schedule',
  'Consistent, strategic tone across every client report',
  'Every anomaly detected and explained with data-backed reasoning',
  'Reports out the same day data is ready',
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
  { name: 'Starter', price: '£149', limit: 'Up to 5 clients', highlighted: false, roi: 'Saves ~50 hrs/mo' },
  { name: 'Growth', price: '£249', limit: 'Up to 15 clients', highlighted: true, roi: 'Saves ~150 hrs/mo' },
  { name: 'Agency', price: '£399', limit: 'Unlimited clients', highlighted: false, roi: 'Unlimited savings' },
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

const USE_CASES = [
  {
    title: 'Monthly SEO reports',
    desc: 'Sessions, rankings, content performance — explained in plain English your client can share with their board.',
  },
  {
    title: 'PPC performance updates',
    desc: 'CPA, ROAS, campaign changes — the story behind the numbers, not just the numbers.',
  },
  {
    title: 'Bad month explanations',
    desc: "The hardest report to write. NarratorHQ explains what happened and what you're doing about it without losing client confidence.",
  },
  {
    title: 'Ecommerce client reports',
    desc: 'Multi-channel attribution explained clearly — no more conflicting numbers from GA4 vs Meta going unaddressed.',
  },
  {
    title: 'Client renewals and QBRs',
    desc: "Show the value you've delivered with a narrative that references goals set at the start of the engagement.",
  },
  {
    title: 'New client onboarding',
    desc: 'Set goals, sensitivities, and reporting tone once. Every report after that reflects the relationship.',
  },
]

const GUARDRAILS = [
  {
    title: 'Nothing sends without your approval',
    desc: 'Every report is a draft first. You review, edit if needed, and approve each section before anything goes to your client.',
  },
  {
    title: 'Confidence scoring on every section',
    desc: 'Each section is rated High / Review Recommended / Low Confidence so you know exactly where to spend your review time.',
  },
  {
    title: 'Claims grounded in actual data',
    desc: 'The model is instructed to only make statements directly supported by the numbers provided. No speculation without flagging it.',
  },
  {
    title: 'Attribution differences disclosed',
    desc: 'GA4 last-click and Meta 7-day click+view are never blended silently. Attribution models are explained in every report.',
  },
  {
    title: 'Edit or regenerate any section',
    desc: 'Click any sentence to rewrite it. Or regenerate with a specific instruction: "more cautious tone on the paid social section."',
  },
  {
    title: 'Client memory keeps it accurate',
    desc: 'Goals, sensitivities, and promises are stored per client. The system knows what was said last month and references it.',
  },
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'NarratorHQ',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'Client reporting automation for digital marketing agencies. Connect GA4, Google Ads, and Meta — get white-labeled narrative reports delivered automatically.',
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
          <Link href="/" className="font-bold text-lg text-gray-900 hover:text-blue-600 transition-colors">NarratorHQ</Link>
          <div className="flex items-center gap-4">
            <Link href="/report-example" className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">
              See a sample report
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
          Your account managers are spending 20+ hours a month writing reports.
          NarratorHQ writes the first draft automatically using GA4, Google Ads, and Meta data
          — ready for approval in under 10 minutes per client.
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
            href="/sample-report"
            className="flex items-center gap-2 text-gray-700 border border-gray-200 bg-white px-6 py-3 rounded-lg font-semibold hover:border-gray-300 hover:bg-gray-50 transition-colors text-base"
          >
            Download sample report
          </Link>
        </div>
        <p className="text-sm text-gray-400 mt-4">14 days free, then from £149/mo · No credit card required</p>
      </section>

      {/* Video section — replace LOOM_URL below once recorded */}
      {/* To add: record a 90-second Loom at loom.com, paste the embed URL below */}
      {/* LOOM_URL = '' — leave empty until recorded, section auto-hides */}
      {(false) && (
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              {/* Replace with: <iframe src="LOOM_EMBED_URL" className="w-full h-full" allowFullScreen /> */}
              <p className="text-gray-500 text-sm">Video placeholder</p>
            </div>
          </div>
        </section>
      )}

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

      {/* Before / After */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">The same month. A very different Monday.</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            The reporting task doesn&apos;t go away — it just stops being something your team has to write from scratch.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-7">
            <h3 className="font-bold text-gray-900 mb-1">Without NarratorHQ</h3>
            <p className="text-sm text-red-700 mb-5 font-medium">15 clients × 90 mins = full day lost, every month</p>
            <ul className="space-y-3">
              {BEFORE_ITEMS.map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span className="mt-0.5 h-4 w-4 rounded-full bg-red-200 text-red-700 text-xs flex items-center justify-center shrink-0 font-bold">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-green-200 bg-green-50 p-7">
            <h3 className="font-bold text-gray-900 mb-1">With NarratorHQ</h3>
            <p className="text-sm text-green-700 mb-5 font-medium">15 clients × 10 mins = done before lunch</p>
            <ul className="space-y-3">
              {AFTER_ITEMS.map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What it does — narrative example */}
      <section className="bg-gray-50 border-y border-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-4">
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
              <span className="text-xs text-gray-500 ml-2">April 2026 — Thornton Kitchens</span>
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

          <p className="text-center mt-6">
            <Link href="/report-example" className="text-sm text-blue-600 hover:underline font-medium">
              See a complete example report — client view and approval queue →
            </Link>
          </p>
        </div>
      </section>

      {/* Product UI preview — the approval queue */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Your approval queue</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Every report arrives section by section. Confidence scores show where to look.
            Edit anything in-line. Approve what looks good.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Queue header */}
          <div className="bg-gray-50 border border-gray-200 rounded-t-xl px-5 py-3 flex items-center justify-between border-b-0">
            <div>
              <span className="text-sm font-semibold text-gray-900">Meridian Home &amp; Garden — April 2026</span>
              <span className="text-xs text-gray-500 ml-3">6 sections</span>
            </div>
            <span className="text-xs text-gray-400">3 / 6 approved</span>
          </div>

          <div className="border border-gray-200 rounded-b-xl overflow-hidden space-y-0 divide-y divide-gray-100 bg-white">
            {/* Approved section */}
            <div className="p-4 bg-green-50/50">
              <div className="flex items-center gap-2.5 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-sm font-semibold text-gray-900">Overview</span>
                <span className="text-xs border rounded px-1.5 py-0.5 ml-auto text-green-700 bg-green-50 border-green-200">High confidence</span>
              </div>
              <p className="text-sm text-gray-600 pl-6 leading-relaxed line-clamp-2">April was Meridian&apos;s strongest month in 2026 — organic sessions up 18% and paid CPA down to £28.50, the lowest since Q3 last year...</p>
            </div>

            {/* Approved section */}
            <div className="p-4 bg-green-50/50">
              <div className="flex items-center gap-2.5 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-sm font-semibold text-gray-900">Organic Search</span>
                <span className="text-xs border rounded px-1.5 py-0.5 ml-auto text-green-700 bg-green-50 border-green-200">High confidence</span>
              </div>
              <p className="text-sm text-gray-600 pl-6 leading-relaxed line-clamp-2">Organic search delivered 14,200 sessions — up 21% from March. &apos;garden sofas UK&apos; now ranks at position 3...</p>
            </div>

            {/* Review recommended */}
            <div className="p-4">
              <div className="flex items-center gap-2.5 mb-2">
                <Circle className="h-4 w-4 text-gray-300 shrink-0" />
                <span className="text-sm font-semibold text-gray-900">Paid Social</span>
                <span className="text-xs border rounded px-1.5 py-0.5 ml-auto text-yellow-700 bg-yellow-50 border-yellow-200">
                  <Info className="inline h-3 w-3 mr-0.5" />Review recommended
                </span>
              </div>
              <p className="text-sm text-gray-600 pl-6 leading-relaxed line-clamp-2">Meta delivered 84 conversions at £42 CPA. Lifestyle creative outperformed product-only by 34%...</p>
              <div className="flex gap-1.5 mt-2.5 pl-6">
                <button className="text-xs text-blue-600 border border-blue-200 bg-blue-50 rounded px-2 py-0.5 cursor-default">Edit inline</button>
                <button className="text-xs text-gray-500 border border-gray-200 rounded px-2 py-0.5 cursor-default">Regenerate</button>
                <button className="text-xs text-green-600 border border-green-200 bg-green-50 rounded px-2 py-0.5 ml-auto cursor-default">Approve ✓</button>
              </div>
            </div>

            {/* Low confidence */}
            <div className="p-4">
              <div className="flex items-center gap-2.5 mb-2">
                <Circle className="h-4 w-4 text-gray-300 shrink-0" />
                <span className="text-sm font-semibold text-gray-900">Anomalies</span>
                <span className="text-xs border rounded px-1.5 py-0.5 ml-auto text-red-700 bg-red-50 border-red-200">
                  <AlertTriangle className="inline h-3 w-3 mr-0.5" />Low confidence — please review
                </span>
              </div>
              <p className="text-sm text-gray-600 pl-6 leading-relaxed line-clamp-2">Branded search volume dipped 8%. We have flagged this for your attention — further context may be needed...</p>
              <div className="flex gap-1.5 mt-2.5 pl-6">
                <button className="text-xs text-blue-600 border border-blue-200 bg-blue-50 rounded px-2 py-0.5 cursor-default">Edit inline</button>
                <button className="text-xs text-gray-500 border border-gray-200 rounded px-2 py-0.5 cursor-default">Regenerate</button>
                <button className="text-xs text-green-600 border border-green-200 bg-green-50 rounded px-2 py-0.5 ml-auto cursor-default">Approve ✓</button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 flex items-center justify-between">
              <span className="text-sm text-gray-500">3 / 6 sections approved</span>
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

      {/* What agencies use this for */}
      <section className="bg-gray-50 border-y border-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What agencies use NarratorHQ for</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              If you send regular performance updates to clients, NarratorHQ handles the writing.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {USE_CASES.map(uc => (
              <div key={uc.title} className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{uc.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI guardrails / Trust */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-gray-100 border border-gray-200 rounded-full px-3 py-1 mb-5">
            <Shield className="h-3.5 w-3.5" />
            Built around human oversight
          </div>
          <h2 className="text-3xl font-bold text-gray-900">The most important question agencies ask us</h2>
          <p className="text-xl text-gray-500 mt-4 max-w-xl mx-auto">
            &ldquo;What if it sends something wrong to my client?&rdquo;
          </p>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            It can&apos;t. Here&apos;s exactly what happens between generation and send.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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

      {/* CTA */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Stop writing. Start sending.</h2>
          <p className="text-blue-100 mt-3 mb-8">
            Join agencies that have reclaimed 20+ hours a month. 14-day trial, no credit card.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Start your free trial
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/report-example"
              className="inline-flex items-center gap-2 text-white border border-blue-400 hover:border-blue-300 px-8 py-3 rounded-lg font-semibold transition-colors"
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
              <p className="font-bold text-gray-900 mb-1">NarratorHQ</p>
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
                <p className="font-medium text-gray-700 text-xs uppercase tracking-wider">Legal</p>
                <div className="space-y-1.5">
                  <Link href="/privacy" className="block hover:text-gray-900 transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="block hover:text-gray-900 transition-colors">Terms of Service</Link>
                  <a href="mailto:hello@narratorhq.com" className="block hover:text-gray-900 transition-colors">Contact</a>
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
