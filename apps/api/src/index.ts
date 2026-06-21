import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import {
  readProductsFromExcel,
  readCategoriesFromExcel,
  readTagsFromExcel
} from './excel'

const app = new Hono()

app.use(
  '*',
  cors({
    origin: ['http://localhost:3000']
  })
)

app.get('/health', (c) => {
  return c.json({
    status: 'ok'
  })
})

app.get('/products', (c) => {
  const products = readProductsFromExcel()

  return c.json(
    products.filter(
      (product) => product.status === 'active'
    )
  )
})

app.get('/products/:slug', (c) => {
  const slug = c.req.param('slug')

  const products = readProductsFromExcel()

  const product = products.find(
    (item) =>
      item.slug === slug &&
      item.status === 'active'
  )

  if (!product) {
    return c.json(
      {
        message: 'Product not found'
      },
      404
    )
  }

  return c.json(product)
})

app.get('/categories', (c) => {
  return c.json(readCategoriesFromExcel())
})

app.get('/tags', (c) => {
  return c.json(readTagsFromExcel())
})

app.get('/featured-products', (c) => {
  const products = readProductsFromExcel()

  return c.json(
    products.filter(
      (product) =>
        product.status === 'active' &&
        product.isFeatured
    )
  )
})

serve(
  {
    fetch: app.fetch,
    port: 4000
  },
  (info) => {
    console.log(
      `API running on http://localhost:${info.port}`
    )
  }
)
