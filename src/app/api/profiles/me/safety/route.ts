import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')
  const safety = await prisma.userSafetyPreferences.findUnique({ where: { userId: userId! } })
  return NextResponse.json(safety)
}

export async function PATCH(req: Request) {
  const data = await req.json()
  const safety = await prisma.userSafetyPreferences.upsert({
    where: { userId: data.userId },
    update: data,
    create: { userId: data.userId, ...data }
  })
  return NextResponse.json(safety)
}
