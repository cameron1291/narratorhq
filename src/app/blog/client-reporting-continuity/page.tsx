import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Reporting Continuity: Why Every Report Should Build on the Last',
  description: 'Most client reports treat each month as a fresh start. The agencies that retain clients the longest treat each report as a chapter in an ongoing story. Here\'s the difference.',
  alternates: { canonical: 'https://narratorhq.com/blog/client-reporting-continuity' },
  openGraph: {
    title: 'Client Reporting Continuity: Why Every Report Should Build on the Last',
    description: 'Most reports treat each month as a fresh start. The agencies that retain clients longest treat each report as a chapter in an ongoing story.',
  },
}

export default function BlogPost() {
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
          <p className="text-sm text-blue-600 font-medium mb-3">Client Retention</p>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            Client reporting continuity: why every report should build on the last
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Most client reports treat each month as a fresh start. The agencies that retain clients the longest treat each report as a chapter in an ongoing story. The difference in client experience is significant. The difference in retention is measurable.
          </p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What reporting continuity means</h2>
            <p>A report with continuity connects this month to everything that came before it. It references what was promised last month and whether it was delivered. It notes that this is the third consecutive month of CPA improvement, not just that CPA improved. It closes the loop on recommendations made in February. It names the initiative that started in January and tracks its progress through to now.</p>
            <p className="mt-3">A report without continuity describes what happened this month and stops there. It might be accurate, well-written, and professionally formatted. But it reads like a standalone document rather than a chapter in a relationship.</p>
            <p className="mt-3">Clients who receive reports with continuity feel managed. Clients who receive reports without it feel informed. These are not the same experience, and they don&apos;t produce the same retention outcomes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Why continuity is the hardest thing to maintain</h2>
            <p>Reporting continuity requires memory. Not just data — the data is easy — but the narrative context of what came before. What was said, what was promised, what was recommended, what the client cared about in October that should still be referenced in March.</p>
            <p className="mt-3">Most account managers carry this in their heads. For a small number of clients they manage long-term, this works. The problem is that it doesn&apos;t scale, it doesn&apos;t transfer, and it degrades over time as the relationship gets more complex and the workload increases.</p>
            <p className="mt-3">At 15 clients, the account manager has 15 sets of promises, 15 sets of ongoing recommendations, 15 different stakeholder preferences — all of which should inform this month&apos;s reports. Holding all of that in your head while also managing the campaigns is what leads to reports that feel disconnected even when they&apos;re technically correct.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The four elements of a continuous report</h2>

            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">1. Promise follow-through</h3>
            <p>Every commitment made in a previous report should be explicitly addressed in the next. Not implied, not buried — named and closed.</p>
            <p className="mt-2">&quot;Last month we committed to restructuring the Shopping campaign. Here&apos;s what we did and what changed as a result.&quot;</p>
            <p className="mt-2">This is the single most powerful thing an agency can do to build client trust. It shows that you said something, you did it, and you&apos;re telling them about it. Most agencies make promises in reports and never formally close them. Clients notice.</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">2. Goal progress tracking</h3>
            <p>If a goal was set — 100 leads per month, CPA below £40, ROAS above 3.5x — every report should explicitly state where the client stands against it. Not just the current numbers, but the trajectory and whether the goal is on track.</p>
            <p className="mt-2">&quot;The Q3 lead target is 100 per month. You&apos;re currently at 81 — ahead of the pace needed to hit the target by September.&quot;</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">3. Longitudinal narrative</h3>
            <p>When something has been improving or declining over multiple months, say so. A single month of CPA improvement is an observation. Three consecutive months is a pattern. Six months with a specific initiative driving it is a story.</p>
            <p className="mt-2">&quot;This continues a four-month improvement trend that began in January when we identified the inefficient broad match terms. CPA has improved from £52 to £34 over that period — a 35% reduction.&quot;</p>
            <p className="mt-2">No account manager writes this sentence consistently across 15 clients every month unless they have a system helping them.</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">4. Outstanding recommendation tracking</h3>
            <p>Recommendations that haven&apos;t been implemented shouldn&apos;t be dropped from the report. They should be surfaced again — not aggressively, but consistently. If a landing page redesign was recommended in February and still hasn&apos;t happened in June, the June report should note it.</p>
            <p className="mt-2">This does two things: it keeps high-impact work visible, and it demonstrates that the agency is paying attention to the full picture, not just last month&apos;s data.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What continuous reporting does for client retention</h2>
            <p>The mechanism is simple. Clients who receive continuous reports feel like they&apos;re in an ongoing relationship with an agency that understands their history. Clients who receive disconnected reports feel like they&apos;re receiving a service — competent but transactional.</p>
            <p className="mt-3">The distinction matters most at renewal time. When a client is considering their contract, they&apos;re not just evaluating last month&apos;s results. They&apos;re evaluating the relationship — whether the agency feels like a partner or a vendor.</p>
            <p className="mt-3">Agencies that have built continuity into their reporting consistently report longer average client relationships, fewer surprise cancellations, and more inbound referrals. The continuity makes the value visible in a way that data alone doesn&apos;t.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The continuity gap when account managers change</h2>
            <p>The fragility of continuity becomes most visible during an account manager transition. A new AM inherits a client with months or years of history. If that history isn&apos;t captured anywhere accessible, the continuity breaks. The next report starts over. Promises go unaddressed. Goals aren&apos;t referenced. The client notices the gap even if they can&apos;t name it.</p>
            <p className="mt-3">This is where knowledge management and reporting continuity converge. The agencies that maintain continuity through transitions are the ones that have separated client knowledge from individual account managers — storing it in systems rather than heads.</p>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-10">
            <h3 className="font-bold text-gray-900 mb-2">NarratorHQ builds continuity automatically</h3>
            <p className="text-sm text-gray-600 mb-4">Every approved report contributes to the client&apos;s memory. The next report reads the full history — goals, promises, recommendations, wins — and writes with that context automatically. Continuity that doesn&apos;t depend on anyone&apos;s memory.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/client-memory" className="inline-block bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
                See Client Memory
              </Link>
              <Link href="/demo" className="inline-block bg-white text-blue-600 border border-blue-300 text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors">
                See the demo
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
