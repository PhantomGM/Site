import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'
import { friendRequest } from '../../../../lib/notifications'

export async function POST(req: Request) {
  const { requesterId, targetId } = await req.json()
  const rel = await friendRequest(prisma, requesterId, targetId)
  return NextResponse.json(rel)
}
