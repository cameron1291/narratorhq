'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PlusCircle, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

interface Props {
  agencyId?: string
  clientCount: number
  clientLimit: number
}

export function AddClientDialog({ clientCount, clientLimit }: Props) {
  const atLimit = clientCount >= clientLimit
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    industry: '',
    reportEmail: '',
    reportFrequency: 'monthly',
    goals: '',
    customInstructions: '',
  })

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        industry: form.industry,
        reportEmail: form.reportEmail,
        reportFrequency: form.reportFrequency,
        goals: form.goals,
        customInstructions: form.customInstructions,
      }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({})) as { error?: string }
      setError(data.error ?? 'Failed to add client')
      setLoading(false)
      return
    }

    setOpen(false)
    setForm({ name: '', industry: '', reportEmail: '', reportFrequency: 'monthly', goals: '', customInstructions: '' })
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button
          disabled={atLimit}
          title={atLimit ? `You've reached the ${clientLimit}-client limit on your plan — upgrade to add more` : undefined}
        />
      }>
        <PlusCircle className="h-4 w-4 mr-2" />
        Add client
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{atLimit ? 'Client limit reached' : 'Add a client'}</DialogTitle>
        </DialogHeader>
        {atLimit ? (
          <div className="space-y-4 py-2">
            <p className="text-sm text-gray-600">
              You&apos;re using all <strong>{clientLimit}</strong> client slots on your current plan.
              Upgrade to add more clients.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700">
              <p className="font-medium text-gray-900 mb-1">Current plan</p>
              <p>{clientCount} of {clientLimit} clients used</p>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Link href="/settings#billing">
                <Button type="button">
                  Upgrade plan <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Client name *</Label>
            <Input id="name" value={form.name} onChange={e => set('name', e.target.value)} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="e.g. E-commerce"
                value={form.industry}
                onChange={e => set('industry', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Report frequency</Label>
              <Select value={form.reportFrequency} onValueChange={v => v && set('reportFrequency', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reportEmail">Report delivery email</Label>
            <Input
              id="reportEmail"
              type="email"
              placeholder="client@example.com"
              value={form.reportEmail}
              onChange={e => set('reportEmail', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goals">Campaign goals</Label>
            <Textarea
              id="goals"
              placeholder="e.g. Increase e-commerce revenue by 20% YoY, grow organic traffic..."
              value={form.goals}
              onChange={e => set('goals', e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Custom report instructions</Label>
            <Textarea
              id="instructions"
              placeholder="e.g. Never mention competitor names. Always frame results against Q1 goals."
              value={form.customInstructions}
              onChange={e => set('customInstructions', e.target.value)}
              rows={2}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {loading ? 'Adding client…' : 'Add client'}
            </Button>
          </div>
        </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
