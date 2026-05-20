import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getOAuthClient } from '@/lib/google/oauth'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const stateParam = request.nextUrl.searchParams.get('state')

  if (!code || !stateParam) {
    return NextResponse.redirect(new URL('/clients?error=oauth_failed', request.url))
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

  const oauthClient = getOAuthClient()
  const { tokens } = await oauthClient.getToken(code)

  let propertyId: string | null = null
  let propertyName: string | null = null

  // For GA4: discover the first available property
  if (state.platform === 'ga4' && tokens.access_token) {
    try {
      oauthClient.setCredentials(tokens)
      const { google } = await import('googleapis')
      const analyticsAdmin = google.analyticsadmin({ version: 'v1beta', auth: oauthClient })
      const { data } = await analyticsAdmin.properties.list({ filter: 'parent:accounts/-' })
      const firstProp = data.properties?.[0]
      if (firstProp) {
        propertyId = firstProp.name?.replace('properties/', '') ?? null
        propertyName = firstProp.displayName ?? null
      }
    } catch {
      // non-fatal — user can set property manually later
    }
  }

  // For Google Ads: discover the first accessible customer ID
  if (state.platform === 'google_ads' && tokens.access_token) {
    try {
      const { discoverGoogleAdsCustomerId } = await import('@/lib/google/ads')
      const customerId = await discoverGoogleAdsCustomerId(tokens.access_token)
      if (customerId) {
        propertyId = customerId
        propertyName = `Customer ${customerId}`
      }
    } catch {
      // non-fatal
    }
  }

  // Upsert the connection (encrypted tokens stored as text — add vault encryption post-MVP)
  await supabase.from('data_connections').upsert({
    client_id: state.clientId,
    platform: state.platform,
    property_id: propertyId,
    property_name: propertyName,
    access_token: tokens.access_token!,
    refresh_token: tokens.refresh_token ?? null,
    token_expiry: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null,
    is_active: true,
    connected_at: new Date().toISOString(),
  }, { onConflict: 'client_id,platform' })

  return NextResponse.redirect(new URL(`/clients/${state.clientId}?connected=${state.platform}`, request.url))
}
