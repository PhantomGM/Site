import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'

export async function POST(req: Request) {
  const { followerId, followeeId } = await req.json()
  const rel = await prisma.relationship.create({ data: { followerId, followeeId, type: 'FOLLOW', status: 'ACCEPTED' } })
  return NextResponse.json(rel)
}
