'use client'
import { useState, useEffect } from 'react'
export default function Matrix() {
  const [tactical, setTactical] = useState<any>(null)
  const [socio, setSocio] = useState<any>(null)
  const [days, setDays] = useState(15)
  useEffect(() => {
    Promise.all([
      fetch(`/api/field?days=${days}`).then(r => r.json()),
      fetch(`/api/socio?days=${days}`).then(r => r.json())
    ]).then(([t, s]) => { setTactical(t); setSocio(s) })
  }, [days])
  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="text-[#00d4ff] font-mono text-sm mb-2">03 / MATRIX VIEW</div>
          <h1 className="text-4xl font-mono font-bold mb-2">Full Synthesis</h1>
          <p className="text-gray-600">Tactical decay × Sociological persistence × Cross-links</p>
        </div>
        <div className="bg-black/40 border border-gray-800 rounded-lg p-6 mb-8">
          <input type="range" min="0" max="90" value={days} onChange={e => setDays(Number(e.target.value))} className="w-full accent-[#00d4ff]" />
        </div>
        {tactical && socio && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-black/30 border border-gray-800 rounded-lg p-6">
              <h3 className="font-mono text-sm text-gray-400 mb-4">CROSS-LINKS ACTIVE</h3>
              <div className="space-y-3">
                {tactical.cross_links?.map((link: any, i: number) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-900 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs px-2 py-1 bg-gray-900 rounded">{link.from.toUpperCase()}</span>
                      <span className="text-gray-600">→</span>
                      <span className="font-mono text-xs px-2 py-1 bg-gray-900 rounded">{link.to.toUpperCase()}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-gray-600 font-mono">{link.type.replace('_', ' ')}</div>
                      <div className="text-sm font-mono text-[#00d4ff]">{Math.round(link.strength * 100)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-black/30 border border-gray-800 rounded-lg p-6">
              <h3 className="font-mono text-sm text-gray-400 mb-4">LATENT CONFLICT DETECTION</h3>
              <div className="space-y-3">
                {socio.conflicts?.sort((a: any, b: any) => b.synthesis.latent_potential - a.synthesis.latent_potential).slice(0, 4).map((c: any) => (
                  <div key={c.id} className="py-2 border-b border-gray-900 last:border-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-sm">{c.name}</span>
                      <span className={`font-mono text-sm ${c.synthesis.latent_potential > 25 ? 'text-red-400' : 'text-gray-500'}`}>{c.synthesis.latent_potential}</span>
                    </div>
                    <div className="flex gap-4 text-[10px] font-mono text-gray-600">
                      <span>TAC {c.synthesis.immediate_threat}%</span>
                      <span>MEM {c.synthesis.memory_persistence}%</span>
                      <span>RISK {c.synthesis.structural_risk}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
