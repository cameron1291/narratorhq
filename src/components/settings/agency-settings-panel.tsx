'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface AgencySettingsPanelProps {
  agency: {
    id: string
    name: string
    brand_color: string
    tone: string
  }
}

export function AgencySettingsPanel({ agency }: AgencySettingsPanelProps) {
  const [name, setName] = useState(agency.name)
  const [brandColor, setBrandColor] = useState(agency.brand_color ?? '#2563eb')
  const [tone, setTone] = useState(agency.tone ?? 'professional')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function save() {
    setSaving(true)
    await fetch('/api/agency/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, brandColor, tone }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-5 max-w-md">
      <div className="space-y-1.5">
        <Label htmlFor="agency-name">Agency name</Label>
        <Input
          id="agency-name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your agency name"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="brand-color">Brand colour</Label>
        <div className="flex items-center gap-3">
          <input
            id="brand-color"
            type="color"
            value={brandColor}
            onChange={e => setBrandColor(e.target.value)}
            className="h-10 w-14 rounded border border-gray-200 cursor-pointer p-1"
          />
          <Input
            value={brandColor}
            onChange={e => setBrandColor(e.target.value)}
            placeholder="#2563eb"
            className="w-32 font-mono text-sm"
          />
          <div
            className="h-10 w-10 rounded border border-gray-200 shrink-0"
            style={{ backgroundColor: brandColor }}
          />
        </div>
        <p className="text-xs text-gray-500">Used in PDF reports and email headers</p>
      </div>

      <div className="space-y-1.5">
        <Label>Default report tone</Label>
        <Select value={tone} onValueChange={v => v && setTone(v)}>
          <SelectTrigger className="w-60">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="professional">Professional — clear, structured, agency-polished</SelectItem>
            <SelectItem value="conversational">Conversational — friendly, plain English, no jargon</SelectItem>
            <SelectItem value="data-heavy">Data-heavy — metrics-led, minimal narrative</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500">Applied to all clients by default. Can be overridden per client.</p>
      </div>

      <Button onClick={save} disabled={saving || !name.trim()}>
        {saving ? 'Saving…' : saved ? 'Saved' : 'Save changes'}
      </Button>
    </div>
  )
}
