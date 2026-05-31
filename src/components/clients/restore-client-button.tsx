'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function RestoreClientButton({ clientId, clientName }: { clientId: string; clientName: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function restore() {
    setLoading(true)
    const res = await fetch(`/api/clients/${clientId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_archived: false }),
    })
    setLoading(false)
    if (res.ok) {
      toast.success(`${clientName} restored`)
      router.push('/clients')
    } else {
      toast.error('Failed to restore client')
    }
  }

  return (
    <Button size="sm" variant="outline" onClick={restore} disabled={loading}>
      {loading ? 'Restoring…' : 'Restore'}
    </Button>
  )
}
