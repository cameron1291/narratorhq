import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Whatagraph Alternative for Automated Client Reporting',
  description: 'Looking for a Whatagraph alternative that writes the narrative, not just visualises the data? NarratorHQ automates the written report for agencies.',
  alternates: {
    canonical: 'https://narratorhq.com/blog/whatagraph-alternative',
  },
  openGraph: {
    title: 'Whatagraph Alternative — NarratorHQ',
    description: 'Whatagraph visualises the data. NarratorHQ writes the narrative. Here\'s what\'s different and who each is right for.',
  },
}

const COMPARISON = [
  { feature: 'GA4, Google Ads, Meta connections', whatagraph: '✓', narratorHQ: '✓' },
  { feature: 'Data visualisation / dashboards', whatagraph: '✓ Core feature', narratorHQ: '— Not the focus' },
  { feature: 'AI narrative generation', whatagraph: '⚠ Limited summaries', narratorHQ: '✓ Full narrative, every section' },
  { feature: 'Automated narrative delivery', whatagraph: '✗ Still manual writing', narratorHQ: '✓ Built around this' },
  { feature: 'Approval queue with inline editing', whatagraph: '✗', narratorHQ: '✓' },
  { feature: 'Anomaly detection + explanation', whatagraph: '✗', narratorHQ: '✓' },
  { feature: 'Client memory (goals, promises)', whatagraph: '✗', narratorHQ: '✓' },
  { feature: 'White-label PDF + email', whatagraph: '✓', narratorHQ: '✓ Included' },
  { feature: 'Report scheduling', whatagraph: '✓', narratorHQ: '✓' },
  { feature: 'Price at 15 clients', whatagraph: '~$199/mo', narratorHQ: '£249/mo' },
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
            Whatagraph vs NarratorHQ: which actually saves your agency time?
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Whatagraph is a strong data visualisation and white-label reporting tool used by agencies that want polished dashboards. NarratorHQ is different — it automates the written narrative, the approval, and the delivery. Here&apos;s who each is right for.
          </p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The core difference</h2>
            <p>Whatagraph solves visual presentation. If your clients want to open a branded portal and see their metrics laid out in a clean, polished dashboard, Whatagraph is very good at that. It&apos;s built for agencies that lead with data design — the charts, the colour-coded scorecards, the monthly PDF that looks like it came from a premium agency.</p>
            <p className="mt-2">NarratorHQ solves a different part of the same workflow: the writing. After the data is collected, someone still has to turn it into a coherent narrative — what went up, what went down, why it matters, and what happens next. That part takes 1–3 hours per client per month. NarratorHQ automates it. They&apos;re attacking different bottlenecks in the same reporting process.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Feature comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-500 w-36">Whatagraph</th>
                    <th className="text-center py-2 px-3 font-semibold text-blue-600 w-32">NarratorHQ</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map(row => (
                    <tr key={row.feature} className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 text-gray-700">{row.feature}</td>
                      <td className="py-2.5 px-3 text-center text-gray-500">{row.whatagraph}</td>
                      <td className="py-2.5 px-3 text-center text-gray-800 font-medium">{row.narratorHQ}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What Whatagraph is best for</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Agencies where clients specifically ask for a portal they can log in to and explore themselves</li>
              <li>Teams that lead with visual data and want highly designed, chart-heavy deliverables</li>
              <li>Clients who want self-serve dashboards and don&apos;t need a written narrative alongside the data</li>
              <li>Agencies that have already solved the writing bottleneck and just need better data presentation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What NarratorHQ is best for</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Agencies where the account manager currently writes a monthly email or PDF narrative — and that writing is what takes the time</li>
              <li>Teams where the data access isn&apos;t the bottleneck, but the interpretation and communication of it is</li>
              <li>Agencies that send reports rather than share dashboards — clients receive a finished document, not a login</li>
              <li>Account managers who want to review and approve AI-generated copy before it goes out, rather than write from scratch</li>
              <li>Agencies that need the report to remember context — what was promised last month, what goals the client has, what anomalies were flagged</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The reporting gap neither tool talks about</h2>
            <p>Both Whatagraph and most reporting tools are built around display: show the numbers, arrange them well, make them look professional. What they don&apos;t solve is the moment traffic drops 15% and someone has to figure out why.</p>
            <p className="mt-2">That investigation — checking whether it was a tracking issue, a seasonal pattern, a campaign pause, a Google algorithm update — is still entirely manual in most tools. And once you&apos;ve worked it out, you still have to frame it for the client in a way that doesn&apos;t cause panic.</p>
            <p className="mt-2">NarratorHQ includes anomaly detection with explanation. When something moves significantly, the report doesn&apos;t just flag a red arrow — it surfaces the likely cause, adds context from previous months, and writes the client-facing explanation automatically. That&apos;s the part of reporting that actually costs agencies time, and it&apos;s the part that most tools — Whatagraph included — haven&apos;t tackled.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Who wins?</h2>
            <p>It depends on what your agency is actually trying to solve. If your clients want interactive dashboards they can explore on their own schedule, Whatagraph is genuinely good at that. If your team is spending hours every month writing the narrative — the email, the PDF, the explanation of what happened and what it means — NarratorHQ is built specifically for that problem.</p>
            <p className="mt-2">Some agencies use both. Whatagraph handles the always-on dashboard that clients check day to day; NarratorHQ handles the monthly written report that the account manager signs off and sends. They serve different moments in the client relationship, and there&apos;s no rule that says you have to pick one.</p>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-10">
            <h3 className="font-bold text-gray-900 mb-2">See what NarratorHQ generates</h3>
            <p className="text-sm text-gray-600 mb-4">Read a real example of an AI-generated client report, or connect GA4 and get your first narrative automatically. 14-day free trial, no credit card.</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/report-example"
                className="inline-block bg-white text-blue-600 border border-blue-300 text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors"
              >
                See a report example
              </Link>
              <Link
                href="/signup"
                className="inline-block bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start free trial
              </Link>
            </div>
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
