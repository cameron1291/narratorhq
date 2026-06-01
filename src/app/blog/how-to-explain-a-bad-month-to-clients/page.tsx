import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Explain a Bad Month to Your Client Without Losing Their Trust',
  description: 'Every agency faces a bad month. How you communicate it determines whether clients stay or churn. Here\'s the framework and the language that works.',
  alternates: {
    canonical: 'https://narratorhq.com/blog/how-to-explain-a-bad-month-to-clients',
  },
  openGraph: {
    title: 'How to Explain a Bad Month to Your Client Without Losing Their Trust',
    description: 'Every agency faces a bad month. How you communicate it determines whether clients stay or churn. Here\'s the framework and the language that works.',
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
          <p className="text-sm text-blue-600 font-medium mb-3">Client Communication</p>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            How to Explain a Bad Month to Your Client Without Losing Their Trust
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Every agency faces a bad month. How you communicate it determines whether clients stay or churn. The performance isn&apos;t what kills the relationship — the silence, the vagueness, and the absence of explanation are.
          </p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The real reason bad months destroy client relationships</h2>
            <p>Most agencies assume clients leave after a bad month because of the performance. That&apos;s rarely true. Clients know marketing doesn&apos;t always go to plan. What they cannot tolerate is not knowing why.</p>
            <p className="mt-3">When a client opens a report and sees that sessions fell 22%, conversions dropped, and ROAS contracted — and the accompanying narrative says nothing more than &quot;it was a challenging month across the industry&quot; — what they feel is not frustration at the numbers. They feel abandoned. They feel like they are paying a significant retainer to an agency that either doesn&apos;t know what happened or doesn&apos;t care to find out.</p>
            <p className="mt-3">That is the moment the relationship starts to fail. Not when the numbers go red. When the explanation goes missing.</p>
            <p className="mt-3">Clients who receive a clear, honest explanation of a bad month — with a credible account of what happened and a specific plan for remediation — typically stay. They may push back. They may ask hard questions. But they stay, because they feel like their agency is across the account. Clients who receive platitudes or silence start looking for a replacement before they even finish reading the report.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The 3-part framework: What happened, Why it happened, What you&apos;re doing about it</h2>
            <p>Every explanation of a difficult month needs to do three things. Not one. Not two. All three.</p>
            <p className="mt-3"><strong>What happened</strong> is the simplest part and the one agencies get right most often. Organic traffic fell 18%. Conversion rate dropped from 3.1% to 2.4%. Cost per lead increased by 34%. These are facts. State them plainly. Clients who receive clear factual statements feel respected. Clients who receive hedged, softened, or buried facts feel managed — and they hate it.</p>
            <p className="mt-3"><strong>Why it happened</strong> is where most agencies fail. This requires actual diagnosis, not just observation. &quot;The market was competitive&quot; is not a why. &quot;CPCs increased across the account because a new competitor entered the auction for our highest-value keywords in week two of the month&quot; is a why. It tells the client that you know what you&apos;re looking at, you investigated it, and you found the cause.</p>
            <p className="mt-3"><strong>What you&apos;re doing about it</strong> is what converts an uncomfortable conversation into a retained client. It signals competence. It signals ownership. It signals that you are already working on it, not waiting to be asked. Every difficult month needs at least two or three specific, named actions that are already underway — not &quot;we are monitoring the situation&quot;, but &quot;we have already paused the underperforming ad sets, restructured the bidding strategy for the top three keywords, and published two new supporting articles targeting the pages that dropped in rankings.&quot;</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Specific language that preserves client confidence</h2>
            <p>The words you choose matter more than most agency owners realise. Here are the constructions that work, and why they work.</p>
            <p className="mt-3"><strong>&quot;We identified X as the cause.&quot;</strong> This signals investigation and conclusion. It tells the client you went looking for the cause and found it. Compare to: &quot;it appears X may have contributed&quot; — which signals uncertainty and guess-work.</p>
            <p className="mt-3"><strong>&quot;We&apos;ve already made the following changes.&quot;</strong> The word &quot;already&quot; is doing significant work here. It signals that you didn&apos;t wait for this conversation to act. You acted, and now you&apos;re reporting it. This is the posture of an accountable partner, not a defensive vendor.</p>
            <p className="mt-3"><strong>&quot;Here&apos;s what we expect to see in the next 30 days.&quot;</strong> This does more than any other sentence in a bad-month report, because it creates a specific commitment. It also creates accountability — which is exactly what you want, because it demonstrates confidence. If you&apos;re not willing to make a prediction, clients sense it. Making a specific, honest forecast (even a conservative one) says you understand the account well enough to model what will happen next.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The anomaly trap: don&apos;t describe the anomaly, explain it</h2>
            <p>This is the single most common failure mode in agency reporting, and it costs more client relationships than any other mistake. There is a critical difference between describing what happened and explaining why it happened — and most agency reports only do the former.</p>
            <p className="mt-3">&quot;Traffic fell 18% this month&quot; is a description of an anomaly. It is not an explanation. It adds no information beyond what the client could read from a raw analytics export. It answers nothing. It demonstrates nothing about the agency&apos;s understanding of the account.</p>
            <p className="mt-3">&quot;Traffic fell 18% because three of our top-ranking pages dropped in position following a Google algorithm update that targeted thin content on commercial landing pages. We have identified the specific quality signals that triggered the drop and have begun a content remediation programme across all three pages. We expect to recover 60–70% of the lost traffic within six weeks as the improvements are indexed.&quot;</p>
            <p className="mt-3">These are not both descriptions of the same event at different levels of detail. They are fundamentally different communications. The first says: something happened. The second says: we understand what happened, we know why, and we are already fixing it.</p>
            <p className="mt-3">Train yourself and your team to ask, for every negative metric in any report: &quot;Do we know <em>why</em> this changed?&quot; If you cannot answer that question, the report should not go out until you can. Or if you genuinely cannot diagnose it, say so explicitly — &quot;we are still investigating the cause of this anomaly and will update you by Thursday&quot; is honest and professional. What you must never do is describe the anomaly as if describing it were explaining it.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What NOT to say</h2>
            <p>There are phrases that appear in agency reports constantly that actively damage client trust. These are not neutral filler — they signal incompetence or evasion.</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>&quot;We&apos;re looking into it.&quot;</strong> This tells the client you don&apos;t know yet. Use this only if you have a clear timeline: &quot;We are investigating and will have a full diagnosis for you by Wednesday.&quot; Without a timeline, it is an admission of ignorance dressed up as process.</li>
              <li><strong>&quot;The data is still being analysed.&quot;</strong> Never send a report where the data hasn&apos;t been analysed. If the analysis isn&apos;t done, don&apos;t send the report. Sending a report that says &quot;we haven&apos;t analysed this yet&quot; is worse than sending nothing.</li>
              <li><strong>&quot;It was a tough month across the board.&quot;</strong> This is the single most damaging phrase in client reporting. It attributes the poor performance to external factors without any evidence, and it tells the client that every other agency had the same results — implying that your work had nothing to do with it. Even if it&apos;s true that conditions were difficult industry-wide, you need to name the specific condition, cite the evidence, and then explain what you did about it. Vague externalising of blame reads as excuse-making.</li>
              <li><strong>&quot;We&apos;ll do better next month.&quot;</strong> This is not a plan. A plan names what will change, when, and what result is expected. &quot;We&apos;ll do better next month&quot; is a wish.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Client memory matters: reference what you said last month</h2>
            <p>This gets overlooked more than almost anything else in client communication — and it does more to hold trust in a difficult month than nearly anything else you can do.</p>
            <p className="mt-3">When last month&apos;s report said: &quot;We expect the new campaign restructure to begin showing results by mid-November&quot; — and this month&apos;s report says: &quot;The campaign restructure we implemented last month has started to deliver: CPL is down 14% week-on-week in the final two weeks of the period&quot; — the client feels something very specific. They feel remembered. They feel that the agency treats their account as an ongoing relationship with a history, not a monthly transaction with no continuity.</p>
            <p className="mt-3">Clients who feel remembered feel valued. Clients who receive a report that has no connection to anything that was said last month — no reference to previous commitments, no acknowledgement of what was predicted and whether it happened — feel like they&apos;re receiving a generic output from a process that has nothing to do with them specifically. Those clients leave.</p>
            <p className="mt-3">Make referencing prior commitments a non-negotiable part of every monthly report. Keep a running record of what was said, what was promised, what was predicted. Use it. Even in a bad month — especially in a bad month — connecting this month&apos;s narrative to last month&apos;s commitments demonstrates that you are managing the account with continuity and care.</p>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-10">
            <h3 className="font-bold text-gray-900 mb-2">NarratorHQ detects anomalies and explains them automatically</h3>
            <p className="text-sm text-gray-600 mb-4">Every report flags what changed, diagnoses why, and drafts the explanation — so your account managers review rather than write. See it in action with a live report example.</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/demo"
                className="inline-block bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book a demo
              </Link>
              <Link
                href="/report-example"
                className="inline-block bg-white text-blue-600 text-sm font-semibold px-5 py-2.5 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
              >
                See a report example
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
