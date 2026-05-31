import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Databox Alternative — NarratorHQ',
  description: 'Looking for a Databox alternative that writes the report, not just builds the dashboard? NarratorHQ automates the narrative and delivers it to your clients automatically.',
  alternates: { canonical: 'https://narratorhq.com/blog/databox-alternative' },
  openGraph: {
    title: 'Databox Alternative — NarratorHQ',
    description: 'Databox shows dashboards. NarratorHQ writes the report. Here\'s what\'s different.',
  },
}

const COMPARISON = [
  { feature: 'GA4, Google Ads, Meta connections', databox: '✓', narratorHQ: '✓' },
  { feature: 'Dashboard / data visualisation', databox: '✓ Core feature', narratorHQ: '— Not the focus' },
  { feature: 'Custom metrics & KPIs', databox: '✓ Powerful', narratorHQ: '✓ Built-in standard set' },
  { feature: 'AI narrative generation', databox: '⚠ Basic AI insights', narratorHQ: '✓ Full written narrative' },
  { feature: 'Automated report writing', databox: '✗ Still manual', narratorHQ: '✓ Core feature' },
  { feature: 'Client email delivery', databox: '✓ PDF snapshots', narratorHQ: '✓ Narrative email + PDF' },
  { feature: 'Approval queue with inline editing', databox: '✗', narratorHQ: '✓' },
  { feature: 'Client memory (goals, promises)', databox: '✗', narratorHQ: '✓' },
  { feature: 'Anomaly detection + explanation', databox: '⚠ Alerts only', narratorHQ: '✓ Written explanation' },
  { feature: 'White-label', databox: '✓ Extra cost', narratorHQ: '✓ Included' },
  { feature: 'Price at 15 clients', databox: '~$169/mo', narratorHQ: '£249/mo' },
]

export default function DataboxAlternativePage() {
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
            Databox vs NarratorHQ: which is right for your agency?
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Databox is built around dashboards and real-time metric monitoring. NarratorHQ is built around the monthly client report — written, approved, and delivered automatically.
          </p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The core difference</h2>
            <p>
              Databox is excellent at one thing: pulling metrics from dozens of sources and displaying them in real-time dashboards and scorecards. It&apos;s a BI tool that agencies use to monitor client performance and build branded reporting portals.
            </p>
            <p className="mt-3">
              NarratorHQ solves the problem that follows: once the data is there, someone still has to write the narrative — what the numbers mean, why they moved, what&apos;s being done about it. That&apos;s typically 1–3 hours per client per month. NarratorHQ automates it.
            </p>
            <p className="mt-3">
              The two tools aren&apos;t direct competitors. If your clients want a live self-serve dashboard, Databox is strong. If your agency&apos;s bottleneck is the time it takes to write and send client reports, NarratorHQ addresses that directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Feature comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-500 w-32">Databox</th>
                    <th className="text-center py-2 px-3 font-semibold text-blue-600 w-32">NarratorHQ</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map(row => (
                    <tr key={row.feature} className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 text-gray-700">{row.feature}</td>
                      <td className="py-2.5 px-3 text-center text-gray-500">{row.databox}</td>
                      <td className="py-2.5 px-3 text-center text-gray-800 font-medium">{row.narratorHQ}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What Databox does well</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Real-time dashboards with 70+ native integrations</li>
              <li>Custom metric building and calculated metrics</li>
              <li>Scorecards and goal tracking with automated alerts</li>
              <li>Mobile app for on-the-go metric monitoring</li>
              <li>Strong for internal performance tracking and agency ops</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Where agencies hit friction with Databox</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>It still doesn&apos;t write the report.</strong> Even the best Databox dashboard requires someone to write the accompanying narrative email — the part that tells the client what the numbers mean and what&apos;s being done.</li>
              <li><strong>Clients rarely log in.</strong> Dashboard tools consistently report low client login rates. Most clients want a summary in their inbox, not a portal to log into.</li>
              <li><strong>No memory of past promises.</strong> If you told a client you&apos;d fix the mobile CPA last month, Databox has no way to surface that promise in next month&apos;s report.</li>
              <li><strong>Cost at scale.</strong> Databox&apos;s pricing scales with data connections and users — it can get expensive for agencies managing many clients.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What NarratorHQ does instead</h2>
            <p>NarratorHQ doesn&apos;t compete with Databox on dashboards. It takes a different approach entirely:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Connects to GA4, Google Ads, Meta Ads, and TikTok Ads</li>
              <li>Generates a full written narrative for each section — overview, organic, paid search, paid social, anomalies, next steps</li>
              <li>Stores client goals, promises, and sensitivities — and references them in every report</li>
              <li>Routes each draft through an approval queue where account managers can edit, regenerate, or approve section by section</li>
              <li>Sends the finished report as a branded email with PDF attachment directly to the client</li>
            </ul>
            <p className="mt-3">The result: what used to take 90 minutes per client takes under 5 minutes to review and approve.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Who should use which</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="border border-gray-200 rounded-xl p-4">
                <p className="font-semibold text-gray-900 mb-2">Choose Databox if:</p>
                <ul className="text-sm space-y-1.5 text-gray-600 list-disc list-inside">
                  <li>Clients want a self-serve dashboard portal</li>
                  <li>You need real-time metric monitoring</li>
                  <li>You&apos;re tracking 50+ custom metrics per client</li>
                  <li>Internal performance reporting is the priority</li>
                </ul>
              </div>
              <div className="border border-blue-200 bg-blue-50 rounded-xl p-4">
                <p className="font-semibold text-blue-900 mb-2">Choose NarratorHQ if:</p>
                <ul className="text-sm space-y-1.5 text-blue-800 list-disc list-inside">
                  <li>Writing client reports takes too much time</li>
                  <li>Clients want a written narrative, not a dashboard</li>
                  <li>You want the AI to track promises made last month</li>
                  <li>You need white-labeled reports without extra fees</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Pricing</h2>
            <p>
              Databox pricing starts free for 3 data source connections but scales quickly — the Professional plan at ~$169/month covers 15 clients with limited data freshness.
            </p>
            <p className="mt-3">
              NarratorHQ is <strong>£149/month for up to 5 clients</strong> and <strong>£249/month for up to 15 clients</strong>. All plans include white-labeling, PDF generation, email delivery, and client memory. No per-connection fees.
            </p>
          </section>

          <div className="bg-blue-600 rounded-2xl p-8 text-center text-white mt-8">
            <h2 className="text-xl font-bold mb-2">Try NarratorHQ free for 14 days</h2>
            <p className="text-blue-100 text-sm mb-6">No credit card required. Connect GA4 and Google Ads, generate your first report in under 30 seconds.</p>
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
          <Link href="/blog/swydo-alternative" className="hover:text-gray-600">vs Swydo</Link>
          <Link href="/blog/looker-studio-alternative" className="hover:text-gray-600">vs Looker Studio</Link>
          <Link href="/blog/reportgarden-alternative" className="hover:text-gray-600">vs ReportGarden</Link>
        </div>
      </footer>
    </div>
  )
}
