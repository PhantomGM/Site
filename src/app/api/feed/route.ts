import { NextResponse } from 'next/server'
import prisma from '../../../lib/db'
import { canViewPost } from '../../../lib/acl'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('user')
  const page = parseInt(url.searchParams.get('page') ?? '1', 10)
  const take = parseInt(url.searchParams.get('take') ?? '20', 10)
  if (!userId) return NextResponse.json([])

  const guildIds = (
    await prisma.guildMembership.findMany({
      where: { userId, status: 'APPROVED' },
      select: { guildId: true }
    })
  ).map(g => g.guildId)

  const friendIds = (
    await prisma.relationship.findMany({
      where: { followerId: userId, type: 'FRIEND', status: 'ACCEPTED' },
      select: { followeeId: true }
    })
  ).map(r => r.followeeId)

  const followeeIds = (
    await prisma.relationship.findMany({
      where: { followerId: userId, type: 'FOLLOW', status: 'ACCEPTED' },
      select: { followeeId: true }
    })
  ).map(r => r.followeeId)

  const authorIds = [userId, ...friendIds, ...followeeIds]

  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { authorId: { in: authorIds } },
        { guildId: { in: guildIds } }
      ]
    },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * take,
    take,
    include: { guild: true }
  })

  const visible = posts.filter(p =>
    canViewPost({ viewerId: userId, post: p, viewerGuildIds: guildIds, friendIds })
  )
  return NextResponse.json(visible)
}
