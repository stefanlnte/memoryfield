import { NextResponse } from 'next/server'

const CONFLICTS = [
  { id: 'ukraine', name: 'Ukraine-Russia', hl: 8, query: 'country:UA' },
  { id: 'israel', name: 'Israel-Hezbollah', hl: 14, query: 'country:IL' },
  { id: 'scs', name: 'South China Sea', hl: 14, query: 'country:CN' },
  { id: 'armenia', name: 'Armenia-Azerbaijan', hl: 21, query: 'country:AM' },
  { id: 'sudan', name: 'Sudan', hl: 30, query: 'country:SD' },
  { id: 'myanmar', name: 'Myanmar', hl: 60, query: 'country:MM' },
  { id: 'sahel', name: 'Sahel AES', hl: 90, query: 'country:ML' },
]

function decay(days: number, hl: number) {
  return 0.9 * Math.pow(0.5, days / hl) + 0.1
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const days = parseInt(searchParams.get('days') || '0')

  const results = CONFLICTS.map(c => {
    const weight = decay(days, c.hl)
    const raw = {
      devices: Math.floor(Math.random() * 50000),
      noise: Math.floor(Math.random() * 1000),
      urls: Math.floor(Math.random() * 500),
      memory: Math.floor(Math.random() * 100)
    }
    const weighted = {
      devices: Math.floor(raw.devices * weight),
      noise: Math.floor(raw.noise * weight),
      urls: Math.floor(raw.urls * weight),
      memory: Math.floor(raw.memory * weight)
    }
    return {
      id: c.id,
      name: c.name,
      half_life: c.hl,
      days_since_update: days,
      weight: Math.round(weight * 1000) / 1000,
      signal_percent: Math.round(weight * 100),
      raw_signals: raw,
      weighted_signals: weighted,
      composite_score: Math.floor(weighted.devices * 0.4 + weighted.noise * 0.3 + weighted.urls * 0.2 + weighted.memory * 0.1),
      decay_tier: c.hl < 15 ? 'tactical' : c.hl < 45 ? 'operational' : 'strategic'
    }
  })

  results.sort((a, b) => b.composite_score - a.composite_score)

  return NextResponse.json({
    field: 'memoryfield.xyz',
    timestamp: new Date().toISOString(),
    neural_cycle: 247,
    days_since_update: days,
    total_conflicts: results.length,
    active_conflicts: results.filter(r => r.signal_percent > 50).length,
    field_coherence: Math.round(results.reduce((s, r) => s + r.weight, 0) / results.length * 100),
    conflicts: results,
    cross_links: [
      { from: 'ukraine', to: 'scs', type: 'drone_loop', strength: 0.7 },
      { from: 'sahel', to: 'sudan', type: 'wagner_model', strength: 0.8 },
      { from: 'sudan', to: 'israel', type: 'red_sea_corridor', strength: 0.5 },
      { from: 'armenia', to: 'israel', type: 'memory_weaponization', strength: 0.6 }
    ]
  })
}
