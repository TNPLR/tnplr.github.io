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
        <p>針對王牌合約的小牌首攻，採用3/Low首攻方法。接下來的標示粗體的乃是首攻的牌張，而底線的是第二張小牌的牌張信號。H表示大牌（對於該牌組得到墩數的重要牌張），x表示小牌。</p>
        <p>基本上，我們可以發現大再小表示偶數張，小再大表示奇數張。另外，第二張牌大牌表示沒有牌組品質不佳；第二張牌小牌表示牌組有大牌。</p>
        <table style="font-size: larger;">
          <tbody>
            <tr>
              <th>沒大牌</th>
              <th>有大牌</th>
            </tr>
            <tr>
              <td><SignalShow text="xx" x="0" y="1"></SignalShow></td>
              <td><SignalShow text="Hx" x="0" y="1"></SignalShow></td>
            </tr>
            <tr>
              <td><SignalShow text="xxx" x="2" y="0"></SignalShow></td>
              <td><SignalShow text="Hxx" x="2" y="1"></SignalShow></td>
            </tr>
            <tr>
              <td><SignalShow text="xxxx" x="2" y="3"></SignalShow></td>
              <td><SignalShow text="Hxxx" x="2" y="3"></SignalShow></td>
            </tr>
            <tr>
              <td><SignalShow text="xxxxx" x="4" y="0"></SignalShow></td>
              <td><SignalShow text="Hxxxx" x="4" y="3"></SignalShow></td>
            </tr>
            <tr>
              <td><SignalShow text="xxxxxx" x="2" y="3"></SignalShow></td>
              <td><SignalShow text="Hxxxxx" x="2" y="5"></SignalShow></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div><h3>無王合約的首攻</h3>
        <p>無王合約首攻採用第四大牌的信號。</p>
        <table style="font-size: larger;">
          <tbody>
            <tr>
              <th>沒大牌</th>
              <th>有大牌</th>
            </tr>
            <tr>
              <td><SignalShow text="xx" x="0" y="1"></SignalShow></td>
              <td><SignalShow text="Hx" x="0" y="1"></SignalShow></td>
            </tr>
            <tr>
              <td><SignalShow text="xxx" x="1" y="0"></SignalShow></td>
              <td><SignalShow text="Hxx" x="2" y="1"></SignalShow></td>
            </tr>
            <tr>
              <td><SignalShow text="xxxx" x="1" y="3"></SignalShow></td>
              <td><SignalShow text="Hxxx" x="3" y="2"></SignalShow></td>
            </tr>
            <tr>
              <td><SignalShow text="xxxxx" x="1" y="0"></SignalShow></td>
              <td><SignalShow text="Hxxxx" x="3" y="4"></SignalShow></td>
            </tr>
            <tr>
              <td><SignalShow text="xxxxxx" x="1" y="5"></SignalShow></td>
              <td><SignalShow text="Hxxxxx" x="3" y="5"></SignalShow></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div><h2>跟牌信號</h2>
      <p>跟牌信號是指同伴或莊家、夢家引牌時，如沒有特別的號碼要出，此時的信號。</p>
      <div><h3>同伴引牌時</h3>
        <ul>
          <li>王牌合約</li>
          <ul>
            <li>態度信號（小歡迎），除非</li>
            <ol>
              <li>在同伴打大牌時，夢家單張，且有王吃可能性。此時是花色選擇信號。</li>
              <li>夢家最大牌是J或以下的牌，當沒有要蓋過、吃入或fitness時。此時是張數信號。</li>
            </ol>
          </ul>
        </ul>
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