import { NextResponse } from 'next/server'
import prisma from '../../../../../lib/db'
import { guildApprove } from '../../../../../lib/notifications'

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const { membershipId } = await req.json()
  const membership = await guildApprove(prisma, membershipId)
  return NextResponse.json(membership)
}
