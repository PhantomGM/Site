import { NextResponse } from 'next/server'
import { z } from 'zod'

import prisma from '../../../../lib/db'
import { getSession } from '../../../../lib/auth'

const SafetySchema = z.object({
  lines: z.array(z.string()).optional(),
  veils: z.array(z.string()).optional(),
  askFirst: z.array(z.string()).optional(),
  includeCustomInShare: z.boolean().optional(),
  shareAnonymizedWithGm: z.boolean().optional()
})

export async function GET() {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const safety = await prisma.userSafetyPreferences.findUnique({
    where: { userId: session.user.id }
  })
  return NextResponse.json(safety)
}

export async function PATCH(req: Request) {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const json = await req.json()
  const data = SafetySchema.parse(json)

  const safety = await prisma.userSafetyPreferences.upsert({
    where: { userId: session.user.id },
    update: data,
    create: { userId: session.user.id, ...data }
  })
  return NextResponse.json(safety)
}
