import { NextResponse } from 'next/server'

const ECONOMIC_NODES = {
  ssh: { id: 'ssh', name: 'Shanghai-Shenzhen-HK', type: 'primary_core', pressure: 0.73, hl: 14, lat: 31.2, lng: 121.5, critical: 'Taiwan Strait', correlations: { scs: 0.67, ukraine: 0.23 } },
  prd: { id: 'prd', name: 'Pearl River Delta', type: 'primary_core', pressure: 0.68, hl: 90, lat: 23.1, lng: 113.3, critical: 'Dongjiang water', correlations: { scs: 0.41, myanmar: 0.18 } },
  tokyo: { id: 'tokyo', name: 'Greater Tokyo', type: 'primary_core', pressure: 0.81, hl: 8, lat: 35.7, lng: 139.7, critical: 'Yen carry', correlations: { ukraine: 0.31, scs: 0.28 } },
  rotterdam: { id: 'rotterdam', name: 'Rotterdam-Antwerp', type: 'transfer', pressure: 0.54, hl: 30, lat: 51.9, lng: 4.5, critical: 'Rhine levels', correlations: { sahel: 0.43, sudan: 0.29, ukraine: 0.51 } },
  singapore: { id: 'singapore', name: 'Singapore', type: 'transfer', pressure: 0.61, hl: 7, lat: 1.3, lng: 103.8, critical: 'Malacca Strait', correlations: { scs: 0.84, myanmar: 0.37 } },
  dubai: { id: 'dubai', name: 'Dubai', type: 'transfer', pressure: 0.44, hl: 180, lat: 25.2, lng: 55.3, critical: 'Gold/crypto', correlations: { sudan: 0.67, sahel: 0.52, myanmar: 0.41 } },
  london: { id: 'london', name: 'City of London', type: 'control', pressure: 0.77, hl: 1, lat: 51.5, lng: -0.1, critical: 'Eurodollar clearing', correlations: { ukraine: 0.44, israel: 0.31 } },
  delaware: { id: 'delaware', name: 'Delaware Nexus', type: 'control', pressure: 0.89, hl: 365, lat: 39.2, lng: -75.5, critical: 'Beneficial ownership', correlations: { sahel: 0.38, sudan: 0.44 } },
  zug: { id: 'zug', name: 'Zug/Zürich', type: 'control', pressure: 0.52, hl: 60, lat: 47.4, lng: 8.5, critical: 'Crypto custody', correlations: {} },
  panama: { id: 'panama', name: 'Panama Canal', type: 'transfer', pressure: 0.83, hl: 21, lat: 9.1, lng: -79.7, critical: 'Gatun Lake', correlations: { sahel: 0.21 } },
  baltic: { id: 'baltic', name: 'Nord Stream Corridor', type: 'primary_core', pressure: 0.91, hl: 720, lat: 55.0, lng: 18.0, critical: 'LNG replacement', correlations: { ukraine: 0.73, sahel: 0.19 } }
}

function calculateEconomicPressure(conflictId, daysSince = 30) {
  const pressures = []
  
  Object.values(ECONOMIC_NODES).forEach(node => {
    const correlation = node.correlations[conflictId]
    if (!correlation) return
    
    const decay = 0.9 * Math.pow(0.5, daysSince / node.hl) + 0.1
    const weighted = node.pressure * correlation * decay
    
    pressures.push({
      node: node.id,
      name: node.name,
      type: node.type,
      basePressure: node.pressure,
      correlation,
      decay: Math.round(decay * 1000) / 1000,
      weighted: Math.round(weighted * 1000) / 1000,
      halfLife: node.hl,
      critical: node.critical
    })
  })
  
  const total = pressures.reduce((sum, p) => sum + p.weighted, 0)
  const normalized = Math.min(2.0, total * 1.5)
  
  return {
    total,
    normalized: Math.round(normalized * 1000) / 1000,
    nodes: pressures.length,
    drivers: pressures.sort((a, b) => b.weighted - a.weighted)
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const conflict = searchParams.get('conflict')
  const nodeId = searchParams.get('node')
  
  if (nodeId && ECONOMIC_NODES[nodeId]) {
    return NextResponse.json(ECONOMIC_NODES[nodeId])
  }
  
  if (conflict) {
    return NextResponse.json({
      conflict,
      economicPressure: calculateEconomicPressure(conflict),
      timestamp: new Date().toISOString()
    })
  }
  
  // Return all nodes and aggregated pressures
  const conflicts = ['ukraine', 'israel', 'scs', 'armenia', 'sudan', 'myanmar', 'sahel']
  const aggregated = {}
  
  conflicts.forEach(c => {
    aggregated[c] = calculateEconomicPressure(c)
  })
  
  return NextResponse.json({
    model: 'AMS-LS Economic Topology',
    timestamp: new Date().toISOString(),
    nodes: Object.values(ECONOMIC_NODES),
    nodeCount: Object.keys(ECONOMIC_NODES).length,
    conflictPressures: aggregated,
    summary: {
      highestPressureNode: Object.values(ECONOMIC_NODES).sort((a, b) => b.pressure - a.pressure)[0],
      mostConnectedConflict: Object.entries(aggregated).sort((a, b) => b[1].nodes - a[1].nodes)[0],
      averagePressure: Math.round(Object.values(ECONOMIC_NODES).reduce((s, n) => s + n.pressure, 0) / Object.keys(ECONOMIC_NODES).length * 100) / 100
    }
  })
}
