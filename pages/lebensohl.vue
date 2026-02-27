<template>
    <article ref="Article">
        <h2>Lebensohl是什麼</h2><div>
          <p>在1NT被插叫一門牌組的時候，可以使用Lebensohl特約。基本上二線新花是束叫，跳叫三線新花是迫叫。</p>
          <p>至於在三線才能叫出的新花，叫出時就代表迫叫成局。那要如何束叫呢？此時要用上Lebensohl的核心：2NT!。</p>
          <h3>Lebensohl: 2NT!</h3><div>
            <p>2NT!請求同伴叫出3!C，而後續便可以Pass或叫出三線才能叫出的新花表示束叫。叫出本來可以在二線叫出的花色，則是代表邀請。</p>
          </div>
          <h3>沒有五張以上牌組時</h3><div>
            <p>當沒有五張牌組的時候，除了X表示Negative以外，只有在迫叫成局的情況下才能叫牌。
            </p>
            <p>在沒有想要問4張高花的時候：</p>
            <ul>
              <li>直接叫出3NT表示「沒有擋張」。</li>
              <li>經過Lebensohl 2NT!-3!C!叫出3NT表示「有擋張」。</li>
            </ul>
            <p>想要問4張高花的時候：</p>
            <ul>
              <li>直接扣叫敵方花色表示「沒有擋張」。</li>
              <li>經過Lebensohl 2NT!-3!C!扣叫敵方花色表示「有擋張」。</li>
            </ul>
          </div>
        </div>
        <h2>何時不用Lebensohl</h2><div>
          <ul>
            <li>當敵方叫出自然的2!C以後，X替代掉Stayman問高花的功能，而其他照舊</li>
            <li>Double</li>
          </ul>
        </div>
        <h2>AI總整理</h2>
        <table>
          <thead>
              <tr>
                  <th>叫牌序列 / 動作</th>
                  <th>牌力與意義</th>
                  <th>敵方花色擋張狀態</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td colspan="3" class="category">直接叫牌 (Direct Actions)</td>
              </tr>
              <tr>
                  <td>直接二線新花</td>
                  <td>束叫 (Sign-off)</td>
                  <td>無須考慮</td>
              </tr>
              <tr>
                  <td>直接跳叫三線新花</td>
                  <td>迫叫 (Forcing)</td>
                  <td>無須考慮</td>
              </tr>
              <tr>
                  <td>直接叫出 3NT</td>
                  <td>迫叫成局 (GF)</td>
                  <td><strong>沒有擋張</strong></td>
              </tr>
              <tr>
                  <td>直接扣叫 (Cue-bid)</td>
                  <td>尋找四張高花 (Stayman)</td>
                  <td><strong>沒有擋張</strong></td>
              </tr>
              <tr>
                  <td>X (Double)</td>
                  <td>負性加倍 (Negative Double)</td>
                  <td>視點力而定</td>
              </tr>
            
              <tr>
                  <td colspan="3" class="category">經過 Lebensohl 2NT! (請求同伴叫      3&clubs;!)</td>
              </tr>
              <tr>
                  <td>2NT - 3&clubs; - Pass 或叫三線低位花色</td>
                  <td>束叫 (Sign-off)</td>
                  <td>無須考慮</td>
              </tr>
              <tr>
                  <td>2NT - 3&clubs; - 叫回原可二線叫出的花色</td>
                  <td>邀請 (Invitational)</td>
                  <td>無須考慮</td>
              </tr>
              <tr>
                  <td>2NT - 3&clubs; - 叫出 3NT</td>
                  <td>迫叫成局 (GF)</td>
                  <td><strong>有擋張</strong></td>
              </tr>
              <tr>
                  <td>2NT - 3&clubs; - 扣叫 (Cue-bid)</td>
                  <td>尋找四張高花 (Stayman)</td>
                  <td><strong>有擋張</strong></td>
              </tr>
          </tbody>
      </table>
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
  replaceSuitSigns(article.value);
  genTOC(toc);
  topic.value = "Tự Nhiên Chế";
  title.value = "CMBC 自然制";
});
</script>
<style scoped>

</style>