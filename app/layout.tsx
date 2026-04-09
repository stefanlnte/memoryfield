import './globals.css'

export const metadata = {
  title: 'memoryfield.xyz',
  description: 'Asymmetric Memory Field - Persistent Conflict Matrix',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
