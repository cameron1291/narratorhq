import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why Your Clients Don\'t Use the Dashboard You Built Them',
  description: 'Most clients never log in to the dashboard their agency builds. Here\'s why — and what they actually want instead.',
  alternates: {
    canonical: 'https://narratorhq.com/blog/why-clients-hate-dashboards',
  },
  openGraph: {
    title: 'Why Your Clients Don\'t Use the Dashboard You Built Them',
    description: 'Most clients never log in to the dashboard their agency builds. Here\'s why — and what they actually want instead.',
  },
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-gray-900">NarratorHQ</Link>
          <Link href="/signup" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Start free trial
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-sm text-blue-600 font-medium mb-3">Client Experience</p>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            Why Your Clients Don&apos;t Use the Dashboard You Built Them
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Most agencies have built client dashboards they are quietly proud of. Most clients have never logged in to them. This is not a coincidence, and it is not the clients&apos; fault.
          </p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The dashboard assumption</h2>
            <p>Agencies build dashboards because people who work in agencies love data. When you spend your days inside GA4, Google Ads, and Meta Business Manager, a well-structured dashboard feels like the obvious answer to the question of how to communicate performance to clients. It is organised, interactive, and comprehensive. It puts all the numbers in one place.</p>
            <p className="mt-3">The problem is that the question agencies are answering — &quot;how do we show clients their data?&quot; — is not the question clients are asking. Clients are not asking to see their data. They are asking whether their marketing is working, and they want someone they trust to tell them.</p>
            <p className="mt-3">Agencies love data. Clients love outcomes. These are not the same thing, and no amount of well-designed dashboard real estate closes the gap between them.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The login problem</h2>
            <p>Dashboard login rates for agency clients are consistently low across every tool that tracks this. Most platforms that are honest about usage data see fewer than 20% of client-facing users logging in with any regularity. Many client accounts are never accessed by the client at all after the initial setup call.</p>
            <p className="mt-3">The clients who do log in regularly are a specific type: they have a marketing background, they understand what the metrics mean, and they are engaged enough to want to investigate independently. These clients represent a minority of any agency&apos;s book of business.</p>
            <p className="mt-3">The majority of clients — the finance director at a manufacturing company, the founder of a growing e-commerce brand, the managing partner at a professional services firm — do not have the context to interpret a dashboard unaided. When they log in, they see a page full of numbers and no explanation of what they mean. They do not know whether sessions being up 8% is good or neutral. They do not know what to make of a bounce rate. They do not have the benchmark to interpret a ROAS of 3.2. So they close the tab and wait for their account manager to explain it.</p>
            <p className="mt-3">Or they don&apos;t close the tab. They stare at a red number with no context and form their own conclusion — usually a worse one than reality warrants — and they carry that anxiety into the next call.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The three questions every client has every month</h2>
            <p>Strip away the complexity of any client relationship and there are three questions that every client is asking every month, regardless of what sector they are in or how sophisticated they are about marketing:</p>
            <ol className="list-decimal pl-6 space-y-2 mt-3">
              <li><strong>Did my marketing money work?</strong> Not &quot;what were the impressions,&quot; not &quot;what was the CTR.&quot; Did the money I spent on marketing this month produce a return I can justify to my board, my partner, or myself?</li>
              <li><strong>Why did X happen?</strong> Something changed. Traffic went up or down. Conversions improved or dropped. Spend delivered better or worse results than last month. Why?</li>
              <li><strong>What are you doing about it?</strong> If it was good, how are you building on it? If it was bad, what is the plan?</li>
            </ol>
            <p className="mt-3">A dashboard answers none of these questions. It provides the raw material from which someone with context could construct an answer. But the client does not have that context, and that is precisely why they hired an agency.</p>
            <p className="mt-3">A narrative — a coherent, expert-authored account of the month that addresses all three questions directly — answers all of them. That is what clients actually want. They want to be told by someone who knows what they are talking about.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The communication gap: a dashboard is a tool, not a story</h2>
            <p>The distinction between a dashboard and a report is not primarily a design distinction. It is a communication distinction. A dashboard is a tool. It allows someone with knowledge to explore data. A report is a story. It communicates a conclusion to someone who does not have the time or context to explore the data themselves.</p>
            <p className="mt-3">Clients who receive a dashboard — however well-designed — feel like they have been handed a spreadsheet and told to figure it out. The implicit message is: here is the data, your interpretation is as valid as ours. For a client paying a retainer for expertise, that is not a satisfying experience.</p>
            <p className="mt-3">Clients who receive a well-written narrative feel like their agency sat down, looked at the month, understood what happened, and is now explaining it to them. That is the experience of having an expert on your side. That is what justifies the retainer. That is the thing that makes clients feel their agency is worth keeping.</p>
            <p className="mt-3">The agencies that have moved to narrative-led reporting — replacing or supplementing dashboards with a monthly written account of the period — consistently report stronger client relationships, fewer surprise churns, and more inbound referrals. The narrative does not just communicate performance. It demonstrates expertise. Every month, it proves that someone is across the account.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The trust implication during a bad month</h2>
            <p>The gap between dashboards and narratives is most visible — and most consequential — when performance is poor.</p>
            <p className="mt-3">A client who monitors a dashboard during a bad month sees red numbers accumulate with no explanation. They watch sessions fall. They watch conversions drop. They watch ROAS contract. And they have nothing — no context, no expert framing, no indication that anyone is aware of what is happening or has a plan for it. That is a deeply uncomfortable experience. It produces anxiety that finds its outlet in aggressive calls, demanding emails, and ultimately the decision to switch agencies.</p>
            <p className="mt-3">A client who receives a narrative during a bad month reads something different. They read: here is what happened. Here is why it happened. Here is what we identified as the cause, and here is what we have already done about it. Here is what to expect next month. That client is having a completely different experience of the same bad month. They are not comfortable — the performance was poor — but they feel managed. They feel that their agency is across it. They feel that the right people are working on the problem.</p>
            <p className="mt-3">The dashboard gives the client the data and leaves them alone with it. The narrative gives the client the explanation and stands beside them. These are not equivalent offerings.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Dashboards as a retention risk</h2>
            <p>Most agencies think of their client dashboard as a retention asset — a demonstration of transparency, a proof point of the investment they have made in the relationship. In practice, for many clients, it is the opposite.</p>
            <p className="mt-3">A client who logs in and can&apos;t interpret what they see is not reassured. They are reminded that they are dependent on an agency they cannot independently evaluate. A client who was expecting a narrative report and received a dashboard login instead feels like they got the self-service option when they asked for the managed service.</p>
            <p className="mt-3">Dashboards are passive. They exist. They wait to be consulted. A monthly report is active. It arrives. It asserts. It demonstrates that someone spent time on this client&apos;s account this month and has something to say about it. Proactive communication is the single strongest predictor of client retention in agency relationships — and a dashboard, by definition, is not proactive. It is available. There is a significant difference.</p>
            <p className="mt-3">Clients who are not receiving proactive narrative communication from their agency are clients who are quietly reassessing whether the relationship is working. The dashboard they never log into is not evidence that the agency is doing its job. It is, for many of them, evidence that no one is talking to them.</p>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-10">
            <h3 className="font-bold text-gray-900 mb-2">NarratorHQ writes the narrative automatically</h3>
            <p className="text-sm text-gray-600 mb-4">Connect your data sources, generate a full narrative report for each client, review and approve in minutes. Every client gets a proactive explanation of their month — automatically.</p>
            <Link
              href="/demo"
              className="inline-block bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </article>

      <footer className="border-t border-gray-100 py-8 mt-8">
        <div className="max-w-3xl mx-auto px-4 flex items-center justify-between text-sm text-gray-400">
          <Link href="/" className="font-semibold text-gray-600">NarratorHQ</Link>
          <span>© {new Date().getFullYear()} NarratorHQ</span>
        </div>
      </footer>
    </div>
  )
}
