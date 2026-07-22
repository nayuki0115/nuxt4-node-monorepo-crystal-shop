import { SUPPORTED_LOCALES, type Locale } from '@crystal/types'

export { SUPPORTED_LOCALES }

export type AppLocale = Locale

export type LocalizedValue<T = string> = Partial<Record<AppLocale, T>>

export const DEFAULT_LOCALE: AppLocale = 'zh-TW'

export const LOCALE_OPTIONS: Array<{
  code: AppLocale
  name: string
  iso: string
  shortName: string
}> = [
  { code: 'zh-TW', name: '繁體中文', iso: 'zh-TW', shortName: '繁中' },
  { code: 'en', name: 'English', iso: 'en-US', shortName: 'EN' }
]

export const isAppLocale = (locale: string): locale is AppLocale => {
  return SUPPORTED_LOCALES.includes(locale as AppLocale)
}

export const normalizeLocale = (locale: string): AppLocale => {
  return isAppLocale(locale) ? locale : DEFAULT_LOCALE
}

export const getLocalizedValue = <T>(
  value: LocalizedValue<T>,
  locale: string,
  fallbackLocale: AppLocale = DEFAULT_LOCALE
) => {
  const normalizedLocale = normalizeLocale(locale)

  return value[normalizedLocale] ?? value[fallbackLocale]
}
