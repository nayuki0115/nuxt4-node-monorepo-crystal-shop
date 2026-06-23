# Crystal Shop Storefront

![node](https://img.shields.io/badge/node-v22.13.1-green.svg) ![pnpm](https://img.shields.io/badge/pnpm-v10.33.0-blue.svg) ![nuxt](https://img.shields.io/badge/nuxt-v4.4.4-00DC82.svg) ![vue](https://img.shields.io/badge/vue-v3.5.33-42b883.svg) ![typescript](https://img.shields.io/badge/typescript-v6.0.3-3178c6.svg)

Crystal Shop Storefront 是水晶商店的 Nuxt 4 前台。它負責商品瀏覽、多語顯示、分類導覽、商品詳情與品牌內容呈現。

## 使用技術

- Node.js 22.13.1
- pnpm 10.33.0
- Nuxt 4.4.4
- Vue 3.5.33
- TypeScript
- Tailwind CSS
- @nuxtjs/i18n
- vue-router

## 功能說明

- 首頁：品牌入口、前往商品列表 CTA、精選商品、分類入口與品牌故事。
- 商品列表：從 API 取得 active 商品，支援搜尋、分類篩選與標籤篩選。
- 商品詳情：使用 slug route 顯示單一商品。
- 分類頁：顯示分類列表與單一分類內容。
- 多語系：支援 `zh-TW` 與 `en`，文案放在 `locales/`。
- 圖片策略：優先使用 `assets/images/products` 中與 slug 相同檔名的本地圖片，找不到時使用 API 回傳的 `imageUrl`。
- Locale-safe navigation：連結透過 `useLocalePath()` 產生，避免切換頁面後語系遺失。

## 畫面相關說明

- 首頁首屏不是單純裝飾區，而是使用者進站後的主要品牌入口：包含主標題、品牌描述與前往商品列表的主要按鈕。
- 首頁商品區會呼叫 `/featured-products`，API 無法連線時會顯示錯誤文案，不會讓區塊靜默消失。
- 商品列表的篩選 UI 依資料模型分成水晶種類、顏色與能量三組，降低標籤混在一起的閱讀負擔。
- 商品詳情頁與商品卡片共用商品圖片解析邏輯，讓列表與詳情頁顯示一致。
- 導覽列提供語系切換與主要頁面入口。

## 技術需求

- Node.js 22.13.1
- pnpm 10.x
- 後端 API 需在 `http://localhost:4000` 執行。
- API CORS 目前允許 `http://localhost:3000` 與 `http://localhost:3001`。

## 安裝和運行說明

從 monorepo 根目錄安裝依賴：

```bash
pnpm install
```

從根目錄啟動 storefront：

```bash
pnpm --filter storefront dev
```

或在 app 目錄內啟動：

```bash
cd apps/storefront
pnpm dev
```

建置：

```bash
pnpm --filter storefront build
```

型別檢查：

```bash
pnpm --filter storefront typecheck
```

## 專案結構

```text
apps/storefront
├── app
│   └── app.vue
├── assets
│   ├── css
│   │   └── main.css
│   └── images
│       └── products
├── components
│   ├── AppHeader.vue
│   └── ProductCard.vue
├── composables
│   ├── useCategory.ts
│   └── useProduct.ts
├── locales
│   ├── en.json
│   └── zh-TW.json
├── pages
│   ├── about.vue
│   ├── index.vue
│   ├── categories
│   │   ├── [id].vue
│   │   └── index.vue
│   └── products
│       ├── [slug].vue
│       └── index.vue
├── public
│   ├── favicon.ico
│   └── robots.txt
├── nuxt.config.ts
├── package.json
└── tailwind.config.js
```

## 預計未來完成的項目

- 補齊更完整的商品詳情內容，例如適合情境、保養方式與搭配建議。
- 新增購物車、收藏清單與商品比較。
- 補上 SEO metadata、Open Graph 圖片與商品 structured data。
- 補上前台端對端測試，覆蓋語系切換、商品篩選與商品詳情路由。
- 將 API URL 改為環境變數設定，支援不同部署環境。
