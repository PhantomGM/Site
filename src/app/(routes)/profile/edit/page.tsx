'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

interface FormData {
  displayName: string
  bio: string
  avatarUrl: string
}

export default function EditProfilePage() {
  const { register, handleSubmit } = useForm<FormData>()
  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    await fetch('/api/profiles/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    router.push('/profile')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('displayName')} placeholder="Display Name" />
      <textarea {...register('bio')} placeholder="Bio" />
      <input {...register('avatarUrl')} placeholder="Avatar URL" />
      <button type="submit">Save</button>
    </form>
  )
}
