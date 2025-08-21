import { NextResponse } from 'next/server'
import prisma from '../../../../../lib/db'

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const { membershipId } = await req.json()
  const membership = await prisma.guildMembership.update({ where: { id: membershipId }, data: { status: 'BANNED' } })
  return NextResponse.json(membership)
}
