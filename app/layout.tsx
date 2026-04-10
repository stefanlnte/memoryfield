import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'memoryfield.xyz — ASM-LS v248',
  description: 'Asymmetric Memory Model',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="pb-16 md:pb-0">
        <nav className="hidden md:block border-b border-gray-900 bg-black/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="font-mono font-bold text-[#00d4ff] text-sm">memoryfield.xyz</a>
            <div className="flex items-center gap-5 text-xs">
              <a href="/tactical" className="text-gray-500 hover:text-white">TACTICAL</a>
              <a href="/economic" className="text-gray-500 hover:text-white">ECONOMIC</a>
              <a href="/sociological" className="text-gray-500 hover:text-white">SOCIO</a>
              <a href="/matrix" className="text-gray-500 hover:text-white">MATRIX</a>
            </div>
          </div>
        </nav>
        {children}
        <Analytics />
        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur border-t border-gray-900 z-50">
          <div className="grid grid-cols-5 h-16">
            <a href="/" className="flex flex-col items-center justify-center gap-1">
              <div className="w-5 h-5 rounded bg-[#00d4ff]/20" />
              <span className="text-[9px] font-mono text-gray-500">HOME</span>
            </a>
            <a href="/tactical" className="flex flex-col items-center justify-center gap-1">
              <div className="w-5 h-5 rounded bg-red-500/20" />
              <span className="text-[9px] font-mono text-gray-500">TAC</span>
            </a>
            <a href="/economic" className="flex flex-col items-center justify-center gap-1">
              <div className="w-5 h-5 rounded bg-orange-500/20" />
              <span className="text-[9px] font-mono text-gray-500">ECO</span>
            </a>
            <a href="/sociological" className="flex flex-col items-center justify-center gap-1">
              <div className="w-5 h-5 rounded bg-cyan-500/20" />
              <span className="text-[9px] font-mono text-gray-500">SOC</span>
            </a>
            <a href="/matrix" className="flex flex-col items-center justify-center gap-1">
              <div className="w-5 h-5 rounded bg-purple-500/20" />
              <span className="text-[9px] font-mono text-gray-500">MATRIX</span>
            </a>
          </div>
        </nav>
      </body>
    </html>
  )
}
