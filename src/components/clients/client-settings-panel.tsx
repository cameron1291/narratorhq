'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

interface Props {
  client: {
    id: string
    name: string
    industry: string | null
    report_email: string | null
    report_frequency: string
    tone_override: string | null
    custom_instructions: string | null
    goals: string | null
  }
}

export function ClientSettingsPanel({ client }: Props) {
  const router = useRouter()
  const supabase = createClient()

  const [form, setForm] = useState({
    name: client.name,
    industry: client.industry ?? '',
    reportEmail: client.report_email ?? '',
    reportFrequency: client.report_frequency,
    toneOverride: client.tone_override ?? 'inherit',
    customInstructions: client.custom_instructions ?? '',
    goals: client.goals ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
    setSaved(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    await supabase.from('clients').update({
      name: form.name,
      industry: form.industry || null,
      report_email: form.reportEmail || null,
      report_frequency: form.reportFrequency,
      tone_override: form.toneOverride === 'inherit' ? null : form.toneOverride,
      custom_instructions: form.customInstructions || null,
      goals: form.goals || null,
    }).eq('id', client.id)

    setSaving(false)
    setSaved(true)
    router.refresh()
  }

  async function handleArchive() {
    if (!confirm(`Archive ${client.name}? They will no longer receive reports.`)) return
    await supabase.from('clients').update({ is_archived: true }).eq('id', client.id)
    router.push('/clients')
    router.refresh()
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-xl">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Client name</Label>
          <Input value={form.name} onChange={e => set('name', e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label>Industry</Label>
          <Input placeholder="E-commerce" value={form.industry} onChange={e => set('industry', e.target.value)} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Report delivery email</Label>
        <Input type="email" value={form.reportEmail} onChange={e => set('reportEmail', e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Report frequency</Label>
          <Select value={form.reportFrequency} onValueChange={v => v && set('reportFrequency', v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Tone override</Label>
          <Select value={form.toneOverride} onValueChange={v => v && set('toneOverride', v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="inherit">Inherit from agency</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="conversational">Conversational</SelectItem>
              <SelectItem value="data-heavy">Data-heavy</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Campaign goals</Label>
        <Textarea rows={2} value={form.goals} onChange={e => set('goals', e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label>Custom report instructions</Label>
        <Textarea rows={2} value={form.customInstructions} onChange={e => set('customInstructions', e.target.value)} />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save changes'}
        </Button>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-1">Danger zone</h4>
        <p className="text-xs text-gray-500 mb-3">Archiving stops all report generation for this client.</p>
        <Button type="button" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50" onClick={handleArchive}>
          Archive client
        </Button>
      </div>
    </form>
  )
}
