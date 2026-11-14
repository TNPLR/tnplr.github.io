# 專案背景與架構

本文件供貢獻者與 Codex 理解目前程式。內容來自 repository 原始碼；部署設定不代表線上行為已驗證。程式異動後應同步更新相關描述。

## 目的與技術基礎

網站提供臺灣橋牌玩家繁體中文叫牌教學、制度文章及互動練習。

- `package.json` 使用 Nuxt `^4.6.4`、Vue `^3.5.44`、Vue Router `^5.4.0`，開發依賴為 TypeScript 與 vue-tsc。
- `package-lock.json` 目前鎖定 Nuxt 4.6.4、Vue 3.5.45、Vue Router 5.5.1、TypeScript 5.9.3、vue-tsc 3.3.14；宣告範圍與鎖定版本需分開理解。
- `nuxt.config.ts` 設定 `srcDir: '.'` 保留根目錄的 Nuxt 3 目錄結構、`ssr: false`、停用 DevTools、載入全域 CSS，並明列 `/cmbc`、`/relay` 為 prerender routes。文章的花色轉換與目錄生成在瀏覽器掛載後執行。
- 沒有實作後端 API、帳號系統或資料庫；`server/` 只有 TypeScript 設定。

## 目錄與責任

| 位置 | 責任 |
| --- | --- |
| `app.vue` | 以 `NuxtLayout` 包住 `NuxtPage`，讀取共用標題，加入 Google Analytics。 |
| `pages/` | 檔案路由、教學文章、練習及產生器。 |
| `layouts/default.vue` | 頁首、導覽選單、文章目錄、回頂端按鈕與頁尾。 |
| `layouts/custom.vue` | 僅輸出 slot，讓工具與練習頁自行排版。 |
| `components/` | 叫牌輸入、叫序顯示、信號標記及自然制文章區塊。 |
| `modules/` | 一般工具函式與 JSON 題庫，並非已註冊的 Nuxt 模組。 |
| `type/type.ts` | `Call`、`NameOfCall`、`Quest`、`QuestLib`、`TocElement` 等型別。 |
| `assets/css/main.css` | 全站、手機版與列印樣式。 |
| `public/` | favicon、回頂端箭頭及目前空白的 robots.txt；檔案由網站根路徑提供。 |
| `.github/workflows/deploy.yml` | 安裝、靜態產生及 Pages 發布。 |

README 仍引用不存在的 `vue-bidpage/src/components`，不能作為現行路徑依據。

## 路由與頁面

| 路由 | 原始檔／用途 |
| --- | --- |
| `/` | 無 `pages/index.vue`；由 `routeRules` 設定導向 `/cmbc`。 |
| `/cmbc` | `pages/cmbc.vue`：CMBC 自然制。 |
| `/natural` | `pages/natural.vue`：特殊自然制，組合 `balMinor`、`naturalMajor`。 |
| `/relay` | `pages/relay/index.vue`：Relay 制度主文。 |
| `/relay/interference` | Relay 競叫。 |
| `/relay/defense` | Relay 防禦叫。 |
| `/signal` | 防禦信號，與 CMBC 頁均使用 `signalShow` 標記牌張。 |
| `/double_topics`、`/lebensohl` | 競叫專題。 |
| `/story` | 互動叫牌練習，使用 custom layout。 |
| `/questgen` | 題庫產生器，使用 custom layout。 |
| `/bidtablegen` | custom layout，模板空白，只有待辦註解。 |
| `/precision`、`/precision/precision1nt` | 精準制文章雛形。 |

預設選單提供 Relay、自然制、競叫及練習入口，未列出 Precision 或產生器。檔案存在形成路由，不表示已加入選單，也不表示已確認其靜態部署行為。

## 文章與狀態資料流

1. 頁面通常以 `<article ref="Article">` 包住文章，使用預設 layout。
2. `onMounted` 呼叫 `replaceSuitSigns(article.value)`；它透過 `suitSign()` 將 `!C`、`!D`、`!H`、`!S` 轉為花色 HTML，再重設文章 `innerHTML`。
3. `genTOC()` 掃描整個 document 的 `h2`、`h3`、`h4`，為缺少 ID 的標題加上 `header-${index}`，寫入 `useState('toc')`。
4. 預設 layout 讀取 `toc` 生成錨點導覽，讀取 `topic` 顯示頁首；`app.vue` 讀取 `title` 設定文件標題。

`title`、`topic`、`toc` 是跨頁共用狀態，並非每個頁面都重新設定全部欄位。`/natural` 的文章子元件也各自執行花色轉換與目錄生成。

## 題庫、練習與編輯流程

`modules/quest.json` 直接匯入前端，分為九類：開叫、低花開叫的答叫、高花開叫的答叫、1NT 開叫的答叫、2NT 開叫的答叫、低花開叫的再叫、1X-1Y-1Z、迫叫 1NT 後續及其他。

每題包含四門手牌字串、`auction`、`answers`、`correct`、`board_num`，另可有 `description`。叫序元素包含 `name`、`explanation`、`alert`；叫序 Pass 使用 `P`，答案叫品型別使用 `Pass`。

- `story.vue` 依類別與題號選題；以 `questtype`、`questnumber` Cookie 記住選擇，沒有完整作答歷史。
- `AuctionBox.vue` 依牌號呈現發牌位置與身價，顯示叫序、Alert 邊框、解釋及最後答案。
- `BiddingBox.vue` 提供階層、花色、Pass、Double、Redouble，依叫序 watcher 更新可用叫品，透過 callback 與多個 `v-model` 連接父頁。
- 選答後，練習頁比對 `correct` 並讀取 `answers`；`textAuction()` 格式化叫品，`suitSign()` 格式化解釋。
- `questgen.vue` 重用叫牌元件，計算 HCP 與牌張數。新增只修改記憶體資料；複製輸出本次新增題目，下載輸出完整題庫。工具不會寫回 repository，須人工更新 JSON 並提交。

## 本機開發與部署

| 指令 | 作用 |
| --- | --- |
| `npm ci` | 依鎖定檔安裝；postinstall 執行 `nuxt prepare`。 |
| `npm run dev` | 啟動開發伺服器。 |
| `npm run build` | 一般 production build。 |
| `npm run generate` | 靜態產生，亦為 CI 使用的建置方式。 |
| `npm run preview` | 預覽 production 輸出。 |

目前沒有 test、lint、typecheck script 或測試框架設定；安裝 vue-tsc 不等於 CI 已執行型別檢查。根目錄與 server 的 tsconfig 分別繼承 `.nuxt` 生成的設定。

部署 workflow 在推送 `master` 或對 `master` 開 PR 時執行。`build` job 使用 Ubuntu、由 `.nvmrc` 指定 Node 24、checkout v4、setup-node v4，依序執行 `npm ci` 與 `npm run generate`，僅有 `contents: read` 權限。只有 `master` 的 push 會上傳 `.output/public` 為 `static-site` artifact（含隱藏檔），並在 build 成功後啟動 `deploy` job。部署 job 下載同一個 workflow run 的產物，以 `contents: write` 權限讓 `peaceiris/actions-gh-pages@v4` 使用 `GITHUB_TOKEN` 發布到預設 `gh-pages` 分支，`keep_files: false`。PR 不上傳發布產物、不執行部署 job；發布 job 以 `gh-pages-publish` concurrency group 避免同時寫入發布分支。

本次 Nuxt 4 遷移已在 Node 24.22.3 執行 `npm ci` 與 `npm run generate`，確認輸出 `.output/public` 及 16 個預先產生的路徑（含 fallback HTML）。GitHub Pages 後台的發布來源、實際 Token 寫入權限與線上部署仍未驗證。

## 已知風險與後續驗證重點

以下為原始碼觀察，並非本次已修正項目：

1. **發布環境**：已限制為 `master` push 且建置成功後才部署；GitHub 後台需確認 Pages 使用 `gh-pages` 根目錄、分支保護與組織政策允許發布。workflow 的權限宣告不代表線上部署已成功。
2. **Cookie 還原**：`story.vue` 用目前選取類別而非 Cookie 類別查索引，題號驗證缺少正整數下界，且 `< length` 排除最後一題，可能形成無效索引。
3. **初始叫牌限制**：`BiddingBox` watcher 沒有 immediate，首次載入已有叫序時尚未初始化限制。
4. **題目驗證**：產生器顯示牌張數但未阻擋無效手牌；未選答案時預設 1C，新增後未重設 answer。型別斷言不能驗證 JSON 的實際資料。
5. **DOM 與 HTML**：整篇 innerHTML 重寫可能干擾 Vue 子元件更新；v-html 與轉換工具未清理外部 HTML，未來接受投稿時需明確定義信任邊界。
6. **跨頁與錨點**：topic 可能沿用前頁，部分標題沿用 CMBC；順序式標題 ID 會隨文章插入內容改變，目錄掃描也未限制於單一文章。
7. **資源路徑**：Nuxt 4 遷移已將回頂端圖示改為 `/arrow_upward.svg`，以通過新版建置工具解析；Google 驗證 HTML 位於 repository 根目錄，未見複製至輸出的設定。
8. **維護與閱讀**：長篇 Vue 文章、重複掛載邏輯、hover 導覽及說明均需留意；不要在無授權的文件任務中一併修改。

功能修改時優先核對首次進入、換題、異常 Cookie、Double／Redouble、題庫匯出、跨頁標題、文章錨點、手機與列印版。部署修改另需檢查靜態產物與深層路由。橋牌內容審核不在本次遷移範圍。

## Nuxt 4 遷移驗證與剩餘限制（2026-11-14）

- Node 要求為 `^24.15.0`；本機可使用 `nvm use` 讀取 `.nvmrc`，再執行 `npm ci`。本次使用暫存安裝的 Node 24.22.3，沒有更換系統 Node。
- 保留原有根目錄、CSR 與題庫資料流，DevTools 維持停用。後續部署調整已將 PR 改為只建置，正式發布限制在 `master` push，並將寫入權限限縮於部署 job。
- `npm audit` 結果由 53 個受影響套件降為 10 個（6 low、4 moderate、0 high、0 critical）。剩餘根因為 Nitro 工具鏈的 `deepmerge@4.3.1` 與 `readdir-glob` 使用的 `minimatch@10.2.6`；其餘為相依鏈傳遞警告。沒有使用跨主版本 overrides，也沒有依 audit 建議降回舊 Nuxt。這是公告比對結果，不表示已證實可利用性或完成全面安全審核。
- 額外執行 `vue-tsc --noEmit` 未通過：`AuctionBox` 的陣列 model 預設值、叫牌元件 model 推導、`questgen` 的 boolean 傳值、`process.client` 型別與新版設定下的陣列索引檢查仍需獨立整理。`generate` 成功不代表型別檢查通過；本次未擴大修改叫牌與 Cookie 邏輯。
- 本機以 Chromium 對 `.output/public` 的靜態伺服器驗證 13 個頁面路徑直接載入（`/bidtablegen` 保留既有空白內容）、首頁至 `/cmbc` 的導向、文章錨點、站內導航、練習換題／換類別與答案解釋、產生器 Double／Redouble、13 張牌輸入與 JSON 下載內容；未收到瀏覽器 pageerror。另檢視 `/cmbc`、`/story` 的 390px 手機版截圖。未驗證異常 Cookie、所有題目、列印版或線上 Pages 的 fallback 行為。
