import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

function getReportPeriod(frequency: string, today: Date): { startDate: string; endDate: string } | null {
  const y = today.getFullYear()
  const m = today.getMonth()
  const d = today.getDate()
  const dow = today.getDay() // 0=Sun, 1=Mon

  if (frequency === 'monthly' && d === 1) {
    // Cover previous calendar month
    const prevMonthEnd = new Date(y, m, 0)
    const prevMonthStart = new Date(y, m - 1, 1)
    return {
      startDate: prevMonthStart.toISOString().split('T')[0],
      endDate: prevMonthEnd.toISOString().split('T')[0],
    }
  }

  if (frequency === 'weekly' && dow === 1) {
    // Cover previous Mon–Sun
    const lastSun = new Date(today)
    lastSun.setDate(d - 1)
    const lastMon = new Date(lastSun)
    lastMon.setDate(lastSun.getDate() - 6)
    return {
      startDate: lastMon.toISOString().split('T')[0],
      endDate: lastSun.toISOString().split('T')[0],
    }
  }

  return null
}

export async function GET(request: NextRequest) {
  // Vercel cron sends a secret header — verify it
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceClient()
  const today = new Date()

  // Find all active clients with active agencies
  const { data: clients } = await supabase
    .from('clients')
    .select(`
      id, agency_id, report_frequency,
      agencies!inner ( plan ),
      data_connections ( platform, is_active )
    `)
    .eq('is_archived', false)

  if (!clients?.length) return NextResponse.json({ queued: 0 })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!
  let queued = 0

  for (const client of clients) {
    const agencyArr = client.agencies as unknown as { plan: string }[] | null
    const agency = Array.isArray(agencyArr) ? agencyArr[0] : agencyArr
    // Skip cancelled or trial agencies (trial agencies get reports — it's the trial)
    if (agency?.plan === 'cancelled') continue

    const period = getReportPeriod(client.report_frequency, today)
    if (!period) continue

    const connections = client.data_connections as { platform: string; is_active: boolean }[]
    const hasGa4 = connections.some(c => c.platform === 'ga4' && c.is_active)
    if (!hasGa4) continue

    // Check no report already exists for this period
    const { data: existing } = await supabase
      .from('reports')
      .select('id')
      .eq('client_id', client.id)
      .eq('period_start', period.startDate)
      .eq('period_end', period.endDate)
      .limit(1)
      .single()

    if (existing) continue

    // Trigger generation via internal API call
    try {
      await fetch(`${appUrl}/api/reports/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-cron-secret': process.env.CRON_SECRET!,
        },
        body: JSON.stringify({
          clientId: client.id,
          startDate: period.startDate,
          endDate: period.endDate,
          _cron: true,
        }),
      })
      queued++
    } catch {
      // Individual failure is non-fatal — log and continue
    }
  }

  return NextResponse.json({ queued, date: today.toISOString() })
}
