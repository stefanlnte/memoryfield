'use client'

import { useState, useEffect } from 'react'

export default function Sociological() {
  const [data, setData] = useState<any>(null)
  const [days, setDays] = useState(0)

  useEffect(() => {
    fetch(`/api/socio?days=${days}`)
      .then(r => r.json())
      .then(setData)
  }, [days])

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="text-[#ff9500] font-mono text-sm mb-2">02 / SOCIOLOGICAL COMPLEX</div>
          <h1 className="text-4xl font-mono font-bold mb-2">Structural Risk Analysis</h1>
          <p className="text-gray-600">Demographic pressure, narrative fragility, cultural memory. 25-100 year half-lives.</p>
        </div>

        <div className="bg-black/40 border border-gray-800 rounded-lg p-6 mb-8">
          <input type="range" min="0" max="365" value={days} onChange={e => setDays(Number(e.target.value))} className="w-full accent-[#ff9500]" />
          <div className="flex justify-between mt-2">
            <span className="text-xs font-mono text-gray-600">TACTICAL DECAY</span>
            <span className="text-xs font-mono text-[#ff9500]">{days} days</span>
            <span className="text-xs font-mono text-gray-600">CULTURAL MEMORY PERSISTS</span>
          </div>
        </div>

        {data && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              <div className="bg-red-950/20 border border-red-900/30 rounded p-3">
                <div className="text-[10px] text-red-400 font-mono">YOUTH BULGE</div>
                <div className="text-lg font-mono mt-1">{data.field_analysis.youth_bulge_zones.join(', ').toUpperCase()}</div>
              </div>
              <div className="bg-amber-950/20 border border-amber-900/30 rounded p-3">
                <div className="text-[10px] text-amber-400 font-mono">NARRATIVE COLLAPSE</div>
                <div className="text-lg font-mono mt-1">{data.field_analysis.narrative_collapse_zones.join(', ').toUpperCase() || 'NONE'}</div>
              </div>
              <div className="bg-orange-950/20 border border-orange-900/30 rounded p-3">
                <div className="text-[10px] text-orange-400 font-mono">DISPLACEMENT</div>
                <div className="text-lg font-mono mt-1">{data.field_analysis.displacement_cascades.join(', ').toUpperCase()}</div>
              </div>
              <div className="bg-purple-950/20 border border-purple-900/30 rounded p-3">
                <div className="text-[10px] text-purple-400 font-mono">MEMORY WEAPONS</div>
                <div className="text-lg font-mono mt-1">{data.field_analysis.memory_weapons.join(', ').toUpperCase()}</div>
              </div>
            </div>

            <div className="space-y-4">
              {data.conflicts?.map((c: any) => (
                <div key={c.id} className="bg-black/30 border border-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-mono text-xl font-bold">{c.name}</h3>
                    <div className="text-right">
                      <div className="text-xs text-gray-600 font-mono">STRUCTURAL RISK</div>
                      <div className="text-2xl font-mono text-[#ff9500]">{c.synthesis.structural_risk}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-[10px] text-gray-600 font-mono mb-2">DEMOGRAPHIC</div>
                      <div className="space-y-1 text-xs font-mono">
                        <div className="flex justify-between"><span className="text-gray-600">Displaced</span><span>{c.sociological.demographic.displaced_millions}M</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Median age</span><span className={c.sociological.demographic.youth_bulge ? 'text-red-400' : ''}>{c.sociological.demographic.median_age}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Birth rate</span><span>{c.sociological.demographic.birth_rate}</span></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-[10px] text-gray-600 font-mono mb-2">NARRATIVE</div>
                      <div className="space-y-1 text-xs font-mono">
                        <div className="flex justify-between"><span className="text-gray-600">Legitimacy</span><span>{Math.round(c.sociological.narrative.state_legitimacy * 100)}%</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Cohesion</span><span>{Math.round(c.sociological.narrative.social_cohesion * 100)}%</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Info war</span><span>{Math.round(c.sociological.narrative.info_warfare_index * 100)}%</span></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-[10px] text-gray-600 font-mono mb-2">ECONOMIC</div>
                      <div className="space-y-1 text-xs font-mono">
                        <div className="flex justify-between"><span className="text-gray-600">GDP</span><span className={c.sociological.economic.gdp_change < 0 ? 'text-red-400' : 'text-green-400'}>{(c.sociological.economic.gdp_change * 100).toFixed(0)}%</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Inflation</span><span>{Math.round(c.sociological.economic.inflation * 100)}%</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Youth unemp</span><span>{Math.round(c.sociological.economic.youth_unemployment * 100)}%</span></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-[10px] text-gray-600 font-mono mb-2">CULTURAL MEMORY</div>
                      <div className="space-y-1 text-xs font-mono">
                        <div className="flex justify-between"><span className="text-gray-600">Trauma HL</span><span>{c.sociological.cultural_memory.trauma_half_life}y</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Grievance</span><span>{Math.round(c.sociological.cultural_memory.generational_grievance * 100)}%</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Persist</span><span className="text-[#00d4ff]">{c.sociological.cultural_memory.persistence_percent}%</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-900 flex gap-6 text-[10px] font-mono">
                    <div>IMMEDIATE: <span className="text-white">{c.synthesis.immediate_threat}%</span></div>
                    <div>MEMORY: <span className="text-[#00d4ff]">{c.synthesis.memory_persistence}%</span></div>
                    <div>LATENT: <span className={c.synthesis.latent_potential > 30 ? 'text-red-400' : 'text-gray-600'}>{c.synthesis.latent_potential}</span></div>
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
