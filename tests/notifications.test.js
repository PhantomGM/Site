const test = require('node:test')
const assert = require('node:assert/strict')
const {
  follow,
  friendRequest,
  friendRespond,
  guildJoin,
  guildApprove,
  reactPost,
  commentPost
} = require('../src/lib/notifications.js')

test('follow generates notification for followee', async () => {
  let notif
  const prisma = {
    relationship: { create: async ({ data }) => ({ id: 'rel1', ...data }) },
    notification: { create: async ({ data }) => { notif = data; return { id: 'n1', ...data } } }
  }
  await follow(prisma, 'a', 'b')
  assert.equal(notif.userId, 'b')
  assert.equal(notif.actorId, 'a')
  assert.equal(notif.type, 'FOLLOW')
  assert.equal(notif.targetRef, 'rel1')
})

test('friend request notifies target', async () => {
  let notif
  const prisma = {
    relationship: { create: async ({ data }) => ({ id: 'rel2', ...data }) },
    notification: { create: async ({ data }) => { notif = data; return { id: 'n2', ...data } } }
  }
  await friendRequest(prisma, 'a', 'b')
  assert.equal(notif.userId, 'b')
  assert.equal(notif.actorId, 'a')
  assert.equal(notif.type, 'FRIEND_REQUEST')
  assert.equal(notif.targetRef, 'rel2')
})

test('accepting friend request notifies requester', async () => {
  let notif
  const prisma = {
    relationship: { updateMany: async () => ({ count: 1 }) },
    notification: { create: async ({ data }) => { notif = data; return { id: 'n3', ...data } } }
  }
  await friendRespond(prisma, 'a', 'b', true)
  assert.equal(notif.userId, 'a')
  assert.equal(notif.actorId, 'b')
  assert.equal(notif.type, 'FRIEND_ACCEPT')
  assert.equal(notif.targetRef, 'a:b')
})

test('guild join notifies owner', async () => {
  let notif
  const prisma = {
    guild: { findUnique: async () => ({ id: 'g1', ownerId: 'owner', privacy: 'PRIVATE' }) },
    guildMembership: { create: async ({ data }) => ({ id: 'm1', ...data }) },
    notification: { create: async ({ data }) => { notif = data; return { id: 'n4', ...data } } }
  }
  await guildJoin(prisma, 'slug', 'member')
  assert.equal(notif.userId, 'owner')
  assert.equal(notif.actorId, 'member')
  assert.equal(notif.type, 'GUILD_JOIN')
  assert.equal(notif.targetRef, 'm1')
})

test('guild approve notifies member', async () => {
  let notif
  const prisma = {
    guildMembership: { update: async () => ({ id: 'm1', userId: 'member', guild: { ownerId: 'owner' } }) },
    notification: { create: async ({ data }) => { notif = data; return { id: 'n5', ...data } } }
  }
  await guildApprove(prisma, 'm1')
  assert.equal(notif.userId, 'member')
  assert.equal(notif.actorId, 'owner')
  assert.equal(notif.type, 'GUILD_APPROVE')
  assert.equal(notif.targetRef, 'm1')
})

test('reacting to post notifies author', async () => {
  let notif
  const prisma = {
    post: { findUnique: async () => ({ id: 'p1', authorId: 'author' }) },
    reaction: { create: async ({ data }) => ({ id: 'r1', ...data }) },
    notification: { create: async ({ data }) => { notif = data; return { id: 'n6', ...data } } }
  }
  await reactPost(prisma, 'p1', 'fan', 'LIKE')
  assert.equal(notif.userId, 'author')
  assert.equal(notif.actorId, 'fan')
  assert.equal(notif.type, 'POST_REACTION')
  assert.equal(notif.targetRef, 'r1')
})

test('commenting on post notifies author', async () => {
  let notif
  const prisma = {
    post: { findUnique: async () => ({ id: 'p1', authorId: 'author' }) },
    comment: { create: async ({ data }) => ({ id: 'c1', ...data }) },
    notification: { create: async ({ data }) => { notif = data; return { id: 'n7', ...data } } }
  }
  await commentPost(prisma, 'p1', 'fan', 'hi')
  assert.equal(notif.userId, 'author')
  assert.equal(notif.actorId, 'fan')
  assert.equal(notif.type, 'POST_COMMENT')
  assert.equal(notif.targetRef, 'c1')
})
