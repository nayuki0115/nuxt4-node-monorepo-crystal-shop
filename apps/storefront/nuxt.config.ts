// https://nuxt.com/docs/api/configuration/nuxt-config
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
    locales: [
      { code: 'zh-TW', name: '繁體中文', iso: 'zh-TW' },
      { code: 'en', name: 'English', iso: 'en-US' }
    ],
    defaultLocale: 'zh-TW',
    strategy: 'prefix_except_default'
  },
  css: ['@/assets/css/main.css']
})
