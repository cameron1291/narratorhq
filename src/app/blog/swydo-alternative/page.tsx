import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Swydo Alternative — NarratorHQ',
  description: 'Looking for a Swydo alternative that writes the narrative, not just builds the report template? NarratorHQ automates the story behind the data.',
  alternates: { canonical: 'https://narratorhq.com/blog/swydo-alternative' },
  openGraph: {
    title: 'Swydo Alternative — NarratorHQ',
    description: 'Swydo automates report assembly. NarratorHQ automates the writing. Here\'s the difference.',
  },
}

const COMPARISON = [
  { feature: 'GA4, Google Ads, Meta connections', swydo: '✓', narratorHQ: '✓' },
  { feature: 'Drag-and-drop report templates', swydo: '✓ Core feature', narratorHQ: '— Not the focus' },
  { feature: 'Automated report scheduling', swydo: '✓', narratorHQ: '✓' },
  { feature: 'AI narrative generation', swydo: '✗', narratorHQ: '✓ Full written narrative' },
  { feature: 'Automated report writing', swydo: '✗ Template assembly only', narratorHQ: '✓ Core feature' },
  { feature: 'Client memory (goals, promises)', swydo: '✗', narratorHQ: '✓' },
  { feature: 'Approval queue with inline editing', swydo: '✗', narratorHQ: '✓' },
  { feature: 'Anomaly detection + written explanation', swydo: '✗', narratorHQ: '✓' },
  { feature: 'White-label email delivery', swydo: '✓', narratorHQ: '✓ Included' },
  { feature: 'PDF report', swydo: '✓', narratorHQ: '✓ Included' },
  { feature: 'Price at 10 clients', swydo: '~$149/mo', narratorHQ: '£249/mo' },
]

export default function SwydoAlternativePage() {
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
            Swydo vs NarratorHQ: which is right for your agency?
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Swydo automates the assembly of data into report templates. NarratorHQ automates the writing — the narrative that explains what the data means.
          </p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The core difference</h2>
            <p>
              Swydo is a well-regarded reporting tool popular with PPC and digital marketing agencies. You build a report template once — connecting data widgets, adding your logo, defining the layout — and Swydo populates it with fresh data on schedule and delivers it to clients.
            </p>
            <p className="mt-3">
              The template still contains static text. You have to write "Organic search performance improved this month due to..." into the template, and it sends that same sentence every month regardless of whether organic actually improved. For the narrative to be accurate, someone has to update it manually.
            </p>
            <p className="mt-3">
              NarratorHQ generates the narrative fresh each month — pulling the actual data, detecting what changed and why, and writing a report that reflects what actually happened. Account managers review and approve before it goes out, but they don&apos;t write it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Feature comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-500 w-32">Swydo</th>
                    <th className="text-center py-2 px-3 font-semibold text-blue-600 w-32">NarratorHQ</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map(row => (
                    <tr key={row.feature} className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 text-gray-700">{row.feature}</td>
                      <td className="py-2.5 px-3 text-center text-gray-500">{row.swydo}</td>
                      <td className="py-2.5 px-3 text-center text-gray-800 font-medium">{row.narratorHQ}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What Swydo does well</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Clean, flexible report templates that match your brand</li>
              <li>Strong PPC data integration — Google Ads, Meta, Microsoft Ads</li>
              <li>Automated scheduling and email delivery to clients</li>
              <li>Simple enough that junior team members can set it up</li>
              <li>Good value at lower client volumes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Where agencies hit friction with Swydo</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Static narrative text.</strong> The commentary in Swydo reports has to be written manually. If organic dropped this month but your template says &quot;organic continues to grow,&quot; someone has to catch that before it goes out.</li>
              <li><strong>No memory between reports.</strong> If you promised to address rising CPAs in March, Swydo has no way to surface that promise in April&apos;s report — that&apos;s still done manually.</li>
              <li><strong>No anomaly explanation.</strong> When something unexpected happens — traffic spiked but conversions dropped — Swydo shows the numbers but doesn&apos;t explain why. Account managers have to write that themselves.</li>
              <li><strong>High review burden at scale.</strong> Each client&apos;s report needs a manual narrative update before sending. With 15+ clients, this becomes a significant monthly overhead.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The one thing NarratorHQ adds</h2>
            <p>
              The narrative. Not a template with boilerplate text — an actual written explanation of what happened, backed by the data, referencing what you said last month, and written in the tone your client expects.
            </p>
            <p className="mt-3">
              NarratorHQ also stores client memory: goals set in onboarding, sensitivities (&quot;this client hates seeing bounce rate&quot;), and promises made in previous reports (&quot;we&apos;ll fix the mobile CPC issue by May&quot;). Every new report drafts knowing all of this.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Who should use which</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="border border-gray-200 rounded-xl p-4">
                <p className="font-semibold text-gray-900 mb-2">Choose Swydo if:</p>
                <ul className="text-sm space-y-1.5 text-gray-600 list-disc list-inside">
                  <li>You want full control over layout and visual templates</li>
                  <li>Clients want data-heavy, table-driven reports</li>
                  <li>Your team is comfortable writing narrative manually</li>
                  <li>You have a small number of clients (&lt;10)</li>
                </ul>
              </div>
              <div className="border border-blue-200 bg-blue-50 rounded-xl p-4">
                <p className="font-semibold text-blue-900 mb-2">Choose NarratorHQ if:</p>
                <ul className="text-sm space-y-1.5 text-blue-800 list-disc list-inside">
                  <li>Writing the monthly narrative is your bottleneck</li>
                  <li>You want the AI to track and address past promises</li>
                  <li>You have 10+ clients and the manual update cycle is painful</li>
                  <li>You want the report to explain anomalies, not just show them</li>
                </ul>
              </div>
            </div>
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
          <Link href="/blog/databox-alternative" className="hover:text-gray-600">vs Databox</Link>
          <Link href="/blog/looker-studio-alternative" className="hover:text-gray-600">vs Looker Studio</Link>
          <Link href="/blog/reportgarden-alternative" className="hover:text-gray-600">vs ReportGarden</Link>
        </div>
      </footer>
    </div>
  )
}
