import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id, role')
    .eq('id', user.id)
    .single()

  if (!agencyUser || !['owner', 'admin'].includes(agencyUser.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let body: { name?: string; brandColor?: string; tone?: string; logoUrl?: string | null }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
  const updates: Record<string, string | null> = {}

  if (body.name?.trim()) updates.name = body.name.trim()
  if (body.brandColor && /^#[0-9A-Fa-f]{6}$/.test(body.brandColor)) updates.brand_color = body.brandColor
  if (body.tone && ['professional', 'conversational', 'data-heavy'].includes(body.tone)) {
    updates.tone = body.tone
  }
  if ('logoUrl' in body) updates.logo_url = body.logoUrl ?? null

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 })
  }

  await supabase
    .from('agencies')
    .update(updates)
    .eq('id', agencyUser.agency_id)

  return NextResponse.json({ ok: true })
}
