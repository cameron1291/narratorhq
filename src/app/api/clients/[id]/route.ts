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

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const allowed = ['name', 'industry', 'report_email', 'report_frequency', 'tone_override', 'custom_instructions', 'goals', 'is_archived']
  const update: Record<string, unknown> = {}
  for (const key of allowed) {
    if (key in body) update[key] = body[key]
  }

  if (update.report_frequency !== undefined && !['monthly', 'weekly'].includes(update.report_frequency as string)) {
    return NextResponse.json({ error: 'report_frequency must be monthly or weekly' }, { status: 400 })
  }

  const { error } = await supabase.from('clients').update(update).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
