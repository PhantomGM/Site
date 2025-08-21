import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const guild = await prisma.guild.findUnique({ where: { slug: params.slug }, include: { posts: { orderBy: { createdAt: 'desc' }, take: 20 } } })
  return NextResponse.json(guild)
}
