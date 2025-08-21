import { redirect } from 'next/navigation'
import prisma from '../../lib/db'
import { getSession } from '../../lib/auth'

const steps = ['handle', 'interests', 'safety', 'follow', 'first-post']

export default async function OnboardingIndex() {
  const session = await getSession()
  if (!session?.user?.id) redirect('/')
  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) redirect('/')
  if (user.onboardingStep >= steps.length) redirect('/feed')
  redirect(`/onboarding/${steps[user.onboardingStep]}`)
}
