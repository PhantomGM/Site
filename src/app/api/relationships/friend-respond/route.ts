import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'

export async function POST(req: Request) {
  const { requesterId, targetId, accept } = await req.json()
  const rel = await prisma.relationship.updateMany({
    where: { followerId: requesterId, followeeId: targetId, type: 'REQUEST' },
    data: { type: 'FRIEND', status: accept ? 'ACCEPTED' : 'REJECTED' }
  })
  return NextResponse.json(rel)
}
