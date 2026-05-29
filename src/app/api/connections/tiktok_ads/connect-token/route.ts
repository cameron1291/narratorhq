import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { encrypt } from '@/lib/encryption'

export async function POST(request: NextRequest) {
  let clientId: string, token: string, advertiserId: string
  try {
    ;({ clientId, token, advertiserId } = await request.json())
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!clientId || !token || !advertiserId) {
    return NextResponse.json({ error: 'Missing clientId, token, or advertiserId' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id')
    .eq('id', user.id)
    .single()
  if (!agencyUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: clientRow } = await supabase
    .from('clients')
    .select('id')
    .eq('id', clientId)
    .eq('agency_id', agencyUser.agency_id)
    .single()
  if (!clientRow) return NextResponse.json({ error: 'Client not found' }, { status: 404 })

  // Validate token + advertiser ID against TikTok Marketing API
  const res = await fetch(
    `https://business-api.tiktok.com/open_api/v1.3/advertiser/info/?advertiser_ids=["${advertiserId}"]`,
    { headers: { 'Access-Token': token } }
  )

  if (!res.ok) {
    return NextResponse.json({ error: 'Could not reach TikTok API. Please try again.' }, { status: 422 })
  }

  const data = await res.json() as {
    code: number
    message: string
    data?: {
      list?: { advertiser_id: string; name: string; status: string }[]
    }
  }

  if (data.code !== 0) {
    return NextResponse.json({
      error: `TikTok API error: ${data.message}. Check your access token is correct.`,
    }, { status: 422 })
  }

  const account = data.data?.list?.[0]
  if (!account) {
    return NextResponse.json({
      error: 'Advertiser ID not found. Make sure the ID matches the account your token has access to.',
    }, { status: 422 })
  }

  const serviceSupabase = createServiceClient()
  const { error: upsertError } = await serviceSupabase
    .from('data_connections')
    .upsert({
      client_id: clientId,
      platform: 'tiktok_ads',
      property_id: account.advertiser_id,
      property_name: account.name,
      access_token: encrypt(token),
      refresh_token: null,
      token_expiry: null,
      is_active: true,
      connected_at: new Date().toISOString(),
    }, { onConflict: 'client_id,platform' })

  if (upsertError) {
    return NextResponse.json({ error: 'Failed to save connection' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, accountName: account.name })
}
