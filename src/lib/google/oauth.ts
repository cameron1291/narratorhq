import { google } from 'googleapis'

export function getOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    `${process.env.NEXT_PUBLIC_APP_URL}/api/connections/google/callback`
  )
}

export function getAuthUrl(state: string, scopes: string[]) {
  const client = getOAuthClient()
  return client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
    state,
  })
}

export const GA4_SCOPES = [
  'https://www.googleapis.com/auth/analytics.readonly',
]

export const GOOGLE_ADS_SCOPES = [
  'https://www.googleapis.com/auth/adwords',
]
