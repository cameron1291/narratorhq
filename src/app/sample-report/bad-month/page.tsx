'use client'

import Link from 'next/link'
import { Download, FileText, ArrowRight, AlertTriangle } from 'lucide-react'

export default function BadMonthSampleReportPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Download bar */}
      <div className="print:hidden bg-amber-600 text-white py-2.5 px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>Bad month example — how NarratorHQ explains a difficult month without losing client confidence</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/sample-report" className="text-sm text-amber-200 hover:text-white transition-colors">
            See good month example →
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-sm font-semibold bg-white text-amber-700 px-4 py-1.5 rounded-lg hover:bg-amber-50 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="print:hidden bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 h-13 flex items-center justify-between">
          <Link href="/"><img src="/logo.png" alt="NarratorHQ" className="h-14 w-auto" /></Link>
          <div className="flex items-center gap-4">
            <Link href="/sample-report" className="text-sm text-gray-600 hover:text-gray-900">Good month example</Link>
            <Link href="/signup" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Start free trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Report document */}
      <div className="max-w-[800px] mx-auto my-8 print:my-0 print:max-w-none bg-white shadow-lg print:shadow-none">

        {/* Brand bar */}
        <div className="h-3 bg-violet-700 print:bg-[#6d28d9]" />

        {/* Agency header */}
        <div className="px-12 py-8 border-b border-gray-200 print:px-10 print:py-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-violet-700 flex items-center justify-center print:bg-[#6d28d9]">
                  <span className="text-white font-bold text-sm">CF</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg leading-none">Cairn &amp; Fox Digital</p>
                  <p className="text-sm text-gray-500 mt-0.5">team@cairnandfox.co.uk</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Prepared for</p>
                <p className="text-2xl font-bold text-gray-900">Hartley Bathrooms</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 print:bg-white print:border-gray-300">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Report period</p>
                <p className="font-bold text-gray-900 text-lg">March 2026</p>
                <p className="text-sm text-gray-500 mt-0.5">1 – 31 March 2026</p>
                <div className="border-t border-gray-200 mt-3 pt-3">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Prepared</p>
                  <p className="text-sm font-medium text-gray-700">4 April 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Report body */}
        <div className="px-12 py-2 print:px-10 divide-y divide-gray-100">

          {/* Overview */}
          <section className="py-7">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-3 w-3 rounded-full bg-violet-700" />
              <h2 className="font-bold text-gray-900 text-lg">Overview</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              March was a challenging month — organic sessions fell 22%, largely driven by ranking losses on six key product pages following a Google algorithm update on 14 March that targeted thin content. Paid search held broadly steady. The short version: we know exactly what happened, we have already started work on the fix, and we expect recovery through April and May.
            </p>
            <p className="text-gray-700 leading-relaxed text-[15px] mt-3">
              The narrative below explains the cause in detail and sets out the specific remediation steps already underway. We want to be direct with you: March numbers are not where we want them, but the cause is identified and the path forward is clear.
            </p>

            {/* Key metrics row */}
            <div className="grid grid-cols-4 gap-3 mt-5">
              {[
                { label: 'Sessions', value: '18,400', change: '-22%', positive: false },
                { label: 'Conversions', value: '198', change: '-19%', positive: false },
                { label: 'Paid CPA', value: '£36.80', change: '+8%', positive: false },
                { label: 'ROAS', value: '3.4×', change: '-0.4×', positive: false },
              ].map(m => (
                <div key={m.label} className="bg-red-50 rounded-lg p-3 border border-red-100 print:border-red-200">
                  <p className="text-xs text-gray-500 mb-1">{m.label}</p>
                  <p className="text-base font-bold text-gray-900">{m.value}</p>
                  <p className="text-xs font-semibold text-red-600 mt-0.5">{m.change} vs Feb</p>
                </div>
              ))}
            </div>
          </section>

          {/* Organic Search */}
          <section className="py-7">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-3 w-3 rounded-full bg-green-600" />
              <h2 className="font-bold text-gray-900 text-lg">Organic Search</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              Organic sessions fell to 11,200 — down 22% from February&apos;s 14,400. The decline is concentrated: six product category pages account for 87% of the lost traffic. These pages lost ranking positions between 14–18 March, consistent with the timing of Google&apos;s site authority update that penalised pages with limited original content depth.
            </p>
            <p className="text-gray-700 leading-relaxed text-[15px] mt-3">
              The affected pages are the bathroom suite category, wetroom category, and four shower enclosure sub-category pages. These were identified within 72 hours of the drop. We have already begun content remediation — two pages have been substantially rewritten and resubmitted to Google Search Console for indexing. The remaining four are scheduled for completion by 15 April.
            </p>
            <p className="text-gray-700 leading-relaxed text-[15px] mt-3">
              All other organic traffic is stable. Brand search held flat, direct traffic is up 3%, and the blog channel is unaffected.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { label: 'Organic sessions', value: '11,200', change: '-22%', negative: true },
                { label: 'Affected pages', value: '6 pages', change: 'Identified' },
                { label: 'Pages fixed', value: '2 of 6', change: 'In progress' },
              ].map(m => (
                <div key={m.label} className={`rounded-lg p-3 border ${m.negative ? 'bg-red-50 border-red-100 print:border-red-200' : 'bg-amber-50 border-amber-100 print:border-amber-200'}`}>
                  <p className="text-xs text-gray-500 mb-1">{m.label}</p>
                  <p className="text-sm font-bold text-gray-900">{m.value}</p>
                  <p className={`text-xs font-semibold mt-0.5 ${m.negative ? 'text-red-600' : 'text-amber-700'}`}>{m.change}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Paid Search */}
          <section className="py-7">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-3 w-3 rounded-full bg-orange-500" />
              <h2 className="font-bold text-gray-900 text-lg">Paid Search — Google Ads</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              Google Ads remained largely stable despite the organic losses. CPA increased from £34.00 to £36.80 — an 8% rise driven primarily by competitive pressure in the &apos;bathroom suite&apos; keyword cluster, where two new competitors entered the auction in mid-March and pushed CPCs up by 14%.
            </p>
            <p className="text-gray-700 leading-relaxed text-[15px] mt-3">
              We have responded by tightening keyword match types, pausing the three lowest-quality broad match terms, and shifting budget toward exact and phrase match to protect efficiency. We expect CPA to return to the £34–35 range in April as these changes bed in.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { label: 'CPA', value: '£36.80', change: '+8%', negative: true },
                { label: 'ROAS', value: '3.4×', change: '-0.4×', negative: true },
                { label: 'Ad spend', value: '£3,100', change: 'Flat' },
              ].map(m => (
                <div key={m.label} className={`rounded-lg p-3 border ${m.negative ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'} print:border-gray-200`}>
                  <p className="text-xs text-gray-500 mb-1">{m.label}</p>
                  <p className="text-sm font-bold text-gray-900">{m.value}</p>
                  <p className={`text-xs font-semibold mt-0.5 ${m.negative ? 'text-red-600' : 'text-gray-500'}`}>{m.change}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Anomalies */}
          <section className="py-7">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <h2 className="font-bold text-gray-900 text-lg">What Happened — The Full Explanation</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              The traffic drop on 14 March coincides precisely with Google&apos;s March 2026 core update, which targeted pages across the web that rank primarily on domain authority rather than content quality. The affected pages on your site were ranking well but contained limited original product descriptions and minimal supporting content — making them vulnerable to this type of update.
            </p>
            <p className="text-gray-700 leading-relaxed text-[15px] mt-3">
              This is not unusual. The same update affected a number of bathroom and home improvement retailers. It is fixable, and recovery timelines after content remediation typically run 4–8 weeks as Google re-crawls and reassesses the updated pages.
            </p>
            <p className="text-gray-700 leading-relaxed text-[15px] mt-3">
              <span className="font-semibold text-gray-900">What we have done so far:</span> Identified all affected pages within 72 hours of the drop. Rewrote and expanded content on two priority pages (bathroom suite and wetroom), which have been resubmitted to Search Console. Audited the remaining four pages and created a content brief for each.
            </p>
            <p className="text-gray-700 leading-relaxed text-[15px] mt-3">
              <span className="font-semibold text-gray-900">What we will do next:</span> Complete content remediation on all six pages by 15 April. Monitor ranking recovery weekly and flag any pages that don&apos;t begin recovering within 4 weeks for further investigation.
            </p>
          </section>

          {/* Paid Social */}
          <section className="py-7">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-3 w-3 rounded-full bg-purple-600" />
              <h2 className="font-bold text-gray-900 text-lg">Paid Social — Meta Ads</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              Meta performance was broadly stable. 61 conversions at a CPA of £48 — slightly above February&apos;s £44, largely attributable to the seasonal slowdown in home renovation consideration in mid-March. We&apos;re pausing two underperforming ad sets and reallocating to the retargeting audience, which continues to convert well at £31 CPA.
            </p>
          </section>

          {/* Next Steps */}
          <section className="py-7">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-3 w-3 rounded-full bg-cyan-600" />
              <h2 className="font-bold text-gray-900 text-lg">Next Steps — April 2026</h2>
            </div>
            <ol className="space-y-3">
              {[
                'Complete content remediation on all 6 affected pages by 15 April. Monitor indexing weekly via Search Console and report progress at mid-month.',
                'Run a full site audit against Google\'s updated quality guidelines to identify any other pages at risk before the next algorithm update cycle.',
                'Tighten Google Ads keyword match types to protect CPA against continued competitive pressure in the \'bathroom suite\' cluster. Target: CPA back to £34–35 by end of April.',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-violet-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 print:bg-[#6d28d9]">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed text-[15px]">{step}</p>
                </li>
              ))}
            </ol>
          </section>

        </div>

        {/* Report footer */}
        <div className="px-12 py-6 bg-gray-50 border-t border-gray-200 print:px-10 print:bg-white print:border-gray-300">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Prepared by Cairn &amp; Fox Digital · team@cairnandfox.co.uk</span>
            <span>March 2026 · Confidential</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            This report was prepared for Hartley Bathrooms. Please do not distribute.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="print:hidden max-w-[800px] mx-auto px-4 pb-12 mt-2">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">The hardest report to write — automated</p>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            A bad month explained clearly. Client trust preserved.
          </h2>
          <p className="text-gray-500 text-sm mb-5 max-w-md mx-auto">
            NarratorHQ detects what went wrong, identifies the cause from the data, and writes the explanation automatically. No more staring at a blank page trying to frame a difficult month.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Start free trial <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sample-report"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              See a good month example →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
