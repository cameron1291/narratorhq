'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { GeneratingPoller } from './generating-poller'

export function GeneratingView({ clientId }: { clientId: string }) {
  const [timedOut, setTimedOut] = useState(false)

  if (timedOut) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-700 font-medium mb-2">This is taking longer than expected.</p>
        <p className="text-sm text-gray-500 mb-4">The report may still be processing in the background. Try refreshing in a minute.</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Refresh
          </button>
          <span className="text-gray-300">·</span>
          <Link href={`/clients/${clientId}`} className="text-sm text-gray-500 hover:text-gray-700">
            Back to client
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center">
      <GeneratingPoller onTimeout={() => setTimedOut(true)} />
      <div className="inline-flex items-center gap-2 text-gray-600" aria-live="polite">
        <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
        Generating report…
      </div>
      <p className="text-sm text-gray-400 mt-2">This usually takes 10–15 seconds.</p>
    </div>
  )
}
