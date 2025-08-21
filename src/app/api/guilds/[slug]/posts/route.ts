import { NextResponse } from 'next/server'
import prisma from '../../../../../lib/db'

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const { authorId, body } = await req.json()
  const guild = await prisma.guild.findUnique({ where: { slug: params.slug } })
  if (!guild) return NextResponse.json({ error: 'not found' }, { status: 404 })
  const post = await prisma.post.create({ data: { authorId, body, scope: 'GUILD', guildId: guild.id } })
  return NextResponse.json(post)
}
