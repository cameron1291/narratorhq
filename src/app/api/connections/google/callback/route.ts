import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { getOAuthClient } from '@/lib/google/oauth'
import { encrypt } from '@/lib/encryption'

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

  // For GA4: discover the first available property via accounts → properties
  if (state.platform === 'ga4' && tokens.access_token) {
    try {
      oauthClient.setCredentials(tokens)
      const { google } = await import('googleapis')
      const analyticsAdmin = google.analyticsadmin({ version: 'v1beta', auth: oauthClient })
      const { data: accountsData } = await analyticsAdmin.accounts.list()
      const accounts = accountsData.accounts ?? []
      if (accounts.length === 0) {
        return NextResponse.redirect(new URL(`/clients/${state.clientId}?ga4_debug=${encodeURIComponent('accounts_empty')}`, request.url))
      }
      for (const account of accounts) {
        if (!account.name) continue
        const { data: propsData } = await analyticsAdmin.properties.list({
          filter: `parent:${account.name}`,
        })
        const firstProp = propsData.properties?.[0]
        if (firstProp) {
          propertyId = firstProp.name?.replace('properties/', '') ?? null
          propertyName = firstProp.displayName ?? null
          break
        }
      }
      if (!propertyId) {
        return NextResponse.redirect(new URL(`/clients/${state.clientId}?ga4_debug=${encodeURIComponent('props_empty:' + accounts.map(a => a.name).join(','))}`, request.url))
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('[GA4 callback] property discovery failed:', msg)
      return NextResponse.redirect(new URL(`/clients/${state.clientId}?ga4_debug=${encodeURIComponent(msg)}`, request.url))
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

  // Upsert the connection — use service client to bypass RLS on data_connections
  const serviceSupabase = createServiceClient()
  await serviceSupabase.from('data_connections').upsert({
    client_id: state.clientId,
    platform: state.platform,
    property_id: propertyId,
    property_name: propertyName,
    access_token: encrypt(tokens.access_token!),
    refresh_token: tokens.refresh_token ? encrypt(tokens.refresh_token) : null,
    token_expiry: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null,
    is_active: true,
    connected_at: new Date().toISOString(),
  }, { onConflict: 'client_id,platform' })

  return NextResponse.redirect(new URL(`/clients/${state.clientId}?connected=${state.platform}`, request.url))
}
