import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Account Manager Handover: How to Transfer Client Knowledge Without Losing It',
  description: 'The new account manager inherited a client with 8 months of history. They had full context on day one. The client never noticed the switch. Here\'s how.',
  alternates: { canonical: 'https://narratorhq.com/blog/account-manager-handover' },
  openGraph: {
    title: 'Account Manager Handover: How to Transfer Client Knowledge Without Losing It',
    description: 'The new account manager had full context on day one. The client never noticed the switch.',
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
          <p className="text-sm text-blue-600 font-medium mb-3">Agency Knowledge Management</p>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            Account manager handover: how to transfer client knowledge without losing it
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            The new account manager inherited a client with 8 months of history. They had full context on day one.
            The client never noticed the switch. Here&apos;s what made that possible — and why most agencies can&apos;t do it.
          </p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The account manager handover problem nobody talks about</h2>
            <p>When an account manager leaves, agencies focus on the wrong things. They worry about the salary replacement cost, the recruitment timeline, the onboarding. These are real problems. But the most expensive thing that happens — the thing that actually kills client relationships — is what doesn&apos;t transfer.</p>
            <p className="mt-3">The knowledge.</p>
            <p className="mt-3">Not the data. Any reporting tool can show you last month&apos;s numbers. The knowledge that doesn&apos;t transfer is everything else: what the client actually cares about, what was promised in the October report and never followed up on, what the CFO said on the March call that changed the entire strategy, which recommendations are still outstanding, what language the client hates.</p>
            <p className="mt-3">That knowledge lives in one person&apos;s head. When they leave, it goes with them. And the incoming account manager — no matter how experienced — starts from scratch.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What &quot;starting from scratch&quot; actually looks like</h2>
            <p>The new AM reads the last three reports. This gives them the recent data — sessions, CPA, ROAS, what happened last month. It does not give them:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>The goal set in January that hasn&apos;t been hit yet</li>
              <li>The promise made in the March report to fix mobile CPCs — which was partially addressed but never formally closed</li>
              <li>The fact that the MD is data-literate but the CFO isn&apos;t, and reports need to lead with cost per lead in plain English</li>
              <li>The landing page recommendation from April that the client hasn&apos;t implemented yet but keeps asking about</li>
              <li>The budget cut in September that makes the year-on-year comparisons misleading</li>
            </ul>
            <p className="mt-3">The new AM writes the first report. It&apos;s technically correct. It covers the data. But it feels disconnected — generic, like something produced by someone who doesn&apos;t know the client. Because it is.</p>
            <p className="mt-3">The client notices. They don&apos;t always say anything. But they start to feel like they&apos;re not being managed. That feeling is the beginning of churn.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The handover that went differently</h2>
            <p>This is a composite scenario, but it&apos;s based on exactly the kind of situation agencies face every quarter.</p>
            <p className="mt-3">An account manager had been managing a home improvement client for eight months. Strong relationship, detailed knowledge, good results. She took a role at a different agency. Two weeks&apos; notice.</p>
            <p className="mt-3">Under the old process, this would have meant a frantic handover document, a couple of calls, and a new AM trying to piece together eight months of context from a collection of reports, a Notion doc, and whatever survived in the outgoing AM&apos;s inbox.</p>
            <p className="mt-3">Under the new process — using NarratorHQ — the incoming AM opened the client&apos;s Intelligence tab on day one. What they found:</p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mt-4 space-y-3">
              {[
                { label: 'Goal', color: 'bg-green-100 text-green-800', text: 'Reach 100 qualified leads/month by Q3. Currently at 81. On track.' },
                { label: 'Open Promise', color: 'bg-blue-100 text-blue-800', text: 'Mobile CPA addressed in March — but only partially. Ongoing.' },
                { label: 'Stakeholder', color: 'bg-violet-100 text-violet-800', text: 'MD wants plain English. CFO cares about cost per lead only. Never mention CTR.' },
                { label: 'Recommendation', color: 'bg-amber-100 text-amber-800', text: 'Landing page redesign proposed April — not yet implemented. Client keeps asking.' },
                { label: 'Change', color: 'bg-orange-100 text-orange-800', text: 'Budget cut 15% in September — year-on-year comparisons are misleading before that date.' },
                { label: 'Win', color: 'bg-emerald-100 text-emerald-800', text: 'Content cluster launched February — now drives 40% of organic conversions.' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-2.5">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${item.color}`}>{item.label}</span>
                  <p className="text-sm text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>

            <p className="mt-5">The first report the new AM sent — generated automatically from this context — referenced the outstanding landing page recommendation, updated the progress toward the Q3 goal, and led with cost per lead because it knew the CFO was the decision maker. The writing framing was plain English throughout.</p>
            <p className="mt-3">The client&apos;s response: &quot;Great report as always.&quot;</p>
            <p className="mt-3">They never knew the AM had changed.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Why most agency handovers fail</h2>
            <p>It&apos;s not because account managers don&apos;t care about the clients they&apos;re handing over. Most do. It&apos;s because the systems agencies use to document client knowledge are inadequate for the actual depth of what needs to be transferred.</p>
            <p className="mt-3">A Google Doc handover note covers the obvious things. It doesn&apos;t capture the texture of the relationship — the things the outgoing AM knows implicitly but wouldn&apos;t think to write down because they&apos;re just part of how they talk to this client.</p>
            <p className="mt-3">The most important client knowledge is the knowledge that feels so obvious to the person who has it that they don&apos;t realise it needs to be documented.</p>
            <p className="mt-3">The only way to solve this is to make knowledge capture automatic — not a separate task that happens during a handover, but something that builds continuously from the work that&apos;s already being done.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What needs to be captured — and when</h2>
            <p>Most agencies think about handover documentation as something that happens at the end of a relationship, when someone is leaving. This is backwards. By the time you need it, it&apos;s too late to do it well.</p>
            <p className="mt-3">Client knowledge should be captured as a byproduct of normal account management work:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>After each client call:</strong> any preference, concern, or priority the client expressed that changes how you&apos;ll approach the account</li>
              <li><strong>When each report is written:</strong> any promise, recommendation, or commitment that should be tracked into the next report</li>
              <li><strong>When a campaign changes:</strong> any budget, tracking, or structural change that should be flagged in future period comparisons</li>
              <li><strong>When something works:</strong> the win, the specific action taken, the improvement achieved — recorded for longitudinal reference</li>
            </ul>
            <p className="mt-3">If this happens consistently, the handover document writes itself. The incoming AM doesn&apos;t need a long brief. They need access to the accumulated context.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The real cost of knowledge loss</h2>
            <p>Agencies tend to measure account manager turnover in terms of recruitment cost and onboarding time. These are visible, quantifiable numbers. The invisible cost — the one that doesn&apos;t appear on any spreadsheet — is what happens to the client relationships during and after the transition.</p>
            <p className="mt-3">A client who feels that their new account manager doesn&apos;t know them reassesses the relationship. Not dramatically, not immediately — but gradually. The questions get slightly harder. The calls feel slightly more transactional. The renewal conversation that would have been straightforward becomes a negotiation.</p>
            <p className="mt-3">Over a book of business, even one or two client losses attributable to poor handovers has a compounding effect on annual revenue. The cost is real. It just doesn&apos;t show up in the line labelled &quot;account manager turnover.&quot;</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What good looks like</h2>
            <p>The goal of an account manager handover shouldn&apos;t be &quot;the new person gets up to speed within a month.&quot; That&apos;s the floor. The goal should be: the client doesn&apos;t notice.</p>
            <p className="mt-3">That&apos;s achievable. But only if the knowledge that makes an account manager good at their job for a specific client is stored somewhere outside their head — and accessible from day one to whoever picks it up next.</p>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-10">
            <h3 className="font-bold text-gray-900 mb-2">NarratorHQ stores client context automatically</h3>
            <p className="text-sm text-gray-600 mb-4">Goals, promises, stakeholder preferences, recommendations, decisions — all stored and applied to every report. When an account manager leaves, the knowledge stays. The client never notices the switch.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/client-memory" className="inline-block bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
                See how Client Memory works
              </Link>
              <Link href="/signup" className="inline-block bg-white text-blue-600 border border-blue-300 text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors">
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
