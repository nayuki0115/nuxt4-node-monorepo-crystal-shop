// https://nuxt.com/docs/api/configuration/nuxt-config
import { DEFAULT_LOCALE, LOCALE_OPTIONS } from '@crystal/i18n'

export default defineNuxtConfig({
  srcDir: '.',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  alias: {
    '@': '.'
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n'
  ],
  i18n: {
    locales: LOCALE_OPTIONS.map(({ code, name, iso }) => ({
      code,
      name,
      language: iso,
      file: `${code}.json`
    })),
    restructureDir: false,
    langDir: 'locales',
    defaultLocale: DEFAULT_LOCALE,
    strategy: 'prefix_except_default'
  },
  css: ['@/assets/css/main.css']
})
