import { NextResponse } from 'next/server'
import prisma from '../../../lib/db'
import { getSession } from '../../../lib/auth'

export async function POST(req: Request) {
  const session = await getSession()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  const step = body.step as number
  const data: any = {}
  switch (step) {
    case 1:
      data.handle = body.handle
      data.avatarUrl = body.avatar
      break
    case 2:
      data.interests = body.interests
      break
    // additional steps could process more data here
    case 5:
      if (body.post) {
        await prisma.post.create({
          data: {
            authorId: session.user.id,
            body: body.post,
          }
        })
      }
      break
  }
  data.onboardingStep = step
  const user = await prisma.user.update({
    where: { id: session.user.id },
    data
  })
  return NextResponse.json({ step: user.onboardingStep })
}
