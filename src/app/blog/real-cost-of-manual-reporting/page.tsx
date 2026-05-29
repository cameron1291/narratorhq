import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Real Cost of Manual Client Reporting (It\'s Not Just Time)',
  description: 'Agencies know manual reporting takes time. But the real cost goes deeper: quality inconsistency, delivery delays, team burnout, and client churn.',
  alternates: {
    canonical: 'https://narratorhq.com/blog/real-cost-of-manual-reporting',
  },
  openGraph: {
    title: 'The Real Cost of Manual Client Reporting (It\'s Not Just Time)',
    description: 'Agencies know manual reporting takes time. But the real cost goes deeper: quality inconsistency, delivery delays, team burnout, and client churn.',
  },
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
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
          <p className="text-sm text-blue-600 font-medium mb-3">Agency Operations</p>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            The Real Cost of Manual Client Reporting (It&apos;s Not Just Time)
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Every agency operator knows manual reporting is expensive in hours. Most haven&apos;t fully accounted for the rest of the invoice: quality inconsistency, late delivery, context loss, a ceiling on growth, and the slow erosion of your best people&apos;s motivation.
          </p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The obvious cost: time</h2>
            <p>Start with the number everyone knows. A competent account manager writing a thorough monthly client report takes between one and three hours, depending on the complexity of the account and the quality of the output expected. Call it two hours as a working average.</p>
            <p className="mt-3">At 15 clients, that is 30 hours per month. At a fully loaded internal cost of £25 per hour for the account manager&apos;s time — a conservative figure that excludes benefits, overhead, and management — that is <strong>£750 per month in direct labour</strong> on reporting alone. If you include the senior time spent reviewing, formatting, and approving before sending, that number climbs to £1,000–£1,125 per month. Every month. At 20 clients it&apos;s £1,500. At 30 it&apos;s north of £2,000.</p>
            <p className="mt-3">Most agencies know this number abstractly. What they often fail to do is treat it as a line item — a recurring cost that is as real as software subscriptions or office rent, and one that grows automatically with every new client they win. Winning new business doesn&apos;t just add revenue. It adds a non-negotiable block of unrecoverable reporting time that no client will ever pay for directly.</p>
            <p className="mt-3">That is the obvious cost. Here is where it gets more expensive.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The hidden costs that compound quietly</h2>

            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">1. Quality inconsistency</h3>
            <p>Manual work is variable by nature. The report that goes out on a Tuesday morning after a focused two-hour session from a well-rested account manager is a different product from the report that goes out at 5pm on a Friday after a difficult week. Both may contain the same data. The analysis, the narrative depth, and the quality of the explanations will not be the same.</p>
            <p className="mt-3">Clients notice this more than agencies realise. They may not articulate it as &quot;the report quality varied this month,&quot; but they feel the difference between a report that clearly had time and thought invested in it and one that feels rushed. That feeling accumulates. It shapes their overall perception of whether the agency is across their account. It influences renewal decisions in ways that never get surfaced in exit interviews.</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">2. Delivery latency</h3>
            <p>Most agencies have a target delivery date for monthly reports — typically somewhere between the 3rd and the 10th of the following month. Most agencies consistently miss it by days. The report that should go out on the 5th goes out on the 12th because the account manager was on a pitch, or onboarding a new client, or dealing with a campaign crisis.</p>
            <p className="mt-3">That seven-day gap is not neutral. Clients who expect a report on the 5th and don&apos;t receive it fill the silence with anxiety. They wonder what the numbers looked like. They start logging into their own analytics. They begin forming their own (usually worse) interpretation of the data before your narrative arrives. By the time the report lands, they are already primed for disappointment. Delivery latency is a client experience failure, and manual reporting makes it structurally inevitable.</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">3. Context loss</h3>
            <p>Account managers leave. They get sick. They take holiday. They move between clients. When that happens, client context — the nuance of what this client cares about, the specific phrasing they hate, the commitment made in the October report that needs to be referenced in November — lives in one person&apos;s head and nowhere else.</p>
            <p className="mt-3">The substitute account manager writes a generic report. They do not reference last month&apos;s commitments because they don&apos;t know what they were. They do not avoid the framing the client dislikes because nobody told them. The client receives a report that demonstrates, clearly, that the agency does not know them. That is a retention problem that disguises itself as a staffing problem.</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">4. The scaling constraint</h3>
            <p>This is the structural cost that limits agency growth more than almost anything else. Every new client you win adds one to three hours of non-billable reporting work per month, permanently. That work does not go away. It does not get more efficient over time. It grows linearly with headcount.</p>
            <p className="mt-3">The result is a growth ceiling. At some number of clients — typically somewhere between 10 and 20 — reporting becomes a full-time job. You either let quality drop as the reporting load piles onto existing staff, or you hire specifically to handle the reporting overhead. Neither is a good outcome. The first damages client relationships. The second adds a headcount cost that eats the margin on every new client you win.</p>
            <p className="mt-3">Agencies that do not solve this problem discover it when they try to grow. The operational model that worked at 8 clients does not work at 18. The only way through is to break the linear relationship between client count and reporting hours.</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">5. Senior resource misuse</h3>
            <p>This is the cost that is most invisible because it shows up as opportunity cost, not as a line item. When your best account managers spend 10–15% of their month writing reports, they are not doing strategy. They are not doing retention conversations. They are not proactively identifying growth opportunities for clients. They are not building the kind of relationship depth that makes a client impossible to poach.</p>
            <p className="mt-3">Report writing is not a senior skill. It requires knowledge of the account, but the actual act of converting data into a structured narrative is mechanical. It is the kind of work that should be the output of a tool, reviewed by a senior person — not written from scratch by one. When you ask your highest-value people to do mechanical work, you are eroding the quality of everything else they should be doing.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The compounding effect</h2>
            <p>Each of these costs can be rationalised individually. An occasional quality dip, a report that goes out a few days late, one context handover that wasn&apos;t perfect — none of these is a crisis in isolation.</p>
            <p className="mt-3">Together, over months and years, they produce an agency that is harder to grow, less profitable per client, more dependent on specific individuals, and more vulnerable to churn from clients who feel they are not being properly managed. The costs do not add — they multiply. Low delivery quality plus delivery latency plus no prior-month references equals a client who no longer believes the agency is across their account. That client leaves at the first renewal conversation where they feel they have room to.</p>
            <p className="mt-3">Manual reporting is not just inefficient. It is a structural drag on every dimension of agency quality and growth. The agencies that recognise it as a systems problem — not a staffing problem or a time management problem — are the ones that solve it.</p>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-10">
            <h3 className="font-bold text-gray-900 mb-2">Automate the writing. Keep the judgment.</h3>
            <p className="text-sm text-gray-600 mb-4">NarratorHQ generates the full report narrative from your client data. Your account managers review and approve in under 10 minutes. 14-day free trial, no credit card.</p>
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
