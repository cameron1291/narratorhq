'use client'

import Link from 'next/link'
import { Download, FileText, ArrowRight } from 'lucide-react'

export default function SampleReportPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Download bar — hidden on print */}
      <div className="print:hidden bg-blue-600 text-white py-2.5 px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm">
          <FileText className="h-4 w-4 shrink-0" />
          <span>This is a sample NarratorHQ report — click Download to save as PDF</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/sample-report/bad-month" className="text-sm text-blue-200 hover:text-white transition-colors">
            See bad month example →
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-sm font-semibold bg-white text-blue-700 px-4 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Nav — hidden on print */}
      <nav className="print:hidden bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 h-13 flex items-center justify-between">
          <Link href="/"><img src="/logo.png" alt="NarratorHQ" className="h-9 w-auto" /></Link>
          <div className="flex items-center gap-4">
            <Link href="/report-example" className="text-sm text-gray-600 hover:text-gray-900">Interactive preview</Link>
            <Link href="/signup" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Start free trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Report document */}
      <div className="max-w-[800px] mx-auto my-8 print:my-0 print:max-w-none bg-white shadow-lg print:shadow-none">

        {/* Brand bar */}
        <div className="h-3 bg-blue-600 print:bg-[#2563eb]" />

        {/* Agency header */}
        <div className="px-12 py-8 border-b border-gray-200 print:px-10 print:py-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                {/* Logo placeholder */}
                <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center print:bg-[#2563eb]">
                  <span className="text-white font-bold text-sm">TD</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg leading-none">Thornton Digital</p>
                  <p className="text-sm text-gray-500 mt-0.5">hello@thorntondigital.co.uk</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Prepared for</p>
                <p className="text-2xl font-bold text-gray-900">Meridian Home &amp; Garden</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 print:bg-white print:border-gray-300">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Report period</p>
                <p className="font-bold text-gray-900 text-lg">April 2026</p>
                <p className="text-sm text-gray-500 mt-0.5">1 – 30 April 2026</p>
                <div className="border-t border-gray-200 mt-3 pt-3">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Prepared</p>
                  <p className="text-sm font-medium text-gray-700">5 May 2026</p>
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
              <div className="h-3 w-3 rounded-full bg-blue-600 print:bg-[#2563eb]" />
              <h2 className="font-bold text-gray-900 text-lg">Overview</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              April was Meridian Home &amp; Garden&apos;s strongest month in 2026 — organic sessions up 18% and paid cost per acquisition down to £28.50, the lowest since Q3 last year. The content refresh across the garden furniture category drove 40% of the organic growth.
            </p>
            <p className="text-gray-700 leading-relaxed text-[15px] mt-3">
              One area to watch: branded search volume dipped 8% following the end of the March awareness campaign. This is consistent with post-campaign normalisation and we&apos;ve outlined a response in the next steps below.
            </p>

            {/* Key metrics row */}
            <div className="grid grid-cols-4 gap-3 mt-5">
              {[
                { label: 'Sessions', value: '24,847', change: '+18%', positive: true },
                { label: 'Conversions', value: '312', change: '+22%', positive: true },
                { label: 'Paid CPA', value: '£28.50', change: '-17%', positive: true },
                { label: 'ROAS', value: '4.2×', change: '+0.6×', positive: true },
              ].map(m => (
                <div key={m.label} className="bg-gray-50 rounded-lg p-3 border border-gray-100 print:border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">{m.label}</p>
                  <p className="text-base font-bold text-gray-900">{m.value}</p>
                  <p className={`text-xs font-semibold mt-0.5 ${m.positive ? 'text-green-600' : 'text-red-600'}`}>{m.change} vs March</p>
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
              Organic search delivered 14,200 sessions — up 21% from March and the channel&apos;s best performance this year. The &apos;outdoor furniture 2026&apos; content cluster gained significant traction, contributing 3,100 sessions across four articles. Four target keywords moved from positions 8–12 into the top 5, with &apos;garden sofas UK&apos; now ranking at position 3 on Google.
            </p>
            <p className="text-gray-700 leading-relaxed text-[15px] mt-3">
              Conversion rate from organic held steady at 1.4%, generating 199 goal completions. The step change in sessions without a drop in conversion rate confirms this is qualified traffic, not broad-match noise.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { label: 'Organic sessions', value: '14,200', change: '+21%' },
                { label: 'Top keyword rank', value: 'Position 3', change: '↑ from 9' },
                { label: 'Organic conversions', value: '199', change: '+18%' },
              ].map(m => (
                <div key={m.label} className="bg-gray-50 rounded-lg p-3 border border-gray-100 print:border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">{m.label}</p>
                  <p className="text-sm font-bold text-gray-900">{m.value}</p>
                  <p className="text-xs font-semibold text-green-600 mt-0.5">{m.change}</p>
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
              Google Ads delivered 187 conversions at a cost per acquisition of £28.50 — down from £34.20 in March, an improvement of 17%. Return on ad spend improved to 4.2× (from 3.6×). Three underperforming ad groups targeting broad match gardening terms were removed; budget has been reallocated to the retargeting campaign, which is converting at a CPA of £18.
            </p>
            <p className="text-gray-700 leading-relaxed text-[15px] mt-3">
              As committed last month, we applied bid modifier adjustments to mobile campaigns. Mobile CPA has improved from 41% above desktop to 23% above desktop — meaningful progress, and we will continue tightening this in May through audience layering.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { label: 'CPA', value: '£28.50', change: '-17%' },
                { label: 'ROAS', value: '4.2×', change: '+0.6×' },
                { label: 'Ad spend', value: '£3,240', change: 'Flat' },
              ].map(m => (
                <div key={m.label} className="bg-gray-50 rounded-lg p-3 border border-gray-100 print:border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">{m.label}</p>
                  <p className="text-sm font-bold text-gray-900">{m.value}</p>
                  <p className={`text-xs font-semibold mt-0.5 ${m.change === 'Flat' ? 'text-gray-500' : 'text-green-600'}`}>{m.change}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Paid Social */}
          <section className="py-7">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-3 w-3 rounded-full bg-purple-600" />
              <h2 className="font-bold text-gray-900 text-lg">Paid Social — Meta Ads</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              Meta Ads delivered 84 conversions at a cost per acquisition of £42 — broadly flat from March&apos;s £44. The spring creative set featuring lifestyle imagery of garden spaces outperformed the product-only creative by 34% on click-through rate. We are scaling the lifestyle creative and testing a video variant through May.
            </p>
            <p className="text-gray-700 leading-relaxed text-[15px] mt-3">
              <span className="font-medium text-gray-900">Attribution note:</span> Meta figures reflect 7-day click, 1-day view attribution. Comparing these conversion numbers directly to Google Ads figures will show a discrepancy — both platforms count some of the same conversions. The figures above represent Meta&apos;s attributed contribution.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { label: 'CPA (Meta)', value: '£42', change: '-5%' },
                { label: 'Meta spend', value: '£1,800', change: 'Flat' },
                { label: 'Best creative', value: 'Lifestyle +34%', change: 'CTR' },
              ].map(m => (
                <div key={m.label} className="bg-gray-50 rounded-lg p-3 border border-gray-100 print:border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">{m.label}</p>
                  <p className="text-sm font-bold text-gray-900">{m.value}</p>
                  <p className={`text-xs font-semibold mt-0.5 ${m.change === 'CTR' ? 'text-blue-600' : m.change === 'Flat' ? 'text-gray-500' : 'text-green-600'}`}>{m.change}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Anomalies */}
          <section className="py-7">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <h2 className="font-bold text-gray-900 text-lg">Anomalies Explained</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              Branded search volume dipped 8% in the second half of April. This is consistent with the pattern we see when above-the-line brand activity goes quiet — the March email campaign had driven a branded search spike which has since normalised. This is expected behaviour and is not a cause for concern.
            </p>
            <p className="text-gray-700 leading-relaxed text-[15px] mt-3">
              If branded search continues to decline through May without a corresponding campaign, we would recommend a small Display budget (£500–£800/month) to maintain brand search share. We will flag this in next month&apos;s report with a recommendation either way.
            </p>
          </section>

          {/* Next Steps */}
          <section className="py-7">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-3 w-3 rounded-full bg-cyan-600" />
              <h2 className="font-bold text-gray-900 text-lg">Next Steps — May 2026</h2>
            </div>
            <ol className="space-y-3">
              {[
                'Launch the video creative test on Meta by 10 May. Based on benchmark data from comparable campaigns, we expect this to reduce CPA by a further 8–12%.',
                'Publish three remaining articles in the outdoor furniture content cluster. These are written and in review — expected to drive an additional 1,500 organic sessions by end of May.',
                'Continue audience layering on mobile Google Ads campaigns to close the remaining mobile/desktop CPA gap (currently 23% above desktop, target: under 15%).',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 print:bg-[#2563eb]">
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
            <span>Prepared by Thornton Digital · hello@thorntondigital.co.uk</span>
            <span>April 2026 · Confidential</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            This report was prepared for Meridian Home &amp; Garden. Please do not distribute.
          </p>
        </div>
      </div>

      {/* CTA below report — hidden on print */}
      <div className="print:hidden max-w-[800px] mx-auto px-4 pb-12 mt-2">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">This report was generated by NarratorHQ</p>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Your account manager approved this in 8 minutes.
          </h2>
          <p className="text-gray-500 text-sm mb-5 max-w-md mx-auto">
            The data was pulled automatically from GA4, Google Ads, and Meta. The narrative was written by AI, reviewed section by section, and sent white-labeled as Thornton Digital&apos;s own work.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Start free trial <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sample-report/bad-month"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              See a bad month report →
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Try the approval queue
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
