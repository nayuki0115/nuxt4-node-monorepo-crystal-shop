<template>
  <header class="sticky top-0 z-50 glassmorphism backdrop-blur-md">
    <nav class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-light text-purple-800">
          Crystal Dream
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="text-purple-700 hover:text-purple-900 transition-colors duration-300 font-light"
          >
            {{ item.label }}
          </NuxtLink>
        </div>

        <!-- Language Switcher -->
        <div class="flex items-center space-x-4">
          <button
            v-for="locale in availableLocales"
            :key="locale.code"
            @click="switchLocale(locale.code)"
            :class="[
              'px-3 py-1 rounded-full text-sm transition-all duration-300',
              $i18n.locale === locale.code
                ? 'bg-purple-400 text-white shadow-lg'
                : 'text-purple-600 hover:bg-purple-100'
            ]"
          >
            {{ locale.name }}
          </button>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            :aria-expanded="isMobileMenuOpen"
            :aria-label="isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
            aria-controls="mobile-navigation"
            class="md:hidden p-2 rounded-lg hover:bg-purple-100 transition-colors duration-300"
          >
            <svg class="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        id="mobile-navigation"
        v-if="isMobileMenuOpen"
        class="md:hidden mt-4 pt-4 border-t border-purple-200"
      >
        <div class="flex flex-col space-y-4">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="closeMobileMenu"
            class="text-purple-700 hover:text-purple-900 transition-colors duration-300 font-light py-2"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import type { Locale } from '../../../packages/types/src/index'

const { t, setLocale } = useI18n()

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const navItems = computed(() => [
  { path: '/', label: t('nav.home') },
  { path: '/products', label: t('nav.products') },
  { path: '/categories', label: t('nav.categories') },
  { path: '/about', label: t('nav.about') }
])

const availableLocales: Array<{ code: Locale, name: string }> = [
  { code: 'zh-TW', name: '繁中' },
  { code: 'en', name: 'EN' }
]

const switchLocale = (locale: Locale) => {
  setLocale(locale)
  closeMobileMenu()
}
</script>
