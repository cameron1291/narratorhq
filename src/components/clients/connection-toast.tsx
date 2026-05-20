'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { toast } from 'sonner'

const CONNECTED_LABELS: Record<string, string> = {
  ga4: 'Google Analytics 4',
  google_ads: 'Google Ads',
  meta_ads: 'Meta Ads',
}

export function ConnectionToast() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const connected = searchParams.get('connected')
    const error = searchParams.get('error')
    const debug = searchParams.get('ga4_debug')

    if (connected) {
      const label = CONNECTED_LABELS[connected] ?? connected
      toast.success(`${label} connected successfully`)
    }

    if (error) {
      const messages: Record<string, string> = {
        meta_oauth_failed: 'Meta connection failed — please try again',
        invalid_state: 'Connection failed — invalid state, please try again',
        meta_token_exchange_failed: 'Meta token exchange failed',
        ga4_oauth_failed: 'GA4 connection failed — please try again',
        google_ads_oauth_failed: 'Google Ads connection failed — please try again',
      }
      toast.error(messages[error] ?? `Connection error: ${error}`)
    }

    if (debug) {
      toast.error(`GA4 debug: ${decodeURIComponent(debug)}`)
    }

    if (connected || error || debug) {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('connected')
      params.delete('error')
      params.delete('ga4_debug')
      const qs = params.toString()
      router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
