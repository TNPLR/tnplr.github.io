<template>
  <article ref="Article">
    <div><h2>防禦信號緒論</h2>
      <p>防禦信號的內容，其實和叫牌制度沒什麼太大的關連。但基於制度的完整性，我仍將其寫在這裡。</p>
    </div>
    <div><h2>首攻（首引）</h2>
      <p>首攻可分為王牌合約與無王合約。大致而言，「大牌」的引牌在兩種合約較類似，而小牌（Spot cards）的引牌差異較大。</p>
      <div><h3>大牌的首攻</h3>
        <p>王牌合約時，持非連續A帶頭的牌組，應以攻出A為原則，其他的部分可以照本文的攻牌方式，亦稱做「0/2」，雖說這不是一個很精準且對初學者易瞭解的描述方式。簡而言之，在連續大牌、半連續大牌及有內部的連續大牌時，採用以下的首攻方式。</p>
        <ul>
          <li>連續大牌，攻出最大牌張。</li>
          <li>有內部的連續大牌，除非王牌合約而外部大牌是A，攻第二張內部的連續大牌。</li>
        </ul>
        <table>
          <tbody>
            <tr>
              <th>攻出牌張</th>
              <th>王牌合約</th>
              <th>無王合約</th>
            </tr>
            <tr>
              <td><b>A</b></td>
              <td>AKx(+), AQ(+), AJ(+), Ax(+)</td>
              <td>AKx(+)</td>
            </tr>
            <tr>
              <td><b>K</b></td>
              <td>AK, KQ(+), Kx</td>
              <td>AK, KQ(+), Kx</td>
            </tr>
            <tr>
              <td><b>Q</b></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><b>J</b></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><b>10</b></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><b>9</b></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div><h3>王牌合約的首攻</h3>
        <p></p>
      </div>
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
  title.value = "防禦信號";
  replaceSuitSigns(article.value);
  genTOC(toc);
});
</script>

<style>
</style>