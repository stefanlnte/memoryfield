import './globals.css'

export const metadata = {
  title: 'memoryfield.xyz',
  description: 'ASM-LS v248 - Asymmetric Memory Field',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0e14] text-white">
        <nav className="border-b border-gray-900 bg-black/50 backdrop-blur sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="font-mono text-xl font-bold text-[#00d4ff] tracking-wider">
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
