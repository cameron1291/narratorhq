import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: agencyUser } = await supabase
    .from('agency_users')
    .select('agency_id')
    .eq('id', user.id)
    .single()
  if (!agencyUser) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  let body: {
    name?: string
    industry?: string
    reportEmail?: string
    reportFrequency?: string
    goals?: string
    customInstructions?: string
  }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const name = body.name?.trim()
  if (!name) return NextResponse.json({ error: 'Client name is required' }, { status: 400 })

  const { data: agency } = await supabase
    .from('agencies')
    .select('plan, trial_ends_at, client_limit')
    .eq('id', agencyUser.agency_id)
    .single()
  if (!agency) return NextResponse.json({ error: 'Agency not found' }, { status: 404 })

  const activePaidPlan = ['starter', 'growth', 'agency'].includes(agency.plan)
  const validTrial = agency.plan === 'trial' && agency.trial_ends_at && new Date(agency.trial_ends_at) > new Date()
  if (!activePaidPlan && !validTrial) {
    return NextResponse.json(
      { error: agency.plan === 'cancelled' ? 'Reactivate your subscription to add more clients.' : 'Your trial has expired. Upgrade to add more clients.' },
      { status: 402 }
    )
  }

  const { count } = await supabase
    .from('clients')
    .select('id', { count: 'exact', head: true })
    .eq('agency_id', agencyUser.agency_id)
    .eq('is_archived', false)

  if (typeof count === 'number' && count >= agency.client_limit) {
    return NextResponse.json(
      { error: 'Client limit reached. Upgrade your plan to add more clients.' },
      { status: 403 }
    )
  }

  const { data: client, error } = await supabase
    .from('clients')
    .insert({
      agency_id: agencyUser.agency_id,
      name,
      industry: body.industry || null,
      report_email: body.reportEmail || null,
      report_frequency: body.reportFrequency || 'monthly',
      goals: body.goals || null,
      custom_instructions: body.customInstructions || null,
    })
    .select('id')
    .single()

  if (error || !client) {
    return NextResponse.json({ error: error?.message ?? 'Failed to create client' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, id: client.id })
}
