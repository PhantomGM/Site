import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (!(global as any).prisma) {
  prisma = new PrismaClient()
  ;(global as any).prisma = prisma
} else {
  prisma = (global as any).prisma
}

export default prisma
