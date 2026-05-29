'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'

export default function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const inviteToken = searchParams.get('invite')
  const inviteEmail = searchParams.get('email') ?? ''

  const [name, setName] = useState('')
  const [agencyName, setAgencyName] = useState('')
  const [email, setEmail] = useState(inviteEmail)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isInvite = !!inviteToken

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()

    if (isInvite) {
      const { error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      })

      if (signupError) {
        setError(signupError.message)
        setLoading(false)
        return
      }

      const acceptRes = await fetch('/api/team/invite/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: inviteToken }),
      })

      if (!acceptRes.ok) {
        const data = await acceptRes.json().catch(() => ({})) as { error?: string }
        setError(data.error ?? 'Failed to join team. Contact the person who invited you.')
        setLoading(false)
        return
      }

      router.push('/clients')
      router.refresh()
      return
    }

    // Server creates agency + auth user, then we sign in
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, fullName: name, agencyName }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Failed to create account. Please try again.')
      setLoading(false)
      return
    }

    // Account created — user must verify email before signing in
    router.push('/verify-email')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="absolute top-4 left-4">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1">
          ← Back to site
        </Link>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <Link href="/" className="inline-block mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="NarratorHQ" className="h-10 w-auto mx-auto" />
          </Link>
          <CardDescription className="text-base">
            {isInvite
              ? 'Create your account to join the team'
              : 'Start your 14-day free trial — no credit card required'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Jane Smith"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            {!isInvite && (
              <div className="space-y-2">
                <Label htmlFor="agencyName">Agency name</Label>
                <Input
                  id="agencyName"
                  type="text"
                  placeholder="Smith Digital Agency"
                  value={agencyName}
                  onChange={e => setAgencyName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@agency.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                readOnly={isInvite && !!inviteEmail}
                className={isInvite && inviteEmail ? 'bg-gray-50' : ''}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                minLength={8}
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {loading
                ? 'Creating account…'
                : isInvite ? 'Join team' : 'Start free trial'
              }
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
