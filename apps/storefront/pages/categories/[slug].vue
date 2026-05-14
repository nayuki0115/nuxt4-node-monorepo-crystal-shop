<template>
  <div class="min-h-screen">
    <!-- Header -->
    <AppHeader />

    <div class="max-w-7xl mx-auto px-4 py-8">
      <div v-if="category" class="mb-12 text-center">
        <h1 class="text-4xl font-light text-purple-800 mb-4">{{ getLocalizedName(category) }}</h1>
        <p class="text-lg text-purple-600">Explore our {{ getLocalizedName(category).toLowerCase() }} collection</p>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <ProductCard
          v-for="product in categoryProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <!-- Loading -->
      <div v-if="pending" class="text-center py-12">
        <div class="inline-block w-8 h-8 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
      </div>

      <!-- No products -->
      <div v-else-if="categoryProducts.length === 0" class="text-center py-12">
        <p class="text-purple-600 text-lg">No products in this category</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, Product } from '../../../../packages/types/src/index'

const route = useRoute()
const { getLocalizedName } = useCategory()

const categoryId = computed(() => String(route.params.slug))

const { data: categories } = await useFetch<Category[]>('http://localhost:4000/categories', {
  default: () => []
})

const { data: products, pending } = await useFetch<Product[]>('http://localhost:4000/products', {
  default: () => []
})

const category = computed(() => {
  return categories.value.find((item) => item.id === categoryId.value)
})

const categoryProducts = computed(() => {
  return products.value.filter((product) => product.category === categoryId.value)
})
</script>
