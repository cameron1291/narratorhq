'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { FileText, Loader2 } from 'lucide-react'

interface GenerateReportButtonProps {
  clientId: string
  hasGa4: boolean
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

export function GenerateReportButton({ clientId, hasGa4 }: GenerateReportButtonProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
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

  async function generate() {
    if (dateError) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, startDate, endDate }),
      })
      if (!res.ok) {
        const data = await res.json() as { error?: string }
        setError(data.error ?? 'Generation failed')
        setLoading(false)
        return
      }
      const { reportId } = await res.json() as { reportId: string }
      setOpen(false)
      router.push(`/reports/${reportId}`)
    } catch {
      setError('Network error — please try again')
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button variant="default" disabled={!hasGa4} title={!hasGa4 ? 'Connect GA4 first' : undefined}>
          <FileText className="h-4 w-4 mr-2" />
          Generate report
        </Button>
      } />
      <DialogContent className="max-w-sm">
        <DialogTitle>Generate report</DialogTitle>
        <div className="space-y-4 mt-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Period start</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Period end</label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {(error || dateError) && (
            <p className="text-sm text-red-600">{error ?? dateError}</p>
          )}
          <Button onClick={generate} disabled={loading || !!dateError} className="w-full">
            {loading
              ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Generating…</>
              : 'Generate'
            }
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
