'use client'
import { useEffect, useState } from 'react'

const CONFLICTS = [
  { id: 'ukraine', name: 'UKRAINE', hl: 8, weight: 0.72 },
  { id: 'israel', name: 'ISRAEL', hl: 14, weight: 0.81 },
  { id: 'scs', name: 'SOUTH CHINA SEA', hl: 14, weight: 0.45 },
  { id: 'armenia', name: 'ARMENIA', hl: 21, weight: 0.31 },
  { id: 'sudan', name: 'SUDAN', hl: 30, weight: 0.52 },
  { id: 'myanmar', name: 'MYANMAR', hl: 60, weight: 0.68 },
  { id: 'sahel', name: 'SAHEL', hl: 90, weight: 0.74 },
]

export default function Tactical() {
  const [time, setTime] = useState(0)
  useEffect(() => { const id = setInterval(() => setTime(t => t + 1), 200); return () => clearInterval(id) }, [])

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="text-[#00d4ff] font-mono text-xs mb-1">TACTICAL LAYER</div>
          <h1 className="text-2xl md:text-4xl font-mono font-bold">Half-Life Field</h1>
          <p className="text-sm text-gray-600 mt-1">8-90 days • Real-time decay</p>
        </div>

        <div className="bg-black/40 border border-gray-800 rounded-xl p-4 mb-6">
          <div className="relative aspect-[4/3] md:aspect-[16/9] bg-[#050507] rounded-lg overflow-hidden">
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <defs><pattern id="g" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#222" strokeWidth="0.5"/></pattern></defs>
              <rect width="100%" height="100%" fill="url(#g)" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 w-full">
                {CONFLICTS.map((c, i) => {
                  const decay = Math.pow(0.5, (time % 100) / (c.hl))
                  const size = 60 + c.weight * decay * 40
                  return (
                    <div key={c.id} className="flex flex-col items-center">
                      <div className="relative" style={{ width: size, height: size }}>
                        <div className="absolute inset-0 rounded-full border-2 border-red-500/30 bg-red-500/10 animate-pulse" style={{ animationDuration: `${c.hl/5}s` }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-[10px] font-mono text-white leading-tight">{c.name.split(' ')[0]}</div>
                            <div className="text-[8px] text-red-400">{c.hl}d</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {CONFLICTS.sort((a,b) => a.hl - b.hl).map(c => (
            <div key={c.id} className="bg-black/30 border border-gray-900 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-sm">{c.name}</div>
                  <div className="text-[11px] text-gray-600 mt-0.5">Half-life: {c.hl} days • Weight: {c.weight}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-mono text-red-400">{c.hl}d</div>
                </div>
              </div>
              <div className="mt-2 w-full h-1 bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-red-500/60" style={{ width: `${c.weight * 100}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-black/20 border border-gray-900 rounded-xl">
          <p className="text-[11px] text-gray-500 leading-relaxed">
            <strong className="text-gray-400">Insight:</strong> Ukraine (8d) forgets battles in a week. Sahel (90d) remembers for months. Fast decay = volatile, slow decay = persistent insurgency.
          </p>
        </div>
      </div>
    </main>
  )
}
