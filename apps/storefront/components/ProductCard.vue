<template>
  <NuxtLink
    :to="`/products/${product.slug}`"
    class="group glassmorphism crystal-sheen soft-shadow relative block rounded-[1.75rem] p-6 transition-all duration-500 hover:-translate-y-2 hover:bg-white/50 hover:shadow-[0_28px_90px_rgba(149,113,190,0.22),0_0_46px_rgba(190,220,255,0.28)]"
  >
    <!-- Product Image -->
    <div class="relative mb-6 overflow-hidden rounded-[1.25rem] border border-white/50 bg-gradient-to-br from-white/60 via-mist-purple-50/60 to-moonlight-blue-50/60 shadow-inner">
      <img
        :src="product.imageUrl"
        :alt="localizedName"
        class="w-full h-56 object-cover mix-blend-multiply saturate-[0.92] group-hover:scale-105 transition-transform duration-700"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-mist-purple-950/12 via-transparent to-white/35 opacity-80 transition-opacity duration-300 group-hover:opacity-100"></div>
      <div class="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-champagne-gold-200/35 blur-2xl"></div>
    </div>

    <!-- Product Info -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-mist-purple-950 group-hover:text-mist-purple-800 transition-colors duration-300">
        {{ localizedName }}
      </h3>

      <p class="text-xl font-semibold text-champagne-gold-700">
        ${{ product.price }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in productTags.slice(0, 2)"
          :key="tag"
          class="rounded-full border border-white/60 bg-white/45 px-3 py-1 text-xs text-mist-purple-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-md"
        >
          {{ tag }}
        </span>
        <span
          v-if="productTags.length > 2"
          class="rounded-full border border-white/60 bg-petal-pink-100/45 px-3 py-1 text-xs text-mist-purple-700 backdrop-blur-md"
        >
          +{{ productTags.length - 2 }}
        </span>
      </div>
    </div>

    <!-- Hover effect overlay -->
    <div class="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-t from-mist-purple-300/12 via-transparent to-white/24 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Product } from '../../../packages/types/src/index'

const props = defineProps<{
  product: Product
}>()

const { getLocalizedName, getProductTags } = useProduct()

const product = computed(() => props.product)
const localizedName = computed(() => getLocalizedName(props.product))
const productTags = computed(() => getProductTags(props.product))
</script>
