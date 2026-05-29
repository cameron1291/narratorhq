import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getResendClient } from '@/lib/resend/client'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id, role')
    .eq('id', user.id)
    .single()

  if (!agencyUser || !['owner', 'admin'].includes(agencyUser.role)) {
    return NextResponse.json({ error: 'Only owners and admins can invite team members' }, { status: 403 })
  }

  let body: { email: string; role: 'admin' | 'member' }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
  const email = body.email?.trim().toLowerCase()
  if (!email || !body.role) {
    return NextResponse.json({ error: 'email and role required' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const { data: agency } = await supabase
    .from('agencies')
    .select('name')
    .eq('id', agencyUser.agency_id)
    .single()

  const { data: existingInvite } = await supabase
    .from('agency_invites')
    .select('id')
    .eq('agency_id', agencyUser.agency_id)
    .eq('email', email)
    .is('accepted_at', null)
    .gt('expires_at', new Date().toISOString())
    .single()

  if (existingInvite) {
    return NextResponse.json({ error: 'An invite is already pending for this email' }, { status: 409 })
  }

  // Create invite
  const { data: invite, error } = await supabase
    .from('agency_invites')
    .insert({
      agency_id: agencyUser.agency_id,
      email,
      role: body.role,
      invited_by: user.id,
    })
    .select('token')
    .single()

  if (error || !invite) {
    return NextResponse.json({ error: 'Failed to create invite' }, { status: 500 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!
  const inviteUrl = `${appUrl}/invite/${invite.token}`
  const agencyName = agency?.name ?? 'Your Agency'
  const inviterName = user.email ?? 'A team member'

  // Send invite email
  try {
    const resend = getResendClient()
    await resend.emails.send({
      from: `${agencyName} via NarratorHQ <${process.env.DEFAULT_SENDER_EMAIL ?? 'noreply@narratorhq.com'}>`,
      to: email,
      subject: `You've been invited to join ${agencyName} on NarratorHQ`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="color: #111827; margin: 0 0 8px;">You're invited to join ${agencyName}</h2>
          <p style="color: #6b7280; margin: 0 0 24px;">${inviterName} has invited you to join their team on NarratorHQ as a <strong>${body.role}</strong>.</p>
          <a href="${inviteUrl}" style="display: inline-block; background: #2563eb; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">Accept invite</a>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">This invite expires in 7 days. If you didn't expect this, you can ignore this email.</p>
        </div>
      `,
      text: `You've been invited to join ${agencyName} on NarratorHQ.\n\nAccept here: ${inviteUrl}\n\nThis invite expires in 7 days.`,
    })
  } catch {
    // Non-fatal — invite row exists; surface the URL so the sender can share it manually
    return NextResponse.json({
      ok: true,
      warning: 'Invite created but the email failed to send. Share this link manually:',
      inviteUrl,
    })
  }

  return NextResponse.json({ ok: true })
}
