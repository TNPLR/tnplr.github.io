# 叫牌教學網站
# Bidding tutorial
This site aims to bridge players or learners in Taiwan, so the site is mainly written in Mandarin.

## 原始碼結構
這個網站現在使用Vue作為架構，而主要的文章放在vue-bidpage/src/components內部，想要寫新的文章，架構如下所示。在寫好以後，儲存成vue檔案。
```vue
<template>
    <article ref="Article">
        <!-- 撰寫網站 -->
    </article>
</template>
```