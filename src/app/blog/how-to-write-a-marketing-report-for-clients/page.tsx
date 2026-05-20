import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Write a Marketing Report for Clients (Agency Guide)',
  description: 'A practical guide to writing marketing reports your clients actually read — what to include, how to frame bad months, and how to automate the process without losing quality.',
  openGraph: {
    title: 'How to Write a Marketing Report for Clients',
    description: 'What to include, how to frame a difficult month, and how leading agencies are cutting report writing time from 2 hours to 10 minutes.',
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
          <p className="text-sm text-blue-600 font-medium mb-3">Agency Guide</p>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            How to write a marketing report for clients (that they actually read)
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Most client marketing reports fail before they&apos;re opened. They&apos;re too long, too data-heavy, and tell the client nothing they couldn&apos;t see in a dashboard. Here&apos;s how to write one that clients read, remember, and forward to their CEO.
          </p>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What clients actually want from a marketing report</h2>
            <p>Clients don&apos;t read marketing reports because they want to study data. They read them because they want to know three things:</p>
            <ol className="list-decimal pl-6 space-y-1 mt-3">
              <li><strong>Is my money working?</strong> — A simple yes, no, or &quot;improving.&quot;</li>
              <li><strong>Why did something change?</strong> — The explanation, not just the number.</li>
              <li><strong>What happens next?</strong> — What is the agency doing about it.</li>
            </ol>
            <p className="mt-3">A report that answers these three questions in the first 200 words will be read. A 15-page PDF with 40 charts will not.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The structure that works</h2>
            <p>A strong client marketing report has six sections, in this order:</p>

            <div className="space-y-4 mt-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">1. Overview (2–3 sentences)</h3>
                <p className="text-sm">The headline result. Was it a good month or a difficult one? What was the single most important thing that happened? This is what the client will quote to their MD.</p>
                <p className="text-sm mt-2 text-gray-500 italic">Example: &quot;May was a strong month — organic sessions up 18% and paid CPA down from £42 to £35. The one area to watch is branded search, which we&apos;re addressing with a Display campaign in June.&quot;</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">2. Organic Search</h3>
                <p className="text-sm">Sessions, ranking changes, top performing content. Lead with the trend, then the driver. If rankings dropped, name the specific terms.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">3. Paid Search (if applicable)</h3>
                <p className="text-sm">Spend, CPA, ROAS. Compare to last month and last year. Call out any campaigns that over- or underperformed and explain why.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">4. Paid Social (if applicable)</h3>
                <p className="text-sm">Same structure as paid search. Attribution note if Meta numbers diverge from GA4 — clients notice and will ask.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">5. Anomalies</h3>
                <p className="text-sm">This is the most important section. Any metric that moved significantly — up or down — needs an explanation. &quot;Traffic up 22% but conversions down 8%&quot; with no explanation will panic a client. With an explanation, it demonstrates your expertise.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">6. Next Steps</h3>
                <p className="text-sm">Three specific actions you&apos;re taking in the next 30 days. Not vague intentions — named campaigns, tests, or changes. This is how you demonstrate you&apos;re strategic, not reactive.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">How to frame a bad month</h2>
            <p>Every agency has bad months. The way you communicate them is what separates agencies that lose clients from agencies that retain them for years.</p>
            <p className="mt-2">The wrong approach: bury the bad news in a sea of positive metrics, or blame external factors without explanation.</p>
            <p className="mt-2">The right approach:</p>
            <ol className="list-decimal pl-6 space-y-2 mt-2">
              <li><strong>Name it first.</strong> &quot;This was a difficult month for paid search.&quot; Clients respect directness.</li>
              <li><strong>Explain the cause.</strong> &quot;CPCs rose 34% across the category — not unique to this account.&quot; Context prevents blame.</li>
              <li><strong>State what you&apos;re doing.</strong> &quot;We&apos;ve adjusted bid strategies and paused two underperforming ad groups.&quot; Proactive action retains trust.</li>
              <li><strong>Reference what was promised.</strong> If you said last month &quot;we&apos;ll fix mobile CPC,&quot; this month&apos;s report needs to address it — even if it&apos;s &quot;still working on it.&quot;</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">The attribution problem every agency faces</h2>
            <p>GA4 uses last-click attribution by default. Meta uses a 7-day click, 1-day view window. Google Ads uses data-driven attribution. The same conversion will be counted differently by all three platforms.</p>
            <p className="mt-2">Never present cross-platform conversion totals without noting this. Either:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Pick one source of truth (GA4 is usually best) and note it explicitly</li>
              <li>Show platform numbers separately with a note on attribution model</li>
              <li>Never add Meta conversions and Google conversions together — you&apos;ll always double-count</li>
            </ul>
            <p className="mt-2">Clients who receive conflicting numbers between platforms will stop trusting your reports. This is one of the most common reasons agencies lose clients.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Length and format</h2>
            <p>For most clients, a monthly report should be readable in under 5 minutes. That means:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Prose, not tables.</strong> Tables are for appendices. The main body should read like a professional memo.</li>
              <li><strong>One page of narrative</strong> followed by a data summary if the client wants the numbers.</li>
              <li><strong>No jargon.</strong> CTR, CPA, and ROAS are fine for performance clients. &quot;Programmatic display CPM optimisation&quot; is not useful to most business owners.</li>
              <li><strong>White-labeled.</strong> The report should look like it comes from your agency, not from your reporting tool.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">How long should writing a report take?</h2>
            <p>For an experienced account manager, a well-structured report should take 45–90 minutes per client per month. If it&apos;s taking longer, the process isn&apos;t structured enough. If it&apos;s taking under 30 minutes, the report is probably too thin.</p>
            <p className="mt-2">At 15 clients, that&apos;s 11–22 hours of your best people&apos;s time. Every month. Just on reports.</p>
            <p className="mt-2">Agencies that automate the first draft — using tools that connect their data sources and generate the narrative — are cutting this to under 10 minutes per client. The account manager reviews, edits, approves, and sends. The thinking is still human. The typing isn&apos;t.</p>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-10">
            <h3 className="font-bold text-gray-900 mb-2">Automate the first draft, keep the human review</h3>
            <p className="text-sm text-gray-600 mb-4">NarratorHQ connects to GA4, Google Ads, and Meta and generates the narrative in the structure above — automatically. Your team reviews, edits, and approves before anything goes to the client. 14-day free trial.</p>
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
          <Link href="/" className="font-semibold text-gray-600">NarratorHQ</Link>
          <span>© {new Date().getFullYear()} NarratorHQ</span>
        </div>
      </footer>
    </div>
  )
}
