import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'

export async function POST(req: Request) {
  const { requesterId, targetId } = await req.json()
  const rel = await prisma.relationship.create({ data: { followerId: requesterId, followeeId: targetId, type: 'REQUEST', status: 'PENDING' } })
  return NextResponse.json(rel)
}
