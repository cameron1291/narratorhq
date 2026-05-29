import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Lock, Key, Database, Eye, Trash2, RefreshCw, UserCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Security — NarratorHQ',
  description: 'How NarratorHQ protects your data and your clients\' data. Encryption, OAuth, access controls, and data deletion.',
  alternates: {
    canonical: 'https://narratorhq.com/security',
  },
}

const SECURITY_ITEMS = [
  {
    icon: Lock,
    title: 'Encrypted token storage',
    body: 'All OAuth tokens and API access tokens are encrypted at rest using AES-256-GCM with unique initialisation vectors per token. Plain-text credentials are never written to disk or logged.',
  },
  {
    icon: Shield,
    title: 'HTTPS everywhere',
    body: 'All traffic between your browser, our servers, and third-party APIs is encrypted in transit using TLS 1.2 or higher. We enforce HTTPS with HSTS headers.',
  },
  {
    icon: Key,
    title: 'Read-only API access',
    body: 'NarratorHQ requests only the minimum OAuth scopes required — analytics.readonly for GA4 and the Google Ads API reporting scope. We cannot write to or modify your ad accounts or analytics properties.',
  },
  {
    icon: UserCheck,
    title: 'Row-level access control',
    body: 'Every database query is scoped to the authenticated user\'s agency. It is not possible to read or modify another agency\'s clients, reports, or connections — this is enforced at the database level, not just in application code.',
  },
  {
    icon: Database,
    title: 'Isolated data storage',
    body: 'Your data is stored in a dedicated Supabase (PostgreSQL) instance hosted on AWS. Each agency\'s data is logically isolated with row-level security policies enforced by the database engine.',
  },
  {
    icon: Eye,
    title: 'No data sold or shared',
    body: 'We do not sell your data or your clients\' data to any third party. Data accessed from Google, Meta, or other platforms is used solely to generate reports on your behalf and for no other purpose.',
  },
  {
    icon: RefreshCw,
    title: 'Token rotation',
    body: 'When Google issues a refreshed access token, we automatically store the updated token and discard the old one. Refresh tokens are re-encrypted on update.',
  },
  {
    icon: Trash2,
    title: 'Data deletion on request',
    body: 'You can disconnect any platform integration at any time — this permanently deletes the stored token. Deleting your account deletes all agency data, client data, reports, and stored tokens within 24 hours.',
  },
]

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg text-gray-900 hover:text-blue-600 transition-colors">
            NarratorHQ
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Security</h1>
          <p className="text-gray-500 leading-relaxed">
            NarratorHQ handles sensitive data — OAuth tokens, ad account access, and client performance metrics.
            Here is exactly how we protect it.
          </p>
        </div>

        {/* Security items grid */}
        <div className="grid gap-6 mb-12">
          {SECURITY_ITEMS.map(item => (
            <div key={item.title} className="flex gap-4 p-5 border border-gray-200 rounded-xl">
              <div className="shrink-0 w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                <item.icon className="h-4.5 w-4.5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Google API section */}
        <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Google API Services — Limited Use</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            NarratorHQ&apos;s use and transfer to any other app of information received from Google APIs
            adheres to the{' '}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </p>
          <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
            <li>Google data is accessed with read-only scopes only</li>
            <li>Google data is used exclusively to generate client reports — no other purpose</li>
            <li>Google data is never sold, used for advertising, or shared with third parties</li>
            <li>Google data is never used to train machine learning models</li>
            <li>Access can be revoked at any time from within the app or from <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">myaccount.google.com/permissions</a></li>
          </ul>
        </section>

        {/* Infrastructure */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Infrastructure</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ['Database', 'Supabase (PostgreSQL) on AWS'],
              ['Hosting', 'Vercel (edge network)'],
              ['Authentication', 'Supabase Auth (JWT, secure cookies)'],
              ['Payments', 'Stripe (PCI-DSS compliant)'],
              ['Email delivery', 'Resend'],
              ['Token encryption', 'AES-256-GCM'],
              ['Transport security', 'TLS 1.2+, HSTS enforced'],
              ['Access control', 'Row-level security (Postgres RLS)'],
            ].map(([label, value]) => (
              <div key={label} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                <p className="font-medium text-gray-800">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Responsible disclosure */}
        <section className="border-t border-gray-100 pt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Responsible disclosure</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            If you discover a security vulnerability in NarratorHQ, please report it responsibly by emailing{' '}
            <a href="mailto:hello@narratorhq.com" className="text-blue-600 hover:underline">hello@narratorhq.com</a>.
            We will acknowledge your report within 48 hours and work to resolve confirmed issues promptly.
            We do not currently operate a bug bounty programme but we are grateful for responsible disclosure.
          </p>
        </section>
      </main>

      <footer className="border-t border-gray-100 mt-16">
        <div className="max-w-3xl mx-auto px-4 py-8 flex flex-wrap gap-4 text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
          <Link href="/security" className="hover:text-gray-600 transition-colors text-gray-600">Security</Link>
        </div>
      </footer>
    </div>
  )
}
