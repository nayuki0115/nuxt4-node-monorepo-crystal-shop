export type Locale = 'zh-TW' | 'en'

export type Product = {
  id: string
  slug: string
  name: Record<Locale, string>
  price: number
}