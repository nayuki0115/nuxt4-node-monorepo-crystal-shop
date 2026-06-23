# Crystal Shop Monorepo

![node](https://img.shields.io/badge/node-v22.13.1-green.svg) ![pnpm](https://img.shields.io/badge/pnpm-v10.33.0-blue.svg) ![nuxt](https://img.shields.io/badge/nuxt-v4.4.4-00DC82.svg) ![vue](https://img.shields.io/badge/vue-v3.5.33-42b883.svg) ![typescript](https://img.shields.io/badge/typescript-v6.0.3-3178c6.svg)

Crystal Shop 是一個水晶商品展示與資料 API 的 pnpm workspace monorepo。前台使用 Nuxt 4 建立多語系商品瀏覽體驗，後端 API 從 Excel mock data 讀取商品、分類與標籤資料。

## 使用技術

- Node.js 22.13.1
- pnpm 10.33.0
- TypeScript 6.0.3
- Nuxt 4.4.4
- Vue 3.5.33
- Hono 4.12.17
- Tailwind CSS / @nuxtjs/tailwindcss
- @nuxtjs/i18n
- xlsx

## 功能說明

- `apps/storefront`：Nuxt 4 前台，提供首頁、商品列表、商品詳情、分類頁與關於頁。
- `apps/api`：Hono REST API，讀取 `data/crystal-shop-mock-db.xlsx` 並輸出 JSON。
- `packages/i18n`：共用語系設定與 locale helper。
- `packages/types`：共用 TypeScript 型別。
- `packages/theme`：預留共用主題設定。
- 支援 `zh-TW` 與 `en` 多語系。
- 商品詳情使用 slug 路由，例如 `/products/rose-quartz-bracelet`。
- 前台商品圖優先使用 `apps/storefront/assets/images/products` 的本地圖片，缺圖時回退到資料來源中的 `imageUrl`。

## 畫面相關說明

- 首頁首屏是品牌入口，包含主標題、簡短品牌文案與前往商品列表的 CTA。
- 首頁會顯示精選商品、分類入口與品牌故事區塊。
- 商品列表提供搜尋、分類篩選與水晶種類、顏色、能量標籤篩選。
- 商品卡片顯示商品圖、名稱、價格與標籤。
- 商品詳情頁顯示單一商品的圖片、價格、描述、庫存與標籤資訊。
- 導覽列提供多語切換，並保留目前語系的路由。

## 技術需求

- Node.js 22.13.1
- pnpm 10.x
- 安裝依賴前請確認使用 pnpm，而不是 npm 或 yarn。
- 開發前台時需要 API 服務在 `http://localhost:4000` 執行，否則資料區塊會進入錯誤或空狀態。

## 安裝和運行說明

安裝依賴：

```bash
pnpm install
```

同時啟動前台與 API：

```bash
pnpm dev
```

分開啟動：

```bash
pnpm --filter api dev
pnpm --filter storefront dev
```

建置：

```bash
pnpm build:api
pnpm build:storefront
```

型別檢查：

```bash
pnpm typecheck
```

## 專案結構

```text
.
├── apps
│   ├── api
│   └── storefront
├── data
│   ├── crystal-shop-mock-db.xlsx
│   └── product.xlsx
├── packages
│   ├── i18n
│   ├── theme
│   └── types
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

### apps/api

- `src/index.ts`：Hono API 入口、CORS 與 routes。
- `src/excel.ts`：Excel workbook 讀取與資料轉換。
- `src/types.ts`：API 內部資料型別。

### apps/storefront

- `app/app.vue`：Nuxt app 根元件。
- `pages/`：首頁、商品、分類與關於頁。
- `components/`：共用 UI 元件。
- `composables/`：商品、分類與多語顯示 helper。
- `locales/`：`zh-TW` 與 `en` 文案。
- `assets/`：樣式與商品圖片。

## 預計未來完成的項目

- 補上真實資料來源或後台 CMS。
- 新增購物車、收藏清單與結帳流程。
- 補齊 API schema 驗證與錯誤格式。
- 補上 OpenAPI / Swagger 文件。
- 加入單元測試、端對端測試與 CI/CD。
- 強化 SEO metadata、商品結構化資料與社群分享圖。
