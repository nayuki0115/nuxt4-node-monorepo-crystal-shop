import type { Category } from '../../../packages/types/src/index'

export const useCategory = () => {
  const { $i18n } = useNuxtApp()

  const getLocalizedName = (category: Category) => {
    return category.name[$i18n.locale as 'zh-TW' | 'en'] || category.name['zh-TW']
  }

  return {
    getLocalizedName
  }
}