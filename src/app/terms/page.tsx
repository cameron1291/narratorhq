import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'NarratorHQ Terms of Service — the agreement between you and NarratorHQ when using our platform.',
  alternates: {
    canonical: 'https://narratorhq.com/terms',
  },
}

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: 30 May 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of terms</h2>
            <p>
              By creating an account or using NarratorHQ (&quot;Service&quot;), you agree to these Terms of Service
              (&quot;Terms&quot;). If you are using the Service on behalf of an organisation, you represent that you
              have authority to bind that organisation to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of service</h2>
            <p>
              NarratorHQ is a client reporting automation platform for digital marketing agencies. It integrates
              with Google Ads, Google Analytics 4 (GA4), and Meta Ads through authorised APIs to pull campaign
              performance data, generate written performance narrative reports using AI, and deliver white-labeled
              reports to agency clients via email. All data access to third-party platforms is read-only and used
              solely for report generation on behalf of the authorising agency.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Your account</h2>
            <p>
              You are responsible for maintaining the security of your account credentials. You must not share
              your password or allow others to access your account. You are responsible for all activity that
              occurs under your account. Notify us immediately if you suspect unauthorised access.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Subscriptions and billing</h2>
            <p>
              NarratorHQ is offered on a subscription basis. Prices are shown in GBP and include VAT where
              applicable. Subscriptions renew automatically unless cancelled before the renewal date.
            </p>
            <p className="mt-3">
              We offer a 14-day free trial for new accounts. No credit card is required to start a trial.
              At the end of the trial, you must subscribe to continue using the Service.
            </p>
            <p className="mt-3">
              You may cancel your subscription at any time. Cancellation takes effect at the end of the
              current billing period. We do not offer refunds for partial subscription periods.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Third-party platform integrations</h2>
            <p>
              NarratorHQ integrates with the following platforms via their official APIs to retrieve performance
              data for report generation:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3 mb-3">
              <li><strong>Google Analytics 4</strong> — via the Google Analytics Data API (read-only, <code>analytics.readonly</code> scope)</li>
              <li><strong>Google Ads</strong> — via the Google Ads API (read-only reporting access, <code>adwords</code> scope)</li>
              <li><strong>Meta Ads</strong> — via the Meta Marketing API (read-only, <code>ads_read</code> scope)</li>
            </ul>
            <p>
              By connecting a third-party platform, you authorise NarratorHQ to access data from that platform
              on your behalf, strictly for the purpose of generating client reports. You are responsible for
              ensuring you have the right to grant this access for each client account you connect. Our use of
              data received from Google APIs complies with the{' '}
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
            <p className="mt-3">
              You retain ownership of all data you bring to the Service. We do not sell your data or your
              clients&apos; data to third parties. You can revoke platform access at any time from within the
              app or directly from the respective platform&apos;s account settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. AI-generated content</h2>
            <p>
              NarratorHQ uses AI to generate report narratives. While we work to ensure accuracy, AI-generated
              content may contain errors. You are responsible for reviewing all AI-generated content before
              sending it to your clients. NarratorHQ is not liable for decisions made based on report content
              that has not been reviewed and approved by a human.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Use the Service to access data you are not authorised to access</li>
              <li>Attempt to reverse-engineer or extract proprietary technology from the Service</li>
              <li>Use the Service for any unlawful purpose</li>
              <li>Resell or sublicense the Service without our written permission</li>
              <li>Use automated means to scrape or extract data from the Service outside of the provided API</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Intellectual property</h2>
            <p>
              NarratorHQ and its underlying software, design, and branding are owned by NarratorHQ Ltd.
              You are granted a limited, non-exclusive licence to use the Service during your subscription.
              You retain ownership of all content and data you upload to the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Service availability</h2>
            <p>
              We aim for high availability but do not guarantee uninterrupted service. We may perform
              maintenance that causes temporary downtime. We will provide advance notice of planned downtime
              where possible. We are not liable for losses resulting from service unavailability.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, NarratorHQ&apos;s total liability to you for any claim
              arising from use of the Service is limited to the amount you paid us in the 12 months preceding
              the claim. We are not liable for indirect, incidental, or consequential losses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Termination</h2>
            <p>
              We may suspend or terminate your account if you violate these Terms, fail to pay, or if we
              discontinue the Service. Upon termination, your right to use the Service ends immediately.
              We will retain your data for 90 days after termination before deletion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Governing law</h2>
            <p>
              These Terms are governed by the laws of England and Wales. Disputes shall be resolved in
              the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Changes to these terms</h2>
            <p>
              We may update these Terms from time to time. We will notify you of material changes by email
              at least 14 days before they take effect. Continued use of the Service after that date constitutes
              acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">14. Contact</h2>
            <p>
              For questions about these Terms, contact us at{' '}
              <a href="mailto:cameron@narratorhq.com" className="text-blue-600 hover:underline">cameron@narratorhq.com</a>.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-100 mt-16">
        <div className="max-w-3xl mx-auto px-4 py-8 flex flex-wrap gap-4 text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors text-gray-600">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  )
}
