import { NextResponse } from 'next/server'
import prisma from '../../../../../lib/db'
import { guildApprove } from '../../../../../lib/notifications'

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const { membershipId } = await req.json()
  try {
    const membership = await guildApprove(prisma, membershipId)
    if (membership.guild.slug !== params.slug) {
      return NextResponse.json({ error: 'not found' }, { status: 404 })
    }
    return NextResponse.json(membership)
  } catch {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }
}
