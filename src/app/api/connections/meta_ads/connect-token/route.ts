import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const { clientId, token } = await request.json()

  if (!clientId || !token) {
    return NextResponse.json({ error: 'Missing clientId or token' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Validate token + discover ad account by calling Meta API
  const res = await fetch(
    `https://graph.facebook.com/v19.0/me/adaccounts?fields=id,name,account_status&limit=1&access_token=${token}`
  )

  if (!res.ok) {
    return NextResponse.json({ error: 'Invalid token — Meta API rejected it. Check the token and try again.' }, { status: 422 })
  }

  const data = await res.json() as {
    data?: { id: string; name: string; account_status: number }[]
    error?: { message: string }
  }

  if (data.error) {
    return NextResponse.json({ error: `Meta API error: ${data.error.message}` }, { status: 422 })
  }

  if (!data.data?.length) {
    return NextResponse.json({
      error: 'Token is valid but no ad accounts found. Make sure you added your ad account to the system user in step 3.',
    }, { status: 422 })
  }

  const account = data.data[0]
  const adAccountId = account.id.replace('act_', '')
  const adAccountName = account.name

  const serviceSupabase = createServiceClient()
  const { error: upsertError } = await serviceSupabase
    .from('data_connections')
    .upsert({
      client_id: clientId,
      platform: 'meta_ads',
      property_id: adAccountId,
      property_name: adAccountName,
      access_token: token,
      refresh_token: null,
      token_expiry: null, // system user tokens don't expire
      is_active: true,
      connected_at: new Date().toISOString(),
    }, { onConflict: 'client_id,platform' })

  if (upsertError) {
    return NextResponse.json({ error: 'Failed to save connection' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, adAccountName })
}
