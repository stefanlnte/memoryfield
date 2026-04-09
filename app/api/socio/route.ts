import { NextResponse } from 'next/server'

const CONFLICTS = [
  { 
    id: 'ukraine', name: 'Ukraine-Russia', hl: 8,
    socio: {
      displaced: 6.5, birth_rate: 1.2, median_age: 41,
      legitimacy: 0.72, info_warfare: 0.91, cohesion: 0.68,
      gdp_change: -0.29, inflation: 0.12, youth_unemp: 0.19,
      trauma_hl: 25, grievance: 0.84, polarization: 0.91
    }
  },
  { 
    id: 'israel', name: 'Israel-Hezbollah', hl: 14,
    socio: {
      displaced: 1.0, birth_rate: 2.9, median_age: 30,
      legitimacy: 0.65, info_warfare: 0.88, cohesion: 0.61,
      gdp_change: -0.08, inflation: 0.04, youth_unemp: 0.11,
      trauma_hl: 70, grievance: 0.93, polarization: 0.87
    }
  },
  { 
    id: 'scs', name: 'South China Sea', hl: 14,
    socio: {
      displaced: 0, birth_rate: 1.7, median_age: 38,
      legitimacy: 0.84, info_warfare: 0.76, cohesion: 0.79,
      gdp_change: 0.02, inflation: 0.03, youth_unemp: 0.14,
      trauma_hl: 45, grievance: 0.71, polarization: 0.68
    }
  },
  { 
    id: 'armenia', name: 'Armenia-Azerbaijan', hl: 21,
    socio: {
      displaced: 0.12, birth_rate: 1.6, median_age: 36,
      legitimacy: 0.58, info_warfare: 0.71, cohesion: 0.54,
      gdp_change: -0.03, inflation: 0.08, youth_unemp: 0.21,
      trauma_hl: 100, grievance: 0.96, polarization: 0.89
    }
  },
  { 
    id: 'sudan', name: 'Sudan', hl: 30,
    socio: {
      displaced: 12.0, birth_rate: 4.4, median_age: 19,
      legitimacy: 0.31, info_warfare: 0.64, cohesion: 0.29,
      gdp_change: -0.42, inflation: 0.34, youth_unemp: 0.38,
      trauma_hl: 35, grievance: 0.78, polarization: 0.74
    }
  },
  { 
    id: 'myanmar', name: 'Myanmar', hl: 60,
    socio: {
      displaced: 2.6, birth_rate: 2.1, median_age: 29,
      legitimacy: 0.28, info_warfare: 0.69, cohesion: 0.33,
      gdp_change: -0.18, inflation: 0.22, youth_unemp: 0.27,
      trauma_hl: 55, grievance: 0.81, polarization: 0.76
    }
  },
  { 
    id: 'sahel', name: 'Sahel AES', hl: 90,
    socio: {
      displaced: 4.2, birth_rate: 5.8, median_age: 17,
      legitimacy: 0.41, info_warfare: 0.58, cohesion: 0.47,
      gdp_change: -0.12, inflation: 0.15, youth_unemp: 0.31,
      trauma_hl: 40, grievance: 0.69, polarization: 0.62
    }
  },
]

function decay(days: number, hl: number) {
  return 0.9 * Math.pow(0.5, days / hl) + 0.1
}

function calculateSocioRisk(socio: any) {
  const youth_bulge = socio.median_age < 25 && socio.birth_rate > 4.0 ? 1 : 0
  const narrative_collapse = socio.legitimacy < 0.4 && socio.info_warfare > 0.7 ? 1 : 0
  const displacement_cascade = socio.displaced > 5 ? 1 : 0
  const memory_weapon = socio.trauma_hl > 70 && socio.grievance > 0.9 ? 1 : 0
  
  const economic_fragility = Math.max(0, -socio.gdp_change) + socio.inflation + socio.youth_unemp
  const social_fragility = (1 - socio.cohesion) + socio.polarization + (1 - socio.legitimacy)
  
  return {
    youth_bulge_risk: youth_bulge,
    narrative_collapse_risk: narrative_collapse,
    displacement_cascade: displacement_cascade,
    memory_weaponization: memory_weapon,
    economic_fragility: Math.round(economic_fragility * 100) / 100,
    social_fragility: Math.round(social_fragility * 100) / 100,
    composite_socio_risk: Math.round((economic_fragility + social_fragility + youth_bulge + narrative_collapse + displacement_cascade + memory_weapon) * 10) / 10
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const days = parseInt(searchParams.get('days') || '0')
  const layer = searchParams.get('layer') || 'full' // full, tactical, socio

  const results = CONFLICTS.map(c => {
    const weight = decay(days, c.hl)
    const socioRisk = calculateSocioRisk(c.socio)
    
    // Sociological decay is slower than tactical decay
    const socioWeight = decay(days, c.socio.trauma_hl)
    
    return {
      id: c.id,
      name: c.name,
      tactical: {
        half_life: c.hl,
        weight: Math.round(weight * 1000) / 1000,
        signal_percent: Math.round(weight * 100)
      },
      sociological: {
        demographic: {
          displaced_millions: c.socio.displaced,
          birth_rate: c.socio.birth_rate,
          median_age: c.socio.median_age,
          youth_bulge: c.socio.median_age < 25
        },
        narrative: {
          state_legitimacy: c.socio.legitimacy,
          info_warfare_index: c.socio.info_warfare,
          social_cohesion: c.socio.cohesion,
          fragility: Math.round((1 - c.socio.cohesion + 1 - c.socio.legitimacy) * 50)
        },
        economic: {
          gdp_change: c.socio.gdp_change,
          inflation: c.socio.inflation,
          youth_unemployment: c.socio.youth_unemp,
          strain_index: Math.round((Math.abs(c.socio.gdp_change) + c.socio.inflation + c.socio.youth_unemp) * 100)
        },
        cultural_memory: {
          trauma_half_life: c.socio.trauma_hl,
          generational_grievance: c.socio.grievance,
          identity_polarization: c.socio.polarization,
          weight: Math.round(socioWeight * 1000) / 1000,
          persistence_percent: Math.round(socioWeight * 100)
        }
      },
      complex_risks: socioRisk,
      synthesis: {
        // Tactical decays fast, sociological persists
        immediate_threat: Math.round(weight * 100),
        structural_risk: Math.round(socioRisk.composite_socio_risk * 10),
        memory_persistence: Math.round(socioWeight * 100),
        // When tactical fades but socio remains high = latent conflict
        latent_potential: Math.round((1 - weight) * socioRisk.composite_socio_risk * 20)
      }
    }
  })

  // Sort by composite risk
  results.sort((a, b) => b.synthesis.structural_risk - a.synthesis.structural_risk)

  const fieldAnalysis = {
    youth_bulge_zones: results.filter(r => r.sociological.demographic.youth_bulge).map(r => r.id),
    narrative_collapse_zones: results.filter(r => r.complex_risks.narrative_collapse_risk).map(r => r.id),
    displacement_cascades: results.filter(r => r.complex_risks.displacement_cascade).map(r => r.id),
    memory_weapons: results.filter(r => r.complex_risks.memory_weaponization).map(r => r.id),
    highest_structural_risk: results[0]?.id,
    highest_latent_potential: [...results].sort((a,b) => b.synthesis.latent_potential - a.synthesis.latent_potential)[0]?.id
  }

  return NextResponse.json({
    field: 'memoryfield.xyz',
    layer: 'sociological-complex',
    version: 'ASM-LS v248',
    timestamp: new Date().toISOString(),
    days_since_update: days,
    conflicts: layer === 'socio' ? results.map(r => ({ id: r.id, name: r.name, sociological: r.sociological, complex_risks: r.complex_risks })) : results,
    field_analysis: fieldAnalysis,
    theory: {
      asymmetric_decay: 'Tactical signals fade in days/weeks, sociological structures persist decades',
      latent_conflict: 'High structural risk + low tactical weight = dormant but primed',
      memory_weaponization: 'Trauma half-life >70 years creates multi-generational grievance loops'
    }
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=600',
      'Access-Control-Allow-Origin': '*'
    }
  })
}
