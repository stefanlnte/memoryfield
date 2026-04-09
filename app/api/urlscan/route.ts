import { NextResponse } from 'next/server'
export async function GET() {
  return NextResponse.json({ service: 'urlscan', status: 'ready', endpoint: 'https://memoryfield.xyz/api/urlscan' })
}
