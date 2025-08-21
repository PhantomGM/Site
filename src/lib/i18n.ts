import strings from '../i18n/strings.json'

type Flavor = 'off' | 'subtle' | 'bold'

export function t(key: keyof typeof strings, flavor: Flavor = 'off'): string {
  const entry = strings[key] as any
  if (!entry) return key
  return entry[flavor] || entry['off']
}
