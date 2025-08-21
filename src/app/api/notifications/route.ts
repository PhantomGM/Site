import { NextResponse } from 'next/server'
import prisma from '../../../lib/db'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')
  const notifs = await prisma.notification.findMany({ where: { userId: userId! }, orderBy: { createdAt: 'desc' }, take: 20 })
  return NextResponse.json(notifs)
}
