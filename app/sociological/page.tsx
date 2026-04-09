'use client'
import { useState, useEffect } from 'react'
export default function Sociological() {
  const [days, setDays] = useState(0)
  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="text-[#ff9500] font-mono text-sm mb-2">02 / SOCIOLOGICAL COMPLEX</div>
          <h1 className="text-4xl font-mono font-bold">Structural Risk Analysis</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['Sudan', 'Sahel AES', 'Myanmar', 'Ukraine', 'Armenia', 'Israel', 'SCS'].map(name => (
            <div key={name} className="bg-black/30 border border-gray-800 rounded-lg p-5">
              <h3 className="font-mono font-bold mb-2">{name}</h3>
              <div className="text-xs text-gray-600 font-mono">Demographic pressure • Narrative fragility • Cultural memory</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}