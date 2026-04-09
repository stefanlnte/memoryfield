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
          <h1 className="text-4xl font-mono font-bold mb-2">Half-Life Decay Matrix</h1>
          <p className="text-gray-600">Real-time signals weighted by temporal relevance. 8-90 day half-lives.</p>
        </div>
        <div className="bg-black/40 border border-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-gray-500">TIME SINCE UPDATE</span>
            <input type="range" min="0" max="90" value={days} onChange={e => setDays(Number(e.target.value))} className="flex-1 accent-[#ff3b30]" />
            <span className="font-mono text-xl text-[#ff3b30] w-16 text-right">{days}d</span>
          </div>
        </div>
        {data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-black/30 border border-gray-900 rounded p-4">
                <div className="text-xs text-gray-600 font-mono mb-1">FIELD COHERENCE</div>
                <div className="text-3xl font-mono text-[#00d4ff]">{data.field_coherence}%</div>
              </div>
              <div className="bg-black/30 border border-gray-900 rounded p-4">
                <div className="text-xs text-gray-600 font-mono mb-1">ACTIVE CONFLICTS</div>
                <div className="text-3xl font-mono text-[#ff9500]">{data.active_conflicts}/7</div>
              </div>
              <div className="bg-black/30 border border-gray-900 rounded p-4">
                <div className="text-xs text-gray-600 font-mono mb-1">NEURAL CYCLE</div>
                <div className="text-3xl font-mono text-white">{data.neural_cycle}</div>
              </div>
            </div>
            <div className="space-y-3">
              {data.conflicts?.map((c: any) => (
                <div key={c.id} className="bg-black/30 border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-mono font-bold text-lg">{c.name}</h3>
                      <p className="text-xs text-gray-600 font-mono mt-1">HL: {c.half_life}d • {c.decay_tier.toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-mono" style={{color: c.signal_percent > 70 ? '#ff3b30' : c.signal_percent > 40 ? '#ff9500' : '#00d4ff'}}>{c.signal_percent}%</div>
                      <div className="text-[10px] text-gray-600 font-mono">SIGNAL</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-3 mb-3">
                    <div className="bg-[#050810] rounded p-2"><div className="text-[10px] text-gray-600 font-mono">DEVICES</div><div className="font-mono text-sm">{c.weighted_signals.devices.toLocaleString()}</div></div>
                    <div className="bg-[#050810] rounded p-2"><div className="text-[10px] text-gray-600 font-mono">NOISE</div><div className="font-mono text-sm">{c.weighted_signals.noise.toLocaleString()}</div></div>
                    <div className="bg-[#050810] rounded p-2"><div className="text-[10px] text-gray-600 font-mono">URLS</div><div className="font-mono text-sm">{c.weighted_signals.urls}</div></div>
                    <div className="bg-[#050810] rounded p-2"><div className="text-[10px] text-gray-600 font-mono">MEMORY</div><div className="font-mono text-sm">{c.weighted_signals.memory}</div></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 bg-[#050810] h-1.5 rounded overflow-hidden mr-3">
                      <div className="h-full transition-all" style={{width: `${c.signal_percent}%`, backgroundColor: c.signal_percent > 70 ? '#ff3b30' : c.signal_percent > 40 ? '#ff9500' : '#00d4ff'}} />
                    </div>
                    <span className="text-xs font-mono text-gray-500">SCORE {c.composite_score.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
