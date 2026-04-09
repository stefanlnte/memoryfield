import { NextResponse } from 'next/server'
export async function GET() {
  return NextResponse.json({ service: 'intelx', status: 'ready', endpoint: 'https://memoryfield.xyz/api/intelx' })
}
