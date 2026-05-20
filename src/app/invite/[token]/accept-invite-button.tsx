'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface AcceptInviteButtonProps {
  token: string
  agencyId: string
  role: string
}

export function AcceptInviteButton({ token, agencyId, role }: AcceptInviteButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function accept() {
    setLoading(true)
    const res = await fetch('/api/team/invite/accept', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
    if (res.ok) {
      router.push('/clients')
    } else {
      const data = await res.json() as { error?: string }
      setError(data.error ?? 'Failed to accept invite')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button onClick={accept} disabled={loading} className="w-full">
        {loading ? 'Joining…' : `Join as ${role}`}
      </Button>
    </div>
  )
}
