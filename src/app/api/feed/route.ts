import { NextResponse } from 'next/server'
import prisma from '../../../lib/db'
import { canViewPost } from '../../../lib/acl'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('user')
  if (!userId) return NextResponse.json([])

  const guildIds = (await prisma.guildMembership.findMany({
    where: { userId, status: 'APPROVED' },
    select: { guildId: true }
  })).map(g => g.guildId)

  const friendIds = (await prisma.relationship.findMany({
    where: { followerId: userId, type: 'FRIEND', status: 'ACCEPTED' },
    select: { followeeId: true }
  })).map(r => r.followeeId)

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
    include: { guild: true }
  })

  const visible = posts.filter(p => canViewPost({ viewerId: userId, post: p, viewerGuildIds: guildIds, friendIds }))
  return NextResponse.json(visible)
}
