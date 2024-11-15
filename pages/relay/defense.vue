<template>
  <article ref="Article">
    <div><h2>防禦性叫牌緒論</h2>
      <p>敵方開叫以後，我們的「防禦性叫牌方法」並沒有什麼特別之處。</p>
    </div>
  </article>
</template>

<script setup>
import replaceSuitSigns from '~/modules/replaceSuitSigns';
import genTOC from '~/modules/genTOC';
const article = useTemplateRef('Article');
const toc = useState('toc');
const title = useState('title');

onMounted(() => {
  title.value = "Relay 防禦叫"
  replaceSuitSigns(article.value);
  genTOC(toc);
});
</script>

<style></style>