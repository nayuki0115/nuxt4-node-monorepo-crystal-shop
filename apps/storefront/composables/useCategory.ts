import { getLocalizedValue } from '@crystal/i18n'
import type { Category } from '@crystal/types'

export const useCategory = () => {
  const { locale } = useI18n()

  const getLocalizedName = (category: Category) => {
    return getLocalizedValue(category.name, locale.value) ?? ''
  }

  return {
    getLocalizedName
  }
}
