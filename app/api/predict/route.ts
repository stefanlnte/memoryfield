import { NextResponse } from 'next/server'

function ignitionProbability(data: any, days: number) {
  const struct = data.structural_risk / 50
  const legitInverse = 1 - data.state_legitimacy
  const youth = data.youth_bulge ? 0.3 : 0
  const structuralPressure = (struct * 0.5 + legitInverse * 0.5 + youth) * 2.5
  
  const tactical = data.tactical_weight
  const recent = data.recent_escalation
  let tacticalMomentum = 0.6
  if (tactical > 0.6 && recent > 0.15) tacticalMomentum = 1.2
  else if (tactical > 0.6) tacticalMomentum = 0.8
  else if (tactical < 0.4 && recent > 0.1) tacticalMomentum = 0.9
  else if (tactical < 0.4) tacticalMomentum = 0.3
  
  const memory = data.memory_persistence
  let memoryLatent = 0.7
  if (tactical < 0.4 && memory > 0.95) memoryLatent = 1.5
  else if (tactical < 0.5 && memory > 0.9) memoryLatent = 1.2
  else if (memory > 0.9) memoryLatent = 1.0
  
  const contagion = data.cross_links_active * 0.25
  
  let stability = 0
  if (data.state_legitimacy > 0.7) stability += 0.5
  if (!data.youth_bulge) stability += 0.3
  if (data.tactical_hl > 60) stability += 0.2
  
  const timeWeight = days <= 7 
    ? { struct: 0.3, tact: 0.5, mem: 0.2 }
    : days <= 30
    ? { struct: 0.4, tact: 0.3, mem: 0.3 }
    : { struct: 0.5, tact: 0.2, mem: 0.3 }
  
  const score = (
    structuralPressure * timeWeight.struct +
    tacticalMomentum * timeWeight.tact +
    memoryLatent * timeWeight.mem +
    contagion - stability
  )
  
  let p = 1 / (1 + Math.exp(-score))
  if (data.tactical_weight > 0.7) p = Math.min(0.92, p * 1.15)
  
  const percentage = Math.round(p * 1000) / 10
  const riskLevel = percentage > 75 ? 'CRITICAL' : percentage > 60 ? 'HIGH' : percentage > 45 ? 'ELEVATED' : percentage > 30 ? 'MODERATE' : 'LOW'
  
  return {
    probability: Math.round(p * 1000) / 1000,
    percentage,
    risk_level: riskLevel,
    score: Math.round(score * 100) / 100,
    components: {
      structural: Math.round(structuralPressure * 100) / 100,
      tactical: Math.round(tacticalMomentum * 100) / 100,
      memory: Math.round(memoryLatent * 100) / 100,
      contagion: Math.round(contagion * 100) / 100,
      stability: Math.round(stability * 100) / 100
    }
  }
}

const CONFLICTS = {
  ukraine: { tactical_hl: 8, tactical_weight: 0.72, structural_risk: 28, memory_persistence: 0.89, cross_links_active: 2, youth_bulge: false, state_legitimacy: 0.72, recent_escalation: 0.15 },
  israel: { tactical_hl: 14, tactical_weight: 0.81, structural_risk: 31, memory_persistence: 0.95, cross_links_active: 2, youth_bulge: false, state_legitimacy: 0.65, recent_escalation: 0.22 },
  scs: { tactical_hl: 14, tactical_weight: 0.45, structural_risk: 24, memory_persistence: 0.76, cross_links_active: 1, youth_bulge: false, state_legitimacy: 0.88, recent_escalation: 0.08 },
  armenia: { tactical_hl: 21, tactical_weight: 0.31, structural_risk: 38, memory_persistence: 0.99, cross_links_active: 1, youth_bulge: false, state_legitimacy: 0.58, recent_escalation: 0.05 },
  sudan: { tactical_hl: 30, tactical_weight: 0.52, structural_risk: 42, memory_persistence: 0.84, cross_links_active: 2, youth_bulge: true, state_legitimacy: 0.31, recent_escalation: 0.18 },
  myanmar: { tactical_hl: 60, tactical_weight: 0.68, structural_risk: 35, memory_persistence: 0.91, cross_links_active: 0, youth_bulge: false, state_legitimacy: 0.28, recent_escalation: 0.12 },
  sahel: { tactical_hl: 90, tactical_weight: 0.74, structural_risk: 39, memory_persistence: 0.87, cross_links_active: 2, youth_bulge: true, state_legitimacy: 0.41, recent_escalation: 0.25 }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const days = parseInt(searchParams.get('days') || '30')
  
  const results = Object.entries(CONFLICTS).map(([id, data]) => ({
    id,
    name: id.charAt(0).toUpperCase() + id.slice(1),
    predictions: {
      '7d': ignitionProbability(data, 7),
      '30d': ignitionProbability(data, 30),
      '90d': ignitionProbability(data, 90)
    }
  }))
  
  results.sort((a, b) => b.predictions['30d'].percentage - a.predictions['30d'].percentage)
  
  return NextResponse.json({
    model: 'ASM-LS v248',
    timestamp: new Date().toISOString(),
    predictions: results
  })
}
