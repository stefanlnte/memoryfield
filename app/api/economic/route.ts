// @ts-nocheck
import { NextResponse } from 'next/server'

interface EconomicNode {
  id: string
  name: string
  value: number
  trend: number
  correlations: Record<string, number>
}

const ECONOMIC_NODES: Record<string, EconomicNode> = {
  'ASM-001': { id: 'ASM-001', name: 'Energy Security', value: 78, trend: 2.3, correlations: {'ASM-002': 0.84, 'ASM-005': 0.72} },
  'ASM-002': { id: 'ASM-002', name: 'Supply Chains', value: 65, trend: -1.2, correlations: {'ASM-001': 0.84, 'ASM-003': 0.68} },
  'ASM-003': { id: 'ASM-003', name: 'Food Systems', value: 71, trend: 0.8, correlations: {'ASM-002': 0.68, 'ASM-007': 0.55} },
  'ASM-004': { id: 'ASM-004', name: 'Currency Flows', value: 82, trend: 3.1, correlations: {'ASM-005': 0.91, 'ASM-008': 0.76} },
  'ASM-005': { id: 'ASM-005', name: 'Debt Structures', value: 59, trend: -2.4, correlations: {'ASM-004': 0.91, 'ASM-001': 0.72} },
  'ASM-006': { id: 'ASM-006', name: 'Labor Markets', value: 68, trend: 1.5, correlations: {'ASM-007': 0.63, 'ASM-010': 0.58} },
  'ASM-007': { id: 'ASM-007', name: 'Tech Transfer', value: 74, trend: 4.2, correlations: {'ASM-006': 0.63, 'ASM-003': 0.55} },
  'ASM-008': { id: 'ASM-008', name: 'Resource Access', value: 61, trend: -0.9, correlations: {'ASM-004': 0.76, 'ASM-009': 0.81} },
  'ASM-009': { id: 'ASM-009', name: 'Trade Routes', value: 77, trend: 1.8, correlations: {'ASM-008': 0.81, 'ASM-011': 0.69} },
  'ASM-010': { id: 'ASM-010', name: 'Manufacturing', value: 70, trend: 0.3, correlations: {'ASM-006': 0.58, 'ASM-002': 0.61} },
  'ASM-011': { id: 'ASM-011', name: 'Digital Infrastructure', value: 85, trend: 5.1, correlations: {'ASM-009': 0.69, 'ASM-007': 0.74} },
}

function calculateEconomicPressure(conflictId: string, daysSince: number = 30): any[] {
  const pressures: any[] = []

  Object.values(ECONOMIC_NODES).forEach((node: EconomicNode) => {
    const basePressure = node.value * (1 + node.trend / 100)
    const conflictMultiplier = conflictId? 1.15 : 1.0
    const timeDecay = Math.exp(-daysSince / 90)

    pressures.push({
      nodeId: node.id,
      name: node.name,
      pressure: Math.round(basePressure * conflictMultiplier * timeDecay),
      trend: node.trend,
      correlations: node.correlations
    })
  })

  return pressures.sort((a, b) => b.pressure - a.pressure)
}

function getNodeCorrelations(nodeId: string): Record<string, number> {
  const node = ECONOMIC_NODES[nodeId]
  return node? node.correlations : {}
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const conflictId = searchParams.get('conflict') || 'global'
  const days = parseInt(searchParams.get('days') || '30')
  const nodeId = searchParams.get('node')

  if (nodeId) {
    return NextResponse.json({
      node: ECONOMIC_NODES[nodeId],
      correlations: getNodeCorrelations(nodeId),
      timestamp: new Date().toISOString()
    })
  }

  const pressures = calculateEconomicPressure(conflictId, days)

  return NextResponse.json({
    version: 'v248',
    conflict: conflictId,
    timeframe: days,
    nodes: pressures,
    topology: 'economic',
    timestamp: new Date().toISOString()
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { nodeId, value, trend } = body

  if (nodeId && ECONOMIC_NODES[nodeId]) {
    ECONOMIC_NODES[nodeId].value = value?? ECONOMIC_NODES[nodeId].value
    ECONOMIC_NODES[nodeId].trend = trend?? ECONOMIC_NODES[nodeId].trend
  }

  return NextResponse.json({
    success: true,
    updated: nodeId,
    node: ECONOMIC_NODES[nodeId]
  })
}
