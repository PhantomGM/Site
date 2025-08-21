'use client'
import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'
import { t } from '../../../lib/i18n'

export default function FirstPostStep() {
  const router = useRouter()
  const [post, setPost] = useState('')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ step: 5, post })
    })
    router.push('/feed')
  }

  return (
    <form onSubmit={submit} aria-label={t('onboarding_first_post', 'off')}>
      <div>
        <label htmlFor="post">{t('onboarding_post_label', 'off')}</label>
        <textarea id="post" value={post} onChange={e => setPost(e.target.value)} />
      </div>
      <button type="submit">{t('onboarding_finish', 'off')}</button>
    </form>
  )
}
