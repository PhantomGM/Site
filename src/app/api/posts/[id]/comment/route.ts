import { NextResponse } from 'next/server'
import prisma from '../../../../../lib/db'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { authorId, body } = await req.json()
  const comment = await prisma.comment.create({ data: { postId: params.id, authorId, body } })
  return NextResponse.json(comment)
}
