import Link from 'next/link'

import { t } from '../../../lib/i18n'

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <h1>{t('settings', 'off')}</h1>
      <p>
        <Link href="/settings/safety" className="text-blue-600 underline">
          Safety Preferences
        </Link>
      </p>
    </div>
  )
}
