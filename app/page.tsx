'use client'

import { useState } from 'react'

const conflicts = [
  { id: 'ukraine', name: 'Ukraine-Russia', label: 'POKROVSK', hl: 8, color: '#ff3b30', x: 20, y: 20, desc: 'Pokrovsk captured early 2026, 700-drone waves' },
  { id: 'israel', name: 'Israel-Hezbollah', label: 'BEIRUT', hl: 14, color: '#ff3b30', x: 50, y: 15, desc: 'War since Mar 2, 1,500+ dead, 1M displaced' },
  { id: 'scs', name: 'South China Sea', label: 'SCS', hl: 14, color: '#ff9500', x: 80, y: 20, desc: 'PLA patrols Feb 17-18, US-JP-PH MMCA Feb 20-26' },
  { id: 'armenia', name: 'Armenia-Azerbaijan', label: 'CAUCASUS', hl: 21, color: '#ff9500', x: 20, y: 50, desc: '26 ceasefire violations since Mar' },
  { id: 'sudan', name: 'Sudan', label: 'KHARTOUM', hl: 30, color: '#ff9500', x: 50, y: 50, desc: 'SAF retook palace, RSF holds west, 33.7M need aid' },
  { id: 'myanmar', name: 'Myanmar', label: 'NAYPYIDAW', hl: 60, color: '#00d4ff', x: 80, y: 50, desc: 'USDP sham election, PDF vs Tatmadaw' },
  { id: 'sahel', name: 'Sahel AES', label: 'SAHEL', hl: 90, color: '#00d4ff', x: 50, y: 80, desc: '5,000-troop joint force, Russian backing' },
]

function decay(days: number, hl: number) {
  return 0.9 * Math.pow(0.5, days / hl) + 0.1
}

export default function Home() {
  const [days, setDays] = useState(0)

  return (
    <main className="min-h-screen bg-[#0a0e14] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-[#00d4ff] mb-2 tracking-wider">
            MEMORYFIELD.XYZ
          </h1>
          <p className="text-gray-400 font-mono">Asymmetric Memory Field • Neural Cycle 247</p>
          <p className="text-xs text-gray-600 mt-1">Mother node for persistent conflict tracking</p>
        </header>

        <div className="mb-8 bg-black/50 border border-[#00d4ff]/30 rounded-lg p-6 backdrop-blur">
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-gray-300">TIME SINCE UPDATE:</span>
            <input
              type="range"
              min="0"
              max="90"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="flex-1 accent-[#ff9500]"
            />
            <span className="text-2xl font-mono text-[#ff9500] w-16 text-right">{days}d</span>
          </div>
          <p className="text-xs text-gray-500 mt-3 font-mono">
            opacity = 0.9 × 0.5^(t/hl) + 0.1
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-black/30 border border-gray-800 rounded-lg p-6 relative h-[500px] backdrop-blur">
            <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle, #00d4ff 1px, transparent 1px)', backgroundSize: '20px 20px'}} />
            <svg className="w-full h-full relative z-10" viewBox="0 0 100 100">
              <line x1="20" y1="20" x2="80" y2="20" stroke="#00d4ff" strokeOpacity="0.2" strokeWidth="0.3" strokeDasharray="2,2" />
              <line x1="50" y1="80" x2="50" y2="50" stroke="#ff9500" strokeOpacity="0.2" strokeWidth="0.3" />
              <line x1="50" y1="50" x2="50" y2="15" stroke="#ff9500" strokeOpacity="0.2" strokeWidth="0.3" />
              <line x1="20" y1="50" x2="50" y2="15" stroke="#ff3b30" strokeOpacity="0.15" strokeWidth="0.3" />

              {conflicts.map(c => {
                const opacity = decay(days, c.hl)
                return (
                  <g key={c.id} transform={`translate(${c.x}, ${c.y})`}>
                    <circle r="5" fill={c.color} opacity={opacity * 0.3} />
                    <circle r="3" fill={c.color} opacity={opacity} className="animate-pulse" />
                    <text y="-7" textAnchor="middle" fill="white" fontSize="2.8" opacity={opacity} fontFamily="monospace">
                      {c.label}
                    </text>
                  </g>
                )
              })}
            </svg>
            <div className="absolute bottom-3 left-3 text-[10px] text-gray-600 font-mono">
              DRONE LOOP • WAGNER MODEL • MEMORY WEAPON
            </div>
          </div>

          <div className="space-y-3">
            {conflicts.map(c => {
              const opacity = decay(days, c.hl)
              const pct = Math.round(opacity * 100)
              return (
                <div key={c.id} className="bg-black/30 border border-gray-800 rounded p-4 hover:border-gray-700 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-sm font-bold" style={{color: c.color}}>{c.name}</span>
                    <span className="text-[10px] text-gray-600 font-mono bg-gray-900 px-2 py-0.5 rounded">HL:{c.hl}D</span>
                  </div>
                  <div className="w-full bg-gray-950 h-1.5 rounded mb-2 overflow-hidden">
                    <div className="h-full rounded transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: c.color, opacity: Math.max(0.3, opacity) }} />
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{c.desc}</p>
                  <div className="flex justify-between mt-2">
                    <p className="text-[10px] text-gray-600 font-mono">SIGNAL STRENGTH</p>
                    <p className="text-[10px] font-mono" style={{color: c.color}}>{pct}%</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/20 border border-red-900/30 rounded p-3">
            <p className="text-[10px] text-red-400 font-mono mb-1">TACTICAL &lt;14D</p>
            <p className="text-xs text-gray-500">Ukraine, Israel, SCS — rapid decay</p>
          </div>
          <div className="bg-black/20 border border-amber-900/30 rounded p-3">
            <p className="text-[10px] text-amber-400 font-mono mb-1">OPERATIONAL 15-45D</p>
            <p className="text-xs text-gray-500">Armenia, Sudan — medium persistence</p>
          </div>
          <div className="bg-black/20 border border-cyan-900/30 rounded p-3">
            <p className="text-[10px] text-cyan-400 font-mono mb-1">STRATEGIC &gt;60D</p>
            <p className="text-xs text-gray-500">Myanmar, Sahel — slow decay</p>
          </div>
        </div>

        <footer className="mt-12 pt-6 border-t border-gray-900">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-xs text-gray-700 font-mono">AMS-LS: Asymmetric memory patterns active</p>
            <p className="text-xs text-gray-700 font-mono">Rearguard defense: No compromise detected</p>
            <p className="text-xs text-gray-700 font-mono">API: /api/shodan /api/greynoise /api/urlscan /api/intelx</p>
          </div>
        </footer>
      </div>
    </main>
  )
}
