'use client'
import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'
import { t } from '../../../lib/i18n'

const suggestions = ['alice', 'bob', 'guild']

export default function FollowStep() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (name: string) => {
    setSelected(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name])
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ step: 4, follow: selected })
    })
    router.push('/onboarding/first-post')
  }

  return (
    <form onSubmit={submit} aria-label={t('onboarding_follow', 'off')}>
      <fieldset>
        <legend>{t('onboarding_follow_label', 'off')}</legend>
        {suggestions.map(name => (
          <div key={name}>
            <input
              type="checkbox"
              id={name}
              checked={selected.includes(name)}
              onChange={() => toggle(name)}
            />
            <label htmlFor={name}>{name}</label>
          </div>
        ))}
      </fieldset>
      <button type="submit">{t('onboarding_next', 'off')}</button>
    </form>
  )
}
