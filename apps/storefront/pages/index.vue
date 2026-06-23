<template>
  <div class="min-h-screen">
    <!-- Header -->
    <AppHeader />

    <!-- Hero Section -->
    <section class="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-6 py-28">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.74),transparent_24%),radial-gradient(circle_at_24%_24%,rgba(214,183,255,0.52),transparent_30%),radial-gradient(circle_at_78%_20%,rgba(190,220,255,0.42),transparent_28%),radial-gradient(circle_at_52%_76%,rgba(255,192,212,0.38),transparent_34%)]"></div>
      <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/75 to-transparent"></div>
      <div class="relative z-10 mx-auto max-w-5xl text-center">
        <div class="mx-auto mb-10 h-px w-40 bg-gradient-to-r from-transparent via-champagne-gold-300/80 to-transparent"></div>
        <h1 class="text-5xl md:text-8xl font-light text-mist-purple-950 mb-8 leading-tight break-words tracking-wider drop-shadow-[0_10px_34px_rgba(214,183,255,0.38)]">
          {{ t('hero.title') }}
        </h1>
        <p class="mx-auto mb-12 max-w-3xl text-xl md:text-2xl text-mist-purple-700/85 font-light leading-relaxed">
          {{ t('hero.subtitle') }}
        </p>
        <NuxtLink
          :to="localePath('/products')"
          class="glassmorphism crystal-sheen crystal-glow inline-flex items-center justify-center rounded-full px-10 py-4 text-mist-purple-900 transition-all duration-300 hover:-translate-y-1 hover:bg-white/50 hover:text-mist-purple-950"
        >
          {{ t('hero.cta') }}
        </NuxtLink>
      </div>
      <!-- Floating crystals effect -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute left-[12%] top-[22%] h-36 w-36 rotate-45 rounded-[2rem] border border-white/55 bg-mist-purple-200/25 blur-[1px] animate-float"></div>
        <div class="absolute right-[16%] top-[18%] h-28 w-28 rotate-12 rounded-[1.6rem] border border-white/60 bg-moonlight-blue-200/30 blur-[1px] animate-float delay-500"></div>
        <div class="absolute bottom-[18%] left-[20%] h-24 w-24 -rotate-12 rounded-[1.4rem] border border-white/60 bg-petal-pink-200/25 blur-[1px] animate-float delay-1000"></div>
        <div class="absolute top-1/4 left-1/3 w-56 h-56 bg-mist-purple-200/35 rounded-full blur-3xl animate-glow"></div>
        <div class="absolute bottom-1/4 right-1/4 w-48 h-48 bg-petal-pink-200/35 rounded-full blur-3xl animate-glow delay-1000"></div>
        <div class="absolute top-1/2 right-1/3 w-64 h-64 bg-moonlight-blue-200/30 rounded-full blur-3xl animate-glow delay-500"></div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="px-6 py-28 md:py-36">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-light text-center text-mist-purple-950 mb-16">
          {{ t('products.title') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
        <div v-if="featuredProductsPending" class="text-center py-12">
          <div class="inline-block w-8 h-8 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
        <div v-else-if="featuredProductsError" class="text-center py-12">
          <p class="text-mist-purple-600">{{ t('products.loadError') }}</p>
        </div>
        <div v-else-if="featuredProducts.length === 0" class="text-center py-12">
          <p class="text-mist-purple-600">{{ t('products.emptyFeatured') }}</p>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="px-6 py-28 md:py-36 bg-white/30 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-light text-center text-mist-purple-950 mb-16">
          {{ t('categories.title') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <NuxtLink
            v-for="category in categoriesWithIcons"
            :key="category.id"
            :to="localePath(`/categories/${category.id}`)"
            class="glassmorphism crystal-sheen p-5 sm:p-6 md:p-8 rounded-[1.75rem] text-center hover:-translate-y-1 hover:bg-white/45 transition-all duration-300"
          >
            <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-gradient-to-br from-white/70 via-mist-purple-100/70 to-moonlight-blue-100/70 text-sm tracking-widest text-champagne-gold-700 shadow-[0_12px_34px_rgba(214,183,255,0.2)]">{{ category.icon }}</div>
            <h3 class="text-lg font-medium text-mist-purple-900">{{ getLocalizedName(category) }}</h3>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Brand Story -->
    <section class="px-6 py-28 md:py-36">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-light text-mist-purple-950 mb-8">
          {{ t('about.title') }}
        </h2>
        <p class="text-lg text-mist-purple-700/85 leading-loose">
          {{ t('about.story') }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Category, Product } from '../../../packages/types/src/index'

type CategoryWithIcon = Category & {
  icon: string
}

const { t } = useI18n()
const localePath = useLocalePath()
const { getLocalizedName } = useCategory()

const {
  data: featuredProducts,
  pending: featuredProductsPending,
  error: featuredProductsError
} = await useFetch<Product[]>('http://localhost:4000/featured-products', {
  key: 'home-featured-products',
  default: () => []
})

const { data: categories } = await useFetch<Category[]>('http://localhost:4000/categories', {
  key: 'home-categories',
  default: () => []
})

const categoriesWithIcons = computed<CategoryWithIcon[]>(() => {
  const icons = ['BR', 'CR', 'RG', 'NC', 'HM']

  return categories.value.map((category, index) => ({
    ...category,
    icon: icons[index % icons.length] ?? 'CR'
  }))
})
</script>
