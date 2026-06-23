<template>
  <div class="min-h-screen">
    <!-- Header -->
    <AppHeader />

    <div class="max-w-7xl mx-auto px-6 py-16 md:py-20">
      <h1 class="text-4xl font-light text-center text-mist-purple-950 mb-12">
        {{ t('products.title') }}
      </h1>

      <!-- Search and Filters -->
      <div class="glassmorphism mb-10 rounded-[2rem] border border-white/60 p-5 sm:p-6">
        <div class="flex flex-col md:flex-row gap-4 mb-6">
          <input
            v-model="searchInput"
            type="text"
            :placeholder="t('products.search')"
            class="flex-1 rounded-full border border-white/60 bg-white/45 px-5 py-3 text-mist-purple-900 placeholder:text-mist-purple-400 focus:outline-none focus:ring-2 focus:ring-mist-purple-300"
          >
          <select
            v-model="selectedCategory"
            class="rounded-full border border-white/60 bg-white/45 px-5 py-3 text-mist-purple-800 focus:outline-none focus:ring-2 focus:ring-mist-purple-300"
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
        <div class="space-y-5">
          <div
            v-for="group in tagGroups"
            :key="group.key"
            class="grid gap-3 md:grid-cols-[8rem_1fr]"
          >
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-champagne-gold-700">
                {{ group.label }}
              </p>
              <p class="mt-1 text-xs text-mist-purple-500">
                {{ t('products.optionsCount', { count: group.tags.length }) }}
              </p>
            </div>

            <div class="flex flex-wrap gap-2">
              <button
                v-for="tag in group.tags"
                :key="`${group.key}-${tag.value}`"
                @click="toggleTag(tag.value)"
                :class="[
                  'rounded-full border px-3 py-1.5 text-sm transition-all duration-300',
                  selectedTags.includes(tag.value)
                    ? 'border-champagne-gold-300 bg-champagne-gold-200/70 text-mist-purple-950 shadow-[0_10px_28px_rgba(198,156,76,0.18)]'
                    : 'border-white/60 bg-white/40 text-mist-purple-700 hover:bg-white/65'
                ]"
              >
                {{ tag.label }}
              </button>
            </div>
          </div>

          <div
            v-if="selectedTags.length > 0 || debouncedSearchQuery || selectedCategory"
            class="flex flex-col gap-3 border-t border-white/60 pt-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in selectedTags"
                :key="`selected-${tag}`"
                class="rounded-full bg-mist-purple-100/70 px-3 py-1 text-xs text-mist-purple-800"
              >
                {{ getLocalizedTag(tag) }}
              </span>
            </div>

            <button
              class="self-start rounded-full border border-white/70 bg-white/45 px-4 py-2 text-sm text-mist-purple-700 transition hover:bg-white/70 sm:self-auto"
              @click="clearFilters"
            >
              {{ t('products.clearFilters') }}
            </button>
          </div>
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
        <p class="text-purple-600 text-lg">{{ t('products.emptyList') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, Product } from '../../../../packages/types/src/index'

const { t } = useI18n()
const {
  getLocalizedName: getLocalizedProductName,
  getLocalizedDescription,
  getLocalizedTag,
  getProductTagValues
} = useProduct()
const { getLocalizedName: getLocalizedCategoryName } = useCategory()

type TagOption = {
  value: string
  label: string
}

type TagGroup = {
  key: 'crystal' | 'color' | 'energy'
  label: string
  tags: TagOption[]
}

const searchInput = ref('')
const debouncedSearchQuery = ref('')
const selectedCategory = ref('')
const selectedTags = ref<string[]>([])
let searchDebounceTimer: ReturnType<typeof setTimeout> | undefined

const { data: products, pending } = await useFetch<Product[]>('http://localhost:4000/products', {
  default: () => []
})
const { data: categories } = await useFetch<Category[]>('http://localhost:4000/categories', {
  default: () => []
})

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const normalizedSearch = debouncedSearchQuery.value.toLowerCase()
    const matchesSearch = !normalizedSearch ||
      getLocalizedProductName(product).toLowerCase().includes(normalizedSearch) ||
      getLocalizedDescription(product).toLowerCase().includes(normalizedSearch)

    const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value

    const productTags = getProductTagValues(product)
    const matchesTags = selectedTags.value.length === 0 ||
      selectedTags.value.every(tag => productTags.includes(tag))

    return matchesSearch && matchesCategory && matchesTags
  })
})

const getUniqueTags = (getTags: (product: Product) => string[]) => {
  return [...new Set(products.value.flatMap(getTags))]
    .sort((a, b) => getLocalizedTag(a).localeCompare(getLocalizedTag(b)))
    .map((tag) => ({
      value: tag,
      label: getLocalizedTag(tag)
    }))
}

const tagGroups = computed<TagGroup[]>(() => [
  {
    key: 'crystal',
    label: t('products.filters.crystal'),
    tags: getUniqueTags((product) => product.crystalType)
  },
  {
    key: 'color',
    label: t('products.filters.color'),
    tags: getUniqueTags((product) => product.colorTags)
  },
  {
    key: 'energy',
    label: t('products.filters.energy'),
    tags: getUniqueTags((product) => product.energyTags)
  }
])

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

const clearFilters = () => {
  searchInput.value = ''
  debouncedSearchQuery.value = ''
  selectedCategory.value = ''
  selectedTags.value = []
}

watch(searchInput, (value) => {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer)
  }

  searchDebounceTimer = setTimeout(() => {
    debouncedSearchQuery.value = value.trim()
  }, 300)
})

onBeforeUnmount(() => {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer)
  }
})
</script>
