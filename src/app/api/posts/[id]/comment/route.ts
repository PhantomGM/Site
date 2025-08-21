import { NextResponse } from 'next/server'
import prisma from '../../../../../lib/db'
import { commentPost } from '../../../../../lib/notifications'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { authorId, body } = await req.json()
  const comment = await commentPost(prisma, params.id, authorId, body)
  return NextResponse.json(comment)
}
