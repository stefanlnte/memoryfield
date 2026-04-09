import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    service: 'shodan',
    status: 'ready',
    endpoint: 'https://memoryfield.xyz/api/shodan',
    usage: 'Add SHODAN_API_KEY to env, query ?q=country:UA'
  })
}
