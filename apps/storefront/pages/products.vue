<template>
  <div class="min-h-screen">
    <!-- Header -->
    <AppHeader />

    <div class="max-w-7xl mx-auto px-6 py-16 md:py-20">
      <h1 class="text-4xl font-light text-center text-mist-purple-950 mb-12">
        {{ t('products.title') }}
      </h1>

      <!-- Search and Filters -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row gap-4 mb-6">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('products.search')"
            class="flex-1 px-4 py-3 rounded-full glassmorphism focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
          <select
            v-model="selectedCategory"
            class="px-4 py-3 rounded-full glassmorphism focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            <option value="">{{ t('products.all') }}</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ getLocalizedCategoryName(category) }}
            </option>
          </select>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in availableTags"
            :key="tag"
            @click="toggleTag(tag)"
            :class="[
              'px-4 py-2 rounded-full text-sm transition-all duration-300',
              selectedTags.includes(tag)
                ? 'bg-purple-400 text-white shadow-lg'
                : 'glassmorphism text-purple-600 hover:bg-purple-100'
            ]"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <!-- Loading -->
      <div v-if="pending" class="text-center py-12">
        <div class="inline-block w-8 h-8 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
      </div>

      <!-- No results -->
      <div v-else-if="filteredProducts.length === 0" class="text-center py-12">
        <p class="text-purple-600 text-lg">No products found</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, Product } from '../../../packages/types/src/index'

const { t } = useI18n()
const { getLocalizedName: getLocalizedProductName, getLocalizedDescription, getProductTags } = useProduct()
const { getLocalizedName: getLocalizedCategoryName } = useCategory()

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedTags = ref<string[]>([])

const { data: products, pending } = await useFetch<Product[]>('http://localhost:4000/products', {
  default: () => []
})
const { data: categories } = await useFetch<Category[]>('http://localhost:4000/categories', {
  default: () => []
})

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const normalizedSearch = searchQuery.value.toLowerCase()
    const matchesSearch = !normalizedSearch ||
      getLocalizedProductName(product).toLowerCase().includes(normalizedSearch) ||
      getLocalizedDescription(product).toLowerCase().includes(normalizedSearch)

    const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value

    const productTags = getProductTags(product)
    const matchesTags = selectedTags.value.length === 0 ||
      selectedTags.value.every(tag => productTags.includes(tag))

    return matchesSearch && matchesCategory && matchesTags
  })
})

const availableTags = computed(() => {
  return [...new Set(products.value.flatMap((product) => getProductTags(product)))]
})

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}
</script>
