import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body: { token: string } = await request.json()
  if (!body.token) return NextResponse.json({ error: 'token required' }, { status: 400 })

  const service = createServiceClient()

  // Look up invite with service role
  const { data: invite } = await service
    .from('agency_invites')
    .select('id, agency_id, email, role, accepted_at, expires_at')
    .eq('token', body.token)
    .single()

  if (!invite) return NextResponse.json({ error: 'Invalid invite' }, { status: 404 })
  if (invite.accepted_at) return NextResponse.json({ error: 'Already accepted' }, { status: 409 })
  if (new Date(invite.expires_at) < new Date()) {
    return NextResponse.json({ error: 'Invite expired' }, { status: 410 })
  }
  if (user.email !== invite.email) {
    return NextResponse.json({ error: 'This invite was sent to a different email address' }, { status: 403 })
  }

  // Check if user already belongs to any agency (one user = one agency)
  const { data: anyMembership } = await service
    .from('agency_users')
    .select('agency_id')
    .eq('id', user.id)
    .single()

  if (anyMembership) {
    if (anyMembership.agency_id === invite.agency_id) {
      // Already a member of this agency — mark accepted and return ok
      await service.from('agency_invites').update({ accepted_at: new Date().toISOString() }).eq('id', invite.id)
      return NextResponse.json({ ok: true })
    }
    return NextResponse.json(
      { error: 'Your account already belongs to another agency. Contact support to transfer.' },
      { status: 409 }
    )
  }

  // Add to agency
  await service.from('agency_users').insert({
    id: user.id,
    agency_id: invite.agency_id,
    role: invite.role,
    full_name: user.user_metadata?.full_name ?? null,
  })

  // Mark invite accepted
  await service
    .from('agency_invites')
    .update({ accepted_at: new Date().toISOString() })
    .eq('id', invite.id)

  return NextResponse.json({ ok: true })
}
