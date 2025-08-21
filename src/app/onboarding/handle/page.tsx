'use client'
import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'
import { t } from '../../../lib/i18n'

export default function HandleStep() {
  const router = useRouter()
  const [handle, setHandle] = useState('')
  const [avatar, setAvatar] = useState('')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ step: 1, handle, avatar })
    })
    router.push('/onboarding/interests')
  }

  return (
    <form onSubmit={submit} aria-label={t('onboarding_handle', 'off')}>
      <div>
        <label htmlFor="handle">{t('onboarding_handle_label', 'off')}</label>
        <input id="handle" value={handle} onChange={e => setHandle(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="avatar">{t('onboarding_avatar_label', 'off')}</label>
        <input id="avatar" value={avatar} onChange={e => setAvatar(e.target.value)} />
      </div>
      <button type="submit">{t('onboarding_next', 'off')}</button>
    </form>
  )
}
