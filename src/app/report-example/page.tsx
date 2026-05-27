import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Circle, AlertTriangle, Info } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Example Client Report — NarratorHQ',
  description: 'See a completed example of a NarratorHQ client performance report — as delivered to the end client, and as it appears in the agency approval queue.',
  alternates: {
    canonical: 'https://narratorhq.com/report-example',
  },
  openGraph: {
    title: 'Example Client Report — NarratorHQ',
    description: 'A complete example of an AI-generated, agency-approved performance report as delivered white-labeled to the end client.',
    url: 'https://narratorhq.com/report-example',
    type: 'website',
  },
}

const REPORT_SECTIONS = [
  {
    label: 'Overview',
    color: '#2563eb',
    content: "April was Meridian Home & Garden's strongest month in 2026 — organic sessions up 18% and paid CPA down to £28.50, the lowest since Q3 last year. The content refresh across the garden furniture category drove 40% of the organic growth. One area to watch: branded search volume dipped 8% following the end of the March awareness campaign. We've outlined a response plan in the next steps below.",
  },
  {
    label: 'Organic Search',
    color: '#16a34a',
    content: "Organic search delivered 14,200 sessions — up 21% from March and the channel's best performance this year. The 'outdoor furniture 2026' content cluster gained significant traction, contributing 3,100 sessions. Four target keywords moved from positions 8–12 into the top 5, with 'garden sofas UK' now ranking at position 3. Conversion rate from organic held steady at 1.4%, generating 199 goal completions.",
  },
  {
    label: 'Paid Search — Google Ads',
    color: '#ea580c',
    content: "Google Ads delivered 187 conversions at a CPA of £28.50 — down from £34.20 in March, an improvement of 17%. ROAS improved to 4.2x (from 3.6x). We removed three underperforming ad groups targeting broad match gardening terms that were generating clicks but no conversions. Budget has been reallocated to the retargeting campaign, which is currently converting at a CPA of £18.",
  },
  {
    label: 'Paid Social — Meta',
    color: '#7c3aed',
    content: "Meta delivered 84 conversions at a CPA of £42, broadly flat from March's £44. The spring creative set — lifestyle imagery of garden spaces — outperformed the product-only creative by 34% on click-through rate. We are scaling the lifestyle creative and testing a video variant in May. Please note: Meta figures reflect 7-day click attribution, which will differ from GA4 conversion numbers.",
  },
  {
    label: 'Anomalies Explained',
    color: '#b45309',
    content: "Branded search volume dipped 8% in the second half of April. This is consistent with the pattern we see when above-the-line brand activity goes quiet — the March email campaign had driven a branded search spike which has since normalised. This is expected behaviour and not a cause for concern. If the trend continues through May we would recommend a small Display budget (£500–£800) to maintain brand search share.",
  },
  {
    label: 'Next Steps — May 2026',
    color: '#0891b2',
    content: "1. Launch the video creative test on Meta by 10 May — expected to reduce CPA by a further 8–12% based on benchmark data from similar campaigns.\n\n2. Publish three remaining articles in the outdoor furniture content cluster — forecast to drive an additional 1,500 organic sessions by the end of May.\n\n3. Apply bid modifier adjustments to mobile campaigns in Google Ads — mobile CPA is currently 23% above desktop and there is room to improve through audience layering.",
  },
]

const APPROVAL_PREVIEW: { label: string; confidence: 'high' | 'medium' | 'low'; approved: boolean; excerpt: string }[] = [
  {
    label: 'Overview',
    confidence: 'high' as const,
    approved: true,
    excerpt: "April was Meridian's strongest month in 2026 — organic sessions up 18% and paid CPA down to £28.50...",
  },
  {
    label: 'Organic Search',
    confidence: 'high' as const,
    approved: true,
    excerpt: "Organic search delivered 14,200 sessions — up 21% from March and the channel's best performance this year...",
  },
  {
    label: 'Paid Social',
    confidence: 'medium' as const,
    approved: false,
    excerpt: "Meta delivered 84 conversions at a CPA of £42. The spring creative outperformed product-only by 34% on CTR...",
  },
  {
    label: 'Anomalies Explained',
    confidence: 'medium' as const,
    approved: false,
    excerpt: "Branded search volume dipped 8% in the second half of April, consistent with post-campaign normalisation...",
  },
]

const CONFIDENCE_CONFIG = {
  high: { label: 'High confidence', cls: 'text-green-700 bg-green-50 border-green-200' },
  medium: { label: 'Review recommended', cls: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
  low: { label: 'Low confidence — review carefully', cls: 'text-red-700 bg-red-50 border-red-200' },
}

export default function ReportExamplePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-blue-600 text-white py-2.5 px-4 text-center text-sm">
        <span className="text-blue-100">This is an example report generated by </span>
        <span className="font-semibold text-white">NarratorHQ</span>
        <span className="text-blue-100"> — this is what your clients receive.</span>
        <Link
          href="/signup"
          className="inline-flex items-center gap-1 ml-4 text-white font-semibold hover:underline"
        >
          Start free trial <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg text-gray-900 hover:text-blue-600 transition-colors">NarratorHQ</Link>
          <div className="flex items-center gap-4">
            <Link href="/demo" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Try interactive demo</Link>
            <Link href="/signup" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Start free trial
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">

          {/* LEFT: The report as the client sees it */}
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-4">Client view — what gets emailed to the client</p>

            {/* Report document */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Agency header */}
              <div className="h-2 bg-blue-600" />
              <div className="px-8 py-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Prepared by</p>
                    <p className="text-xl font-bold text-gray-900">Thornton Digital</p>
                    <p className="text-sm text-gray-500 mt-0.5">hello@thorntondigital.co.uk</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Report period</p>
                    <p className="font-semibold text-gray-900">April 2026</p>
                    <p className="text-xs text-gray-500 mt-0.5">1 April – 30 April 2026</p>
                  </div>
                </div>
                <div className="mt-5 p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Client</p>
                  <p className="font-bold text-gray-900 text-lg">Meridian Home &amp; Garden</p>
                </div>
              </div>

              {/* Sections */}
              <div className="divide-y divide-gray-100">
                {REPORT_SECTIONS.map((section) => (
                  <div key={section.label} className="px-8 py-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: section.color }} />
                      <h2 className="font-bold text-gray-900 text-base">{section.label}</h2>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
                  </div>
                ))}
              </div>

              {/* Report footer */}
              <div className="px-8 py-5 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center">
                  Prepared by Thornton Digital · April 2026 · Confidential
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: What the agency sees in the approval queue */}
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-4">Agency view — your approval queue</p>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              {/* Queue header */}
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Meridian Home &amp; Garden</p>
                  <p className="text-xs text-gray-500">April 2026 · 6 sections</p>
                </div>
                <span className="text-xs text-gray-500">2 / 6 approved</span>
              </div>

              {/* Section cards */}
              <div className="divide-y divide-gray-100">
                {APPROVAL_PREVIEW.map((s) => {
                  const conf = CONFIDENCE_CONFIG[s.confidence]
                  return (
                    <div key={s.label} className={`p-3 ${s.approved ? 'bg-green-50/40' : 'bg-white'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {s.approved
                          ? <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                          : <Circle className="h-4 w-4 text-gray-300 shrink-0" />
                        }
                        <span className="text-xs font-semibold text-gray-900">{s.label}</span>
                        <span className={`text-xs border rounded px-1.5 py-0.5 ml-auto ${conf.cls}`}>
                          {s.confidence === 'medium' && <Info className="inline h-3 w-3 mr-0.5" />}
                          {s.confidence === 'low' && <AlertTriangle className="inline h-3 w-3 mr-0.5" />}
                          {conf.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed pl-6 line-clamp-2">{s.excerpt}</p>
                      {!s.approved && (
                        <div className="flex gap-1 mt-2 pl-6">
                          <button className="text-xs text-blue-600 hover:text-blue-700 border border-blue-200 bg-blue-50 rounded px-2 py-0.5">Edit</button>
                          <button className="text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded px-2 py-0.5">Regenerate</button>
                          <button className="text-xs text-green-600 hover:text-green-700 border border-green-200 bg-green-50 rounded px-2 py-0.5 ml-auto">Approve ✓</button>
                        </div>
                      )}
                    </div>
                  )
                })}

                <div className="px-3 py-2 text-center">
                  <span className="text-xs text-gray-400">+ 2 more sections</span>
                </div>
              </div>

              {/* Queue footer */}
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                <button className="w-full text-center text-sm font-semibold bg-blue-600 text-white rounded-lg py-2 opacity-50 cursor-default">
                  Approve report (2 / 6 approved)
                </button>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                <p>Nothing sends without your approval. Every section is reviewed first.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                <p>Click any section to edit inline. Regenerate with custom instructions.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                <p>Confidence scores show you exactly where to spend review time.</p>
              </div>
            </div>

            <Link
              href="/demo"
              className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-xl py-2.5 transition-colors"
            >
              Try the interactive approval queue <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              href="/signup"
              className="mt-2 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl py-2.5 transition-colors"
            >
              Start your free trial <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <p className="text-xs text-gray-400 text-center mt-2">14 days free · No credit card required</p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <section className="bg-blue-600 py-14 mt-12">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white">This report took 8 minutes to review and approve.</h2>
          <p className="text-blue-100 mt-3 mb-7">
            It used to take 90 minutes to write from scratch. The data connections, narrative generation, and delivery are all automated — your team only handles the approval.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-7 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Start free trial <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
