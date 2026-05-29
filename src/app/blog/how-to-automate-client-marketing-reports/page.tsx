import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Automate Client Marketing Reports (Without Losing Quality)',
  description: 'A practical guide for digital marketing agencies to automate monthly client reports — connecting GA4, Google Ads, and Meta data, and writing reports that clients actually read.',
  openGraph: {
    title: 'How to Automate Client Marketing Reports',
    description: 'Stop spending 20 hours a month on copy-paste. Here\'s how modern agencies automate client reporting while keeping the narrative quality high.',
  },
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/"><img src="/logo.png" alt="NarratorHQ" className="h-9 w-auto" /></Link>
          <Link href="/signup" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Start free trial
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-sm text-blue-600 font-medium mb-3">Agency Workflow</p>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            How to Automate Client Marketing Reports (Without Losing Quality)
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Most agency account managers spend 1–3 hours per client, per month writing performance reports. Here&apos;s how to cut that to under 10 minutes — without sacrificing the narrative quality that keeps clients retained.
          </p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Why client reports take so long</h2>
            <p>The data pull is fast. GA4, Google Ads, and Meta all have dashboards. The slow part is turning those numbers into a coherent story.</p>
            <p>An account manager writing a monthly report has to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>Pull data from 2–4 platforms, often with different attribution windows</li>
              <li>Reconcile contradictory numbers (GA4 shows 200 conversions, Meta claims 180 — who&apos;s right?)</li>
              <li>Figure out <em>why</em> something changed, not just that it changed</li>
              <li>Frame the narrative in a way that makes the agency look strategic, not just data-forwarding</li>
              <li>Remember what was promised last month and reference it</li>
            </ul>
            <p className="mt-3">That&apos;s 1–3 hours of skilled thinking. It can&apos;t be solved with a dashboard.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What automation can (and cannot) replace</h2>
            <p><strong>Can automate:</strong> data pulls, period-over-period comparison, anomaly detection, first-draft narrative generation, PDF formatting, email delivery.</p>
            <p className="mt-2"><strong>Cannot automate:</strong> the account manager&apos;s judgment about tone, the context of what was promised, the strategic framing of a difficult month. These need human review.</p>
            <p className="mt-2">The goal isn&apos;t to remove the account manager from the loop. It&apos;s to get the first draft in their hands in 30 seconds instead of 90 minutes, so their 10 minutes of review is spent on judgment — not on copy-paste.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The five components of a well-automated report</h2>

            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">1. A single canonical metric schema</h3>
            <p>GA4 calls them &quot;sessions.&quot; Google Ads calls them &quot;clicks.&quot; Meta calls them &quot;link clicks.&quot; Before you can write a coherent report, you need a single data model that all platforms map into. Define: sessions, users, conversions, spend, impressions, clicks, CTR, CPC, CPA, ROAS, revenue. Map every platform&apos;s fields to this schema explicitly, and disclose attribution differences inline.</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">2. Anomaly detection before narrative generation</h3>
            <p>The most valuable reporting insight isn&apos;t &quot;sessions were up 12%.&quot; It&apos;s &quot;sessions were up 12% but conversions fell 8% — what does that mean?&quot; Build or use a system that detects metric divergences before writing anything, and passes those anomalies into the narrative generation prompt.</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">3. Client context as persistent memory</h3>
            <p>Every client has goals, sensitivities, and previous promises. A report system that forgets these every month produces generic narrative. Store per-client: goals, things never to frame negatively, reusable instructions, and a summary of what was said last month. This context should inform every draft.</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">4. Human review that takes under 5 minutes</h3>
            <p>If the review process is slow, account managers will stop trusting it and go back to manual. The review UI needs: section-level editing (not whole-document editing), confidence indicators (so reviewers know where to focus), one-click approve, and a clear diff showing what changed vs. last month.</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">5. White-label delivery</h3>
            <p>The report should come from the agency, not from the tool. PDF branded with the agency&apos;s logo and colour. Email sent from the agency&apos;s domain. The client should have no idea what software is being used behind the scenes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Tools that exist (and what they miss)</h2>
            <p><strong>AgencyAnalytics</strong> ($39–$479/mo): dashboards and report templates. Added &quot;AI Summary&quot; in 2024 — basic, not automated, not integrated into an approval workflow. Good for dashboards; still manual for narrative.</p>
            <p className="mt-2"><strong>DashThis</strong> ($39–$149/mo): similar — dashboards, some AI summaries. No narrative automation, no approval queue.</p>
            <p className="mt-2"><strong>NarratorHQ</strong>: built specifically for narrative automation. Connects GA4, Google Ads, and Meta Ads; generates structured AI narrative with confidence scores; delivers to an approval queue for review and edit before sending white-labeled to clients. Purpose-built for this workflow rather than retrofitted onto a dashboard product.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The ROI for agencies</h2>
            <p>At 15 clients, 2 hours per report, monthly: <strong>30 hours per month</strong> on report writing. At a blended agency rate of £75/hr, that&apos;s £2,250/month of senior time on admin.</p>
            <p className="mt-2">At 10 minutes per report (review + approve): 2.5 hours total. The tool costs £249/month at 15 clients. Net saving: over £2,000/month in reclaimed capacity, plus the margin expansion from either billing that time elsewhere or not hiring a junior to handle reporting.</p>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-10">
            <h3 className="font-bold text-gray-900 mb-2">Try it with your own clients</h3>
            <p className="text-sm text-gray-600 mb-4">NarratorHQ connects to GA4, Google Ads, and Meta in minutes. 14-day free trial, no credit card.</p>
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
