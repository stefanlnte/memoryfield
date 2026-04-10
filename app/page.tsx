export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="mb-10 md:mb-16">
          <div className="text-[#00d4ff] font-mono text-xs mb-3">ASM-LS v248</div>
          <h1 className="text-4xl md:text-7xl font-mono font-bold mb-4 leading-none">
            Asymmetric<br/>Memory
          </h1>
          <p className="text-base md:text-xl text-gray-400 max-w-2xl">
            Conflicts decay at different rates. Model the half-life, predict ignition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
          {[
            { href: '/tactical', label: 'TACTICAL', sub: '8-90 days', desc: 'Battles, events, immediate triggers', color: 'border-red-900/40' },
            { href: '/economic', label: 'ECONOMIC', sub: '1-720 days', desc: '11 nodes, supply chains, finance', color: 'border-orange-900/40' },
            { href: '/sociological', label: 'SOCIOLOGICAL', sub: '25-100 years', desc: 'Cultural memory, trauma', color: 'border-cyan-900/40' },
            { href: '/matrix', label: 'MATRIX', sub: 'Live', desc: 'Ignition probabilities', color: 'border-purple-900/40' },
          ].map((item) => (
            <a key={item.href} href={item.href} className={`bg-black/40 border ${item.color} rounded-xl p-5 active:scale-[0.98] transition`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-[11px] text-gray-500 mb-1">{item.sub}</div>
                  <div className="font-mono text-xl">{item.label}</div>
                  <div className="text-xs text-gray-600 mt-1">{item.desc}</div>
                </div>
                <div className="text-gray-700">→</div>
              </div>
            </a>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-black/30 border border-gray-900 rounded-xl p-5">
            <h2 className="font-mono text-xs text-gray-500 mb-3">HOW IT WORKS</h2>
            <div className="space-y-3 text-[13px] leading-relaxed text-gray-300">
              <p><span className="text-white">Tactical</span> fades fast. Ukraine battle: 50% forgotten in 8 days.</p>
              <p><span className="text-white">Economic</span> decays in months. Shanghai port pressure: 180-day half-life.</p>
              <p><span className="text-white">Sociological</span> persists. Armenian genocide: 99% after 109 years.</p>
            </div>
          </div>

          <div className="bg-black/30 border border-gray-900 rounded-xl p-5">
            <h2 className="font-mono text-xs text-gray-500 mb-3">CURRENT</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div><div className="text-2xl font-mono text-white">7</div><div className="text-[10px] text-gray-600">conflicts</div></div>
              <div><div className="text-2xl font-mono text-orange-400">11</div><div className="text-[10px] text-gray-600">nodes</div></div>
              <div><div className="text-2xl font-mono text-red-400">3</div><div className="text-[10px] text-gray-600">critical</div></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
