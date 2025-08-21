import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({ where: { id: params.id }, include: { guild: true } })
  return NextResponse.json(post)
}
