import { getLocalizedValue } from '../../../packages/i18n/src/index'
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
  const { locale } = useI18n()

  const getLocalizedName = (product: Product) => {
    return getLocalizedValue(product.name, locale.value) ?? ''
  }

  const getLocalizedDescription = (product: Product) => {
    return product.description ? getLocalizedValue(product.description, locale.value) ?? '' : ''
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
