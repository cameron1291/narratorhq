import { createServiceClient } from '@/lib/supabase/server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { AcceptInviteButton } from './accept-invite-button'

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  const serviceSupabase = createServiceClient()

  // Look up the invite (service role bypasses RLS so unauthenticated users can see it)
  const { data: invite } = await serviceSupabase
    .from('agency_invites')
    .select('id, agency_id, email, role, accepted_at, expires_at, agencies(name)')
    .eq('token', token)
    .single()

  if (!invite) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-sm p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Invalid invite</h1>
          <p className="text-sm text-gray-500">This invite link is invalid or has already been used.</p>
          <Link href="/login" className="mt-4 inline-block text-sm text-blue-600 hover:underline">Sign in</Link>
        </div>
      </div>
    )
  }

  if (invite.accepted_at) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-sm p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Already accepted</h1>
          <p className="text-sm text-gray-500">This invite has already been used.</p>
          <Link href="/login" className="mt-4 inline-block text-sm text-blue-600 hover:underline">Sign in</Link>
        </div>
      </div>
    )
  }

  if (new Date(invite.expires_at) < new Date()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-sm p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Invite expired</h1>
          <p className="text-sm text-gray-500">This invite has expired. Ask your team owner to send a new one.</p>
        </div>
      </div>
    )
  }

  const agencyArr = invite.agencies as unknown as { name: string }[] | null
  const agencyName = Array.isArray(agencyArr) ? agencyArr[0]?.name : (agencyArr as { name: string } | null)?.name

  // Check if the user is already logged in
  const userSupabase = await createClient()
  const { data: { user } } = await userSupabase.auth.getUser()

  if (user) {
    // User is logged in — accept directly via server action redirect
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 max-w-sm w-full mx-4 p-8 text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Join {agencyName}</h1>
          <p className="text-sm text-gray-500 mb-6">
            You&apos;ve been invited to join <strong>{agencyName}</strong> as a <strong>{invite.role}</strong>.
          </p>
          <AcceptInviteButton token={token} agencyId={invite.agency_id} role={invite.role} />
        </div>
      </div>
    )
  }

  // Not logged in — redirect to signup with invite token
  redirect(`/signup?invite=${token}&email=${encodeURIComponent(invite.email)}`)
}
