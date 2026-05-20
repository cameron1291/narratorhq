import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const { agencyName } = await request.json()

  if (!agencyName) {
    return NextResponse.json({ error: 'Agency name required' }, { status: 400 })
  }

  const supabase = createServiceClient()

  const { data: agency, error } = await supabase
    .from('agencies')
    .insert({ name: agencyName })
    .select('id')
    .single()

  if (error || !agency) {
    return NextResponse.json({ error: 'Failed to create agency' }, { status: 500 })
  }

  return NextResponse.json({ agencyId: agency.id })
}
