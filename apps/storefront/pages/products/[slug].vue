<template>
  <div class="min-h-screen">
    <!-- Header -->
    <AppHeader />

    <div class="max-w-6xl mx-auto px-4 py-8">
      <div v-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Product Image -->
        <div class="glassmorphism p-8 rounded-3xl">
          <img
            :src="productImageUrl"
            :alt="localizedName"
            class="w-full h-96 object-cover rounded-2xl crystal-glow"
          >
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
          <div>
            <h1 class="text-4xl font-light text-purple-800 mb-4">{{ localizedName }}</h1>
            <p class="text-2xl text-purple-600 font-medium">{{ formattedPrice }}</p>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in productTags"
              :key="tag"
              class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Description -->
          <div class="prose prose-purple">
            <p class="text-purple-700 leading-relaxed">{{ localizedDescription }}</p>
          </div>

          <!-- Stock -->
          <p class="text-sm text-purple-600">
            Stock: {{ product.stock }}
          </p>

          <!-- Add to Cart Button -->
          <button class="w-full py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Add to Cart
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-else-if="pending" class="text-center py-12">
        <div class="inline-block w-8 h-8 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
      </div>

      <!-- Not found -->
      <div v-else class="text-center py-12">
        <p class="text-purple-600 text-lg">Product not found</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../../../../packages/types/src/index'

const route = useRoute()
const { getLocalizedName, getLocalizedDescription, getProductTags, formatPrice, getProductImageUrl } = useProduct()

const productSlug = computed(() => String(route.params.slug))

const { data: product, pending } = await useFetch<Product>(
  () => `http://localhost:4000/products/${productSlug.value}`
)

const localizedName = computed(() => product.value ? getLocalizedName(product.value) : '')
const localizedDescription = computed(() => product.value ? getLocalizedDescription(product.value) : '')
const productTags = computed(() => product.value ? getProductTags(product.value) : [])
const formattedPrice = computed(() => product.value ? formatPrice(product.value.price) : '')
const productImageUrl = computed(() => product.value ? getProductImageUrl(product.value) : '')
</script>
