export type Locale = 'zh-TW' | 'en'

export type ProductStatus = 'active' | 'inactive'

export type Product = {
  id: string
  slug: string
  name: Record<Locale, string>
  description: Record<Locale, string>
  category: string
  price: number
  stock: number
  status: ProductStatus
  isFeatured: boolean
  crystalType: string[]
  colorTags: string[]
  energyTags: string[]
  imageUrl: string
}

export type Category = {
  id: string
  name: Record<Locale, string>
}

export type Tag = {
  id: string
  name: Record<Locale, string>
  type: 'energy' | 'color'
}