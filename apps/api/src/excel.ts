import path from 'node:path'
import { fileURLToPath } from 'node:url'
import xlsx from 'xlsx'

import type {
  Product,
  Category,
  Tag
} from './types'

type ProductRow = {
  id: string
  slug: string
  nameZh: string
  nameEn: string
  category: string
  price: number
  stock: number
  status: 'active' | 'inactive'
  isFeatured: boolean | string
  crystalType?: string
  colorTags?: string
  energyTags?: string
  imageUrl: string
  descriptionZh: string
  descriptionEn: string
}

type CategoryRow = {
  id: string
  nameZh: string
  nameEn: string
}

type TagRow = {
  id: string
  nameZh: string
  nameEn: string
  type: 'energy' | 'color'
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const filePath = path.resolve(
  __dirname,
  '../../../data/crystal-shop-mock-db.xlsx'
)

const toArray = (value?: string): string[] => {
  if (!value) return []

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

const toBoolean = (
  value: boolean | string | undefined
): boolean => {
  if (typeof value === 'boolean') return value

  return value === 'true'
}

const getSheetRows = <T>(
  workbook: xlsx.WorkBook,
  sheetName: string
): T[] => {
  const worksheet = workbook.Sheets[sheetName]

  if (!worksheet) {
    return []
  }

  return xlsx.utils.sheet_to_json<T>(worksheet)
}

const readWorkbook = () => {
  return xlsx.readFile(filePath)
}

export const readProductsFromExcel = (): Product[] => {
  const workbook = readWorkbook()

  const rows = getSheetRows<ProductRow>(
    workbook,
    'products'
  )

  return rows.map((row) => ({
    id: String(row.id),
    slug: String(row.slug),

    name: {
      'zh-TW': String(row.nameZh),
      en: String(row.nameEn)
    },

    description: {
      'zh-TW': String(row.descriptionZh),
      en: String(row.descriptionEn)
    },

    category: String(row.category),

    price: Number(row.price),

    stock: Number(row.stock),

    status: row.status,

    isFeatured: toBoolean(row.isFeatured),

    crystalType: toArray(row.crystalType),

    colorTags: toArray(row.colorTags),

    energyTags: toArray(row.energyTags),

    imageUrl: String(row.imageUrl)
  }))
}

export const readCategoriesFromExcel =
  (): Category[] => {
    const workbook = readWorkbook()

    const rows = getSheetRows<CategoryRow>(
      workbook,
      'categories'
    )

    return rows.map((row) => ({
      id: String(row.id),

      name: {
        'zh-TW': String(row.nameZh),
        en: String(row.nameEn)
      }
    }))
  }

export const readTagsFromExcel = (): Tag[] => {
  const workbook = readWorkbook()

  const rows = getSheetRows<TagRow>(
    workbook,
    'tags'
  )

  return rows.map((row) => ({
    id: String(row.id),

    name: {
      'zh-TW': String(row.nameZh),
      en: String(row.nameEn)
    },

    type: row.type
  }))
}