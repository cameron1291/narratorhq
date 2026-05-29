import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  let email: string, password: string, fullName: string, agencyName: string
  try {
    ;({ email, password, fullName, agencyName } = await request.json())
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!email || !password || !fullName || !agencyName) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
  }

  const supabase = createServiceClient()

  // 1. Create agency with 14-day trial
  const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
  const { data: agency, error: agencyError } = await supabase
    .from('agencies')
    .insert({ name: agencyName, plan: 'trial', trial_ends_at: trialEndsAt, client_limit: 5 })
    .select('id')
    .single()

  if (agencyError || !agency) {
    return NextResponse.json({ error: 'Failed to create agency' }, { status: 500 })
  }

  // 2. Create auth user — email_confirm: false sends Supabase verification email.
  // The verification link redirects to the Site URL configured in your Supabase project settings.
  // Set Redirect URLs in Supabase Dashboard > Authentication > URL Configuration to include
  // {NEXT_PUBLIC_APP_URL}/auth/callback
  const { data: userData, error: userError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: false,
    user_metadata: { agency_id: agency.id, role: 'owner', full_name: fullName },
  })

  if (userError || !userData.user) {
    await supabase.from('agencies').delete().eq('id', agency.id)
    return NextResponse.json({ error: userError?.message ?? 'Failed to create user' }, { status: 400 })
  }

  // 3. Explicitly ensure agency_users row exists (in case trigger didn't run)
  await supabase
    .from('agency_users')
    .upsert({
      id: userData.user.id,
      agency_id: agency.id,
      role: 'owner',
      full_name: fullName,
    }, { onConflict: 'id' })

  return NextResponse.json({ ok: true })
}
