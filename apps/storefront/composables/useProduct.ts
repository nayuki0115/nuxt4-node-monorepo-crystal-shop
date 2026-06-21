import type { Product } from '../../../packages/types/src/index'

const productImages = import.meta.glob<string>(
  '../assets/images/products/*.{jpg,jpeg,png,webp,avif}',
  {
    eager: true,
    import: 'default',
    query: '?url'
  }
)

const productImageBySlug = Object.fromEntries(
  Object.entries(productImages).map(([path, url]) => {
    const filename = path.split('/').pop() ?? ''
    const slug = filename.replace(/\.[^.]+$/, '')

    return [slug, url]
  })
)

export const useProduct = () => {
  const { $i18n } = useNuxtApp()

  const getLocalizedName = (product: Product) => {
    return product.name[$i18n.locale as 'zh-TW' | 'en'] || product.name['zh-TW']
  }

  const getLocalizedDescription = (product: Product) => {
    return product.description?.[$i18n.locale as 'zh-TW' | 'en'] || product.description?.['zh-TW'] || ''
  }

  const getProductTags = (product: Product) => {
    return [
      ...product.crystalType,
      ...product.colorTags,
      ...product.energyTags
    ].filter(Boolean)
  }

  const formatPrice = (price: number) => {
    return `$${new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0
    }).format(price)}`
  }

  const getProductImageUrl = (product: Product) => {
    return productImageBySlug[product.slug] ?? product.imageUrl
  }

  return {
    getLocalizedName,
    getLocalizedDescription,
    getProductTags,
    formatPrice,
    getProductImageUrl
  }
}
