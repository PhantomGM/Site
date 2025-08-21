import { NextResponse } from 'next/server'
import prisma from '../../../../../lib/db'
import { guildJoin } from '../../../../../lib/notifications'

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const { userId } = await req.json()
  try {
    const membership = await guildJoin(prisma, params.slug, userId)
    return NextResponse.json(membership)
  } catch {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }
}
