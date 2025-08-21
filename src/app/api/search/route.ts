import { NextResponse } from 'next/server'
import prisma from '../../../lib/db'
import { filterVisiblePosts, filterVisibleGuilds } from '../../../lib/search'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get('q') || ''
  const type = url.searchParams.get('type') || 'people'
  const viewerId = url.searchParams.get('user') || ''

  if (type === 'people') {
    const users = await prisma.user.findMany({ where: { handle: { contains: q } } })
    return NextResponse.json(users)
  } else if (type === 'posts') {
    const posts = await prisma.post.findMany({ where: { body: { contains: q } }, include: { guild: true } })

    let guildIds: string[] = []
    let friendIds: string[] = []
    if (viewerId) {
      guildIds = (await prisma.guildMembership.findMany({
        where: { userId: viewerId, status: 'APPROVED' },
        select: { guildId: true }
      })).map(g => g.guildId)

      friendIds = (await prisma.relationship.findMany({
        where: { followerId: viewerId, type: 'FRIEND', status: 'ACCEPTED' },
        select: { followeeId: true }
      })).map(r => r.followeeId)
    }

    const visible = filterVisiblePosts({ posts, viewerId, viewerGuildIds: guildIds, friendIds })
    return NextResponse.json(visible)
  } else {
    const guilds = await prisma.guild.findMany({ where: { name: { contains: q } } })

    let guildIds: string[] = []
    if (viewerId) {
      guildIds = (await prisma.guildMembership.findMany({
        where: { userId: viewerId, status: 'APPROVED' },
        select: { guildId: true }
      })).map(g => g.guildId)
    }

    const visible = filterVisibleGuilds(guilds, guildIds)
    return NextResponse.json(visible)
  }
}
