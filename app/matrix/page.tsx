'use client'
import { useState, useEffect } from 'react'

export default function Matrix() {
  const [data, setData] = useState<any>(null)
  useEffect(() => { fetch('/api/predict').then(r => r.json()).then(setData) }, [])

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="text-[#00d4ff] font-mono text-xs mb-1">MATRIX</div>
          <h1 className="text-2xl md:text-4xl font-mono font-bold">Ignition Probability</h1>
          <p className="text-sm text-gray-600 mt-1">P = σ(structural + tactical + memory + economic)</p>
        </div>

        {data && (
          <div className="space-y-3">
            {data.predictions.map((p: any) => {
              const p30 = p.predictions['30d']
              const isCrit = p30.percentage > 75
              const isHigh = p30.percentage > 60
              return (
                <div key={p.id} className={`border rounded-xl p-4 ${isCrit ? 'bg-red-950/20 border-red-900/50' : isHigh ? 'bg-orange-950/20 border-orange-900/50' : 'bg-black/30 border-gray-800'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-mono font-bold">{p.name.toUpperCase()}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${isCrit ? 'bg-red-500/20 text-red-400' : isHigh ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-800 text-gray-400'}`}>{p30.risk_level}</span>
                        <span className="text-[11px] text-gray-600">7d: {p.predictions['7d'].percentage}% • 90d: {p.predictions['90d'].percentage}%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-mono ${isCrit ? 'text-red-400' : isHigh ? 'text-orange-400' : 'text-gray-400'}`}>{p30.percentage}</div>
                      <div className="text-[10px] text-gray-600 -mt-1">%</div>
                    </div>
                  </div>
                  <div className="mt-3 w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                    <div className={`h-full ${isCrit ? 'bg-red-500' : isHigh ? 'bg-orange-500' : 'bg-gray-600'}`} style={{width: `${p30.percentage}%`}} />
                  </div>
                </div>
              )
            })}
            
            <div className="mt-6 p-4 bg-black/20 border border-gray-900 rounded-xl">
              <p className="text-[11px] text-gray-500 leading-relaxed">
                <strong className="text-gray-400">Model:</strong> ASM-LS v248. Combines tactical half-life, sociological persistence, economic node pressure, and structural risk. Sahel at 92% driven by youth bulge + low legitimacy + 90-day tactical persistence.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
