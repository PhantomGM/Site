import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'

export async function POST(req: Request) {
  const data = await req.json()
  const user = await prisma.user.create({
    data: {
      handle: data.handle,
      displayName: data.displayName || data.handle,
      flavorTier: 'OFF'
    }
  })
  return NextResponse.json(user)
}
