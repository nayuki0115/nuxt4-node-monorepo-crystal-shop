<template>
  <header class="sticky top-0 z-50 glassmorphism backdrop-blur-md">
    <nav class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="text-2xl font-light text-purple-800">
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
              currentLocale === locale.code
                ? 'bg-purple-400 text-white shadow-lg'
                : 'text-purple-600 hover:bg-purple-100'
            ]"
          >
            {{ locale.shortName }}
          </button>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            :aria-expanded="isMobileMenuOpen"
            :aria-label="isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')"
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
import { LOCALE_OPTIONS, normalizeLocale, type AppLocale } from '../../../packages/i18n/src/index'

const { t, locale, setLocale } = useI18n()
const localePath = useLocalePath()

const isMobileMenuOpen = ref(false)
const currentLocale = computed(() => normalizeLocale(locale.value))

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const navItems = computed(() => [
  { path: localePath('/'), label: t('nav.home') },
  { path: localePath('/products'), label: t('nav.products') },
  { path: localePath('/categories'), label: t('nav.categories') },
  { path: localePath('/about'), label: t('nav.about') }
])

const availableLocales = LOCALE_OPTIONS

const switchLocale = (localeCode: AppLocale) => {
  setLocale(localeCode)
  closeMobileMenu()
}
</script>
