import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'
import { follow } from '../../../../lib/notifications'

export async function POST(req: Request) {
  const { followerId, followeeId } = await req.json()
  const rel = await follow(prisma, followerId, followeeId)
  return NextResponse.json(rel)
}
