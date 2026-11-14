# 叫牌教學網站
# Bidding tutorial and teaching webpage
This site aims to bridge players or learners in Taiwan, so the site is mainly written in Mandarin.

## 開發與建置

使用 Nuxt 4、Vue 3 與 Node.js 24（至少 24.15.0）。若已安裝 nvm：

```bash
nvm use
npm ci
npm run dev
```

執行 `npm run generate` 產生靜態網站，輸出目錄為 `.output/public`，GitHub Pages workflow 亦發布此目錄。DevTools 已停用。架構與驗證限制見 [專案背景](docs/PROJECT_CONTEXT.md)。

## 原始碼結構
這個網站現在使用Vue作為架構，而主要的文章放在vue-bidpage/src/components內部，想要寫新的文章，架構如下所示。在寫好以後，儲存成vue檔案。
```vue
<template>
    <article ref="Article">
        <!-- 撰寫網站 -->
    </article>
</template>
```
