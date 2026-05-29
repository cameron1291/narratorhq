import type { Metadata } from 'next'
import { Suspense } from 'react'
import SignupForm from './signup-form'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Start Free Trial — NarratorHQ',
  robots: { index: false, follow: false },
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  )
}
