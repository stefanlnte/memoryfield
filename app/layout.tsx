import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'memoryfield.xyz',
  description: 'ASM-LS v248 - Asymmetric Memory Field',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/icon-180.png', sizes: '180x180' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0e14] text-white">
        <nav className="border-b border-gray-900 bg-black/50 backdrop-blur sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="font-mono text-xl font-bold text-[#00d4ff] tracking-wider flex items-center gap-2">
              <img src="/icon-32.png" alt="" className="w-6 h-6" />
              MEMORYFIELD.XYZ
            </a>
            <div className="flex gap-6 text-sm font-mono">
              <a href="/" className="text-gray-400 hover:text-white transition">FIELD</a>
              <a href="/tactical" className="text-gray-400 hover:text-white transition">TACTICAL</a>
              <a href="/sociological" className="text-gray-400 hover:text-white transition">SOCIO</a>
              <a href="/matrix" className="text-gray-400 hover:text-white transition">MATRIX</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
