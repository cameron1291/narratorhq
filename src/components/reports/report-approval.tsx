'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Circle, RefreshCw, ChevronDown, ChevronUp, AlertTriangle, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { NarrativeSection } from '@/lib/normalization/types'

const SECTION_LABELS: Record<NarrativeSection['section'], string> = {
  overview: 'Overview',
  organic: 'Organic',
  paid_search: 'Paid Search',
  paid_social: 'Paid Social',
  anomalies: 'Anomalies',
  next_steps: 'Next Steps',
}

const CONFIDENCE_CONFIG = {
  high: { label: 'High confidence', color: 'text-green-700 bg-green-50 border-green-200' },
  medium: { label: 'Review recommended', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
  low: { label: 'Low confidence — please review carefully', color: 'text-red-700 bg-red-50 border-red-200' },
}

interface SectionCardProps {
  reportId: string
  section: NarrativeSection
  originalContent: string
  onUpdate: (section: NarrativeSection['section'], updated: Partial<NarrativeSection>) => void
}

function SectionCard({ reportId, section, originalContent, onUpdate }: SectionCardProps) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(section.editedContent ?? section.content)
  const [regenerating, setRegenerating] = useState(false)
  const [regenInstruction, setRegenInstruction] = useState('')
  const [showRegen, setShowRegen] = useState(false)
  const [saving, setSaving] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const displayContent = section.editedContent ?? section.content
  const wasEdited = section.editedContent !== null && section.editedContent !== section.content
  const confidence = CONFIDENCE_CONFIG[section.confidence]

  async function saveEdit() {
    setSaving(true)
    const newContent = editText.trim()
    await fetch(`/api/reports/${reportId}/sections/${section.section}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ editedContent: newContent !== section.content ? newContent : null }),
    })
    onUpdate(section.section, { editedContent: newContent !== section.content ? newContent : null })
    setSaving(false)
    setEditing(false)
  }

  async function toggleApprove() {
    const next = !section.isApproved
    await fetch(`/api/reports/${reportId}/sections/${section.section}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isApproved: next }),
    })
    onUpdate(section.section, { isApproved: next })
  }

  async function regenerate() {
    setRegenerating(true)
    setShowRegen(false)
    const res = await fetch(`/api/reports/${reportId}/regenerate-section`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: section.section, instruction: regenInstruction || undefined }),
    })
    if (res.ok) {
      const data = await res.json() as { section: NarrativeSection }
      onUpdate(section.section, { ...data.section, isApproved: false, editedContent: null })
      setEditText(data.section.content)
      setRegenInstruction('')
    }
    setRegenerating(false)
  }

  return (
    <div className={cn(
      'rounded-xl border bg-white overflow-hidden transition-all',
      section.isApproved ? 'border-green-300' : 'border-gray-200'
    )}>
      {/* Section header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
        <button
          onClick={toggleApprove}
          className={cn(
            'shrink-0 transition-colors',
            section.isApproved ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'
          )}
          title={section.isApproved ? 'Approved — click to un-approve' : 'Click to approve'}
        >
          {section.isApproved
            ? <CheckCircle className="h-5 w-5" />
            : <Circle className="h-5 w-5" />
          }
        </button>

        <span className="font-semibold text-gray-900 text-sm">
          {SECTION_LABELS[section.section]}
        </span>

        {wasEdited && (
          <span className="text-xs text-blue-600 bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5">
            Edited
          </span>
        )}

        <span className={cn('text-xs border rounded px-1.5 py-0.5 ml-auto', confidence.color)}>
          {section.confidence === 'low' && <AlertTriangle className="inline h-3 w-3 mr-1" />}
          {section.confidence === 'medium' && <Info className="inline h-3 w-3 mr-1" />}
          {confidence.label}
        </span>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {editing ? (
          <div className="space-y-3">
            <textarea
              ref={textareaRef}
              value={editText}
              onChange={e => setEditText(e.target.value)}
              className="w-full min-h-[120px] text-sm text-gray-800 leading-relaxed border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              autoFocus
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={saveEdit} disabled={saving}>
                {saving ? 'Saving…' : 'Save'}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => { setEditText(section.editedContent ?? section.content); setEditing(false) }}>
                Cancel
              </Button>
              {wasEdited && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-500 ml-auto"
                  onClick={() => { setEditText(originalContent); onUpdate(section.section, { editedContent: null }); setEditing(false) }}
                >
                  Revert to original
                </Button>
              )}
            </div>
          </div>
        ) : (
          <p
            className="text-sm text-gray-700 leading-relaxed cursor-text hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors whitespace-pre-wrap"
            onClick={() => setEditing(true)}
            title="Click to edit"
          >
            {displayContent}
          </p>
        )}
      </div>

      {/* Supporting metrics */}
      {section.supportingMetrics.length > 0 && (
        <div className="px-4 pb-3 flex flex-wrap gap-1">
          {section.supportingMetrics.map(m => (
            <span key={m} className="text-xs text-gray-500 bg-gray-100 rounded px-1.5 py-0.5">
              {m}
            </span>
          ))}
        </div>
      )}

      {/* Regenerate */}
      <div className="px-4 pb-3 border-t border-gray-100 pt-3">
        {showRegen ? (
          <div className="space-y-2">
            <input
              type="text"
              value={regenInstruction}
              onChange={e => setRegenInstruction(e.target.value)}
              placeholder="Optional: direction for this rewrite (e.g. 'more positive tone')"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={e => e.key === 'Enter' && regenerate()}
            />
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={regenerate} disabled={regenerating}>
                <RefreshCw className={cn('h-3 w-3 mr-1.5', regenerating && 'animate-spin')} />
                {regenerating ? 'Generating…' : 'Regenerate'}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setShowRegen(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowRegen(true)}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RefreshCw className="h-3 w-3" />
            Regenerate section
          </button>
        )}
      </div>
    </div>
  )
}

interface ReportApprovalProps {
  reportId: string
  clientName: string
  periodLabel: string
  initialSections: NarrativeSection[]
  originalSections: NarrativeSection[]
  status: string
}

export function ReportApproval({
  reportId,
  clientName,
  periodLabel,
  initialSections,
  originalSections,
  status: initialStatus,
}: ReportApprovalProps) {
  const router = useRouter()
  const [sections, setSections] = useState(initialSections)
  const [status, setStatus] = useState(initialStatus)
  const [approving, setApproving] = useState(false)
  const [sending, setSending] = useState(false)
  const [showMetricsSummary, setShowMetricsSummary] = useState(false)

  const approvedCount = sections.filter(s => s.isApproved).length
  const allApproved = approvedCount === sections.length && sections.length > 0

  function updateSection(sectionName: NarrativeSection['section'], updated: Partial<NarrativeSection>) {
    setSections(prev => prev.map(s => s.section === sectionName ? { ...s, ...updated } : s))
  }

  async function approveAll() {
    setApproving(true)
    await fetch(`/api/reports/${reportId}/approve`, { method: 'POST' })
    setStatus('approved')
    setApproving(false)
    router.refresh()
  }

  async function sendReport() {
    setSending(true)
    const res = await fetch(`/api/reports/${reportId}/send`, { method: 'POST' })
    if (res.ok) {
      setStatus('sent')
    }
    setSending(false)
  }

  const originalMap = Object.fromEntries(originalSections.map(s => [s.section, s.content]))

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{clientName}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{periodLabel} · {sections.length} sections</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm text-gray-500">{approvedCount}/{sections.length} approved</span>
          {status === 'sent' ? (
            <span className="text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
              Sent
            </span>
          ) : status === 'approved' ? (
            <Button onClick={sendReport} disabled={sending} variant="default">
              {sending ? 'Sending…' : 'Send to client'}
            </Button>
          ) : (
            <Button
              onClick={approveAll}
              disabled={approving || !allApproved}
              title={!allApproved ? 'Approve all sections first' : undefined}
            >
              {approving ? 'Approving…' : 'Approve report'}
            </Button>
          )}
        </div>
      </div>

      {/* Quick approve all shortcut */}
      {status === 'draft' && !allApproved && (
        <button
          onClick={async () => {
            // Mark all sections approved in state
            const all = sections.map(s => ({ ...s, isApproved: true }))
            setSections(all)
            // Persist each
            await Promise.all(all.map(s =>
              fetch(`/api/reports/${reportId}/sections/${s.section}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isApproved: true }),
              })
            ))
          }}
          className="w-full text-sm text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 rounded-lg py-2 transition-colors bg-blue-50 hover:bg-blue-100"
        >
          Approve all sections as written
        </button>
      )}

      {/* Low confidence warning */}
      {sections.some(s => s.confidence === 'low') && (
        <div className="flex gap-2 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>One or more sections have low confidence. Please review these carefully before approving.</span>
        </div>
      )}

      {/* Sections */}
      <div className="space-y-4">
        {sections.map(section => (
          <SectionCard
            key={section.section}
            reportId={reportId}
            section={section}
            originalContent={originalMap[section.section] ?? section.content}
            onUpdate={updateSection}
          />
        ))}
      </div>

      {/* Metrics summary toggle */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <button
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={() => setShowMetricsSummary(v => !v)}
        >
          Raw metrics reference
          {showMetricsSummary ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {showMetricsSummary && (
          <div className="px-4 pb-4 text-xs text-gray-500 font-mono border-t border-gray-100">
            <p className="mt-3 italic">Metrics data is stored in the report record. Open the report details for full breakdown.</p>
          </div>
        )}
      </div>
    </div>
  )
}
