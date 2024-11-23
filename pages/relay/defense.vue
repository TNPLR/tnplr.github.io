<template>
  <article ref="Article">
    <div><h2>防禦性叫牌緒論</h2>
      <p>敵方開叫以後，我們的「防禦性叫牌方法」並沒有什麼特別之處。</p>
      <p>我們啟動一線Takeout Double的點力，強牌通常要18點以上（低花點力稍高於高花），而其他情況下，原則上需要12點以上，除非是4441這種好牌型且沒有點力浪費，可以稍微低一點點力（10-11點以上）。</p>
      <p>就啟動一線蓋叫而言，需要8點以上的好牌組，有指示首攻的成分。或是10點以上的一般牌組。二線蓋叫則需要10點以上的好牌組，或有更好點力的手牌。</p>
    </div>
  </article>
</template>

<script setup>
import replaceSuitSigns from '~/modules/replaceSuitSigns';
import genTOC from '~/modules/genTOC';
const article = useTemplateRef('Article');
const toc = useState('toc');
const title = useState('title');
const topic = useState('topic');

onMounted(() => {
  title.value = "Relay 防禦叫"
  topic.value = "防禦叫約定"
  replaceSuitSigns(article.value);
  genTOC(toc);
});
</script>

<style></style>