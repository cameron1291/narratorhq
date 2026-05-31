import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ReportGarden Alternative — NarratorHQ',
  description: 'Looking for a ReportGarden alternative that writes the narrative automatically? NarratorHQ generates the story behind your client data, not just the data itself.',
  alternates: { canonical: 'https://narratorhq.com/blog/reportgarden-alternative' },
  openGraph: {
    title: 'ReportGarden Alternative — NarratorHQ',
    description: 'ReportGarden templates need manual writing. NarratorHQ writes the narrative automatically.',
  },
}

const COMPARISON = [
  { feature: 'GA4, Google Ads, Meta connections', reportGarden: '✓', narratorHQ: '✓' },
  { feature: 'Drag-and-drop report templates', reportGarden: '✓ Core feature', narratorHQ: '— Not the focus' },
  { feature: 'White-label PDF reports', reportGarden: '✓', narratorHQ: '✓ Included' },
  { feature: 'Automated report scheduling', reportGarden: '✓', narratorHQ: '✓' },
  { feature: 'AI narrative generation', reportGarden: '✗', narratorHQ: '✓ Full written narrative' },
  { feature: 'Automated report writing', reportGarden: '✗ Templates only', narratorHQ: '✓ Core feature' },
  { feature: 'Client memory (goals, promises)', reportGarden: '✗', narratorHQ: '✓' },
  { feature: 'Approval queue with inline editing', reportGarden: '✗', narratorHQ: '✓' },
  { feature: 'Anomaly detection + explanation', reportGarden: '✗', narratorHQ: '✓' },
  { feature: 'Client portal', reportGarden: '✓', narratorHQ: '✓ Shared report link' },
  { feature: 'Price at 10 clients', reportGarden: '~$49/mo', narratorHQ: '£249/mo' },
]

export default function ReportGardenAlternativePage() {
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
            ReportGarden vs NarratorHQ: which is right for your agency?
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            ReportGarden is a solid, affordable reporting tool for agencies that want templated PDF reports. NarratorHQ is for agencies where the bottleneck isn&apos;t the template — it&apos;s the writing.
          </p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The core difference</h2>
            <p>
              ReportGarden is one of the more affordable reporting tools on the market. It pulls data from Google Ads, GA4, and Meta into customisable PDF report templates, schedules delivery, and gives clients a portal to view historical reports. For agencies that want a professional-looking report at a low price point, it delivers.
            </p>
            <p className="mt-3">
              The limitation is the same one shared by every template-based reporting tool: the narrative text has to be written manually. The template shows the numbers — someone still has to write &quot;Google Ads delivered strong results this month, with CPA improving by 18%...&quot; and update it every single month for every single client.
            </p>
            <p className="mt-3">
              NarratorHQ generates that text. It pulls the data, writes the section, flags what changed and why, and drafts the whole report for review. An account manager reviews and approves — typically in under 5 minutes — and it sends.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Feature comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-500 w-36">ReportGarden</th>
                    <th className="text-center py-2 px-3 font-semibold text-blue-600 w-32">NarratorHQ</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map(row => (
                    <tr key={row.feature} className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 text-gray-700">{row.feature}</td>
                      <td className="py-2.5 px-3 text-center text-gray-500">{row.reportGarden}</td>
                      <td className="py-2.5 px-3 text-center text-gray-800 font-medium">{row.narratorHQ}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Where ReportGarden fits</h2>
            <p>ReportGarden is a sensible choice if:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>You manage a small number of clients (&lt;10) and the writing time is manageable</li>
              <li>Your clients want a standardised, data-heavy PDF and don&apos;t read narrative carefully</li>
              <li>Budget is tight and the priority is a professional-looking PDF at low cost</li>
              <li>Your team is already in the habit of writing monthly commentary and just needs it formatted</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">When agencies outgrow ReportGarden</h2>
            <p>The template model works at low volume. As you take on more clients, the cumulative writing time becomes the constraint:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>At 10 clients: ~15–20 hours/month on reporting</li>
              <li>At 20 clients: ~30–40 hours/month — nearly a full-time job</li>
              <li>At 30+ clients: writing and sending reports is your biggest operational cost, invisible on the P&amp;L</li>
            </ul>
            <p className="mt-3">
              NarratorHQ changes this equation. Once the template-based model starts costing more in labour than the tool saves in effort, the narrative automation approach pays for itself quickly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Pricing comparison</h2>
            <p>
              ReportGarden pricing starts at ~$49/month for up to 10 clients — significantly cheaper than NarratorHQ&apos;s £249/month Growth plan.
            </p>
            <p className="mt-3">
              The question is whether the time saved justifies the cost difference. If an account manager earns £30,000/year and spends 15 hours/month on reporting, that&apos;s ~£225/month in labour cost per month — before factoring in overtime, freelancers, or the opportunity cost of not doing higher-value work. For most agencies, the maths work out clearly once client volume reaches 10+.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Who should use which</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="border border-gray-200 rounded-xl p-4">
                <p className="font-semibold text-gray-900 mb-2">Choose ReportGarden if:</p>
                <ul className="text-sm space-y-1.5 text-gray-600 list-disc list-inside">
                  <li>You have fewer than 10 clients</li>
                  <li>Budget is a hard constraint</li>
                  <li>Clients want data-heavy PDF reports</li>
                  <li>Your team doesn&apos;t mind writing commentary</li>
                </ul>
              </div>
              <div className="border border-blue-200 bg-blue-50 rounded-xl p-4">
                <p className="font-semibold text-blue-900 mb-2">Choose NarratorHQ if:</p>
                <ul className="text-sm space-y-1.5 text-blue-800 list-disc list-inside">
                  <li>You have 10+ clients and writing is a bottleneck</li>
                  <li>You want the AI to write the narrative, not templates</li>
                  <li>You want past promises tracked and addressed automatically</li>
                  <li>You want a review-and-send workflow, not a write-from-scratch one</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="bg-blue-600 rounded-2xl p-8 text-center text-white mt-8">
            <h2 className="text-xl font-bold mb-2">Try NarratorHQ free for 14 days</h2>
            <p className="text-blue-100 text-sm mb-6">No credit card required. Generate your first client report in under 30 seconds.</p>
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
          <Link href="/blog/looker-studio-alternative" className="hover:text-gray-600">vs Looker Studio</Link>
        </div>
      </footer>
    </div>
  )
}
