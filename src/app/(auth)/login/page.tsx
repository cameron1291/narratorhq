import type { Metadata } from 'next'
import { Suspense } from 'react'
import LoginForm from './login-form'

export const metadata: Metadata = {
  title: 'Sign In — NarratorHQ',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
