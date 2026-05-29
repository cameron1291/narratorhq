import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

export async function DELETE() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const serviceSupabase = createServiceClient()

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id, role')
    .eq('id', user.id)
    .single()

  if (!agencyUser) {
    // No agency record — just delete the auth user
    await serviceSupabase.auth.admin.deleteUser(user.id)
    return NextResponse.json({ ok: true })
  }

  if (agencyUser.role === 'owner') {
    // Check if they're the only member
    const { count } = await supabase
      .from('agency_users')
      .select('id', { count: 'exact', head: true })
      .eq('agency_id', agencyUser.agency_id)

    if ((count ?? 0) > 1) {
      return NextResponse.json(
        { error: 'Transfer ownership to another member before deleting your account' },
        { status: 409 }
      )
    }

    // Sole owner: delete the agency (cascades to all data) then the auth user
    await serviceSupabase.from('agencies').delete().eq('id', agencyUser.agency_id)
  } else {
    // Member/admin: just remove from the agency
    await serviceSupabase.from('agency_users').delete().eq('id', user.id)
  }

  await serviceSupabase.auth.admin.deleteUser(user.id)

  return NextResponse.json({ ok: true })
}
