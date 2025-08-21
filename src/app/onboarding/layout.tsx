import { ReactNode } from 'react'
import { t } from '../../lib/i18n'

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <h1>{t('onboarding_title', 'off')}</h1>
      {children}
    </main>
  )
}
