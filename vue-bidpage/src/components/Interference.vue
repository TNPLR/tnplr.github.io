<template>
<article ref="Article">
  <div><h2>競叫處理緒論</h2>
    <div><h3>Relay 開始後的處理</h3>
      <p>當同伴開叫以後，如果還沒有啟動Relay，原則上就沒有Relay了，除了第一、第二家開叫1!D-(X)的時候，此時叫XX是範圍詢問而1!H仍然是Relay。</p>
      <p>如果是Relay已經啟動了以後，才被插叫，此時依照「3」定律來決定relay是否繼續。如果插叫在最低叫品起算的3個叫品內，則relay繼續。
        但我認為更科學的計算方法是問說目前我們被抬升多少空間。當敵方插叫時，我們就會少了敵方插叫所佔用的叫品空間，但多了Pass和Double兩個叫品，
        如果敵方Double時，我們不但不會減少叫品，還會多了Pass和Redouble兩個叫品。因此敵方Double後我們的Relay就會降低兩格，而敵方插叫後我們的Relay會增加（佔用的格數-2）個叫品。
        因此，我們定義Relay繼續的條件是我們被抬升不超過1格空間。
      </p>
    </div>
  </div>
  <div><h2>同伴開叫1!C，第二家競叫的處理方法</h2>
    <p>1!C開叫是整個叫牌系統裡面最脆弱的叫品，敵方常常不計一切代價要阻塞我們的叫牌空間。而這時候除了拿出賭倍（Double）牌從他們搜刮分數以外，透過良好的競叫約定，找到合適的合約，仍然非常重要而值得花時間學習。</p>
    <p>1!C開叫以後，對抗的方式有許多種類，在此我們必須稍微簡介「不自然的對抗方式」，以讓讀者瞭解許多制度設計者的瘋狂。</p>
    <table>
      <tr>
        <th></th>
        <th colspan="4">常見的1!C對抗</th>
      </tr>
      <tr>
        <th></th>
        <th>Mathe</th>
        <th>CRASH</th>
        <th>Suction</th>
        <th>雜七雜八</th>
      </tr>
      <tr>
        <th>Dbl.</th>
        <td>!H!S</td>
        <td>!C!S or !D!H</td>
        <td>!D or !H!S</td>
        <td>好!H</td>
      </tr>
      <tr>
        <th>1!D</th>
        <td>自然 !D</td>
        <td>!C!D or !H!S</td>
        <td>!H or !S!C</td>
        <td>好!S</td>
      </tr>
      <tr>
        <th>1!H</th>
        <td>自然 !H</td>
        <td>自然 !H</td>
        <td>!S or !C!D</td>
        <td>!H+一門低花</td>
      </tr>
      <tr>
        <th>1!S</th>
        <td>自然 !S</td>
        <td>自然 !S</td>
        <td>!C or !D!H</td>
        <td>!S+一門低花</td>
      </tr>
      <tr>
        <th>1NT</th>
        <td>!C!D</td>
        <td>!C!H or !D!S</td>
        <td>!C!H</td>
        <td>!C!D or !H!S</td>
      </tr>
      <tr>
        <th>2!C</th>
        <td>自然 !C</td>
        <td>自然 !C</td>
        <td>!D!S</td>
        <td>自然 !C</td>
      </tr>
    </table>
    <p>由於各種對抗方法不斷推陳出新、五花八門、花樣百出，令人眼花撩亂，故我們原則上不對「特定」的制度設計對抗方法。對抗這些插叫的最佳心法便是假設開叫者是低限的平均牌型。
      如果對方是Double或是叫1!D，我們還是能夠繼續啟動relay。但叫到更上面以後，我們就沒辦法用relay了，取而代之是自然的叫牌。
    </p>
    <table class="competitive">
      <tr>
        <th>1!C</th>
        <th>Dbl.</th>
        <th>？</th>
        <th></th>
      </tr>
      <tr>
        <td>Pass</td>
        <td colspan="3">0-4</td>
      </tr>
      <tr>
        <td>Rdbl.</td>
        <td colspan="3">5-8</td>
      </tr>
      <tr>
        <td>1!D</td>
        <td colspan="3">黑桃，不是平坦的牌型。</td>
      </tr>
    </table>
    <p>當對方叫出1!D以後，也是用類似的方法，將負性的牌區分開來。</p>
    <table class="competitive">
      <tr>
        <th>1!C</th>
        <th>1!D</th>
        <th>？</th>
        <th></th>
      </tr>
      <tr>
        <td>Pass</td>
        <td colspan="3">0-4</td>
      </tr>
      <tr>
        <td>Dbl.</td>
        <td colspan="3">5-8</td>
      </tr>
      <tr>
        <td>1!H</td>
        <td colspan="3">黑桃，不是平坦的牌型。</td>
      </tr>
    </table>
  </div>
</article>
</template>

<script>
export default {
  mounted() {
    this.$root.replaceSuitSigns(this.$refs.Article);
    this.$root.genTOC();
  }
}
</script>

<style scoped></style>