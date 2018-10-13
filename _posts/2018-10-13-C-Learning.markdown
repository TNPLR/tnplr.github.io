# 現代C語言小心得
## 撰寫於2018年9月
## 前言
**我真的很喜歡用C語言**
但是，我第一個學的C語言版本是C99，但是這個程式語言在數十年來，有好幾個更新，不過許多教學依舊是古老的。最近我就在研究C11，我希望我可以在這裡分享我C語言學習心得。
我可能會不小心把這個東西變成了教學，所以我也許越寫越長，敬請見諒。我可能也會廢話很多就是了。
## 教學部分（計畫及撰寫中）
### 序
這一系列教學會以整數編號為主，假如有分數，代表這是後來添加，或是我認為資料在搜尋引擎很常見；假如有實做的部分則會後綴加號。這個教學可能有一些我無聊的練習，像是演算法或是資料結構之類的。假如有任何謬誤，敬請聯絡我，感謝！
### 目錄
[C語言教學00 - 標準](https://hackmd.io/s/HJRMzowPm)
[C語言教學1/2 - 編譯與執行](https://hackmd.io/s/S15lQXODQ)
[C語言教學01 - 傳統的開始](https://hackmd.io/s/r18aeCdwm)
[C語言教學02 - 註解](https://hackmd.io/s/S1u4veKDm)
[C語言教學03 - 一點點C常識及資料型態](https://hackmd.io/s/HJ7GwAOvQ)
[C語言教學04 - 格式化輸入輸出](https://hackmd.io/s/S1lgpZtPX)
[C語言教學05 - sizeof運算](https://hackmd.io/s/HyLpxSKDQ)
[C語言教學06 - 基本運算](https://hackmd.io/s/ry6A7Itv7)
[C語言教學07 - 比較運算](https://hackmd.io/s/rJX2GPtwm)
[C語言教學08 - 邏輯運算](https://hackmd.io/s/r1VtGBTwX)
[C語言教學09 - 位元運算](https://hackmd.io/s/SJHlQ8iu7)
[C語言教學10 - 型別轉換](https://hackmd.io/s/B1qjWCium)
[C語言教學11 - if流程控制](https://hackmd.io/s/Skqf2UAdQ)
#### 以下籌備中
C語言教學11 - 備用拼寫
C語言教學12 - 運算子優先順序
C語言教學13 - switch流程控制
C語言教學14 - while迴圈
C語言教學15 - for迴圈
C語言教學24 - do while迴圈
C語言教學25 - 特殊流程控制 break continue goto
C語言教學26 - 標準I/O
C語言教學27 - 函式
C語言教學40 - 結構 struct
C語言教學41 - 聯合 union
C語言教學42 - 列舉 enum
C語言教學43 - 陣列
C語言教學44 - 多維陣列
C語言教學45 - 字元陣列（字串）
C語言教學46 - 字串函式
C語言教學47 - 指標
C語言教學48 - 指標的指標
C語言教學49 - 函式、指標與陣列
C語言教學50 - main函式參數
C語言教學51 - const
C語言教學52 - 變數存儲類型
C語言教學60 - 前置處理器
C語言教學61 - 多檔案程式
C語言教學65 - \_Generic
C語言教學100 - \_Noreturn
C語言教學101 - \_Static_assert
C語言教學63 - inline
C語言教學62 - \_Bool 布林
C語言教學64 - typedef
C語言教學66 - 虛數與複數
C語言教學67 - 遞迴
C語言教學68 - 函式指標
C語言教學69 - 函式不定長度參數
C語言教學70 - 普通檔案I/O
C語言教學71 - 二進位檔案I/O
C語言教學72 - 記憶體管理 stdlib.h
C語言教學73 - 通用工具 stdlib.h
C語言教學74 - 字串及陣列函式 string.h
C語言教學75 - 普通數學函式 math.h
C語言教學76 - 複數數學函式 complex.h tgmath.h
C語言教學77 - 時間函式 time.h
C語言教學78 - 字元函式 ctype.h
C語言教學79 - 資料型態 stdint.h
C語言教學102 - limits.h
C語言教學103 - assert.h
C語言教學104 - wchar.h
C語言教學105 - 多執行緒 threads.h
C語言教學106 - \_Atomic 型別
## 胡亂寫部分（計畫中）
