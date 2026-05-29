'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const MAX_POLLS = 60 // 3 minutes at 3s intervals

export function GeneratingPoller({ onTimeout }: { onTimeout?: () => void }) {
  const router = useRouter()
  const pollCount = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      pollCount.current += 1
      if (pollCount.current >= MAX_POLLS) {
        clearInterval(interval)
        onTimeout?.()
        return
      }
      router.refresh()
    }, 3000)

    return () => clearInterval(interval)
  }, [router, onTimeout])

  return null
}
