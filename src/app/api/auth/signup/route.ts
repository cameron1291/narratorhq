import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const { email, password, fullName, agencyName } = await request.json()

  if (!email || !password || !fullName || !agencyName) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = createServiceClient()

  // Create agency first using service role (bypasses RLS)
  const { data: agency, error: agencyError } = await supabase
    .from('agencies')
    .insert({ name: agencyName })
    .select('id')
    .single()

  if (agencyError || !agency) {
    return NextResponse.json({ error: 'Failed to create agency' }, { status: 500 })
  }

  // Create auth user with agency_id in metadata (trigger will create agency_users row)
  const { error: signupError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: false,
    user_metadata: {
      agency_id: agency.id,
      role: 'owner',
      full_name: fullName,
    },
  })

  if (signupError) {
    // Roll back agency creation
    await supabase.from('agencies').delete().eq('id', agency.id)
    return NextResponse.json({ error: signupError.message }, { status: 400 })
  }

  return NextResponse.json({ ok: true })
}
