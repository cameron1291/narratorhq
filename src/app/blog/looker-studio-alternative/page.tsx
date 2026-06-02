import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Looker Studio Alternative for Agencies — NarratorHQ',
  description: 'Looker Studio builds beautiful dashboards for free. But it doesn\'t write the report. NarratorHQ automates the narrative your clients actually read.',
  alternates: { canonical: 'https://narratorhq.com/blog/looker-studio-alternative' },
  openGraph: {
    title: 'Looker Studio Alternative — NarratorHQ',
    description: 'Looker Studio is free and powerful. It still doesn\'t write the report. NarratorHQ does.',
  },
}

const COMPARISON = [
  { feature: 'GA4, Google Ads, Meta connections', looker: '✓ Native', narratorHQ: '✓' },
  { feature: 'Dashboard / data visualisation', looker: '✓ Excellent', narratorHQ: '— Not the focus' },
  { feature: 'Custom charts and tables', looker: '✓ Highly customisable', narratorHQ: '— Standard metrics only' },
  { feature: 'Free to use', looker: '✓ Free', narratorHQ: '— Paid subscription' },
  { feature: 'AI narrative generation', looker: '✗', narratorHQ: '✓ Full written narrative' },
  { feature: 'Automated report writing', looker: '✗ Always manual', narratorHQ: '✓ Core feature' },
  { feature: 'Email delivery to client', looker: '⚠ Share link only', narratorHQ: '✓ Branded email + PDF' },
  { feature: 'Client memory (goals, promises)', looker: '✗', narratorHQ: '✓' },
  { feature: 'Approval queue', looker: '✗', narratorHQ: '✓' },
  { feature: 'Anomaly detection + explanation', looker: '✗', narratorHQ: '✓' },
  { feature: 'White-label', looker: '⚠ Logo only', narratorHQ: '✓ Full white-label' },
  { feature: 'Setup time', looker: 'Hours per client', narratorHQ: 'Minutes per client' },
]

export default function LookerStudioAlternativePage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/"><img src="/logo.png" alt="NarratorHQ" className="h-14 w-auto" /></Link>
          <Link href="/signup" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Start free trial
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-sm text-blue-600 font-medium mb-3">Comparison</p>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            Looker Studio vs NarratorHQ: different tools for different problems
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Looker Studio (formerly Google Data Studio) is free, powerful, and connects natively to every Google product. It builds dashboards. It doesn&apos;t write reports. NarratorHQ does.
          </p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Why agencies use Looker Studio</h2>
            <p>
              It&apos;s free. It connects to GA4, Google Ads, and Search Console natively. It produces beautiful, highly customisable dashboards that clients can view in their browser. For agencies that need to show data, Looker Studio is hard to beat on price.
            </p>
            <p className="mt-3">
              The problem agencies consistently report isn&apos;t building the dashboard — it&apos;s everything that happens after. Someone has to look at the numbers, understand what they mean, write the accompanying email or document explaining performance, and send it. Looker Studio doesn&apos;t touch any of that.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The real cost of Looker Studio</h2>
            <p>
              Looker Studio is free to use. But the time cost of the workflow around it isn&apos;t zero:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li><strong>Setup per client:</strong> 2–4 hours to build a custom dashboard, connect data sources, and brand it correctly</li>
              <li><strong>Monthly narrative:</strong> 1–3 hours per client to review the numbers, write the narrative email, and send it</li>
              <li><strong>Maintenance:</strong> Google regularly breaks data connections and changes API schemas — someone has to fix it</li>
              <li><strong>At 15 clients:</strong> That&apos;s potentially 45 hours a month just on reporting, before any other client work</li>
            </ul>
            <p className="mt-3">
              NarratorHQ doesn&apos;t replace the data visibility Looker Studio provides. It replaces the writing time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Feature comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-500 w-40">Looker Studio</th>
                    <th className="text-center py-2 px-3 font-semibold text-blue-600 w-32">NarratorHQ</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map(row => (
                    <tr key={row.feature} className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 text-gray-700">{row.feature}</td>
                      <td className="py-2.5 px-3 text-center text-gray-500">{row.looker}</td>
                      <td className="py-2.5 px-3 text-center text-gray-800 font-medium">{row.narratorHQ}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Can you use both?</h2>
            <p>
              Yes — and many agencies do. Looker Studio as the internal monitoring and deep-dive dashboard for account managers. NarratorHQ for the monthly client-facing report: the narrative email that gets sent, approved, and delivered without anyone having to write it.
            </p>
            <p className="mt-3">
              They serve different audiences at different points in the workflow. Looker Studio answers &quot;what are the numbers?&quot;. NarratorHQ answers &quot;what do the numbers mean, and what are we doing about it?&quot;
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What makes NarratorHQ different</h2>
            <p>The thing no dashboard tool does — including Looker Studio — is remember. If you told a client in March that you&apos;d address their rising cost-per-lead by April, NarratorHQ stores that promise and automatically surfaces it in the April report. The AI writes the section knowing what was promised and what the current numbers show.</p>
            <p className="mt-3">That&apos;s not a feature you can bolt onto a dashboard. It requires a fundamentally different architecture — one built around the report and the ongoing client relationship, not the data visualisation layer.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Who should use which</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="border border-gray-200 rounded-xl p-4">
                <p className="font-semibold text-gray-900 mb-2">Keep Looker Studio if:</p>
                <ul className="text-sm space-y-1.5 text-gray-600 list-disc list-inside">
                  <li>Clients want a self-serve data dashboard</li>
                  <li>You need custom chart types and deep visualisation</li>
                  <li>Budget is a hard constraint (it&apos;s free)</li>
                  <li>You have a dedicated ops person to maintain templates</li>
                </ul>
              </div>
              <div className="border border-blue-200 bg-blue-50 rounded-xl p-4">
                <p className="font-semibold text-blue-900 mb-2">Add NarratorHQ if:</p>
                <ul className="text-sm space-y-1.5 text-blue-800 list-disc list-inside">
                  <li>Writing the monthly client narrative takes too long</li>
                  <li>You want reports delivered via email, not a link</li>
                  <li>You&apos;re managing 5+ clients and the writing time adds up</li>
                  <li>You want the AI to track context between reports</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 mt-8">
            <h3 className="font-bold text-gray-900 mb-2">Already using Looker Studio? Upload one of your existing PDFs.</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              If your team is already exporting monthly PDF reports from Looker Studio, you can upload one directly to NarratorHQ. We&apos;ll read it, extract the KPIs, and generate a structured draft — Executive Summary, Wins, Issues, and Recommendations — in under 60 seconds. No need to rebuild your data connections to see what NarratorHQ does with a real client.
            </p>
          </section>

          <div className="bg-blue-600 rounded-2xl p-8 text-center text-white mt-6">
            <h2 className="text-xl font-bold mb-2">Try NarratorHQ free for 14 days</h2>
            <p className="text-blue-100 text-sm mb-6">Upload an existing PDF or connect GA4 in minutes. No credit card required.</p>
            <Link href="/signup" className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm">
              Start free trial
            </Link>
          </div>
        </div>
      </article>

      <footer className="border-t border-gray-100 mt-8">
        <div className="max-w-3xl mx-auto px-4 py-8 flex flex-wrap gap-4 text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <Link href="/blog/agencyanalytics-alternative" className="hover:text-gray-600">vs AgencyAnalytics</Link>
          <Link href="/blog/whatagraph-alternative" className="hover:text-gray-600">vs Whatagraph</Link>
          <Link href="/blog/dashthis-alternative" className="hover:text-gray-600">vs DashThis</Link>
          <Link href="/blog/databox-alternative" className="hover:text-gray-600">vs Databox</Link>
          <Link href="/blog/swydo-alternative" className="hover:text-gray-600">vs Swydo</Link>
          <Link href="/blog/reportgarden-alternative" className="hover:text-gray-600">vs ReportGarden</Link>
        </div>
      </footer>
    </div>
  )
}
