'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Trash2, Crown, Shield, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Member {
  id: string
  full_name: string | null
  role: string
  created_at: string
}

interface PendingInvite {
  id: string
  email: string
  role: string
  expires_at: string
}

interface TeamPanelProps {
  currentUserId: string
  currentUserRole: string
  members: Member[]
  pendingInvites: PendingInvite[]
}

const ROLE_CONFIG = {
  owner: { label: 'Owner', icon: Crown, color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
  admin: { label: 'Admin', icon: Shield, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  member: { label: 'Member', icon: User, color: 'text-gray-600 bg-gray-50 border-gray-200' },
}

export function TeamPanel({ currentUserId, currentUserRole, members: initialMembers, pendingInvites: initialInvites }: TeamPanelProps) {
  const [members, setMembers] = useState(initialMembers)
  const [invites, setInvites] = useState(initialInvites)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'admin' | 'member'>('member')
  const [inviting, setInviting] = useState(false)
  const [inviteError, setInviteError] = useState<string | null>(null)
  const [inviteSuccess, setInviteSuccess] = useState(false)

  const canManage = ['owner', 'admin'].includes(currentUserRole)

  async function sendInvite() {
    if (!inviteEmail.trim()) return
    setInviting(true)
    setInviteError(null)
    setInviteSuccess(false)

    const res = await fetch('/api/team/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: inviteEmail.trim().toLowerCase(), role: inviteRole }),
    })
    const data = await res.json() as { ok?: boolean; error?: string; warning?: string }

    if (res.ok) {
      setInviteEmail('')
      setInviteSuccess(true)
      setTimeout(() => setInviteSuccess(false), 3000)
    } else {
      setInviteError(data.error ?? 'Failed to send invite')
    }
    setInviting(false)
  }

  async function changeRole(memberId: string, role: 'admin' | 'member') {
    await fetch(`/api/team/members/${memberId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    })
    setMembers(prev => prev.map(m => m.id === memberId ? { ...m, role } : m))
  }

  async function removeMember(memberId: string) {
    if (!confirm('Remove this team member? They will lose access immediately.')) return
    const res = await fetch(`/api/team/members/${memberId}`, { method: 'DELETE' })
    if (res.ok) setMembers(prev => prev.filter(m => m.id !== memberId))
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Current members */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Team members</h3>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
          {members.map(member => {
            const roleConfig = ROLE_CONFIG[member.role as keyof typeof ROLE_CONFIG] ?? ROLE_CONFIG.member
            const RoleIcon = roleConfig.icon
            const isMe = member.id === currentUserId

            return (
              <div key={member.id} className="flex items-center gap-3 px-4 py-3">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm font-medium shrink-0">
                  {(member.full_name ?? '?').charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {member.full_name ?? '—'}
                    {isMe && <span className="ml-1.5 text-xs text-gray-400">(you)</span>}
                  </p>
                </div>
                <span className={cn('text-xs border rounded-full px-2 py-0.5 flex items-center gap-1', roleConfig.color)}>
                  <RoleIcon className="h-3 w-3" />
                  {roleConfig.label}
                </span>

                {canManage && !isMe && member.role !== 'owner' && (
                  <div className="flex items-center gap-1 ml-2">
                    <Select
                      value={member.role}
                      onValueChange={v => v && changeRole(member.id, v as 'admin' | 'member')}
                    >
                      <SelectTrigger className="h-7 text-xs w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                      </SelectContent>
                    </Select>
                    <button
                      onClick={() => removeMember(member.id)}
                      className="p-1.5 text-gray-300 hover:text-red-500 transition-colors rounded"
                      title="Remove member"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Pending invites */}
      {invites.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Pending invites</h3>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
            {invites.map(invite => (
              <div key={invite.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 truncate">{invite.email}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Expires {new Date(invite.expires_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
                <span className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-2 py-0.5 capitalize">
                  {invite.role}
                </span>
                <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Invite form */}
      {canManage && (
        <section>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Invite someone</h3>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="colleague@agency.com"
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendInvite()}
              className="flex-1"
            />
            <Select value={inviteRole} onValueChange={v => v && setInviteRole(v as 'admin' | 'member')}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={sendInvite} disabled={inviting || !inviteEmail.trim()}>
              {inviting ? 'Sending…' : inviteSuccess ? 'Sent!' : 'Send invite'}
            </Button>
          </div>
          {inviteError && <p className="text-sm text-red-600 mt-2">{inviteError}</p>}
          <p className="text-xs text-gray-400 mt-2">Invite link valid for 7 days. Admins can invite and manage members. Owners can manage admins.</p>
        </section>
      )}
    </div>
  )
}
