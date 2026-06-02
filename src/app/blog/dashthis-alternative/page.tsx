import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DashThis Alternative for Automated Client Report Narratives',
  description: 'Looking for a DashThis alternative that writes the report, not just displays the data? NarratorHQ automates the narrative delivery so your team stops copy-pasting.',
  openGraph: {
    title: 'DashThis Alternative — NarratorHQ',
    description: 'DashThis builds dashboards. NarratorHQ writes and delivers the narrative report. Here\'s what\'s different and who each tool is right for.',
  },
}

const COMPARISON = [
  { feature: 'GA4, Google Ads, Meta connections', dashThis: '✓', narratorHQ: '✓' },
  { feature: 'Drag-and-drop dashboard builder', dashThis: '✓ Core feature', narratorHQ: '— Not the focus' },
  { feature: 'AI narrative generation', dashThis: '⚠ AI Insights (basic)', narratorHQ: '✓ Full narrative, every section' },
  { feature: 'Automated narrative delivery', dashThis: '✗ Still manual writing', narratorHQ: '✓ Built around this' },
  { feature: 'Approval queue with inline editing', dashThis: '✗', narratorHQ: '✓' },
  { feature: 'Anomaly detection + explanation', dashThis: '✗', narratorHQ: '✓' },
  { feature: 'Client memory (goals, promises)', dashThis: '✗', narratorHQ: '✓' },
  { feature: 'White-label PDF + email delivery', dashThis: '✓ Included', narratorHQ: '✓ Included' },
  { feature: 'Report scheduling', dashThis: '✓', narratorHQ: '✓' },
  { feature: 'Price at 10 clients', dashThis: '~$109/mo', narratorHQ: '$149/mo' },
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
            DashThis vs NarratorHQ: Which is right for your agency?
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            DashThis is a strong dashboard tool for agencies that need data visualisation. NarratorHQ is for agencies that need the narrative report written, approved, and delivered — automatically.
          </p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The core difference</h2>
            <p>DashThis solves a data presentation problem. You drag-and-drop widgets, connect your sources, and produce a shareable dashboard or PDF. It looks professional and saves time formatting.</p>
            <p className="mt-2">NarratorHQ solves a different problem: the 1–3 hours per client that account managers spend writing the commentary. What did the numbers mean? Why did traffic drop? What are we doing about it? DashThis shows the data — NarratorHQ writes the story.</p>
            <p className="mt-2">If your clients receive a dashboard link and explore it themselves, DashThis is the right tool. If your clients receive an email with a written performance narrative, NarratorHQ is the right tool.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Feature comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-500 w-36">DashThis</th>
                    <th className="text-center py-2 px-3 font-semibold text-blue-600 w-32">NarratorHQ</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map(row => (
                    <tr key={row.feature} className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 text-gray-700">{row.feature}</td>
                      <td className="py-2.5 px-3 text-center text-gray-500">{row.dashThis}</td>
                      <td className="py-2.5 px-3 text-center text-gray-800 font-medium">{row.narratorHQ}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What DashThis does well</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Fastest way to build a visual dashboard from multiple data sources</li>
              <li>Over 40 integrations — broader source support than most tools</li>
              <li>Clients who want to self-serve their data get a clean, shareable link</li>
              <li>Good for agencies where the deliverable is a data view, not a written report</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What NarratorHQ does differently</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Generates the written performance narrative — not a template, an actual first draft</li>
              <li>Detects anomalies and explains them: why traffic dropped, why CPA spiked</li>
              <li>Approval queue: account managers review and edit in-app before anything sends</li>
              <li>Client memory: stores goals, sensitivities, and promises so every report references them</li>
              <li>White-labeled PDF and email delivered directly to your client — no login required</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Who should switch to NarratorHQ</h2>
            <p>If your account managers are still spending more than 30 minutes per client writing the monthly commentary, DashThis hasn&apos;t solved the core problem. The dashboard is fast — the writing isn&apos;t.</p>
            <p className="mt-2">NarratorHQ is the right choice if:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Your clients receive written reports by email, not dashboard logins</li>
              <li>Writing the narrative is where your team&apos;s time goes</li>
              <li>You want the tool to explain performance, not just display it</li>
              <li>You need an approval step before any report reaches a client</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Can you use both?</h2>
            <p>Yes. Agencies sometimes use DashThis for clients who want a live dashboard they can check at any time, and NarratorHQ for the monthly narrative that gets emailed. They serve different formats of the same information.</p>
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 mt-10">
            <h3 className="font-bold text-gray-900 mb-2">Already using DashThis? Upload one of your existing PDFs.</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              If you&apos;re currently exporting monthly PDFs from DashThis, you can upload one directly to NarratorHQ. We&apos;ll read it, extract the KPIs, and generate a structured draft — Executive Summary, Wins, Issues, and Recommendations — in under 60 seconds. No need to reconnect your data sources to get started.
            </p>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
            <h3 className="font-bold text-gray-900 mb-2">Try it with your own clients</h3>
            <p className="text-sm text-gray-600 mb-4">Upload an existing PDF or connect GA4 in under 2 minutes. 14-day free trial, no credit card.</p>
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
