import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

type Params = { params: Promise<{ id: string; entryId: string }> }

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id, entryId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id')
    .eq('id', user.id)
    .single()
  if (!agencyUser) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { data: clientRow } = await supabase
    .from('clients')
    .select('id')
    .eq('id', id)
    .eq('agency_id', agencyUser.agency_id)
    .single()
  if (!clientRow) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await supabase.from('report_instructions').update({ is_active: false }).eq('id', entryId).eq('client_id', id)
  return NextResponse.json({ ok: true })
}
