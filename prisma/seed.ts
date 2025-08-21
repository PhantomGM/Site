import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.create({
    data: {
      handle: 'alice',
      displayName: 'Alice',
      flavorTier: 'OFF'
    }
  })
  const bob = await prisma.user.create({
    data: {
      handle: 'bob',
      displayName: 'Bob',
      flavorTier: 'SUBTLE'
    }
  })
  await prisma.relationship.create({
    data: { followerId: alice.id, followeeId: bob.id, type: 'FOLLOW', status: 'ACCEPTED' }
  })
  await prisma.post.create({
    data: { authorId: bob.id, body: 'Hello from Bob', visibility: 'PUBLIC' }
  })
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
