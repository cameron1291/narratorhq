import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About NarratorHQ — Client Reporting Automation for Agencies',
  description: 'NarratorHQ is a client reporting automation platform for digital marketing agencies. Founded by Cameron Drayton, United Kingdom.',
  alternates: {
    canonical: 'https://narratorhq.com/about',
  },
  openGraph: {
    title: 'About NarratorHQ',
    description: 'The story behind NarratorHQ — client reporting automation for digital marketing agencies.',
    url: 'https://narratorhq.com/about',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-gray-900 text-lg hover:text-blue-600 transition-colors">
            NarratorHQ
          </Link>
          <Link
            href="/signup"
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start free trial
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-14">

        {/* Header */}
        <div className="mb-12">
          <p className="text-sm text-blue-600 font-medium mb-3">About</p>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-5">
            We automate the part of agency reporting that nobody enjoys.
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            NarratorHQ is a client reporting automation platform built for digital marketing agencies.
            Connect GA4, Google Ads, and Meta Ads — get a complete, written, white-labeled performance
            report ready to approve and send in under 10 minutes per client.
          </p>
        </div>

        {/* What we do */}
        <section className="space-y-5 text-gray-700 leading-relaxed mb-12">
          <h2 className="text-2xl font-bold text-gray-900">What NarratorHQ does</h2>

          <p>
            Every digital marketing agency sends monthly performance reports to their clients. The data
            pull is fast. The writing is not. An account manager writing a monthly report has to reconcile
            data from three platforms with different attribution windows, figure out why something changed,
            frame difficult months without losing client confidence, and remember what was promised last
            month — then write it all up in a tone that makes the agency look strategic.
          </p>

          <p>
            That takes 1–3 hours per client, per month. At 15 clients, it&apos;s an entire working day
            every month, just on reports.
          </p>

          <p>
            NarratorHQ automates the first draft. The platform connects to a client&apos;s GA4, Google Ads,
            and Meta Ads accounts, pulls all performance data, normalises it into a single schema, detects
            anomalies, and generates a structured six-section narrative report. The account manager receives
            a notification, opens their approval queue, reviews each section, edits anything in-line,
            and approves. The client receives a white-labeled PDF by email — it looks like the agency wrote it.
          </p>

          <p>
            Nothing sends without human approval. That&apos;s intentional and permanent. The tool writes
            the first draft. The agency owns the relationship.
          </p>
        </section>

        {/* The memory angle */}
        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-7 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-3">What makes it different</h2>
          <p className="text-gray-700 leading-relaxed">
            The AI writing is not the product. The moat is client memory. Every client has stored goals,
            promises, sensitivities, and standing instructions that feed into every future report. When an
            account manager promises to fix a mobile CPC issue by next month, the system remembers — and
            the following month&apos;s report references it automatically. That&apos;s what turns a data
            summary into a client relationship document.
          </p>
        </section>

        {/* Founder */}
        <section className="space-y-4 text-gray-700 leading-relaxed mb-12">
          <h2 className="text-2xl font-bold text-gray-900">The founder</h2>

          <p>
            NarratorHQ was founded by <strong className="text-gray-900">Cameron Drayton</strong>, based
            in the United Kingdom. Cameron&apos;s background is unconventional for a SaaS founder — he
            spent years as a super yacht chef, working in high-pressure environments where precision,
            clear communication, and delivering under deadline were non-negotiable.
          </p>

          <p>
            The operational inefficiency of manual reporting was visible from the outside: skilled account
            managers spending significant time each month on copy-paste work that added no strategic value
            to their clients. NarratorHQ was built to solve that — not as an AI experiment, but as a
            practical tool that saves real hours and makes agencies look more strategic to their clients.
          </p>
        </section>

        {/* Integrations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Integrations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                name: 'Google Analytics 4',
                desc: 'Sessions, conversions, channel breakdown, organic performance. Connected via Google OAuth.',
                status: 'Live',
              },
              {
                name: 'Google Ads',
                desc: 'Campaign spend, CPA, ROAS, impression share, keyword performance. Read-only reporting access.',
                status: 'Live',
              },
              {
                name: 'Meta Ads',
                desc: 'Campaign and ad set performance, creative metrics, CPA. Connected via system user token.',
                status: 'Live',
              },
            ].map(i => (
              <div key={i.name} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900 text-sm">{i.name}</p>
                  <span className="text-xs text-green-700 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">{i.status}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{i.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact / company info */}
        <section className="border-t border-gray-100 pt-10 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Company information</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
              <span>Carrhouse Road, Belton, Doncaster, DN9 1PG, United Kingdom</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-gray-400 shrink-0" />
              <a href="mailto:cameron@narratorhq.com" className="text-blue-600 hover:underline">
                cameron@narratorhq.com
              </a>
            </div>
          </div>
          <div className="flex gap-4 mt-5 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-900 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-900 transition-colors">Terms of Service</Link>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Ready to stop writing reports?</h2>
          <p className="text-blue-100 text-sm mb-5 max-w-sm mx-auto">
            14-day free trial. Connect GA4 in under 2 minutes. No credit card required.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-7 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm"
          >
            Start free trial <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  )
}
