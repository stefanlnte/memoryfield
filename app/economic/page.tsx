'use client'
import { useState, useEffect } from 'react'

export default function Economic() {
  const [data, setData] = useState<any>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/economic')
      .then(r => r.json())
      .then(setData)
  }, [])

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'primary_core': return 'text-red-400 border-red-900/50'
      case 'transfer': return 'text-orange-400 border-orange-900/50'
      case 'control': return 'text-cyan-400 border-cyan-900/50'
      default: return 'text-gray-400 border-gray-800'
    }
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="text-[#00d4ff] font-mono text-sm mb-2">04 / ECONOMIC TOPOLOGY</div>
          <h1 className="text-2xl md:text-4xl font-mono font-bold mb-2">Metabolic Nodes</h1>
          <p className="text-gray-600">11 economic nodes, pressure-weighted, half-life decay</p>
        </div>

        {data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-black/40 border border-gray-800 rounded-xl p-4">
                <div className="text-xs text-gray-500 font-mono mb-1">NODES</div>
                <div className="text-2xl font-mono text-white">{data.nodeCount}</div>
                <div className="text-[10px] text-gray-600">3 primary, 4 transfer, 3 control</div>
              </div>
              <div className="bg-black/40 border border-red-900/30 rounded-xl p-4">
                <div className="text-xs text-red-400 font-mono mb-1">HIGHEST PRESSURE</div>
                <div className="text-lg font-mono text-red-400">{data.summary.highestPressureNode.name}</div>
                <div className="text-[10px] text-gray-600">{Math.round(data.summary.highestPressureNode.pressure * 100)}% • {data.summary.highestPressureNode.critical}</div>
              </div>
              <div className="bg-black/40 border border-gray-800 rounded-xl p-4">
                <div className="text-xs text-gray-500 font-mono mb-1">AVG PRESSURE</div>
                <div className="text-2xl font-mono text-orange-400">{Math.round(data.summary.averagePressure * 100)}%</div>
                <div className="text-[10px] text-gray-600">across all nodes</div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-mono text-sm text-gray-400 mb-3">NODES BY PRESSURE</h3>
                {data.nodes.sort((a: any, b: any) => b.pressure - a.pressure).map((node: any) => (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                    className={`bg-black/30 border rounded-xl p-4 cursor-pointer transition-all hover:border-gray-700 ${getTypeColor(node.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-mono font-bold">{node.name}</h4>
                          <span className="text-[10px] px-1.5 py-0.5 bg-black/50 rounded font-mono">{node.type.replace('_', ' ')}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 font-mono">{node.critical}</p>
                        <p className="text-[10px] text-gray-600 mt-1">HL: {node.hl}d • {Object.keys(node.correlations).length} conflicts</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-mono">{Math.round(node.pressure * 100)}%</div>
                        <div className="w-16 h-1 bg-black/50 rounded mt-1 overflow-hidden">
                          <div className="h-full bg-current" style={{ width: `${node.pressure * 100}%` }} />
                        </div>
                      </div>
                    </div>
                    
                    {selectedNode === node.id && Object.keys(node.correlations).length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-800">
                        <div className="text-[10px] text-gray-500 font-mono mb-2">CORRELATED CONFLICTS</div>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(node.correlations).map(([conf, corr]: [string, any]) => (
                            <div key={conf} className="text-[11px] font-mono px-2 py-1 bg-black/50 rounded">
                              {conf.toUpperCase()}: {Math.round(corr * 100)}%
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="font-mono text-sm text-gray-400">CONFLICT ECONOMIC PRESSURE</h3>
                {Object.entries(data.conflictPressures)
                  .sort((a: any, b: any) => b[1].normalized - a[1].normalized)
                  .map(([conflict, pressure]: [string, any]) => (
                  <div key={conflict} className="bg-black/30 border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-mono font-bold text-sm">{conflict.toUpperCase()}</h4>
                      <span className="font-mono text-lg text-orange-400">{pressure.normalized}/2.0</span>
                    </div>
                    <div className="space-y-1">
                      {pressure.drivers.slice(0, 3).map((driver: any) => (
                        <div key={driver.node} className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-gray-500 truncate">{driver.name}</span>
                          <span className="text-gray-400">{driver.weighted}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="bg-black/40 border border-cyan-900/30 rounded-xl p-4">
                  <h4 className="font-mono text-xs text-cyan-400 mb-2">KEY INSIGHT</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Ukraine pressure (1.39) driven 70% by Nord Stream corridor (0.647). 
                    Not battlefield, but energy infrastructure. Sahel (1.35) driven by Delaware opacity (0.321) + Dubai gold (0.206) — financial, not military.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
