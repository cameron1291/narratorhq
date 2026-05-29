import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { NarrativeSection } from '@/lib/normalization/types'

type Params = { params: Promise<{ id: string }> }

export async function POST(request: NextRequest, { params }: Params) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id, role')
    .eq('id', user.id)
    .single()
  if (!agencyUser) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  if (!['owner', 'admin'].includes(agencyUser.role)) {
    return NextResponse.json({ error: 'Only owners and admins can approve reports' }, { status: 403 })
  }

  const { data: report } = await supabase
    .from('reports')
    .select('id, agency_id, narrative_sections, status')
    .eq('id', id)
    .eq('agency_id', agencyUser.agency_id)
    .single()

  if (!report) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (report.status === 'sent') return NextResponse.json({ error: 'Already sent' }, { status: 409 })

  // Mark all sections approved
  const sections = ((report.narrative_sections as NarrativeSection[]) ?? []).map(s => ({
    ...s,
    isApproved: true,
  }))

  await supabase
    .from('reports')
    .update({
      status: 'approved',
      narrative_sections: sections,
      approved_by: user.id,
      approved_at: new Date().toISOString(),
    })
    .eq('id', id)

  return NextResponse.json({ ok: true })
}
