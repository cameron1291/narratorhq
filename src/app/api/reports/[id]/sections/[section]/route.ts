import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { NarrativeSection } from '@/lib/normalization/types'

type Params = { params: Promise<{ id: string; section: string }> }

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id, section } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id')
    .eq('id', user.id)
    .single()
  if (!agencyUser) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { data: report } = await supabase
    .from('reports')
    .select('id, agency_id, narrative_sections, status')
    .eq('id', id)
    .eq('agency_id', agencyUser.agency_id)
    .single()

  if (!report) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (report.status === 'sent') return NextResponse.json({ error: 'Report already sent' }, { status: 409 })

  const body: { editedContent?: string; isApproved?: boolean } = await request.json()

  if (typeof body.editedContent === 'string' && body.editedContent.length > 10000) {
    return NextResponse.json({ error: 'Content too long (max 10,000 characters)' }, { status: 400 })
  }

  const sections = (report.narrative_sections as NarrativeSection[]) ?? []

  const updated = sections.map(s => {
    if (s.section !== section) return s
    return {
      ...s,
      ...(body.editedContent !== undefined ? { editedContent: body.editedContent || null } : {}),
      ...(body.isApproved !== undefined ? { isApproved: body.isApproved } : {}),
    }
  })

  await supabase
    .from('reports')
    .update({ narrative_sections: updated })
    .eq('id', id)

  return NextResponse.json({ ok: true })
}
