'use client'
import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'
import { t } from '../../../lib/i18n'

export default function InterestsStep() {
  const router = useRouter()
  const [interests, setInterests] = useState('')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const list = interests.split(',').map(i => i.trim()).filter(Boolean)
    await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ step: 2, interests: list })
    })
    router.push('/onboarding/safety')
  }

  return (
    <form onSubmit={submit} aria-label={t('onboarding_interests', 'off')}>
      <div>
        <label htmlFor="interests">{t('onboarding_interests_label', 'off')}</label>
        <input id="interests" value={interests} onChange={e => setInterests(e.target.value)} />
      </div>
      <button type="submit">{t('onboarding_next', 'off')}</button>
    </form>
  )
}
