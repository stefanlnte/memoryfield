'use client'
import { useState } from 'react'

const DATA = {
  armenia: { name: 'Armenia', hl: 100, mem: 99, text: 'Genocide 1915 at 99% persistence after 109 years. Highest in dataset. Maintained through diaspora, annual commemoration, Turkish denial. Memory precedes state. Nagorno-Karabakh wars layered onto 1915 base, each reinforcing original.' },
  israel: { name: 'Israel-Palestine', hl: 95, mem: 95, text: 'Holocaust 97% persistence globally. Nakba 94% among Palestinians. 1948 functions as twin anchor - independence vs catastrophe. October 7 2023 creates new layer at 98% projected, will drive next 40 years.' },
  ukraine: { name: 'Ukraine', hl: 100, mem: 89, text: 'Holodomor 1932-33 at 89% after 90 years. Forms baseline distrust of Moscow. 2014 Maidan/Crimea at 95% persistence. Youth under 25 shows 73% for 2014+ but only 34% for Soviet era. Generational shift by 2045.' },
  sahel: { name: 'Sahel', hl: 60, mem: 87, text: 'French colonial memory 76% but declining (54% under 30). Jihadist insurgency 2012-present at 89% and rising - active memory, each attack refreshes. Ethnic identity (Tuareg, Fulani) HL 80y exceeds national identity 25y.' },
}

export default function Socio() {
  const [sel, setSel] = useState('armenia')
  const d = DATA[sel as keyof typeof DATA]
  
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="text-[#00d4ff] font-mono text-xs mb-1">SOCIOLOGICAL</div>
          <h1 className="text-2xl md:text-4xl font-mono font-bold">Memory Persistence</h1>
          <p className="text-sm text-gray-600 mt-1">25-100 year half-life</p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-4 px-4">
          {Object.entries(DATA).map(([k,v]) => (
            <button key={k} onClick={() => setSel(k)} className={`px-4 py-2 rounded-lg border whitespace-nowrap text-sm font-mono transition ${sel===k ? 'bg-cyan-950/40 border-cyan-800 text-white' : 'bg-black/30 border-gray-800 text-gray-500'}`}>
              {v.name}
            </button>
          ))}
        </div>

        <div className="bg-black/30 border border-gray-800 rounded-xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-mono font-bold">{d.name}</h2>
              <p className="text-xs text-gray-500 mt-1">Memory: {d.mem}% • HL: {d.hl} years</p>
            </div>
            <div className="w-20 h-1.5 bg-gray-900 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-cyan-500" style={{width: `${d.mem}%`}} />
            </div>
          </div>
          <p className="text-[14px] leading-relaxed text-gray-300">{d.text}</p>
          
          <div className="mt-6 pt-4 border-t border-gray-800">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div><div className="text-lg font-mono text-cyan-400">{d.hl}y</div><div className="text-[10px] text-gray-600">half-life</div></div>
              <div><div className="text-lg font-mono text-white">{d.mem}%</div><div className="text-[10px] text-gray-600">persistence</div></div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-black/20 border border-gray-900 rounded-xl">
          <p className="text-[11px] text-gray-500">
            <strong className="text-gray-400">Key:</strong> Sociological memory outlasts states. Armenia 1915 drives 2023 policy. This is why tactical solutions fail - you're fighting 100-year memory with 8-day operations.
          </p>
        </div>
      </div>
    </main>
  )
}
