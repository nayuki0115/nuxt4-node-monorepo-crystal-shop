export type Locale = 'zh-TW' | 'en'

export type Product = {
  id: string
  slug: string
  name: Record<Locale, string>
  price: number
  imageUrl: string
  description?: Record<Locale, string>
  tags?: string[]
  category: string
  status: 'active' | 'inactive'
  isFeatured: boolean
  crystalType: string[]
  colorTags: string[]
  energyTags: string[]
  stock: number
}

export type Category = {
  id: string
  name: Record<Locale, string>
}

export type FeaturedProduct = Product