import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

type Params = { params: Promise<{ id: string }> }

export async function POST(request: NextRequest, { params }: Params) {
  const { id } = await params
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

  const body: { instruction?: string } = await request.json()
  if (!body.instruction?.trim()) {
    return NextResponse.json({ error: 'instruction required' }, { status: 400 })
  }

  const { error } = await supabase.from('report_instructions').insert({
    client_id: id,
    instruction: body.instruction.trim(),
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
