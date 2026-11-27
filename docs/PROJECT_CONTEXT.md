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
| `app.vue` | 以 `NuxtLayout` 包住 `NuxtPage`，讀取共用標題。 |
| `nuxt.config.ts` | 全站 head 載入 Google tag（`G-CF4PHZ3M6F`），初始化 `dataLayer` 與 `gtag`；實際事件接收須於部署後在 GA 驗證。 |
| `pages/` | 檔案路由、教學文章、練習及產生器。 |
| `layouts/default.vue` | 頁首、導覽選單、文章目錄、回頂端按鈕與頁尾。 |
| `layouts/custom.vue` | 僅輸出 slot，讓工具與練習頁自行排版。 |
| `components/` | 叫牌輸入、叫序顯示、信號標記及自然制文章區塊。 |
| `modules/` | 一般工具函式與 JSON 題庫，並非已註冊的 Nuxt 模組。 |
| `type/type.ts` | `Call`、`NameOfCall`、`Quest`、`QuestLib`、`TocElement` 等型別。 |
| `assets/css/main.css` | 全站、手機版與列印樣式。 |
| `public/` | favicon、回頂端箭頭、Google Search Console 的 HTML 驗證檔、`sitemap.xml`、`sitemap.txt` 及宣告 XML sitemap 網址的 `robots.txt`；檔案由網站根路徑提供。 |
| `.github/workflows/deploy.yml` | 安裝、靜態產生及 Pages 發布。 |

README 仍引用不存在的 `vue-bidpage/src/components`，不能作為現行路徑依據。

## 路由與頁面

| 路由 | 原始檔／用途 |
| --- | --- |
| `/` | 無 `pages/index.vue`；由 `routeRules` 設定導向 `/cmbc`。 |
| `/cmbc` | `pages/cmbc.vue`：CMBC 自然制。 |
| `/beginner` | `pages/beginner.vue`：前七次社課的新手講義，包含叫牌思考方法、牌例解析、開叫及術語速查；自然制選單提供入口。高花答叫參照 `naturalMajor.vue` 的迫叫 1NT／二蓋一架構。 |
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

`public/sitemap.xml` 手動維護，收錄預設選單中的教學與練習頁。網址使用 `https://tnplr.github.io` 及 GitHub Pages 的結尾斜線。新增、移除或更名公開教學頁時，請同步更新 sitemap。

`public/sitemap.txt` 使用相同的網址清單，每行一個網址，供 Google Search Console 另行提交以比較兩種格式的讀取結果。維護網址時請同步更新兩份檔案。

## 文章與狀態資料流

1. 頁面通常以 `<article ref="Article">` 包住文章，使用預設 layout。
2. `onMounted` 呼叫 `replaceSuitSigns(article.value)`；它透過 `suitSign()` 將 `!C`、`!D`、`!H`、`!S` 轉為花色 HTML，僅替換含花色標記的文字節點，略過自行處理花色的小測驗。
3. `genTOC()` 掃描整個 document 的 `h2`、`h3`、`h4`，為缺少 ID 的標題加上 `header-${index}`，寫入 `useState('toc')`。
4. 預設 layout 讀取 `toc` 生成錨點導覽，讀取 `topic` 顯示頁首；`app.vue` 讀取 `title` 設定文件標題。

預設 layout 的文章目錄預設展開，可用上方選單列最左側的三條橫線按鈕切換；按鈕的無障礙名稱與提示文字依狀態顯示「隱藏目錄／顯示目錄」。收合時文章改用全寬；手機版維持目錄在文章上方，列印時隱藏目錄及選單列。展開狀態僅保存在 layout 的記憶體中，重新載入會恢復展開。

`title`、`topic`、`toc` 是跨頁共用狀態，並非每個頁面都重新設定全部欄位。`/natural` 的文章子元件也各自執行花色轉換與目錄生成。

`/beginner` 使用固定標題 ID，掛載後僅掃描自身文章的 h2、h3、h4 產生目錄，並沿用花色轉換工具。頁面採靜態講義及原生站內連結，沒有新增題庫或互動作答狀態；局部樣式補充手機閱讀字級與列印時各課分頁。

新手講義已以 Node 24 執行 `npm run generate`，確認 `.output/public/beginner/index.html` 產生；本機 Chromium 驗證直接載入、標題、花色轉換、目錄錨點、連至 CMBC 再由選單返回、390px 正文閱讀及列印分頁規則，並輸出 PDF，未收到 pageerror。十六組手牌已核對十三張及大牌點。另觀察到既有選單在滑鼠展開後切至手機寬度會超出視窗，未於本次文章新增中修改；尚未驗證線上部署及實體列印。

後續將講義點力統一為阿拉伯數字，並將第二課擴充為低花／1NT、高花、2NT、2♣ 四節共十三題。修正原首題牌型為 4333；全篇二十五組手牌重新檢查張數、同門無重複牌、大牌點及所列牌型，第二課另依 CMBC 開叫條件核對答案，靜態產生通過。本次文字修訂未重跑瀏覽器檢查。

新手講義新增第三課「高花開叫後的答叫」，後續課次順延為七課；包含支持分流、迫叫 1NT、二蓋一、Jacoby 2NT、Splinter 與八題牌例。原高花答叫介紹移入第三課，第六課保留對照練習作複習。以本站約定為主，附 BWS 2017 參考連結並區分其半迫叫 1NT。本次核對八題的十三張、同門無重複牌與大牌點，以及七課標題、課程連結、唯一 ID 與頁內錨點；Node 24 靜態產生通過。本機 Chromium 驗證直接載入、七課目錄目標、第三課跳轉、花色轉換、390px 正文無橫向溢出及列印分頁規則，並檢視手機截圖，未收到 pageerror；未驗證線上部署。

## 題庫、練習與編輯流程

`modules/quest.json` 直接匯入前端，分為九類：開叫、低花開叫的答叫、高花開叫的答叫、1NT 開叫的答叫、2NT 開叫的答叫、低花開叫的再叫、1X-1Y-1Z、迫叫 1NT 後續及其他。

每題包含四門手牌字串、`auction`、`answers`、`correct`、`board_num`，另可有 `description`。叫序元素包含 `name`、`explanation`、`alert`；叫序 Pass 使用 `P`，答案叫品型別使用 `Pass`。

- `shortQuiz.vue` 可透過 `<ShortQuiz title="開叫練習" :questions="questions" />` 插入教學正文，接受 `Quest[]`。建議每題提供 3～5 個含解說的叫品。選答後即顯示該叫品的解說。
- `ShortQuiz` 的 `auction-mode` 接受數字 `1`（隱藏叫牌框）、`2`（在題目列表上方共用第一題的牌號與叫序）或 `3`（逐題顯示，預設）。`/beginner` 使用模式 `1`。
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

部署 workflow 在推送 `master` 或對 `master` 開 PR 時執行。`build` job 在 Ubuntu 上依 `.nvmrc` 設定 Node 24，執行 `npm ci` 與 `npm run generate`，使用 `contents: read` 權限。只有 `master` 的 push 會用 `actions/upload-pages-artifact@v3` 上傳 `.output/public`，再由 `actions/deploy-pages@v4` 直接發布。部署 job 使用 `pages: write` 與 `id-token: write` 權限、`github-pages` 環境和 `gh-pages-publish` 並行群組。PR 僅執行建置。GitHub Pages 的發布來源須設定為 GitHub Actions。

本次 Nuxt 4 遷移已在 Node 24.22.3 執行 `npm ci` 與 `npm run generate`，確認輸出 `.output/public` 及 16 個預先產生的路徑（含 fallback HTML）。GitHub Pages 後台的發布來源與新版 workflow 的線上部署仍待驗證。

## 已知風險與後續驗證重點

以下為原始碼觀察，並非本次已修正項目：

1. **發布環境**：已限制為 `master` push 且建置成功後才部署；GitHub 後台需確認 Pages 的發布來源為 GitHub Actions，且 `github-pages` 環境允許 `master` 發布。workflow 的權限宣告不代表線上部署已成功。
2. **Cookie 還原**：`story.vue` 用目前選取類別而非 Cookie 類別查索引，題號驗證缺少正整數下界，且 `< length` 排除最後一題，可能形成無效索引。
3. **初始叫牌限制**：`BiddingBox` watcher 沒有 immediate，首次載入已有叫序時尚未初始化限制。
4. **題目驗證**：產生器顯示牌張數但未阻擋無效手牌；未選答案時預設 1C，新增後未重設 answer。型別斷言不能驗證 JSON 的實際資料。
5. **DOM 與 HTML**：v-html 與解說格式化工具未清理外部 HTML，未來接受投稿時需明確定義信任邊界。
6. **跨頁與錨點**：topic 可能沿用前頁，部分標題沿用 CMBC；順序式標題 ID 會隨文章插入內容改變，目錄掃描也未限制於單一文章。
7. **資源路徑**：Nuxt 4 遷移已將回頂端圖示改為 `/arrow_upward.svg`，以通過新版建置工具解析。
8. **維護與閱讀**：長篇 Vue 文章、重複掛載邏輯、hover 導覽及說明均需留意；不要在無授權的文件任務中一併修改。

功能修改時優先核對首次進入、換題、異常 Cookie、Double／Redouble、題庫匯出、跨頁標題、文章錨點、手機與列印版。部署修改另需檢查靜態產物與深層路由。橋牌內容審核不在本次遷移範圍。

## Nuxt 4 遷移驗證與剩餘限制（2026-11-14）

- Node 要求為 `^24.15.0`；本機可使用 `nvm use` 讀取 `.nvmrc`，再執行 `npm ci`。本次使用暫存安裝的 Node 24.22.3，沒有更換系統 Node。
- 保留原有根目錄、CSR 與題庫資料流，DevTools 維持停用。後續部署調整已將 PR 改為只建置，正式發布限制在 `master` push，並將寫入權限限縮於部署 job。
- `npm audit` 結果由 53 個受影響套件降為 10 個（6 low、4 moderate、0 high、0 critical）。剩餘根因為 Nitro 工具鏈的 `deepmerge@4.3.1` 與 `readdir-glob` 使用的 `minimatch@10.2.6`；其餘為相依鏈傳遞警告。沒有使用跨主版本 overrides，也沒有依 audit 建議降回舊 Nuxt。這是公告比對結果，不表示已證實可利用性或完成全面安全審核。
- 額外執行 `vue-tsc --noEmit` 未通過：`AuctionBox` 的陣列 model 預設值、叫牌元件 model 推導、`questgen` 的 boolean 傳值、`process.client` 型別與新版設定下的陣列索引檢查仍需獨立整理。`generate` 成功不代表型別檢查通過；本次未擴大修改叫牌與 Cookie 邏輯。
- 本機以 Chromium 對 `.output/public` 的靜態伺服器驗證 13 個頁面路徑直接載入（`/bidtablegen` 保留既有空白內容）、首頁至 `/cmbc` 的導向、文章錨點、站內導航、練習換題／換類別與答案解釋、產生器 Double／Redouble、13 張牌輸入與 JSON 下載內容；未收到瀏覽器 pageerror。另檢視 `/cmbc`、`/story` 的 390px 手機版截圖。未驗證異常 Cookie、所有題目、列印版或線上 Pages 的 fallback 行為。
