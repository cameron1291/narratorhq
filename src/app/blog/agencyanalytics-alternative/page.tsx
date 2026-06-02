import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AgencyAnalytics Alternative for Automated Narrative Reports',
  description: 'Looking for an AgencyAnalytics alternative that writes the story, not just shows the data? NarratorHQ automates the narrative, not the dashboard.',
  openGraph: {
    title: 'AgencyAnalytics Alternative — NarratorHQ',
    description: 'AgencyAnalytics builds dashboards. NarratorHQ writes the narrative. Here\'s what\'s different and who each is right for.',
  },
}

const COMPARISON = [
  { feature: 'GA4, Google Ads, Meta connections', agencyAnalytics: '✓', narratorHQ: '✓' },
  { feature: 'Dashboard / data visualisation', agencyAnalytics: '✓ Core feature', narratorHQ: '— Not the focus' },
  { feature: 'AI narrative generation', agencyAnalytics: '⚠ Basic summary only', narratorHQ: '✓ Full narrative, every section' },
  { feature: 'Automated narrative delivery', agencyAnalytics: '✗ Still manual', narratorHQ: '✓ Built around this' },
  { feature: 'Approval queue with inline editing', agencyAnalytics: '✗', narratorHQ: '✓' },
  { feature: 'Anomaly detection + explanation', agencyAnalytics: '✗', narratorHQ: '✓' },
  { feature: 'Client memory (goals, promises)', agencyAnalytics: '✗', narratorHQ: '✓' },
  { feature: 'White-label PDF + email', agencyAnalytics: '✓ Extra cost', narratorHQ: '✓ Included' },
  { feature: 'Report scheduling (auto-trigger)', agencyAnalytics: '✓', narratorHQ: '✓' },
  { feature: 'Price at 15 clients', agencyAnalytics: '~$199/mo', narratorHQ: '£249/mo' },
]

export default function ComparisonPage() {
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
            AgencyAnalytics vs NarratorHQ: Which is right for your agency?
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            AgencyAnalytics is the go-to for agencies that need reporting dashboards. NarratorHQ is for agencies that need the report itself — written, approved, and delivered automatically.
          </p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The core difference</h2>
            <p>AgencyAnalytics solves a data accessibility problem: your clients can log in and see their metrics in one place. It&apos;s a dashboard builder with report templates.</p>
            <p className="mt-2">NarratorHQ solves a different problem: the 1–3 hours per client that account managers spend turning those metrics into a coherent narrative and sending it. That time isn&apos;t saved by a better dashboard — it&apos;s saved by automating the writing.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Feature comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-500 w-36">AgencyAnalytics</th>
                    <th className="text-center py-2 px-3 font-semibold text-blue-600 w-32">NarratorHQ</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map(row => (
                    <tr key={row.feature} className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 text-gray-700">{row.feature}</td>
                      <td className="py-2.5 px-3 text-center text-gray-500">{row.agencyAnalytics}</td>
                      <td className="py-2.5 px-3 text-center text-gray-800 font-medium">{row.narratorHQ}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">When to choose AgencyAnalytics</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your clients actively log in to check their own dashboards</li>
              <li>You need visualisations (charts, graphs) as the primary deliverable</li>
              <li>You have a wide range of data sources beyond GA4/Ads/Meta</li>
              <li>Report narrative isn&apos;t the bottleneck — data access is</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">When to choose NarratorHQ</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your account managers spend more than 30 minutes per client writing monthly updates</li>
              <li>Your clients receive a narrative report by email (not a dashboard login)</li>
              <li>You want the AI to explain anomalies, not just display them</li>
              <li>You need an approval queue — you review before it sends, always</li>
              <li>You want the report to remember what was promised last month</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Can you use both?</h2>
            <p>Yes. Some agencies use AgencyAnalytics for client-facing dashboards (clients who like to self-serve) and NarratorHQ for the monthly narrative delivery. They solve different problems and aren&apos;t in direct competition for the same use case.</p>
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 mt-10">
            <h3 className="font-bold text-gray-900 mb-2">Already using AgencyAnalytics? Upload one of your existing PDFs.</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              If you&apos;re currently exporting monthly PDF reports from AgencyAnalytics, you can upload one directly to NarratorHQ. We&apos;ll read it, extract the KPIs, and generate a NarratorHQ-formatted draft — Executive Summary, Wins, Issues, and Recommendations — in under 60 seconds. No need to reconnect GA4 or any ad accounts to get started. It&apos;s the fastest way to see what NarratorHQ does with a real client you already have data for.
            </p>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
            <h3 className="font-bold text-gray-900 mb-2">Try it with your own clients</h3>
            <p className="text-sm text-gray-600 mb-4">Upload an existing PDF report or connect GA4 in under 2 minutes. 14-day free trial, no credit card.</p>
            <Link
              href="/signup"
              className="inline-block bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start free trial
            </Link>
          </div>
        </div>
      </article>

      <footer className="border-t border-gray-100 py-8 mt-8">
        <div className="max-w-3xl mx-auto px-4 flex items-center justify-between text-sm text-gray-400">
          <Link href="/"><img src="/logo.png" alt="NarratorHQ" className="h-6 w-auto" /></Link>
          <span>© {new Date().getFullYear()} NarratorHQ</span>
        </div>
      </footer>
    </div>
  )
}
