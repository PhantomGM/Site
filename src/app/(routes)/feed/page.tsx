"use client"

import { t } from '../../../lib/i18n'
import { useSearchParams } from 'next/navigation'
import PostList from '../../../components/post-list'

export default function FeedPage() {
  const params = useSearchParams()
  const userId = params.get('user') ?? ''

  return (
    <div>
      <h1>{t('feed_title', 'off')}</h1>
      {userId ? <PostList userId={userId} /> : <p>No user.</p>}
    </div>
  )
}
