'use client'
import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'
import { t } from '../../../lib/i18n'

export default function SafetyStep() {
  const router = useRouter()
  const [notes, setNotes] = useState('')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ step: 3, safety: notes })
    })
    router.push('/onboarding/follow')
  }

  return (
    <form onSubmit={submit} aria-label={t('onboarding_safety', 'off')}>
      <div>
        <label htmlFor="safety">{t('onboarding_safety_label', 'off')}</label>
        <textarea id="safety" value={notes} onChange={e => setNotes(e.target.value)} />
      </div>
      <button type="submit">{t('onboarding_next', 'off')}</button>
    </form>
  )
}
