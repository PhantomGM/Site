import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'

export async function GET(req: Request, { params }: { params: { handle: string } }) {
  const user = await prisma.user.findUnique({ where: { handle: params.handle } })
  return NextResponse.json(user)
}
