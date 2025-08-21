import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'

export async function PATCH(req: Request) {
  const { userId } = await req.json()
  const res = await prisma.notification.updateMany({ where: { userId, read: false }, data: { read: true } })
  return NextResponse.json(res)
}
