import { PrismaClient } from '@prisma/client'

export async function follow(prisma: PrismaClient, followerId: string, followeeId: string) {
  const rel = await prisma.relationship.create({ data: { followerId, followeeId, type: 'FOLLOW', status: 'ACCEPTED' } })
  await prisma.notification.create({ data: { userId: followeeId, actorId: followerId, type: 'FOLLOW', targetRef: rel.id } })
  return rel
}

export async function friendRequest(prisma: PrismaClient, requesterId: string, targetId: string) {
  const rel = await prisma.relationship.create({ data: { followerId: requesterId, followeeId: targetId, type: 'REQUEST', status: 'PENDING' } })
  await prisma.notification.create({ data: { userId: targetId, actorId: requesterId, type: 'FRIEND_REQUEST', targetRef: rel.id } })
  return rel
}

export async function friendRespond(prisma: PrismaClient, requesterId: string, targetId: string, accept: boolean) {
  const res = await prisma.relationship.updateMany({
    where: { followerId: requesterId, followeeId: targetId, type: 'REQUEST' },
    data: { type: 'FRIEND', status: accept ? 'ACCEPTED' : 'REJECTED' }
  })
  if (accept) {
    await prisma.notification.create({ data: { userId: requesterId, actorId: targetId, type: 'FRIEND_ACCEPT', targetRef: `${requesterId}:${targetId}` } })
  }
  return res
}

export async function guildJoin(prisma: PrismaClient, slug: string, userId: string) {
  const guild = await prisma.guild.findUnique({ where: { slug } })
  if (!guild) throw new Error('not found')
  const membership = await prisma.guildMembership.create({ data: { guildId: guild.id, userId, status: guild.privacy === 'PUBLIC' ? 'APPROVED' : 'PENDING', role: guild.ownerId === userId ? 'OWNER' : 'MEMBER' } })
  await prisma.notification.create({ data: { userId: guild.ownerId, actorId: userId, type: 'GUILD_JOIN', targetRef: membership.id } })
  return membership
}

export async function guildApprove(prisma: PrismaClient, membershipId: string) {
  const membership = await prisma.guildMembership.update({ where: { id: membershipId }, data: { status: 'APPROVED' }, include: { guild: true } })
  await prisma.notification.create({ data: { userId: membership.userId, actorId: membership.guild.ownerId, type: 'GUILD_APPROVE', targetRef: membership.id } })
  return membership
}

export async function reactPost(prisma: PrismaClient, postId: string, userId: string, type: string) {
  const post = await prisma.post.findUnique({ where: { id: postId } })
  const reaction = await prisma.reaction.create({ data: { postId, userId, type } })
  if (post && post.authorId !== userId) {
    await prisma.notification.create({ data: { userId: post.authorId, actorId: userId, type: 'POST_REACTION', targetRef: reaction.id } })
  }
  return reaction
}

export async function commentPost(prisma: PrismaClient, postId: string, authorId: string, body: string) {
  const post = await prisma.post.findUnique({ where: { id: postId } })
  const comment = await prisma.comment.create({ data: { postId, authorId, body } })
  if (post && post.authorId !== authorId) {
    await prisma.notification.create({ data: { userId: post.authorId, actorId: authorId, type: 'POST_COMMENT', targetRef: comment.id } })
  }
  return comment
}
