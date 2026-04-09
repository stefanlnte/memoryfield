'use client'
import { useState, useEffect } from 'react'
export default function Tactical() {
  const [data, setData] = useState<any>(null)
  const [days, setDays] = useState(0)
  useEffect(() => { fetch(`/api/field?days=${days}`).then(r => r.json()).then(setData) }, [days])
  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="text-[#ff3b30] font-mono text-sm mb-2">01 / TACTICAL LAYER</div>
          <h1 className="text-4xl font-mono font-bold">Half-Life Decay Matrix</h1>
        </div>
        <div className="bg-black/40 border border-gray-800 rounded-lg p-6 mb-8">
          <input type="range" min="0" max="90" value={days} onChange={e => setDays(Number(e.target.value))} className="w-full accent-[#ff3b30]" />
        </div>
        <div className="space-y-3">
          {data?.conflicts?.map((c: any) => (
            <div key={c.id} className="bg-black/30 border border-gray-800 rounded-lg p-5">
              <div className="flex justify-between mb-2">
                <h3 className="font-mono font-bold">{c.name}</h3>
                <span className="text-xl font-mono" style={{color: c.signal_percent > 70 ? '#ff3b30' : '#ff9500'}}>{c.signal_percent}%</span>
              </div>
              <div className="text-xs font-mono text-gray-600">HL: {c.half_life}d • SCORE: {c.composite_score.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}