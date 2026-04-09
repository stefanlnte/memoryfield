import { NextResponse } from 'next/server'
export async function GET() {
  return NextResponse.json({ service: 'greynoise', status: 'ready', endpoint: 'https://memoryfield.xyz/api/greynoise' })
}
