import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What Is a Client Intelligence Platform? (And Why Agencies Need One)',
  description: 'A client intelligence platform stores everything an agency knows about a client — goals, preferences, history, commitments — and makes it available automatically in every client-facing output.',
  alternates: { canonical: 'https://narratorhq.com/blog/client-intelligence-platform' },
  openGraph: {
    title: 'What Is a Client Intelligence Platform?',
    description: 'A client intelligence platform stores everything an agency knows about a client and makes it available automatically in every client-facing output.',
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
          <p className="text-sm text-blue-600 font-medium mb-3">Client Intelligence</p>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            What is a client intelligence platform — and why do agencies need one?
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            A client intelligence platform stores everything an agency knows about a client — goals, preferences, history, commitments — and makes it available automatically in every client-facing output. It&apos;s the difference between an agency that knows its clients and one that has to rediscover them every month.
          </p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The definition</h2>
            <p>A client intelligence platform is a system that captures, stores, and applies client-specific knowledge across every interaction an agency has with that client. It&apos;s distinct from a CRM (which tracks contacts, pipeline, and communications) and from a reporting tool (which shows data). A client intelligence platform focuses specifically on the knowledge that makes client communication better over time.</p>
            <p className="mt-3">In practice, for a digital marketing agency, that means:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>What the client is trying to achieve — their actual business goals, not just campaign KPIs</li>
              <li>What has been committed to on their behalf — promises made in reports, calls, and briefings</li>
              <li>What they care about and how — which stakeholders read reports, what metrics they focus on, what language they understand</li>
              <li>What has worked and what hasn&apos;t — a historical record of decisions, campaigns, and their outcomes</li>
              <li>What&apos;s outstanding — recommendations made but not yet implemented, questions raised but not yet answered</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Why this is different from a CRM</h2>
            <p>CRMs are contact databases. They track who works at a client company, when the last meeting was, what stage of the pipeline a prospect is in. They&apos;re excellent at their job, which is managing relationships at a commercial level.</p>
            <p className="mt-3">A client intelligence platform operates at a different level — the operational level of how the agency actually serves the client. It&apos;s not about who the contact is. It&apos;s about what the agency knows about the relationship and how it applies that knowledge to the work.</p>
            <p className="mt-3">The two are complementary. A CRM tells you that the CFO is the decision maker. A client intelligence platform tells you that the CFO cares about cost per lead above everything else, prefers plain English, and was promised a CPA improvement in the March report that should be closed in May.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Why agencies need this now</h2>
            <p>Three things have changed in how agencies manage client relationships that make client intelligence more important than it was five years ago.</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">1. Account managers change more frequently</h3>
            <p>Industry-wide, account manager tenure has shortened. This means client knowledge is transferred more often, and the risk of knowledge loss on each transition is higher. Agencies that rely on individual account managers to hold client intelligence are increasingly exposed.</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">2. Client expectations have risen</h3>
            <p>Clients expect their agency to know them — not just their data, but their history, their goals, their sensitivities. The bar for what constitutes &quot;good&quot; client communication has moved. A technically accurate report that ignores context feels inadequate to clients who have experienced contextual reporting.</p>

            <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">3. AI makes capturing and applying knowledge practical</h3>
            <p>Storing client knowledge has always been possible. Using it consistently — in every report, every briefing, every handover — has been the hard part. AI changes this. When a system can read stored client context and apply it automatically to every piece of client communication, the effort of maintaining that knowledge becomes worthwhile in a way it wasn&apos;t before.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What client intelligence looks like in a monthly report</h2>
            <p>The practical output of a client intelligence layer is reports that feel like they were written by someone who has been managing the account for years — even when the person writing them started last week.</p>
            <p className="mt-3">Instead of: &ldquo;CPA improved 17% this month.&rdquo;</p>
            <p className="mt-3">A client intelligence-driven report writes: &ldquo;CPA reached £28.50 this month — below the £35 target set in January for the first time, and continuing the improvement trend that began with the keyword restructure in February. Since that restructure, CPA has reduced from £48 to £28.50 — a 41% improvement over four reporting periods.&rdquo;</p>
            <p className="mt-3">The data is the same. The intelligence applied to it is different. And the client experience of receiving each version is completely different.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The compounding effect</h2>
            <p>Client intelligence compounds over time. A client with three months of stored history produces reports with some continuity. A client with three years of stored history produces reports that reference the full arc of the relationship — the campaigns that worked, the decisions taken, the goals hit and missed and adjusted. The reporting becomes genuinely irreplaceable.</p>
            <p className="mt-3">This is the switching cost that agencies who build client intelligence correctly end up with. Not the switching cost of migrating data — anyone can do that. The switching cost of starting the knowledge accumulation from scratch. That cost is real, and clients feel it when they consider changing agencies.</p>
            <p className="mt-3">An agency with a mature client intelligence layer is harder to leave than one without. Not because of contracts or pricing, but because the depth of understanding the agency has built is genuinely valuable and genuinely hard to replace.</p>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-10">
            <h3 className="font-bold text-gray-900 mb-2">NarratorHQ is built around client intelligence</h3>
            <p className="text-sm text-gray-600 mb-4">Every goal, promise, stakeholder preference and decision stored — and automatically applied to every report, review and handover. The intelligence accumulates as you use it.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/client-memory" className="inline-block bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
                See Client Memory
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
