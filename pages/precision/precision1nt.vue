<template>
  <article ref="Article">
      <div><h2>特殊牌形滿貫叫法</h2>
        <table>
          <thead>
            <tr>
              <th>牌形</th>
              <th>首次叫牌</th>
              <th>第二次叫牌</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>(54)22</td>
              <td>2!C</td>
              <td>Smolen</td>
            </tr>
            <tr>
              <td>(42)(52)</td>
              <td>2!C</td>
              <td>3m</td>
            </tr>
          </tbody>
        </table>
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
  topic.value = "Precision 1NT後續";
  title.value = "Precision Club";
});
</script>
