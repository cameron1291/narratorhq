import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Lock, Database, Users, ArrowRight, CheckCircle, Key, Eye, Trash2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Google API Usage — NarratorHQ',
  description: 'How NarratorHQ uses Google API Services, including GA4 and Google Ads API. Scopes, data usage, security controls, and Limited Use compliance.',
  alternates: { canonical: 'https://narratorhq.com/google-api' },
}

export default function GoogleApiPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <img src="/logo.png" alt="NarratorHQ" className="h-14 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-700">Privacy Policy</Link>
            <Link href="/security" className="text-sm text-gray-500 hover:text-gray-700">Security</Link>
            <Link href="/signup" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Start free trial
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-14">

        {/* Title */}
        <div>
          <p className="text-sm text-blue-600 font-medium mb-3">Google API Services</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">How NarratorHQ uses Google APIs</h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            This page documents NarratorHQ&apos;s use of Google API Services — what data we access, why, how it is protected, and how users can revoke access. It is intended for Google&apos;s review team and for users who want to understand our data practices.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-sm text-blue-800">
            <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
            NarratorHQ complies with the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="font-semibold underline ml-1">Google API Services User Data Policy</a>, including Limited Use requirements.
          </div>
        </div>

        {/* Who uses this */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Who uses NarratorHQ
          </h2>
          <div className="bg-gray-50 rounded-xl p-6 text-gray-700 leading-relaxed space-y-3">
            <p>
              NarratorHQ&apos;s users are <strong>digital marketing agencies</strong> — typically small to mid-sized teams (2–50 people) who manage advertising and analytics accounts on behalf of their own clients.
            </p>
            <p>
              An agency account manager logs into NarratorHQ and connects their client&apos;s Google Analytics 4 and Google Ads accounts. NarratorHQ reads performance data from those accounts to generate a written monthly report, which the account manager reviews and sends to the client.
            </p>
            <p>
              <strong>The authorised user of the Google API data is the agency user who connects the account.</strong> The agency&apos;s client receives only the finished report narrative — they never have access to NarratorHQ or to the raw API data.
            </p>
          </div>
        </section>

        {/* OAuth consent screen */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Key className="h-5 w-5 text-blue-600" />
            OAuth connection flow
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            When an agency user connects a Google account, they are shown Google&apos;s standard OAuth consent screen. Below is a representation of what the user sees and does:
          </p>

          {/* User journey diagram */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">User journey — connecting Google Analytics</p>
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-stretch gap-0">
                {[
                  { step: '1', title: 'Add a client', body: 'Agency user creates a client in NarratorHQ (e.g. "Acme Ltd")' },
                  { step: '2', title: 'Click Connect GA4', body: 'User clicks "Connect Google Analytics" in the client connections panel' },
                  { step: '3', title: 'Google OAuth screen', body: 'User is redirected to Google\'s consent screen showing NarratorHQ is requesting analytics.readonly access' },
                  { step: '4', title: 'User approves', body: 'User selects the Google account that has access to their client\'s GA4 property and clicks Allow' },
                  { step: '5', title: 'Connection saved', body: 'NarratorHQ stores the encrypted access token and discovers the GA4 property automatically' },
                  { step: '6', title: 'Report generated', body: 'NarratorHQ uses the connection to pull metrics and generate the report narrative' },
                ].map((item, i, arr) => (
                  <div key={item.step} className="flex sm:flex-col items-start sm:items-center gap-3 sm:gap-2 flex-1">
                    <div className="flex sm:flex-col items-center gap-2 sm:gap-2 flex-1 w-full">
                      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                          {item.step}
                        </div>
                        {i < arr.length - 1 && (
                          <div className="hidden sm:block h-0.5 flex-1 bg-blue-200 min-w-4" />
                        )}
                      </div>
                      <div className="flex-1 sm:text-center sm:px-2 sm:mt-2">
                        <p className="text-sm font-semibold text-gray-900 mb-1">{item.title}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Google Ads journey */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">User journey — connecting Google Ads</p>
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-stretch gap-0">
                {[
                  { step: '1', title: 'Add a client', body: 'Agency user creates or opens a client in NarratorHQ' },
                  { step: '2', title: 'Click Connect Google Ads', body: 'User clicks "Connect Google Ads" in the client connections panel' },
                  { step: '3', title: 'Google OAuth screen', body: 'User is redirected to Google\'s consent screen showing NarratorHQ is requesting adwords (read-only) access' },
                  { step: '4', title: 'User approves', body: 'User selects the Google account with access to their client\'s Google Ads account and clicks Allow' },
                  { step: '5', title: 'Connection saved', body: 'NarratorHQ stores the encrypted access token and discovers the accessible customer ID automatically' },
                  { step: '6', title: 'Campaign metrics retrieved', body: 'NarratorHQ uses the connection to pull spend, CPA, ROAS, and conversion data for report generation' },
                ].map((item, i, arr) => (
                  <div key={item.step} className="flex sm:flex-col items-start sm:items-center gap-3 sm:gap-2 flex-1">
                    <div className="flex sm:flex-col items-center gap-2 sm:gap-2 flex-1 w-full">
                      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                          {item.step}
                        </div>
                        {i < arr.length - 1 && (
                          <div className="hidden sm:block h-0.5 flex-1 bg-blue-200 min-w-4" />
                        )}
                      </div>
                      <div className="flex-1 sm:text-center sm:px-2 sm:mt-2">
                        <p className="text-sm font-semibold text-gray-900 mb-1">{item.title}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* OAuth screen mockup */}
          <div className="border border-gray-200 rounded-xl overflow-hidden max-w-sm">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">OAuth consent screen — what the user sees</p>
            </div>
            <div className="p-6 bg-white">
              <div className="text-center mb-5">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">NarratorHQ wants to access your Google Account</p>
                <p className="text-xs text-gray-500 mt-1">user@example.com</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3 mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">This will allow NarratorHQ to:</p>
                <div className="flex items-start gap-2 text-xs text-gray-600">
                  <CheckCircle className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                  <span>View your Google Analytics data (read-only)</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center mb-4">
                Make sure you trust NarratorHQ. You may be sharing sensitive info. See NarratorHQ&apos;s <span className="text-blue-500">Privacy Policy</span> and <span className="text-blue-500">Terms of Service</span>.
              </p>
              <div className="flex gap-2">
                <div className="flex-1 border border-gray-200 rounded-lg py-2 text-center text-sm text-gray-600 font-medium">Cancel</div>
                <div className="flex-1 bg-blue-600 rounded-lg py-2 text-center text-sm text-white font-medium">Allow</div>
              </div>
            </div>
          </div>
        </section>

        {/* Scopes */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-600" />
            API scopes requested
          </h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs bg-orange-50 text-orange-700 border border-orange-200 rounded px-2 py-1 shrink-0 mt-0.5">analytics.readonly</span>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Google Analytics 4 — read-only</p>
                  <p className="text-sm text-gray-600 mb-3">Used to retrieve session counts, user counts, conversion events, channel grouping, and page-level metrics from Google Analytics 4 via the Google Analytics Data API.</p>
                  <p className="text-sm font-medium text-gray-700 mb-1">Exact data fields accessed:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['sessions', 'totalUsers', 'newUsers', 'conversions', 'sessionDefaultChannelGroup', 'pagePath', 'pageTitle', 'sessionSource', 'sessionMedium', 'bounceRate', 'averageSessionDuration'].map(f => (
                      <span key={f} className="font-mono text-xs bg-gray-100 text-gray-600 rounded px-1.5 py-0.5">{f}</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">No personally identifiable information about end users is accessed. All metrics are aggregate.</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded px-2 py-1 shrink-0 mt-0.5">adwords</span>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Google Ads API — read-only reporting</p>
                  <p className="text-sm text-gray-600 mb-3">Used to retrieve campaign performance metrics from Google Ads via the Google Ads API. Access is strictly read-only — NarratorHQ cannot create, modify, or delete campaigns, ad groups, ads, or any other Google Ads resources.</p>
                  <p className="text-sm font-medium text-gray-700 mb-1">Exact data fields accessed:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['campaign.name', 'campaign.status', 'metrics.impressions', 'metrics.clicks', 'metrics.cost_micros', 'metrics.conversions', 'metrics.conversions_value', 'metrics.ctr', 'metrics.average_cpc'].map(f => (
                      <span key={f} className="font-mono text-xs bg-gray-100 text-gray-600 rounded px-1.5 py-0.5">{f}</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">No bid strategies, audience lists, payment methods, or account settings are accessed.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture / data flow */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            Architecture and data flow
          </h2>
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">How Google API data flows through NarratorHQ</p>
            </div>
            <div className="p-6 space-y-3">
              {[
                {
                  from: 'Agency user',
                  to: 'NarratorHQ (Vercel)',
                  detail: 'Clicks "Generate report" for a client. Authenticated via Supabase Auth (JWT).',
                  color: 'border-blue-200 bg-blue-50',
                },
                {
                  from: 'NarratorHQ server',
                  to: 'Google Analytics Data API',
                  detail: 'Server-side request using stored encrypted access token. Fetches aggregate session, user, and conversion metrics for the report period. No PII.',
                  color: 'border-orange-200 bg-orange-50',
                },
                {
                  from: 'NarratorHQ server',
                  to: 'Google Ads API',
                  detail: 'Server-side request using same OAuth token. Fetches campaign spend, CPA, ROAS, and conversion metrics. Read-only.',
                  color: 'border-blue-200 bg-blue-50',
                },
                {
                  from: 'NarratorHQ server',
                  to: 'Anthropic Claude API',
                  detail: 'Normalised metric data (no raw API response, no PII) is sent as structured JSON to generate the narrative. Data is not used to train models.',
                  color: 'border-purple-200 bg-purple-50',
                },
                {
                  from: 'NarratorHQ server',
                  to: 'Supabase (PostgreSQL)',
                  detail: 'Generated narrative and metric summary stored against the report record. Raw Google API responses are not persisted.',
                  color: 'border-green-200 bg-green-50',
                },
                {
                  from: 'Agency user',
                  to: 'NarratorHQ (browser)',
                  detail: 'Reviews and approves the generated narrative. Edits sections if needed. Clicks Send.',
                  color: 'border-gray-200 bg-gray-50',
                },
                {
                  from: 'NarratorHQ server',
                  to: 'Client (email via Resend)',
                  detail: 'Branded narrative email + PDF sent to the agency\'s end client. Client never sees raw data or has access to NarratorHQ.',
                  color: 'border-gray-200 bg-gray-50',
                },
              ].map((row, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${row.color}`}>
                  <div className="shrink-0 w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 mt-0.5">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-semibold text-gray-800">{row.from}</span>
                      <ArrowRight className="h-3 w-3 text-gray-400 shrink-0" />
                      <span className="text-xs font-semibold text-gray-800">{row.to}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{row.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Limited Use compliance */}
        <section className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Google API Limited Use compliance
          </h2>
          <p className="text-gray-700 mb-5 leading-relaxed">
            NarratorHQ&apos;s use and transfer to any other app of information received from Google APIs adheres to the{' '}
            <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { ok: true, text: 'Google API data is used only to generate client performance reports on behalf of the connecting agency' },
              { ok: true, text: 'Google API data is never sold to third parties' },
              { ok: true, text: 'Google API data is never used to serve advertising to any user' },
              { ok: true, text: 'Google API data is never used to train or improve machine learning models' },
              { ok: true, text: 'Google API data is never shared with third parties except as necessary to operate the service (cloud infrastructure under confidentiality obligations)' },
              { ok: true, text: 'Only read-only scopes are requested — NarratorHQ cannot write to or modify any Google account' },
              { ok: true, text: 'Users can revoke access at any time from within the app or from myaccount.google.com/permissions' },
              { ok: true, text: 'Raw Google API responses are not persistently stored — only the derived report metrics summary is retained' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 bg-white rounded-lg p-3 border border-blue-100">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Data retention */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-blue-600" />
            Data retention and deletion
          </h2>
          <div className="space-y-3">
            {[
              {
                label: 'OAuth access tokens',
                policy: 'Stored encrypted (AES-256-GCM) in Supabase. Automatically rotated when Google issues a refreshed token. Deleted immediately when the user disconnects the integration or closes their account.',
              },
              {
                label: 'OAuth refresh tokens',
                policy: 'Stored encrypted alongside access tokens. Deleted on disconnection or account deletion. Never transmitted to any third party.',
              },
              {
                label: 'Raw Google API responses',
                policy: 'Not persisted. API responses are processed in memory to extract normalised metrics, then discarded. Only the derived metric summary is stored.',
              },
              {
                label: 'Derived metric data (e.g. sessions, CPA)',
                policy: 'Stored as part of the report record in Supabase. Retained for the lifetime of the account. Deleted within 24 hours of account deletion.',
              },
              {
                label: 'Account deletion',
                policy: 'Users can delete their account from Settings → Account. All tokens, client data, and report data are deleted within 24 hours. A deletion confirmation email is sent.',
              },
              {
                label: 'Data deletion request',
                policy: 'Users can request deletion of all data by emailing cameron@narratorhq.com. We confirm deletion within 7 days.',
              },
            ].map(item => (
              <div key={item.label} className="flex gap-4 p-4 border border-gray-200 rounded-xl">
                <div className="w-44 shrink-0">
                  <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.policy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Security controls */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5 text-blue-600" />
            Security controls
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: 'Token encryption', body: 'All OAuth tokens encrypted at rest with AES-256-GCM, unique IV per token. Never stored in plain text.' },
              { title: 'Transport security', body: 'All API calls and browser traffic use TLS 1.2+. HTTPS enforced with HSTS headers on the application domain.' },
              { title: 'Server-side only', body: 'Google API calls are made exclusively from the server. OAuth tokens are never exposed to the browser or client-side JavaScript.' },
              { title: 'Row-level access control', body: 'Database-level row security ensures an agency can only access their own clients\' connections and tokens.' },
              { title: 'Minimum scopes', body: 'Only read-only scopes are requested (analytics.readonly, adwords). No write permissions are ever requested or granted.' },
              { title: 'Credential isolation', body: 'Each client connection stores a separate encrypted token. A compromised token for one client does not affect others.' },
            ].map(item => (
              <div key={item.title} className="p-4 border border-gray-200 rounded-xl">
                <p className="text-sm font-semibold text-gray-900 mb-1">{item.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Revoking access */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Revoking Google access</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4 text-sm text-gray-700 leading-relaxed">
            <div>
              <p className="font-semibold text-gray-900 mb-1">From within NarratorHQ:</p>
              <p>Go to the client → Connections panel → click <strong>Disconnect</strong> next to the Google Analytics or Google Ads connection. The token is deleted from our systems immediately.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">From Google directly:</p>
              <p>Visit <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">myaccount.google.com/permissions</a>, find NarratorHQ, and click Remove Access. This immediately invalidates the token; any further API calls will fail and the connection will be marked inactive.</p>
            </div>
          </div>
        </section>

        {/* Policy links */}
        <section className="border-t border-gray-100 pt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related policies</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/privacy', label: 'Privacy Policy', desc: 'Full data handling details including Google API section' },
              { href: '/terms', label: 'Terms of Service', desc: 'Google integration terms and user obligations' },
              { href: '/security', label: 'Security', desc: 'Infrastructure, encryption, and access controls' },
              { href: '/contact', label: 'Contact', desc: 'For data requests or compliance questions' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-colors group"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">{link.label}</p>
                  <p className="text-xs text-gray-500">{link.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 ml-auto" />
              </Link>
            ))}
          </div>
        </section>

        <div className="border-t border-gray-100 pt-6 text-sm text-gray-400">
          <p>NarratorHQ is operated by Cameron Drayton, Carrhouse Road, Belton, Doncaster, DN9 1PG, United Kingdom. Contact: <a href="mailto:cameron@narratorhq.com" className="text-blue-500 hover:underline">cameron@narratorhq.com</a></p>
        </div>

      </main>
    </div>
  )
}
