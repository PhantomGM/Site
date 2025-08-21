import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'
import { friendRespond } from '../../../../lib/notifications'

export async function POST(req: Request) {
  const { requesterId, targetId, accept } = await req.json()
  const rel = await friendRespond(prisma, requesterId, targetId, accept)
  return NextResponse.json(rel)
}
