import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // Placeholder login that always succeeds
  return NextResponse.json({ ok: true })
}
