import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog — NarratorHQ',
  description: 'Guides, comparisons, and insights on client reporting automation for digital marketing agencies.',
  alternates: { canonical: 'https://narratorhq.com/blog' },
}

const POSTS = [
  {
    slug: 'how-to-automate-client-marketing-reports',
    title: 'How to automate client marketing reports',
    desc: 'A practical guide to removing the manual work from monthly reporting — without sacrificing quality.',
    category: 'Guide',
  },
  {
    slug: 'how-to-write-a-marketing-report-for-clients',
    title: 'How to write a marketing report clients actually read',
    desc: 'Most agency reports are data dumps. Here\'s how to write one that gets read, trusted, and replied to.',
    category: 'Guide',
  },
  {
    slug: 'real-cost-of-manual-reporting',
    title: 'The real cost of manual client reporting',
    desc: 'It\'s not just time. Manual reporting costs agencies in margin, morale, and client retention.',
    category: 'Guide',
  },
  {
    slug: 'how-to-explain-a-bad-month-to-clients',
    title: 'How to explain a bad month to clients',
    desc: 'The most important report you\'ll ever write is the one where the numbers went the wrong way.',
    category: 'Guide',
  },
  {
    slug: 'why-clients-hate-dashboards',
    title: 'Why your clients don\'t log into their dashboard',
    desc: 'Dashboard tools assume clients want data. They don\'t. They want to know if their money is working.',
    category: 'Insight',
  },
  {
    slug: 'how-agencies-scale-reporting',
    title: 'How agencies scale reporting without hiring',
    desc: 'The operational decisions that let you take on more clients without adding headcount.',
    category: 'Guide',
  },
  {
    slug: 'marketing-report-automation-for-agencies',
    title: 'Marketing report automation for agencies — a complete guide',
    desc: 'Everything you need to know about automating client reports: tools, workflows, and pitfalls to avoid.',
    category: 'Guide',
  },
]

const COMPARISONS = [
  { slug: 'agencyanalytics-alternative', title: 'AgencyAnalytics alternative', desc: 'AgencyAnalytics builds dashboards. NarratorHQ writes the narrative.' },
  { slug: 'whatagraph-alternative', title: 'Whatagraph alternative', desc: 'Whatagraph automates report templates. NarratorHQ automates the writing.' },
  { slug: 'dashthis-alternative', title: 'DashThis alternative', desc: 'DashThis is for dashboards. NarratorHQ is for the monthly written report.' },
  { slug: 'databox-alternative', title: 'Databox alternative', desc: 'Databox monitors metrics in real time. NarratorHQ explains what they mean.' },
  { slug: 'swydo-alternative', title: 'Swydo alternative', desc: 'Swydo assembles report templates. NarratorHQ generates the narrative from scratch.' },
  { slug: 'looker-studio-alternative', title: 'Looker Studio alternative', desc: 'Looker Studio is free and powerful for dashboards. NarratorHQ handles the writing.' },
  { slug: 'reportgarden-alternative', title: 'ReportGarden alternative', desc: 'ReportGarden is affordable for small teams. NarratorHQ scales the narrative.' },
]

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <img src="/logo.png" alt="NarratorHQ" className="h-14 w-auto" />
          </Link>
          <Link href="/signup" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Start free trial
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Blog</h1>
          <p className="text-gray-500">Guides and insights on client reporting automation for digital marketing agencies.</p>
        </div>

        <section className="mb-12">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Guides</h2>
          <div className="space-y-3">
            {POSTS.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">{post.title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{post.desc}</p>
                </div>
                <span className="text-xs text-gray-400 bg-gray-100 rounded px-2 py-0.5 shrink-0 mt-0.5">{post.category}</span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Comparisons</h2>
          <div className="space-y-3">
            {COMPARISONS.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">{post.title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{post.desc}</p>
                </div>
                <span className="text-xs text-gray-400 bg-gray-100 rounded px-2 py-0.5 shrink-0 mt-0.5">Comparison</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 mt-8">
        <div className="max-w-3xl mx-auto px-4 py-8 flex flex-wrap gap-4 text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-gray-600 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-gray-600 transition-colors">Contact</Link>
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
        </div>
      </footer>
    </div>
  )
}
