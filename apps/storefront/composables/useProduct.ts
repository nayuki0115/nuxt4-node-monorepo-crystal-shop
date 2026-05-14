import type { Product } from '../../../packages/types/src/index'

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

  return {
    getLocalizedName,
    getLocalizedDescription,
    getProductTags
  }
}