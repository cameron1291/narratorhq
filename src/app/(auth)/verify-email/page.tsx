import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Verify your email — NarratorHQ',
  robots: { index: false },
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <Link href="/" className="inline-block mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="NarratorHQ" className="h-10 w-auto mx-auto" />
          </Link>
        </CardHeader>
        <CardContent className="text-center space-y-4 pb-8">
          <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">Check your inbox</p>
            <p className="text-sm text-gray-500 mt-1">
              We&apos;ve sent a verification link to your email address. Click the link to activate your account.
            </p>
          </div>
          <p className="text-xs text-gray-400">
            Didn&apos;t receive it? Check your spam folder, or{' '}
            <Link href="/signup" className="text-blue-600 hover:underline">
              try again
            </Link>.
          </p>
          <Link href="/login" className="text-sm text-blue-600 hover:underline block">
            Back to sign in
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
