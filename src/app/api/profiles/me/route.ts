import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'
import { getSession } from '../../../../lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json(null, { status: 401 })
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { posts: true }
  })
  return NextResponse.json(user)
}

export async function PATCH(req: Request) {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const data = await req.json()
  const user = await prisma.user.update({
    where: { id: session.user.id },
    data
  })
  return NextResponse.json(user)
}
