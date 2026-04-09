'use client'

import { useState } from 'react'

export default function Home() {
  const [days, setDays] = useState(0)
  
  const conflicts = [
    { id: 'ukraine', name: 'Ukraine-Russia', hl: 8, x: 20, y: 25, color: '#ff3b30' },
    { id: 'israel', name: 'Israel-Hezbollah', hl: 14, x: 50, y: 20, color: '#ff3b30' },
    { id: 'scs', name: 'South China Sea', hl: 14, x: 80, y: 25, color: '#ff9500' },
    { id: 'armenia', name: 'Armenia-Azerbaijan', hl: 21, x: 25, y: 55, color: '#ff9500' },
    { id: 'sudan', name: 'Sudan', hl: 30, x: 50, y: 60, color: '#ff9500' },
    { id: 'myanmar', name: 'Myanmar', hl: 60, x: 75, y: 55, color: '#00d4ff' },
    { id: 'sahel', name: 'Sahel AES', hl: 90, x: 50, y: 85, color: '#00d4ff' },
  ]

  const decay = (d: number, hl: number) => 0.9 * Math.pow(0.5, d / hl) + 0.1

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-mono font-bold mb-4 tracking-tighter">
            ASYMMETRIC<br/>
            <span className="text-[#00d4ff]">MEMORY</span> FIELD
          </h1>
          <p className="text-gray-500 font-mono text-sm">ASM-LS v248 • Neural Cycle 247 • Mother Node Active</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <a href="/tactical" className="group bg-black/40 border border-gray-800 rounded-lg p-8 hover:border-[#ff3b30]/50 transition-all">
            <div className="text-[#ff3b30] text-3xl mb-3 font-mono">01</div>
            <h2 className="text-xl font-mono mb-2 group-hover:text-[#ff3b30] transition">TACTICAL LAYER</h2>
            <p className="text-gray-600 text-sm">Half-life decay 8-90 days. Device counts, threat noise, real-time signals.</p>
            <div className="mt-4 text-xs text-gray-700 font-mono">/api/field</div>
          </a>
          
          <a href="/sociological" className="group bg-black/40 border border-gray-800 rounded-lg p-8 hover:border-[#ff9500]/50 transition-all">
            <div className="text-[#ff9500] text-3xl mb-3 font-mono">02</div>
            <h2 className="text-xl font-mono mb-2 group-hover:text-[#ff9500] transition">SOCIOLOGICAL</h2>
            <p className="text-gray-600 text-sm">Demographic pressure, narrative fragility, cultural memory 25-100 years.</p>
            <div className="mt-4 text-xs text-gray-700 font-mono">/api/socio</div>
          </a>
          
          <a href="/matrix" className="group bg-black/40 border border-gray-800 rounded-lg p-8 hover:border-[#00d4ff]/50 transition-all">
            <div className="text-[#00d4ff] text-3xl mb-3 font-mono">03</div>
            <h2 className="text-xl font-mono mb-2 group-hover:text-[#00d4ff] transition">MATRIX VIEW</h2>
            <p className="text-gray-600 text-sm">Cross-links, latent potential, composite risk scoring.</p>
            <div className="mt-4 text-xs text-gray-700 font-mono">Full synthesis</div>
          </a>
        </div>

        <div className="bg-black/30 border border-gray-900 rounded-xl p-8 backdrop-blur">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-mono text-sm text-gray-400">LIVE FIELD • TIME DECAY SIMULATION</h3>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-600">DAYS</span>
              <span className="text-2xl font-mono text-[#ff9500] w-12 text-right">{days}</span>
            </div>
          </div>
          
          <input type="range" min="0" max="90" value={days} onChange={e => setDays(Number(e.target.value))} className="w-full mb-8 accent-[#ff9500]" />
          
          <div className="relative h-[400px] bg-[#050810] rounded-lg border border-gray-900 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(#00d4ff 1px, transparent 1px), linear-gradient(90deg, #00d4ff 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {conflicts.map(c => {
                const o = decay(days, c.hl)
                return (
                  <g key={c.id} transform={`translate(${c.x},${c.y})`}>
                    <circle r="8" fill={c.color} opacity={o * 0.15} />
                    <circle r="4" fill={c.color} opacity={o} />
                    <text y="-10" textAnchor="middle" fill="white" fontSize="3" opacity={o} fontFamily="monospace">{c.id.toUpperCase()}</text>
                    <text y="12" textAnchor="middle" fill="#666" fontSize="2" opacity={o} fontFamily="monospace">{Math.round(o*100)}%</text>
                  </g>
                )
              })}
            </svg>
          </div>
        </div>
      </div>
    </main>
  )
}
