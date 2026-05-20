'use client'

import { CheckCircle2, AlertCircle, Link2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Connection {
  id: string
  platform: string
  property_name: string
  is_active: boolean
  last_sync: string
}

interface Props {
  clientId: string
  connections: Connection[]
}

const PLATFORMS = [
  { key: 'ga4',        label: 'Google Analytics 4', description: 'Traffic, conversions, channel breakdown' },
  { key: 'google_ads', label: 'Google Ads',          description: 'Paid search: spend, CPA, ROAS, campaigns' },
  { key: 'meta_ads',   label: 'Meta Ads',            description: 'Paid social: spend, reach, conversions' },
]

export function ClientConnectionsPanel({ clientId, connections }: Props) {
  const connected = new Map(connections.map(c => [c.platform, c]))

  function handleConnect(platform: string) {
    window.location.href = `/api/connections/${platform}/authorize?clientId=${clientId}`
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500 mb-4">
        Connect data sources to start generating reports. GA4 is required; Google Ads and Meta are optional but recommended.
      </p>

      {PLATFORMS.map(({ key, label, description }) => {
        const conn = connected.get(key)
        return (
          <div key={key} className="flex items-center justify-between p-4 bg-white border rounded-lg">
            <div className="flex items-center gap-3">
              {conn?.is_active ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-gray-300 shrink-0" />
              )}
              <div>
                <p className="font-medium text-sm text-gray-900">{label}</p>
                <p className="text-xs text-gray-500">
                  {conn?.is_active
                    ? conn.property_name ?? 'Connected'
                    : description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {conn?.last_sync && (
                <span className="text-xs text-gray-400">
                  Synced {new Date(conn.last_sync).toLocaleDateString()}
                </span>
              )}
              {conn?.is_active ? (
                <Badge variant="outline" className="text-green-700 border-green-300 text-xs">
                  Connected
                </Badge>
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
  )
}
