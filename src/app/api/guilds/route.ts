import { NextResponse } from 'next/server'
import prisma from '../../../lib/db'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get('q') || ''
  const guilds = await prisma.guild.findMany({ where: { name: { contains: q } } })
  return NextResponse.json(guilds)
}

export async function POST(req: Request) {
  const data = await req.json()
  const guild = await prisma.guild.create({ data })
  return NextResponse.json(guild)
}
