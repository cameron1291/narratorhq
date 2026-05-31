import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact — NarratorHQ',
  description: 'Get in touch with NarratorHQ. We\'re a small team and respond quickly.',
  alternates: { canonical: 'https://narratorhq.com/contact' },
}

export default function ContactPage() {
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

      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Contact us</h1>
          <p className="text-gray-500 leading-relaxed">
            We&apos;re a small team and we respond to every message. Usually within a few hours on weekdays.
          </p>
        </div>

        <div className="mb-12">
          <a
            href="mailto:cameron@narratorhq.com"
            className="flex items-start gap-4 p-5 border border-gray-200 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-colors group max-w-sm"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-0.5">Get in touch</p>
              <p className="text-blue-600 text-sm group-hover:underline">cameron@narratorhq.com</p>
              <p className="text-xs text-gray-500 mt-1">Sales, support, partnerships — anything</p>
            </div>
          </a>
        </div>

        <div className="space-y-4 border-t border-gray-100 pt-8">
          <div className="flex items-start gap-3 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
            <span>Carrhouse Road, Belton, Doncaster, DN9 1PG, United Kingdom</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
            <span>We typically respond within 4 hours on weekdays (UK time)</span>
          </div>
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h2 className="font-semibold text-gray-900 mb-2">Looking to try the product?</h2>
          <p className="text-sm text-gray-600 mb-4">Start a 14-day free trial — no credit card required. Connect GA4 and generate your first report in under 30 seconds.</p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/signup" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Start free trial
            </Link>
            <Link href="/demo" className="text-sm border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              View demo
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 mt-8">
        <div className="max-w-3xl mx-auto px-4 py-8 flex flex-wrap gap-4 text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-gray-600 transition-colors">About</Link>
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
          <Link href="/security" className="hover:text-gray-600 transition-colors">Security</Link>
        </div>
      </footer>
    </div>
  )
}
