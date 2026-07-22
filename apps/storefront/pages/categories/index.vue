<template>
  <div class="min-h-screen">
    <!-- Header -->
    <AppHeader />

    <div class="max-w-7xl mx-auto px-4 py-8">
      <h1 class="text-4xl font-light text-center text-purple-800 mb-12">
        {{ t('categories.title') }}
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink
          v-for="category in categoriesWithIcons"
          :key="category.id"
          :to="localePath(`/categories/${category.id}`)"
          class="glassmorphism p-8 rounded-2xl text-center hover:scale-105 transition-transform duration-300 group"
        >
          <div class="text-4xl mb-4 group-hover:animate-bounce">{{ category.icon }}</div>
          <h3 class="text-2xl font-medium text-purple-800 mb-2">{{ getLocalizedName(category) }}</h3>
          <p class="text-purple-600">{{ category.description }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@crystal/types'

type CategoryWithMeta = Category & {
  icon: string
  description: string
}

const { t } = useI18n()
const localePath = useLocalePath()
const { getLocalizedName } = useCategory()

const { data: categories } = await useFetch<Category[]>('http://localhost:4000/categories', {
  default: () => []
})

const categoriesWithIcons = computed<CategoryWithMeta[]>(() => {
  const icons = ['BR', 'CR', 'RG', 'NC', 'HM']

  return categories.value.map((category, index) => ({
    ...category,
    icon: icons[index % icons.length] ?? 'CR',
    description: t('categories.description', { category: getLocalizedName(category) })
  }))
})
</script>
