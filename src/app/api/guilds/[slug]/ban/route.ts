import { NextResponse } from 'next/server'
import prisma from '../../../../../lib/db'
import { canManageGuild } from '../../../../../lib/acl'

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const { membershipId, userId } = await req.json()

  const membership = await prisma.guildMembership.findUnique({
    where: { id: membershipId },
    include: { guild: true }
  })
  if (!membership || membership.guild.slug !== params.slug) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  const actor = await prisma.guildMembership.findFirst({
    where: { guildId: membership.guildId, userId }
  })
  if (!actor || !canManageGuild(actor.role)) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  const updated = await prisma.guildMembership.update({
    where: { id: membershipId },
    data: { status: 'BANNED' }
  })
  return NextResponse.json(updated)
}
