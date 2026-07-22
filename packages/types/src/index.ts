export const SUPPORTED_LOCALES = ['zh-TW', 'en'] as const

export type Locale = typeof SUPPORTED_LOCALES[number]

export type LocalizedText = Record<Locale, string>

export type ProductStatus = 'active' | 'inactive'

export type TagType = 'energy' | 'color'

export type Product = {
  id: string
  slug: string
  name: LocalizedText
  price: number
  imageUrl: string
  description: LocalizedText
  category: string
  status: ProductStatus
  isFeatured: boolean
  crystalType: string[]
  colorTags: string[]
  energyTags: string[]
  stock: number
}

export type Category = {
  id: string
  name: LocalizedText
}

export type Tag = {
  id: string
  name: LocalizedText
  type: TagType
}

export type FeaturedProduct = Product
