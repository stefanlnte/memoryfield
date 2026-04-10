'use client'

import { useState, useEffect } from 'react'

const NODES = [
  { id: 'ASM-001', name: 'Energy', value: 78, trend: 2.3, x: 0, y: -120 },
  { id: 'ASM-002', name: 'Supply', value: 65, trend: -1.2, x: 95, y: -74 },
  { id: 'ASM-003', name: 'Food', value: 71, trend: 0.8, x: 114, y: 18 },
  { id: 'ASM-004', name: 'Currency', value: 82, trend: 3.1, x: 68, y: 99 },
  { id: 'ASM-005', name: 'Debt', value: 59, trend: -2.4, x: -28, y: 117 },
  { id: 'ASM-006', name: 'Labor', value: 68, trend: 1.5, x: -105, y: 58 },
  { id: 'ASM-007', name: 'Tech', value: 74, trend: 4.2, x: -105, y: -58 },
  { id: 'ASM-008', name: 'Resource', value: 61, trend: -0.9, x: -28, y: -117 },
  { id: 'ASM-009', name: 'Trade', value: 77, trend: 1.8, x: 68, y: -99 },
  { id: 'ASM-010', name: 'Manufacturing', value: 70, trend: 0.3, x: 114, y: -18 },
  { id: 'ASM-011', name: 'Digital', value: 85, trend: 5.1, x: 95, y: 74 },
]

const CORRELATIONS: Record<string, number> = {
  'ASM-001-ASM-002': 0.84, 'ASM-001-ASM-005': 0.72,
  'ASM-002-ASM-003': 0.68, 'ASM-004-ASM-005': 0.91,
  'ASM-004-ASM-008': 0.76, 'ASM-008-ASM-009': 0.81,
  'ASM-009-ASM-011': 0.69, 'ASM-007-ASM-011': 0.74,
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('economic')
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [fieldData, setFieldData] = useState({ coherence: 0.847, entropy: 2.34, persistence: 0.91 })

  useEffect(() => {
    const interval = setInterval(() => {
      setFieldData(prev => ({
        coherence: Math.min(0.99, Math.max(0.7, prev.coherence + (Math.random() - 0.5) * 0.02)),
        entropy: Math.min(3, Math.max(1.5, prev.entropy + (Math.random() - 0.5) * 0.05)),
        persistence: Math.min(0.99, Math.max(0.8, prev.persistence + (Math.random() - 0.5) * 0.01)),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const getCorrelation = (a: string, b: string) => {
    const key1 = `${a}-${b}`
    const key2 = `${b}-${a}`
    return CORRELATIONS[key1] || CORRELATIONS[key2] || 0
  }

  return (
    <div className="min-h-screen bg-[#050508] text-zinc-200 flex flex-col">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap');
        body { font-family: 'IBM Plex Mono', monospace; }
      `}</style>

      {/* Header */}
      <header className="border-b border-zinc-800/50 px-4 py-3 flex items-center justify-between backdrop-blur-xl bg-black/20 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs tracking-[0.3em] text-zinc-500">MEMORYFIELD</span>
          <span className="text-xs text-amber-500/80">v248</span>
        </div>
        <div className="text-[10px] text-zinc-600 tracking-widest">AMS-LS</div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-20">
        {activeTab === 'field' && (
          <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl mb-8 tracking-wider">FIELD STATE</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-950/50">
                <div className="text-[11px] text-zinc-500 tracking-widest mb-2">COHERENCE</div>
                <div className="text-4xl font-light">{fieldData.coherence.toFixed(3)}</div>
                <div className="mt-3 h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 transition-all duration-1000" style={{ width: `${fieldData.coherence * 100}%` }} />
                </div>
              </div>
              <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-950/50">
                <div className="text-[11px] text-zinc-500 tracking-widest mb-2">ENTROPY</div>
                <div className="text-4xl font-light">{fieldData.entropy.toFixed(2)}</div>
                <div className="mt-3 h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500/70 transition-all duration-1000" style={{ width: `${(fieldData.entropy / 3) * 100}%` }} />
                </div>
              </div>
              <div className="border border-zinc-800 rounded-xl p-6 bg-zinc-950/50">
                <div className="text-[11px] text-zinc-500 tracking-widest mb-2">PERSISTENCE</div>
                <div className="text-4xl font-light">{fieldData.persistence.toFixed(2)}</div>
                <div className="mt-3 h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 transition-all duration-1000" style={{ width: `${fieldData.persistence * 100}%` }} />
                </div>
              </div>
            </div>
            
            <div className="mt-12 border border-amber-500/20 rounded-xl p-6 bg-amber-950/10">
              <div className="text-[11px] text-amber-500/70 tracking-widest mb-3">FIELD EQUATION</div>
              <div className="font-mono text-sm text-zinc-300">
                χ<sub>AMS-LS</sub> = ∫<sub>RockPi4+</sub><sup>persistent</sup> ∇M · dΩ
              </div>
              <div className="mt-3 text-xs text-zinc-500">Current: <span className="text-amber-500">12.22</span> — Field cohering</div>
            </div>
          </div>
        )}

        {activeTab === 'economic' && (
          <div className="p-4 md:p-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl md:text-2xl tracking-wider">ECONOMIC TOPOLOGY</h1>
              <div className="text-[10px] text-zinc-600 tracking-widest">11 NODES</div>
            </div>
            
            <div className="relative w-full aspect-square max-w-[600px] mx-auto">
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {NODES.map((n1, i) => 
                  NODES.slice(i + 1).map(n2 => {
                    const corr = getCorrelation(n1.id, n2.id)
                    if (corr < 0.7) return null
                    return (
                      <line
                        key={`${n1.id}-${n2.id}`}
                        x1="50%" y1="50%"
                        x2="50%" y2="50%"
                        stroke="rgb(245 158 11)"
                        strokeOpacity={selectedNode && (selectedNode === n1.id || selectedNode === n2.id) ? 0.8 : 0.15}
                        strokeWidth={selectedNode && (selectedNode === n1.id || selectedNode === n2.id) ? 2 : 1}
                        transform={`translate(${n1.x}, ${n1.y})`}
                        x2={n2.x - n1.x}
                        y2={n2.y - n1.y}
                      />
                    )
                  })
                )}
              </svg>
              
              {NODES.map(node => {
                const isSelected = selectedNode === node.id
                const trendColor = node.trend > 0 ? 'text-amber-500' : node.trend < 0 ? 'text-zinc-500' : 'text-zinc-600'
                const trendSymbol = node.trend > 0 ? '↑' : node.trend < 0 ? '↓' : '→'
                
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(isSelected ? null : node.id)}
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[72px] h-[72px] md:w-[88px] md:h-[88px] rounded-full border transition-all duration-300 ${
                      isSelected 
                        ? 'border-amber-500 bg-amber-500/10 scale-110 z-10' 
                        : 'border-zinc-800 bg-zinc-950/80 hover:border-zinc-700 hover:bg-zinc-900/80'
                    }`}
                    style={{ transform: `translate(calc(-50% + ${node.x}px), calc(-50% + ${node.y}px))` }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="text-[8px] text-zinc-600">{node.id.split('-')[1]}</div>
                      <div className="text-[10px] mt-0.5 leading-tight">{node.name.slice(0,4)}</div>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-sm">{node.value}</span>
                        <span className={`text-[10px] ${trendColor}`}>{trendSymbol}</span>
                      </div>
                    </div>
                  </button>
                )
              })}
              
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-500/20 animate-pulse" />
            </div>

            {selectedNode && (
              <div className="mt-8 max-w-md mx-auto border border-zinc-800 rounded-xl p-4 bg-zinc-950/80 backdrop-blur">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium">{NODES.find(n => n.id === selectedNode)?.name}</div>
                  <button onClick={() => setSelectedNode(null)} className="text-zinc-600 hover:text-zinc-400">✕</button>
                </div>
                <div className="space-y-2 text-xs">
                  {NODES.filter(n => n.id !== selectedNode).map(n => {
                    const corr = getCorrelation(selectedNode, n.id)
                    if (corr === 0) return null
                    return (
                      <div key={n.id} className="flex items-center justify-between">
                        <span className="text-zinc-500">{n.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1 bg-zinc-900 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500/60" style={{ width: `${corr * 100}%` }} />
                          </div>
                          <span className="text-amber-500/80 w-8 text-right">{corr.toFixed(2)}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'matrix' && (
          <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <h1 className="text-xl md:text-2xl tracking-wider mb-6">CORRELATION MATRIX</h1>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                <div className="grid grid-cols-12 gap-1 text-[10px]">
                  <div></div>
                  {NODES.map(n => <div key={n.id} className="text-center text-zinc-600 pb-1">{n.id.slice(-3)}</div>)}
                  {NODES.map((row, i) => (
                    <>
                      <div className="text-right pr-2 text-zinc-600 flex items-center justify-end">{row.id.slice(-3)}</div>
                      {NODES.map((col, j) => {
                        const v = i === j ? 1 : getCorrelation(row.id, col.id) || (0.3 + Math.random() * 0.4)
                        const intensity = i === j ? 1 : v
                        return (
                          <div
                            key={`${i}-${j}`}
                            className="aspect-square flex items-center justify-center rounded-sm"
                            style={{ 
                              backgroundColor: i === j ? '#f59e0b' : `rgba(245, 158, 11, ${intensity * 0.85})`,
                              color: i === j || intensity > 0.7 ? '#000' : '#a1a1aa'
                            }}
                            title={`${row.name} ↔ ${col.name}: ${v.toFixed(2)}`}
                          >
                            {i === j ? '1' : v > 0.65 ? v.toFixed(1) : ''}
                          </div>
                        )
                      })}
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tactical' && (
          <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl mb-8 tracking-wider">TACTICAL</h1>
            <div className="text-zinc-600 text-sm">Tactical overlay — coming online</div>
          </div>
        )}

        {activeTab === 'socio' && (
          <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl mb-8 tracking-wider">SOCIO</h1>
            <div className="text-zinc-600 text-sm">Socio-cultural layer — coming online</div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-zinc-800/50 bg-black/80 backdrop-blur-xl z-50">
        <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
          {[
            { id: 'field', label: 'FIELD', icon: '◯' },
            { id: 'economic', label: 'ECONOMIC', icon: '⬡' },
            { id: 'matrix', label: 'MATRIX', icon: '⊞' },
            { id: 'tactical', label: 'TACTICAL', icon: '⬔' },
            { id: 'socio', label: 'SOCIO', icon: '◈' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[64px] ${
                activeTab === tab.id ? 'text-amber-500' : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              <span className="text-lg leading-none">{tab.icon}</span>
              <span className="text-[9px] tracking-widest">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
