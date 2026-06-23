# Crystal Shop API

![node](https://img.shields.io/badge/node-v22.13.1-green.svg) ![pnpm](https://img.shields.io/badge/pnpm-v10.33.0-blue.svg) ![typescript](https://img.shields.io/badge/typescript-v6.0.3-3178c6.svg) ![hono](https://img.shields.io/badge/hono-v4.12.17-e36002.svg)

Crystal Shop API 是水晶商店的本地 REST API。它使用 Hono 與 Node.js 執行，從 Excel mock data 讀取商品、分類與標籤資料，提供給 storefront 使用。

## 使用技術

- Node.js 22.13.1
- pnpm 10.33.0
- TypeScript 6.0.3
- Hono 4.12.17
- @hono/node-server 2.0.1
- tsx
- xlsx

## 功能說明

- `GET /health`：健康檢查。
- `GET /products`：取得狀態為 active 的商品列表。
- `GET /products/:slug`：使用商品 slug 取得單一 active 商品。
- `GET /categories`：取得分類列表。
- `GET /tags`：取得標籤列表。
- `GET /featured-products`：取得 active 且標記為精選的商品。
- 從 `data/crystal-shop-mock-db.xlsx` 讀取 `products`、`categories` 與 `tags` 工作表。

## 畫面相關說明

API 本身不提供畫面，但它會直接影響 storefront 的畫面狀態：

- 首頁精選商品區使用 `/featured-products`。
- 首頁分類入口與分類頁使用 `/categories`。
- 商品列表使用 `/products`。
- 商品詳情頁使用 `/products/:slug`。
- 若 API 未啟動，storefront 的商品與分類資料區塊會進入錯誤或空狀態。

## 技術需求

- Node.js 22.13.1
- pnpm 10.x
- `data/crystal-shop-mock-db.xlsx` 必須存在，且包含 `products`、`categories`、`tags` 工作表。
- API 預設執行在 `http://localhost:4000`。
- CORS 目前允許 `http://localhost:3000` 與 `http://localhost:3001`。

## 安裝和運行說明

從 monorepo 根目錄安裝依賴：

```bash
pnpm install
```

從根目錄啟動 API：

```bash
pnpm --filter api dev
```

或在 app 目錄內啟動：

```bash
cd apps/api
pnpm dev
```

建置：

```bash
pnpm --filter api build
```

型別檢查：

```bash
pnpm --filter api typecheck
```

## 專案結構

```text
apps/api
├── src
│   ├── excel.ts
│   ├── index.ts
│   └── types.ts
├── package.json
├── README.md
└── tsconfig.json
```

- `src/index.ts`：API 入口、CORS 設定、route 定義與 server 啟動。
- `src/excel.ts`：Excel 讀取、工作表解析與資料格式轉換。
- `src/types.ts`：API 內部使用的 Product、Category、Tag 型別。

## 預計未來完成的項目

- 將 API port、CORS origin 與資料檔路徑改為環境變數。
- 補上 request / response schema 驗證。
- 補上統一錯誤格式與 404 處理。
- 補上快取策略，避免每次 request 都重新讀取 Excel。
- 補上 OpenAPI / Swagger 文件。
- 將 Excel mock data 替換或串接到正式資料庫 / CMS。
