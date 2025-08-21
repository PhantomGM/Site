import { NextResponse } from 'next/server'
import prisma from '../../../../../lib/db'
import { reactPost } from '../../../../../lib/notifications'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { userId, type } = await req.json()
  const reaction = await reactPost(prisma, params.id, userId, type)
  return NextResponse.json(reaction)
}
