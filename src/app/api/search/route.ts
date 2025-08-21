import { NextResponse } from 'next/server'
import prisma from '../../../lib/db'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get('q') || ''
  const type = url.searchParams.get('type') || 'people'
  if (type === 'people') {
    const users = await prisma.user.findMany({ where: { handle: { contains: q } } })
    return NextResponse.json(users)
  } else if (type === 'posts') {
    const posts = await prisma.post.findMany({ where: { body: { contains: q } } })
    return NextResponse.json(posts)
  } else {
    const guilds = await prisma.guild.findMany({ where: { name: { contains: q } } })
    return NextResponse.json(guilds)
  }
}
