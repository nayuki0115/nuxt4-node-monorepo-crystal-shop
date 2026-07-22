import { getLocalizedValue } from '@crystal/i18n'
import type { Product } from '@crystal/types'

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

const normalizeTagKey = (tag: string) => {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export const useProduct = () => {
  const { locale, t, te } = useI18n()

  const getLocalizedName = (product: Product) => {
    return getLocalizedValue(product.name, locale.value) ?? ''
  }

  const getLocalizedDescription = (product: Product) => {
    return product.description ? getLocalizedValue(product.description, locale.value) ?? '' : ''
  }

  const getProductTagValues = (product: Product) => {
    return [
      ...product.crystalType,
      ...product.colorTags,
      ...product.energyTags
    ].filter(Boolean)
  }

  const getLocalizedTag = (tag: string) => {
    const key = `productTags.${normalizeTagKey(tag)}`

    return te(key) ? t(key) : tag
  }

  const getProductTags = (product: Product) => {
    return getProductTagValues(product).map(getLocalizedTag)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale.value, {
      style: 'currency',
      currency: 'TWD',
      maximumFractionDigits: 0
    }).format(price)
  }

  const getProductImageUrl = (product: Product) => {
    return productImageBySlug[product.slug] ?? product.imageUrl
  }

  return {
    getLocalizedName,
    getLocalizedDescription,
    getLocalizedTag,
    getProductTagValues,
    getProductTags,
    formatPrice,
    getProductImageUrl
  }
}
