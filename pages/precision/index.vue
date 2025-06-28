<template>
<article ref="Article">
    <div><h2>Precision 1!C</h2>
    <p>本文參考《中華精準制》及Enhanced Precision書籍，準備一個以自然叫品為基礎的1!C後續。</p>
    <div><h3>首次答叫</h3>
        <table class="bidtable">
            <tbody>
                <tr>
                    <th>1!C</th>
                    <th>16點以上非平均牌或17點以上平均牌形，不含19-20平均牌形。</th>
                </tr>
                <tr>
                    <td>1!D!</td>
                    <td>0-7</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</article>
</template>

<script setup lang="ts">
import replaceSuitSigns from '~/modules/replaceSuitSigns';
import genTOC from '~/modules/genTOC';
import type { TocElement } from '~/type/type';

const article = useTemplateRef<HTMLElement>('Article');
const toc = useState<TocElement[]>('toc');

const title = useState<string>('title');
const topic = useState<string>('topic');

onMounted(() => {
  if (article.value !== null) {
    replaceSuitSigns(article.value);
  }
  genTOC(toc);
  topic.value = "Precision";
  title.value = "Precision Club";
});
</script>
<style scoped>
</style>