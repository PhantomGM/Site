import { NextResponse } from 'next/server'
import prisma from '../../../../../lib/db'
import { canManageGuild } from '../../../../../lib/acl'
import { guildApprove } from '../../../../../lib/notifications'

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  try {
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

    // no-op if already approved (cheap early return keeps idempotency)
    if (membership.status === 'APPROVED') {
      return NextResponse.json(membership)
    }

    // use the notifications-aware pathway from the feature branch
    const updated = await guildApprove(prisma, membershipId)

    return NextResponse.json(updated)
  } catch (err) {
    console.error('guild approve failed:', err)
    return NextResponse.json({ error: 'internal_error' }, { status: 500 })
  }
}
