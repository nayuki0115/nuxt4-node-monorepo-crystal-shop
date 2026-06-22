import { getLocalizedValue } from '../../../packages/i18n/src/index'
import type { Category } from '../../../packages/types/src/index'

export const useCategory = () => {
  const { locale } = useI18n()

  const getLocalizedName = (category: Category) => {
    return getLocalizedValue(category.name, locale.value) ?? ''
  }

  return {
    getLocalizedName
  }
}
