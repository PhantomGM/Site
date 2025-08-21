import { NextResponse } from 'next/server'
import prisma from '../../../lib/db'

export async function POST(req: Request) {
  const data = await req.json()
  const post = await prisma.post.create({ data })
  return NextResponse.json(post)
}
