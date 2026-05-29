'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
import { Upload, X } from 'lucide-react'

interface AgencySettingsPanelProps {
  agency: {
    id: string
    name: string
    brand_color: string
    tone: string
    logo_url?: string | null
  }
}

export function AgencySettingsPanel({ agency }: AgencySettingsPanelProps) {
  const [name, setName] = useState(agency.name)
  const [brandColor, setBrandColor] = useState(agency.brand_color ?? '#2563eb')
  const [tone, setTone] = useState(agency.tone ?? 'professional')
  const [logoUrl, setLogoUrl] = useState<string | null>(agency.logo_url ?? null)
  const [logoUploading, setLogoUploading] = useState(false)
  const [logoError, setLogoError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      setLogoError('Logo must be under 2MB')
      return
    }
    if (!['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'].includes(file.type)) {
      setLogoError('Logo must be PNG, JPG, SVG or WebP')
      return
    }

    setLogoUploading(true)
    setLogoError(null)

    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const path = `${agency.id}/logo.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('agency-logos')
      .upload(path, file, { upsert: true, contentType: file.type })

    if (uploadError) {
      setLogoError('Upload failed. Please try again.')
      setLogoUploading(false)
      return
    }

    const { data: urlData } = supabase.storage.from('agency-logos').getPublicUrl(path)
    const url = `${urlData.publicUrl}?t=${Date.now()}`
    setLogoUrl(url)

    await fetch('/api/agency/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ logoUrl: urlData.publicUrl }),
    })

    setLogoUploading(false)
  }

  async function removeLogo() {
    setLogoUrl(null)
    await fetch('/api/agency/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ logoUrl: null }),
    })
  }

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
    <div className="space-y-6 max-w-md">

      {/* Logo upload */}
      <div className="space-y-2">
        <Label>Agency logo</Label>
        <p className="text-xs text-gray-500">Used on PDF reports and client emails. PNG, JPG or SVG, max 2MB.</p>

        {logoUrl ? (
          <div className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg bg-gray-50">
            <img src={logoUrl} alt="Agency logo" className="h-12 max-w-[160px] object-contain rounded" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-green-700 font-medium">Logo uploaded</p>
              <p className="text-xs text-gray-500">This logo will appear on all client reports</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={logoUploading}
              >
                Replace
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-red-600"
                onClick={removeLogo}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={logoUploading}
            className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:bg-blue-50/30 transition-colors text-gray-400 hover:text-blue-600"
          >
            <Upload className="h-6 w-6" />
            <span className="text-sm font-medium">
              {logoUploading ? 'Uploading…' : 'Upload logo'}
            </span>
            <span className="text-xs">Click to browse</span>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/svg+xml,image/webp"
          className="hidden"
          onChange={handleLogoUpload}
        />
        {logoError && <p className="text-xs text-red-600">{logoError}</p>}
      </div>

      {/* Agency name */}
      <div className="space-y-1.5">
        <Label htmlFor="agency-name">Agency name</Label>
        <Input
          id="agency-name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your agency name"
        />
        <p className="text-xs text-gray-500">Appears in the footer of client reports</p>
      </div>

      {/* Brand colour */}
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
        <p className="text-xs text-gray-500">Used as the accent colour in PDF reports and email headers</p>
      </div>

      {/* Tone */}
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
        {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save changes'}
      </Button>
    </div>
  )
}
