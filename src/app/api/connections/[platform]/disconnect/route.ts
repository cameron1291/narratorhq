import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string }> }
) {
  const { platform } = await params
  let clientId: string
  try {
    ;({ clientId } = await request.json())
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!clientId) {
    return NextResponse.json({ error: 'Missing clientId' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Verify the client belongs to the user's agency
  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id')
    .eq('id', user.id)
    .single()

  if (!agencyUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: client } = await supabase
    .from('clients')
    .select('id')
    .eq('id', clientId)
    .eq('agency_id', agencyUser.agency_id)
    .single()

  if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 })

  const { error } = await supabase
    .from('data_connections')
    .delete()
    .eq('client_id', clientId)
    .eq('platform', platform)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
