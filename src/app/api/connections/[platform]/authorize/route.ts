import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getAuthUrl, GA4_SCOPES, GOOGLE_ADS_SCOPES } from '@/lib/google/oauth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string }> }
) {
  const { platform } = await params
  const clientId = request.nextUrl.searchParams.get('clientId')

  if (!clientId) {
    return NextResponse.redirect(new URL('/clients', request.url))
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL('/login', request.url))

  // Verify the client belongs to the caller's agency before redirecting to OAuth
  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id')
    .eq('id', user.id)
    .single()

  if (agencyUser) {
    const { data: clientRow } = await supabase
      .from('clients')
      .select('id')
      .eq('id', clientId)
      .eq('agency_id', agencyUser.agency_id)
      .single()

    if (!clientRow) return NextResponse.redirect(new URL('/clients', request.url))
  }

  // State encodes platform + clientId so the callback knows what to store
  const state = Buffer.from(JSON.stringify({ platform, clientId, userId: user.id })).toString('base64')

  if (platform === 'ga4') {
    const url = getAuthUrl(state, GA4_SCOPES)
    return NextResponse.redirect(url)
  }

  if (platform === 'google_ads') {
    const url = getAuthUrl(state, GOOGLE_ADS_SCOPES)
    return NextResponse.redirect(url)
  }

  if (platform === 'meta_ads') {
    const metaUrl = new URL('https://www.facebook.com/v19.0/dialog/oauth')
    metaUrl.searchParams.set('client_id', process.env.META_APP_ID!)
    metaUrl.searchParams.set('redirect_uri', `${process.env.NEXT_PUBLIC_APP_URL}/api/connections/meta_ads/callback`)
    metaUrl.searchParams.set('scope', 'ads_read,read_insights')
    metaUrl.searchParams.set('state', state)
    return NextResponse.redirect(metaUrl.toString())
  }

  return NextResponse.redirect(new URL('/clients', request.url))
}
