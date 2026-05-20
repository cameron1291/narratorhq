'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, AlertCircle, Link2, RefreshCw, Unlink, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MetaTokenConnectModal } from './meta-token-connect-modal'

interface Connection {
  id: string
  platform: string
  property_id: string | null
  property_name: string | null
  is_active: boolean
  last_sync: string | null
}

interface Props {
  clientId: string
  connections: Connection[]
}

const PLATFORMS = [
  {
    key: 'ga4',
    label: 'Google Analytics 4',
    description: 'Traffic, conversions, channel breakdown',
    required: true,
  },
  {
    key: 'google_ads',
    label: 'Google Ads',
    description: 'Paid search: spend, CPA, ROAS, campaigns',
    required: false,
  },
  {
    key: 'meta_ads',
    label: 'Meta Ads',
    description: 'Paid social: spend, reach, conversions',
    required: false,
  },
]

export function ClientConnectionsPanel({ clientId, connections }: Props) {
  const router = useRouter()
  const connected = new Map(connections.map(c => [c.platform, c]))
  const [disconnecting, setDisconnecting] = useState<string | null>(null)
  const [confirmPlatform, setConfirmPlatform] = useState<string | null>(null)
  const [showMetaModal, setShowMetaModal] = useState(false)

  function handleConnect(platform: string) {
    if (platform === 'meta_ads') {
      setShowMetaModal(true)
      return
    }
    window.location.href = `/api/connections/${platform}/authorize?clientId=${clientId}`
  }

  async function handleDisconnect(platform: string) {
    setDisconnecting(platform)
    try {
      await fetch(`/api/connections/${platform}/disconnect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId }),
      })
      router.refresh()
    } finally {
      setDisconnecting(null)
      setConfirmPlatform(null)
    }
  }

  return (
    <>
    <div className="space-y-3">
      <p className="text-sm text-gray-500 mb-4">
        Connect data sources to start generating reports. GA4 is required; Google Ads and Meta are optional but recommended.
      </p>

      {PLATFORMS.map(({ key, label, description, required }) => {
        const conn = connected.get(key)
        const isConnected = !!conn?.is_active
        const isBroken = isConnected && conn?.property_id == null
        const isConfirming = confirmPlatform === key
        const isDisconnecting = disconnecting === key

        return (
          <div
            key={key}
            className={`flex items-center justify-between p-4 bg-white border rounded-lg ${isBroken ? 'border-amber-300 bg-amber-50' : ''}`}
          >
            <div className="flex items-center gap-3">
              {isBroken ? (
                <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
              ) : isConnected ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-gray-300 shrink-0" />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm text-gray-900">{label}</p>
                  {required && !isConnected && (
                    <Badge variant="outline" className="text-xs text-red-600 border-red-300">Required</Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {isBroken
                    ? 'Connected but property not found — reconnect to fix'
                    : isConnected
                    ? (conn.property_name ?? 'Connected')
                    : description}
                </p>
                {conn?.last_sync && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    Last synced {new Date(conn.last_sync).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-4">
              {isConnected ? (
                isConfirming ? (
                  <>
                    <span className="text-xs text-gray-500 mr-1">Disconnect {label}?</span>
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={isDisconnecting}
                      onClick={() => handleDisconnect(key)}
                    >
                      {isDisconnecting ? 'Removing…' : 'Yes, disconnect'}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setConfirmPlatform(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleConnect(key)}
                      title="Reconnect"
                    >
                      <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                      Reconnect
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-red-600"
                      onClick={() => setConfirmPlatform(key)}
                      title="Disconnect"
                    >
                      <Unlink className="h-3.5 w-3.5" />
                    </Button>
                  </>
                )
              ) : (
                <Button size="sm" variant="outline" onClick={() => handleConnect(key)}>
                  <Link2 className="h-3.5 w-3.5 mr-1.5" />
                  Connect
                </Button>
              )}
            </div>
          </div>
        )
      })}
    </div>

    {showMetaModal && (
      <MetaTokenConnectModal
        clientId={clientId}
        onClose={() => setShowMetaModal(false)}
      />
    )}
    </>
  )
}
