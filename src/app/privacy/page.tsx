import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'NarratorHQ Privacy Policy — how we collect, use, and protect your data.',
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
        <p className="text-sm text-gray-500 mb-10">Last updated: 20 May 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Who we are</h2>
            <p>
              NarratorHQ (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a client reporting automation platform for digital marketing agencies,
              operated by NarratorHQ Ltd. Our registered address and contact email is{' '}
              <a href="mailto:hello@narratorhq.com" className="text-blue-600 hover:underline">hello@narratorhq.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. What data we collect</h2>
            <h3 className="text-base font-semibold text-gray-800 mb-2">Account data</h3>
            <p>When you sign up, we collect your email address and the name of your agency. We use this to authenticate your account and send you product emails.</p>

            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">Client and campaign data</h3>
            <p>
              To generate reports, we access performance data from the platforms you connect — Google Analytics 4,
              Google Ads, and Meta Ads — via OAuth tokens or access tokens you provide. This includes metrics such
              as sessions, conversions, spend, and impressions. We do not access personally identifiable information
              about your end clients or their customers from these platforms.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">Usage data</h3>
            <p>We collect anonymised usage information (pages visited, features used) to improve the product. We do not sell this data.</p>

            <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">Payment data</h3>
            <p>
              Payments are processed by Stripe. We do not store your card number or CVV. Stripe&apos;s privacy policy
              governs how payment data is handled.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How we use your data</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To generate automated client performance reports on your behalf</li>
              <li>To send report delivery emails and transactional notifications</li>
              <li>To process subscription payments</li>
              <li>To provide customer support</li>
              <li>To improve our product and debug issues</li>
            </ul>
            <p className="mt-4">
              We use the Anthropic Claude API to generate narrative content from your campaign data.
              Data sent to the Claude API is governed by{' '}
              <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Anthropic&apos;s Privacy Policy
              </a>.
              Anthropic does not use API data to train models by default.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data storage and security</h2>
            <p>
              Your data is stored in Supabase (PostgreSQL) hosted on AWS in the EU West region. Access tokens
              for third-party platforms are stored encrypted at rest. We use HTTPS for all data in transit.
              We implement access controls so only authenticated users can access their own agency&apos;s data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Third-party services</h2>
            <p>We use the following third-party services to operate NarratorHQ:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li><strong>Supabase</strong> — database and authentication</li>
              <li><strong>Vercel</strong> — hosting and edge delivery</li>
              <li><strong>Stripe</strong> — payment processing</li>
              <li><strong>Resend</strong> — transactional email delivery</li>
              <li><strong>Anthropic (Claude API)</strong> — AI narrative generation</li>
              <li><strong>Google APIs</strong> — GA4 and Google Ads data access</li>
              <li><strong>Meta Marketing API</strong> — Meta Ads data access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data retention</h2>
            <p>
              We retain your data for as long as your account is active. If you cancel your subscription,
              your data is retained for 90 days before deletion, giving you time to export or re-activate.
              You can request immediate deletion by emailing{' '}
              <a href="mailto:hello@narratorhq.com" className="text-blue-600 hover:underline">hello@narratorhq.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Your rights (UK/EU)</h2>
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
              <a href="mailto:hello@narratorhq.com" className="text-blue-600 hover:underline">hello@narratorhq.com</a>.
              We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Cookies</h2>
            <p>
              We use only essential cookies required for authentication (session cookies). We do not use
              tracking or advertising cookies. You can disable cookies in your browser settings, but this
              will prevent you from logging in.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. We will notify you of material changes by email
              or by posting a notice in the app. Continued use of NarratorHQ after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact</h2>
            <p>
              For privacy-related questions or requests, contact us at{' '}
              <a href="mailto:hello@narratorhq.com" className="text-blue-600 hover:underline">hello@narratorhq.com</a>.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-100 mt-16">
        <div className="max-w-3xl mx-auto px-4 py-8 flex flex-wrap gap-4 text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-gray-600 transition-colors text-gray-600">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  )
}
