'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PlusCircle, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  promise:     { label: 'Promise',     color: 'bg-blue-100 text-blue-800' },
  sensitivity: { label: 'Sensitivity', color: 'bg-amber-100 text-amber-800' },
  goal:        { label: 'Goal',        color: 'bg-green-100 text-green-800' },
  note:        { label: 'Note',        color: 'bg-gray-100 text-gray-800' },
}

interface ContextItem {
  id: string
  context_type: string
  content: string
  is_active: boolean
  created_at: string
}

interface Instruction {
  id: string
  instruction: string
  is_active: boolean
}

interface Props {
  clientId: string
  contextItems: ContextItem[]
  instructions: Instruction[]
}

export function ClientContextPanel({ clientId, contextItems, instructions }: Props) {
  const router = useRouter()
  const supabase = createClient()

  const [newContent, setNewContent] = useState('')
  const [newType, setNewType] = useState<string>('note')
  const [newInstruction, setNewInstruction] = useState('')
  const [saving, setSaving] = useState(false)

  const activeItems = contextItems.filter(i => i.is_active)
  const activeInstructions = instructions.filter(i => i.is_active)

  async function addContext() {
    if (!newContent.trim()) return
    setSaving(true)
    await supabase.from('client_context').insert({
      client_id: clientId,
      context_type: newType,
      content: newContent.trim(),
    })
    setNewContent('')
    setSaving(false)
    router.refresh()
  }

  async function addInstruction() {
    if (!newInstruction.trim()) return
    setSaving(true)
    await supabase.from('report_instructions').insert({
      client_id: clientId,
      instruction: newInstruction.trim(),
    })
    setNewInstruction('')
    setSaving(false)
    router.refresh()
  }

  async function removeContext(id: string) {
    await supabase.from('client_context').update({ is_active: false }).eq('id', id)
    router.refresh()
  }

  async function removeInstruction(id: string) {
    await supabase.from('report_instructions').update({ is_active: false }).eq('id', id)
    router.refresh()
  }

  return (
    <div className="space-y-8">
      {/* Context items */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-1">Client context</h3>
        <p className="text-xs text-gray-500 mb-4">
          Promises made, sensitivities, and goals — fed into every report to keep the narrative accurate and relevant.
        </p>

        <div className="space-y-2 mb-4">
          {activeItems.length === 0 && (
            <p className="text-sm text-gray-400 italic">No context added yet.</p>
          )}
          {activeItems.map(item => (
            <div key={item.id} className="flex items-start justify-between p-3 bg-white border rounded-lg">
              <div className="flex items-start gap-3">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${TYPE_LABELS[item.context_type]?.color ?? 'bg-gray-100'}`}>
                  {TYPE_LABELS[item.context_type]?.label ?? item.context_type}
                </span>
                <p className="text-sm text-gray-700">{item.content}</p>
              </div>
              <button onClick={() => removeContext(item.id)} className="text-gray-400 hover:text-red-500 ml-2 shrink-0">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Select value={newType} onValueChange={(v) => v && setNewType(v)}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="promise">Promise</SelectItem>
              <SelectItem value="sensitivity">Sensitivity</SelectItem>
              <SelectItem value="goal">Goal</SelectItem>
              <SelectItem value="note">Note</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="e.g. Promised to fix mobile CPC issue by next month"
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            rows={1}
            className="flex-1 resize-none"
          />
          <Button onClick={addContext} disabled={saving || !newContent.trim()} size="sm" className="shrink-0">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Reusable report instructions */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-1">Report instructions</h3>
        <p className="text-xs text-gray-500 mb-4">
          Persistent rules applied to every report generated for this client.
        </p>

        <div className="space-y-2 mb-4">
          {activeInstructions.length === 0 && (
            <p className="text-sm text-gray-400 italic">No instructions added yet.</p>
          )}
          {activeInstructions.map(inst => (
            <div key={inst.id} className="flex items-center justify-between p-3 bg-white border rounded-lg">
              <p className="text-sm text-gray-700">{inst.instruction}</p>
              <button onClick={() => removeInstruction(inst.id)} className="text-gray-400 hover:text-red-500 ml-2 shrink-0">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Textarea
            placeholder="e.g. Never mention competitor names. Always reference Q1 targets."
            value={newInstruction}
            onChange={e => setNewInstruction(e.target.value)}
            rows={1}
            className="flex-1 resize-none"
          />
          <Button onClick={addInstruction} disabled={saving || !newInstruction.trim()} size="sm" className="shrink-0">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
