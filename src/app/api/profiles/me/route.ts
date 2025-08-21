import { NextResponse } from 'next/server'
import prisma from '../../../lib/db'

export async function PATCH(req: Request) {
  const data = await req.json()
  const user = await prisma.user.update({ where: { id: data.id }, data })
  return NextResponse.json(user)
}
