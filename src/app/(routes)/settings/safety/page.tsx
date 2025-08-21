"use client"

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  lines: z.string().optional(),
  veils: z.string().optional(),
  askFirst: z.string().optional()
})

type FormValues = z.infer<typeof FormSchema>

export default function SafetySettingsPage() {
  const { register, handleSubmit, reset } = useForm<FormValues>()

  useEffect(() => {
    fetch('/api/profiles/me/safety')
      .then((res) => res.json())
      .then((data) => {
        reset({
          lines: Array.isArray(data?.lines) ? data.lines.join('\n') : '',
          veils: Array.isArray(data?.veils) ? data.veils.join('\n') : '',
          askFirst: Array.isArray(data?.askFirst) ? data.askFirst.join('\n') : ''
        })
      })
  }, [reset])

  const onSubmit = (values: FormValues) => {
    const parsed = FormSchema.parse(values)
    const payload = {
      lines: parsed.lines?.split('\n').map((l) => l.trim()).filter(Boolean) ?? [],
      veils: parsed.veils?.split('\n').map((v) => v.trim()).filter(Boolean) ?? [],
      askFirst: parsed.askFirst?.split('\n').map((a) => a.trim()).filter(Boolean) ?? []
    }

    fetch('/api/profiles/me/safety', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1>Safety Preferences</h1>
      <div>
        <label className="block font-semibold">Lines</label>
        <textarea className="w-full border p-2" rows={4} {...register('lines')} />
      </div>
      <div>
        <label className="block font-semibold">Veils</label>
        <textarea className="w-full border p-2" rows={4} {...register('veils')} />
      </div>
      <div>
        <label className="block font-semibold">Ask First</label>
        <textarea className="w-full border p-2" rows={4} {...register('askFirst')} />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white">Save</button>
    </form>
  )
}

