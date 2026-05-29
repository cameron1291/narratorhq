import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

type Params = { params: Promise<{ id: string }> }

async function verifyOwnership(clientId: string, userId: string) {
  const supabase = await createClient()
  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id')
    .eq('id', userId)
    .single()
  if (!agencyUser) return null

  const { data: clientRow } = await supabase
    .from('clients')
    .select('id')
    .eq('id', clientId)
    .eq('agency_id', agencyUser.agency_id)
    .single()

  return clientRow ? supabase : null
}

export async function POST(request: NextRequest, { params }: Params) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const owned = await verifyOwnership(id, user.id)
  if (!owned) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body: { context_type?: string; content?: string } = await request.json()
  const validTypes = ['promise', 'sensitivity', 'goal', 'note']
  if (!body.content?.trim() || !body.context_type || !validTypes.includes(body.context_type)) {
    return NextResponse.json({ error: 'content and valid context_type required' }, { status: 400 })
  }

  const { error } = await supabase.from('client_context').insert({
    client_id: id,
    context_type: body.context_type,
    content: body.content.trim(),
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
