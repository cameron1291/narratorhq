import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agency Knowledge Management: The Problem Every Agency Has and Nobody Talks About',
  description: 'Client knowledge in most agencies lives in people\'s heads. When those people leave, the knowledge goes with them. Here\'s what agency knowledge management actually looks like — and how to fix it.',
  alternates: { canonical: 'https://narratorhq.com/blog/agency-knowledge-management' },
  openGraph: {
    title: 'Agency Knowledge Management: The Problem Every Agency Has and Nobody Talks About',
    description: 'Client knowledge lives in people\'s heads. When they leave, it goes with them. Here\'s how to fix it.',
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
          <p className="text-sm text-blue-600 font-medium mb-3">Agency Operations</p>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            Agency knowledge management: the problem every agency has and nobody talks about
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Ask any agency owner where their client knowledge lives and they&apos;ll gesture vaguely at a combination of a CRM, some shared drives, and the account managers themselves. The last one is the problem.
          </p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What agency knowledge management actually means</h2>
            <p>In theory, knowledge management is about capturing, organising, and making accessible the information an organisation needs to function. In practice, for most digital marketing agencies, it means something much narrower: not losing important client information when things change.</p>
            <p className="mt-3">Things change constantly. Account managers leave. Clients reassign. Teams grow. Responsibilities shift. And every time something changes, there&apos;s a risk that the accumulated knowledge of a client relationship — what they care about, what was promised, what worked, what to avoid — disappears or degrades.</p>
            <p className="mt-3">Most agencies treat this as an inevitable cost of doing business. It isn&apos;t. It&apos;s a systems problem, and systems problems have solutions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The three kinds of client knowledge that matter</h2>

            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">1. Relational knowledge</h3>
            <p>Who is actually making decisions. What they care about. What they&apos;re anxious about. How they like to receive information. Whether they prefer direct communication or a softer approach.</p>
            <p className="mt-2">This is the hardest knowledge to capture because it feels informal — more like &quot;knowing someone&quot; than &quot;knowing facts about a client.&quot; But it&apos;s what makes the difference between a report that resonates and one that lands flat.</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">2. Commitment knowledge</h3>
            <p>What was promised. What was recommended. What the agency said it would do and when. This knowledge is generated every time an account manager writes a report, sends an email, or gets off a client call. It&apos;s the most actionable knowledge — and the most consistently lost.</p>
            <p className="mt-2">When an agency makes a commitment to a client and doesn&apos;t follow up on it, the client remembers. The agency, without a system for tracking commitments, often doesn&apos;t. That gap erodes trust in a way that&apos;s hard to diagnose because it&apos;s cumulative.</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">3. Historical knowledge</h3>
            <p>What was tried, what worked, what didn&apos;t, and in what context. Campaign decisions, budget changes, creative tests, channel shifts. This is the knowledge that enables strategic advice rather than tactical management. It&apos;s almost entirely absent from how most agencies communicate with clients.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Where client knowledge goes wrong</h2>
            <p>The failure mode is almost always the same. Knowledge that should be institutional ends up being personal. It lives in an account manager&apos;s email, their notes, their memory. When that account manager&apos;s role changes — through leaving, moving clients, going on leave — the knowledge degrades or disappears.</p>
            <p className="mt-3">The standard responses to this problem don&apos;t work well:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Handover documents</strong> — written under time pressure, capture the obvious things and miss the texture. They also become outdated immediately and nobody updates them.</li>
              <li><strong>Shared drives and Notion pages</strong> — better than nothing but require active maintenance that rarely happens. Information sits in documents nobody reads.</li>
              <li><strong>CRMs</strong> — good for contact information and pipeline data, not designed for the operational knowledge of managing an ongoing client relationship.</li>
            </ul>
            <p className="mt-3">None of these fail because agencies don&apos;t care. They fail because knowledge capture requires a separate effort on top of the actual work. When people are busy, knowledge capture gets dropped first.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The principle that changes the equation</h2>
            <p>Knowledge capture has to be a byproduct of work that&apos;s already happening, not an additional task.</p>
            <p className="mt-3">Account managers write monthly reports. Those reports contain, implicitly, almost everything that matters for knowledge management: what happened, what was promised, what was recommended, what the client cares about enough to be mentioned. If the knowledge capture happens as part of the reporting process, it happens consistently — because reporting happens consistently.</p>
            <p className="mt-3">The problem is that traditional reporting tools treat each report as an isolated document. They don&apos;t extract the knowledge from the report and store it in a form that&apos;s accessible for future use.</p>
            <p className="mt-3">An agency that changes this — that makes report-writing simultaneously a knowledge capture exercise — ends up with an institutional memory that doesn&apos;t depend on any individual staying in their role.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What good agency knowledge management looks like in practice</h2>
            <p>At a minimum, every client should have a live record of:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>The client&apos;s current goals and where they stand against them</li>
              <li>Open commitments — what the agency has promised, with dates</li>
              <li>Outstanding recommendations — what was proposed but not yet implemented</li>
              <li>Stakeholder map — who cares about what, and how they want to receive information</li>
              <li>A log of significant decisions — campaign changes, budget shifts, structural changes</li>
              <li>Recorded wins — what worked and when, for longitudinal reference</li>
            </ul>
            <p className="mt-3">This isn&apos;t a long list. But maintaining it for 15 or 20 clients, consistently, over time, is harder than it sounds when it requires a separate effort. It becomes easy when it happens automatically as part of the reporting process.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The competitive advantage agencies don&apos;t realise they&apos;re building</h2>
            <p>An agency with three years of well-maintained client knowledge has something competitors can&apos;t quickly replicate. Not just better reports — a genuine understanding of each client that deepens over time and becomes harder to replace.</p>
            <p className="mt-3">When a client considers switching agencies, they&apos;re not just evaluating capabilities and pricing. They&apos;re evaluating the cost of starting over — briefing a new agency, re-explaining three years of history, losing the institutional knowledge that makes the current relationship work. If that knowledge is properly captured and visible, the switching cost is real and significant.</p>
            <p className="mt-3">Most agencies squander this advantage by letting their knowledge live in people&apos;s heads. The agencies that don&apos;t have clients who stay much longer.</p>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-10">
            <h3 className="font-bold text-gray-900 mb-2">NarratorHQ is built around this principle</h3>
            <p className="text-sm text-gray-600 mb-4">Goals, promises, decisions, stakeholder preferences — stored automatically as part of the reporting process. Every future report draws on the full history. The knowledge stays when people leave.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/client-memory" className="inline-block bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
                See Client Memory
              </Link>
              <Link href="/blog/account-manager-handover" className="inline-block bg-white text-blue-600 border border-blue-300 text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors">
                Read the handover case study
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
