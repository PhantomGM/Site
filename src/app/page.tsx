import Link from 'next/link'
import { t } from '../lib/i18n'

export default function Home() {
  return (
    <main>
      <h1>{t('feed_title', 'off')}</h1>
      <Link href="/feed">Go to feed</Link>
    </main>
  )
}
