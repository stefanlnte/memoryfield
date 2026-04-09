import { NextResponse } from 'next/server'

const SHODAN_KEY = process.env.SHODAN_API_KEY
const GREYNOISE_KEY = process.env.GREYNOISE_API_KEY
const URLSCAN_KEY = process.env.URLSCAN_API_KEY
const INTELX_KEY = process.env.INTELX_API_KEY

const CONFLICTS = [
  { id: 'ukraine', name: 'Ukraine-Russia', hl: 8, query: 'country:UA', domain: 'ua', term: 'Ukraine OR Russia' },
  { id: 'israel', name: 'Israel-Hezbollah', hl: 14, query: 'country:IL OR country:LB', domain: 'il', term: 'Israel OR Hezbollah' },
  { id: 'scs', name: 'South China Sea', hl: 14, query: 'country:CN OR country:PH', domain: 'cn', term: 'South China Sea' },
  { id: 'armenia', name: 'Armenia-Azerbaijan', hl: 21, query: 'country:AM OR country:AZ', domain: 'am', term: 'Armenia OR Azerbaijan' },
  { id: 'sudan', name: 'Sudan', hl: 30, query: 'country:SD', domain: 'sd', term: 'Sudan OR Khartoum' },
  { id: 'myanmar', name: 'Myanmar', hl: 60, query: 'country:MM', domain: 'mm', term: 'Myanmar OR Tatmadaw' },
  { id: 'sahel', name: 'Sahel AES', hl: 90, query: 'country:ML OR country:BF OR country:NE', domain: 'ml', term: 'Sahel OR Wagner' },
]

function decay(days: number, hl: number) {
  return 0.9 * Math.pow(0.5, days / hl) + 0.1
}

async function fetchShodan(query: string) {
  if (!SHODAN_KEY) return { total: Math.floor(Math.random() * 50000), mock: true }
  try {
    const res = await fetch(
      `https://api.shodan.io/shodan/host/count?key=${SHODAN_KEY}&query=${encodeURIComponent(query)}`,
      { next: { revalidate: 300 } }
    )
    const data = await res.json()
    return { total: data.total || 0, mock: false }
  } catch { return { total: 0, mock: false, error: true } }
}

async function fetchGreynoise() {
  if (!GREYNOISE_KEY) return { total: Math.floor(Math.random() * 1000), mock: true }
  try {
    const res = await fetch('https://api.greynoise.io/v3/community/stats', {
      headers: { 'key': GREYNOISE_KEY },
      next: { revalidate: 300 }
    })
    const data = await res.json()
    return { total: data?.total || 0, mock: false }
  } catch { return { total: 0, mock: false, error: true } }
}

async function fetchUrlscan(domain: string) {
  if (!URLSCAN_KEY) return { total: Math.floor(Math.random() * 500), mock: true }
  try {
    const res = await fetch(
      `https://urlscan.io/api/v1/search/?q=domain:.${domain}&size=1`,
      { headers: { 'API-Key': URLSCAN_KEY }, next: { revalidate: 300 } }
    )
    const data = await res.json()
    return { total: data.total || 0, mock: false }
  } catch { return { total: 0, mock: false, error: true } }
}

async function fetchIntelx(term: string) {
  if (!INTELX_KEY) return { total: Math.floor(Math.random() * 100), mock: true }
  try {
    const res = await fetch('https://2.intelx.io/intelligent/search', {
      method: 'POST',
      headers: { 'x-key': INTELX_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ term, maxresults: 5, media: 0, sort: 2 }),
      next: { revalidate: 600 }
    })
    const data = await res.json()
    return { total: data?.records?.length || 0, mock: false }
  } catch { return { total: 0, mock: false, error: true } }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const days = parseInt(searchParams.get('days') || '0')
  const conflictFilter = searchParams.get('conflict')

  const conflicts = conflictFilter 
    ? CONFLICTS.filter(c => c.id === conflictFilter)
    : CONFLICTS

  const results = await Promise.all(
    conflicts.map(async (c) => {
      const weight = decay(days, c.hl)
      
      const [shodan, greynoise, urlscan, intelx] = await Promise.all([
        fetchShodan(c.query),
        fetchGreynoise(),
        fetchUrlscan(c.domain),
        fetchIntelx(c.term)
      ])

      const raw = {
        devices: shodan.total,
        noise: greynoise.total,
        urls: urlscan.total,
        memory: intelx.total
      }

      const weighted = {
        devices: Math.floor(raw.devices * weight),
        noise: Math.floor(raw.noise * weight),
        urls: Math.floor(raw.urls * weight),
        memory: Math.floor(raw.memory * weight)
      }

      const composite = Math.floor(
        (weighted.devices * 0.4 + weighted.noise * 0.3 + weighted.urls * 0.2 + weighted.memory * 0.1)
      )

      return {
        id: c.id,
        name: c.name,
        half_life: c.hl,
        days_since_update: days,
        weight: Math.round(weight * 1000) / 1000,
        signal_percent: Math.round(weight * 100),
        raw_signals: raw,
        weighted_signals: weighted,
        composite_score: composite,
        decay_tier: c.hl < 15 ? 'tactical' : c.hl < 45 ? 'operational' : 'strategic',
        sources: {
          shodan: { mock: shodan.mock, error: shodan.error },
          greynoise: { mock: greynoise.mock, error: greynoise.error },
          urlscan: { mock: urlscan.mock, error: urlscan.error },
          intelx: { mock: intelx.mock, error: intelx.error }
        }
      }
    })
  )

  // Sort by composite score descending
  results.sort((a, b) => b.composite_score - a.composite_score)

  // Calculate field coherence (how aligned the signals are)
  const avgWeight = results.reduce((sum, r) => sum + r.weight, 0) / results.length
  const activeCount = results.filter(r => r.signal_percent > 50).length

  return NextResponse.json({
    field: 'memoryfield.xyz',
    timestamp: new Date().toISOString(),
    neural_cycle: 247,
    days_since_update: days,
    total_conflicts: results.length,
    active_conflicts: activeCount,
    field_coherence: Math.round(avgWeight * 100),
    conflicts: results,
    cross_links: [
      { from: 'ukraine', to: 'scs', type: 'drone_loop', strength: 0.7 },
      { from: 'sahel', to: 'sudan', type: 'wagner_model', strength: 0.8 },
      { from: 'sudan', to: 'israel', type: 'red_sea_corridor', strength: 0.5 },
      { from: 'armenia', to: 'israel', type: 'memory_weaponization', strength: 0.6 }
    ],
    api_status: {
      shodan: !!SHODAN_KEY,
      greynoise: !!GREYNOISE_KEY,
      urlscan: !!URLSCAN_KEY,
      intelx: !!INTELX_KEY
    }
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      'Access-Control-Allow-Origin': '*'
    }
  })
}
