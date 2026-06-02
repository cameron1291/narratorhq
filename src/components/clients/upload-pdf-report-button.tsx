'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Upload, Loader2, FileText, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface UploadPdfReportButtonProps {
  clientId: string
  agencyId: string
}

function defaultDateRange() {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const end = new Date(now.getFullYear(), now.getMonth(), 0)
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
  }
}

const MAX_SIZE_MB = 20
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

export function UploadPdfReportButton({ clientId, agencyId }: UploadPdfReportButtonProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [step, setStep] = useState<'idle' | 'uploading' | 'analysing'>('idle')
  const [error, setError] = useState<string | null>(null)

  const defaults = defaultDateRange()
  const [startDate, setStartDate] = useState(defaults.start)
  const [endDate, setEndDate] = useState(defaults.end)

  const today = new Date().toISOString().split('T')[0]
  const dateError = startDate > endDate
    ? 'Start date must be before end date'
    : endDate > today
    ? 'End date cannot be in the future'
    : null

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null
    setFileError(null)
    if (!selected) { setFile(null); return }
    if (selected.type !== 'application/pdf') {
      setFileError('Please select a PDF file.')
      setFile(null)
      return
    }
    if (selected.size > MAX_SIZE_BYTES) {
      setFileError(`File is too large. Maximum size is ${MAX_SIZE_MB}MB.`)
      setFile(null)
      return
    }
    setFile(selected)
  }

  function reset() {
    setFile(null)
    setFileError(null)
    setStep('idle')
    setError(null)
    const d = defaultDateRange()
    setStartDate(d.start)
    setEndDate(d.end)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function handleSubmit() {
    if (!file || dateError) return
    setError(null)

    // Step 1: Upload PDF directly to Supabase Storage
    setStep('uploading')
    const supabase = createClient()
    const storagePath = `${agencyId}/${clientId}/${Date.now()}.pdf`
    const { error: uploadError } = await supabase.storage
      .from('client-pdf-uploads')
      .upload(storagePath, file, { contentType: 'application/pdf', upsert: false })

    if (uploadError) {
      setError('Upload failed. Please try again.')
      setStep('idle')
      return
    }

    // Step 2: Call API to analyse the PDF
    setStep('analysing')
    try {
      const res = await fetch('/api/reports/generate-from-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, storagePath, startDate, endDate }),
      })
      if (!res.ok) {
        const data = await res.json() as { error?: string }
        setError(data.error ?? 'Analysis failed. Please try again.')
        setStep('idle')
        // Clean up orphaned file if API failed after upload
        await supabase.storage.from('client-pdf-uploads').remove([storagePath]).catch(() => {})
        return
      }
      const { reportId } = await res.json() as { reportId: string }
      setOpen(false)
      reset()
      router.push(`/reports/${reportId}`)
    } catch {
      setError('Network error. Please try again.')
      setStep('idle')
    }
  }

  const loading = step !== 'idle'

  return (
    <>
      <Button
        variant="outline"
        onClick={() => { reset(); setOpen(true) }}
        className="flex items-center gap-2"
      >
        <Upload className="h-4 w-4" />
        Import from PDF
      </Button>

      <Dialog open={open} onOpenChange={(v) => { if (!loading) { setOpen(v); if (!v) reset() } }}>
        <DialogContent className="max-w-sm">
          <DialogTitle>Analyse existing report PDF</DialogTitle>
          <div className="space-y-4 mt-2">
            <p className="text-xs text-gray-500">
              Upload an existing client report PDF. NarratorHQ will read it and generate a structured draft — no platform connections needed.
            </p>

            {/* File picker */}
            <div>
              {file ? (
                <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                  <span className="text-sm text-blue-800 flex-1 truncate">{file.name}</span>
                  {!loading && (
                    <button onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = '' }} className="text-blue-400 hover:text-blue-600">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex flex-col items-center gap-2 p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-gray-500 hover:text-blue-600"
                >
                  <Upload className="h-6 w-6" />
                  <span className="text-sm font-medium">Click to select PDF</span>
                  <span className="text-xs">Max {MAX_SIZE_MB}MB</span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              {fileError && <p className="text-xs text-red-600 mt-1.5">{fileError}</p>}
            </div>

            {/* Date range */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Period start</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  disabled={loading}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Period end</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  disabled={loading}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
              </div>
            </div>

            {(error || dateError) && (
              <p className="text-sm text-red-600">{error ?? dateError}</p>
            )}

            <Button
              onClick={handleSubmit}
              disabled={loading || !file || !!dateError || !!fileError}
              className="w-full"
            >
              {step === 'uploading' && <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Uploading…</>}
              {step === 'analysing' && <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Analysing PDF…</>}
              {step === 'idle' && 'Analyse report'}
            </Button>

            {step === 'analysing' && (
              <p className="text-xs text-center text-gray-400">This usually takes 20–40 seconds.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
