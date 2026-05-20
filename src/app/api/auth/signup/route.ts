import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const { email, password, fullName, agencyName } = await request.json()

  if (!email || !password || !fullName || !agencyName) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = createServiceClient()

  // 1. Create agency
  const { data: agency, error: agencyError } = await supabase
    .from('agencies')
    .insert({ name: agencyName })
    .select('id')
    .single()

  if (agencyError || !agency) {
    return NextResponse.json({ error: 'Failed to create agency' }, { status: 500 })
  }

  // 2. Create auth user (trigger may or may not insert agency_users)
  const { data: userData, error: userError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
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
