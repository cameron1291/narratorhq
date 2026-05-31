import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — NarratorHQ',
  description: 'NarratorHQ Privacy Policy — how we collect, use, and protect your data, including data accessed via Google API Services.',
  alternates: {
    canonical: 'https://narratorhq.com/privacy',
  },
}

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: 30 May 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Who we are</h2>
            <p>
              NarratorHQ (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a client reporting automation platform for digital marketing agencies,
              operated by Cameron Drayton, trading as NarratorHQ, based at Carrhouse Road, Belton, Doncaster, DN9 1PG, United Kingdom.
              Contact:{' '}
              <a href="mailto:cameron@narratorhq.com" className="text-blue-600 hover:underline">cameron@narratorhq.com</a>.
            </p>
          </section>

          {/* ── GOOGLE API SERVICES — prominent, required section ── */}
          <section className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Google API Services User Data Policy</h2>
            <p className="mb-4">
              NarratorHQ&apos;s use and transfer to any other app of information received from Google APIs adheres to the{' '}
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

            <h3 className="text-base font-semibold text-gray-900 mb-2">What Google data we access</h3>
            <p className="mb-4">
              When you connect a Google Analytics 4 (GA4) or Google Ads account, we request read-only access to:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li><strong>Google Analytics 4:</strong> sessions, users, conversions, channel grouping, page-level metrics, and traffic source data via the Google Analytics Data API (<code>analytics.readonly</code> scope)</li>
              <li><strong>Google Ads:</strong> campaign performance metrics including impressions, clicks, spend, CPA, ROAS, and keyword performance via the Google Ads API (<code>adwords</code> scope — read-only reporting)</li>
            </ul>
            <p className="mb-4">
              We do not access personally identifiable information about your end users or your clients&apos; customers from these platforms. We access only aggregate performance metrics.
            </p>

            <h3 className="text-base font-semibold text-gray-900 mb-2">How we use Google data — Limited Use</h3>
            <p className="mb-4">
              Data obtained from Google APIs is used <strong>solely</strong> for the following purpose:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Generating automated client performance reports on behalf of the agency that connected the account</li>
            </ul>
            <p className="mb-4">
              We do <strong>not</strong>:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Use Google user data to serve advertising</li>
              <li>Sell Google user data to third parties</li>
              <li>Use Google user data for any purpose unrelated to report generation</li>
              <li>Transfer Google user data to any other party except as necessary to operate the service (e.g., cloud infrastructure providers bound by confidentiality obligations)</li>
              <li>Use Google user data to build or train machine learning models</li>
            </ul>

            <h3 className="text-base font-semibold text-gray-900 mb-2">How to revoke Google access</h3>
            <p className="mb-3">
              You can revoke NarratorHQ&apos;s access to your Google account at any time in two ways:
            </p>
            <ol className="list-decimal list-inside space-y-2 mb-4">
              <li>
                <strong>From within NarratorHQ:</strong> Go to your client settings, open the Connections panel, and click &quot;Disconnect&quot; next to the Google Analytics or Google Ads connection. This immediately deletes the stored access token from our systems.
              </li>
              <li>
                <strong>From Google directly:</strong> Visit{' '}
                <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  myaccount.google.com/permissions
                </a>
                , find NarratorHQ in the list, and click &quot;Remove Access&quot;. Revoking from Google immediately invalidates the token; any further data fetches will fail and we will mark the connection as inactive.
              </li>
            </ol>

            <h3 className="text-base font-semibold text-gray-900 mb-2">Google data retention and deletion</h3>
            <p>
              Google OAuth access tokens and refresh tokens are stored encrypted at rest using AES-256 encryption. When you disconnect a Google connection or delete your account, all stored tokens and any cached API data for that connection are permanently deleted within 24 hours.
              If you request data deletion by emailing{' '}
              <a href="mailto:cameron@narratorhq.com" className="text-blue-600 hover:underline">cameron@narratorhq.com</a>,
              we will confirm deletion within 7 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. What other data we collect</h2>
            <h3 className="text-base font-semibold text-gray-800 mb-2">Account data</h3>
            <p>When you sign up, we collect your email address, full name, and agency name. We use this to authenticate your account and send product and transactional emails.</p>

            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">Meta Ads data</h3>
            <p>
              If you connect Meta Ads via a system user access token, we access campaign and ad set performance metrics (spend, impressions, CPA, ROAS) from the Meta Marketing API. This data is used exclusively for report generation. The same Limited Use principles described above apply.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">Usage data</h3>
            <p>We collect anonymised usage information (pages visited, features used) to improve the product. We do not sell this data.</p>

            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">Payment data</h3>
            <p>
              Payments are processed by Stripe. We do not store your card number or CVV. Stripe&apos;s privacy policy governs how payment data is handled.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. How we use your data</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To generate automated client performance reports on your behalf</li>
              <li>To send report delivery emails and transactional notifications</li>
              <li>To process subscription payments</li>
              <li>To provide customer support</li>
              <li>To improve our product and debug issues</li>
            </ul>
            <p className="mt-4">
              We use the Anthropic Claude API to generate narrative content from your campaign data.
              Metric data is sent to the Claude API as part of this process.
              Data sent to the Claude API is governed by{' '}
              <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Anthropic&apos;s Privacy Policy
              </a>. Anthropic does not use API data to train models by default.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data storage and security</h2>
            <p>
              Your data is stored in Supabase (PostgreSQL) hosted on AWS. OAuth tokens and access tokens
              for third-party platforms are encrypted at rest using AES-256-GCM with unique initialisation vectors.
              All data in transit is protected via HTTPS/TLS. Access controls ensure only authenticated users
              can access their own agency&apos;s data. For more detail, see our{' '}
              <Link href="/security" className="text-blue-600 hover:underline">Security page</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Third-party services</h2>
            <p>We use the following third-party services to operate NarratorHQ:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li><strong>Supabase</strong> — database and authentication</li>
              <li><strong>Vercel</strong> — hosting and edge delivery</li>
              <li><strong>Stripe</strong> — payment processing</li>
              <li><strong>Resend</strong> — transactional email delivery</li>
              <li><strong>Anthropic (Claude API)</strong> — AI narrative generation from anonymised metrics</li>
              <li><strong>Google APIs</strong> — GA4 and Google Ads data access (read-only, report generation only)</li>
              <li><strong>Meta Marketing API</strong> — Meta Ads data access (read-only, report generation only)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Data retention</h2>
            <p>
              We retain your data for as long as your account is active. If you cancel your subscription,
              your data is retained for 90 days before deletion, giving you time to export or re-activate.
              Google and Meta API tokens are deleted immediately when a connection is disconnected or the
              account is closed. You can request immediate deletion of all your data by emailing{' '}
              <a href="mailto:cameron@narratorhq.com" className="text-blue-600 hover:underline">cameron@narratorhq.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Your rights (UK/EU)</h2>
            <p>Under UK GDPR and GDPR, you have the right to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability — receive your data in a machine-readable format</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, email{' '}
              <a href="mailto:cameron@narratorhq.com" className="text-blue-600 hover:underline">cameron@narratorhq.com</a>.
              We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Cookies</h2>
            <p>
              We use only essential cookies required for authentication (session cookies set by Supabase Auth).
              We do not use tracking, advertising, or analytics cookies. You can disable cookies in your browser
              settings, but this will prevent you from logging in.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. We will notify you of material changes by email
              or by posting a notice in the app. Continued use of NarratorHQ after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contact</h2>
            <p>
              For privacy-related questions, data requests, or to request deletion of your data, contact:{' '}
              <a href="mailto:cameron@narratorhq.com" className="text-blue-600 hover:underline">cameron@narratorhq.com</a>.
            </p>
          </section>

        </div>
      </main>

      <footer className="border-t border-gray-100 mt-16">
        <div className="max-w-3xl mx-auto px-4 py-8 flex flex-wrap gap-4 text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
          <Link href="/security" className="hover:text-gray-600 transition-colors">Security</Link>
          <Link href="/privacy" className="hover:text-gray-600 transition-colors text-gray-600">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  )
}
