import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

type Params = { params: Promise<{ id: string }> }

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id, role')
    .eq('id', user.id)
    .single()

  if (!agencyUser || !['owner', 'admin'].includes(agencyUser.role)) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
  }

  if (id === user.id) {
    return NextResponse.json({ error: 'Cannot modify your own role' }, { status: 409 })
  }

  const body: { role: 'admin' | 'member' } = await request.json()
  if (!body.role || !['admin', 'member'].includes(body.role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  // Verify target member belongs to same agency
  const { data: target } = await supabase
    .from('agency_users')
    .select('id, role')
    .eq('id', id)
    .eq('agency_id', agencyUser.agency_id)
    .single()

  if (!target) return NextResponse.json({ error: 'Member not found' }, { status: 404 })
  if (target.role === 'owner') {
    return NextResponse.json({ error: 'Cannot change owner role' }, { status: 409 })
  }

  await supabase
    .from('agency_users')
    .update({ role: body.role })
    .eq('id', id)
    .eq('agency_id', agencyUser.agency_id)

  return NextResponse.json({ ok: true })
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id, role')
    .eq('id', user.id)
    .single()

  if (!agencyUser || !['owner', 'admin'].includes(agencyUser.role)) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
  }

  if (id === user.id) {
    return NextResponse.json({ error: 'Cannot remove yourself' }, { status: 409 })
  }

  const { data: target } = await supabase
    .from('agency_users')
    .select('id, role')
    .eq('id', id)
    .eq('agency_id', agencyUser.agency_id)
    .single()

  if (!target) return NextResponse.json({ error: 'Member not found' }, { status: 404 })
  if (target.role === 'owner') {
    return NextResponse.json({ error: 'Cannot remove the owner' }, { status: 409 })
  }

  await supabase
    .from('agency_users')
    .delete()
    .eq('id', id)
    .eq('agency_id', agencyUser.agency_id)

  return NextResponse.json({ ok: true })
}
