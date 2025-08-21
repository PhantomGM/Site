import { t } from '../../../lib/i18n'

export default function SearchPage() {
  return (
    <div>
      <h1>{t('search', 'off') ?? 'Search'}</h1>
      <p>Search placeholder.</p>
    </div>
  )
}
