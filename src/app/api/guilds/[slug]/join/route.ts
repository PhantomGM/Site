import { NextResponse } from 'next/server'
import prisma from '../../../../../lib/db'

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const { userId } = await req.json()
  const guild = await prisma.guild.findUnique({ where: { slug: params.slug } })
  if (!guild) return NextResponse.json({ error: 'not found' }, { status: 404 })
  const membership = await prisma.guildMembership.create({ data: { guildId: guild.id, userId, status: guild.privacy === 'PUBLIC' ? 'APPROVED' : 'PENDING', role: guild.ownerId === userId ? 'OWNER' : 'MEMBER' } })
  return NextResponse.json(membership)
}
