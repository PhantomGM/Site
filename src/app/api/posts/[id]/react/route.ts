import { NextResponse } from 'next/server'
import prisma from '../../../../../lib/db'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { userId, type } = await req.json()
  const reaction = await prisma.reaction.create({ data: { postId: params.id, userId, type } })
  return NextResponse.json(reaction)
}
