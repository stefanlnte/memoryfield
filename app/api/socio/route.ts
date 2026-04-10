import { NextResponse } from 'next/server'
export async function GET() { return NextResponse.json({ data: { armenia: {memory:0.99, hl:100} } }) }