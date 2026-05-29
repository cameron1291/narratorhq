import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { discoverMetaAdAccountId } from '@/lib/meta/ads'
import { encrypt } from '@/lib/encryption'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const stateParam = request.nextUrl.searchParams.get('state')
  const errorParam = request.nextUrl.searchParams.get('error')

  if (errorParam || !code || !stateParam) {
    return NextResponse.redirect(new URL('/clients?error=meta_oauth_failed', request.url))
  }

  let state: { platform: string; clientId: string; userId: string }
  try {
    state = JSON.parse(Buffer.from(stateParam, 'base64').toString())
  } catch {
    return NextResponse.redirect(new URL('/clients?error=invalid_state', request.url))
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.id !== state.userId) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Exchange code for access token
  const tokenUrl = new URL('https://graph.facebook.com/v19.0/oauth/access_token')
  tokenUrl.searchParams.set('client_id', process.env.META_APP_ID!)
  tokenUrl.searchParams.set('client_secret', process.env.META_APP_SECRET!)
  tokenUrl.searchParams.set('redirect_uri', `${process.env.NEXT_PUBLIC_APP_URL}/api/connections/meta_ads/callback`)
  tokenUrl.searchParams.set('code', code)

  const tokenRes = await fetch(tokenUrl.toString())
  if (!tokenRes.ok) {
    return NextResponse.redirect(new URL('/clients?error=meta_token_exchange_failed', request.url))
  }

  const tokenData = await tokenRes.json() as {
    access_token: string
    token_type: string
    expires_in?: number
  }

  // Exchange for long-lived token (60-day expiry instead of 1 hour)
  const longLivedUrl = new URL('https://graph.facebook.com/v19.0/oauth/access_token')
  longLivedUrl.searchParams.set('grant_type', 'fb_exchange_token')
  longLivedUrl.searchParams.set('client_id', process.env.META_APP_ID!)
  longLivedUrl.searchParams.set('client_secret', process.env.META_APP_SECRET!)
  longLivedUrl.searchParams.set('fb_exchange_token', tokenData.access_token)

  const longLivedRes = await fetch(longLivedUrl.toString())
  const longLivedData = longLivedRes.ok
    ? await longLivedRes.json() as { access_token: string; expires_in?: number }
    : tokenData

  const accessToken = longLivedData.access_token
  const expiresIn = longLivedData.expires_in ?? 5184000 // default 60 days
  const tokenExpiry = new Date(Date.now() + expiresIn * 1000).toISOString()

  // Discover ad account
  const account = await discoverMetaAdAccountId(accessToken)

  const serviceSupabase = createServiceClient()
  await serviceSupabase.from('data_connections').upsert({
    client_id: state.clientId,
    platform: 'meta_ads',
    property_id: account?.id ?? null,
    property_name: account?.name ?? null,
    access_token: encrypt(accessToken),
    refresh_token: null,
    token_expiry: tokenExpiry,
    is_active: true,
    connected_at: new Date().toISOString(),
  }, { onConflict: 'client_id,platform' })

  return NextResponse.redirect(new URL(`/clients/${state.clientId}?connected=meta_ads`, request.url))
}
