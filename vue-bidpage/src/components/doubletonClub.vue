<template>
    <article ref="Article">
        <div><h2>自然制：平均的梅花、不平均的方塊</h2>
            <p>這個制度是閱讀Dutch doubleton club制度的筆記與心得，並且去除掉一些太激進的部分，目前仍然在測試中，如果讀者很意外地進到了這個頁面，那就是你很幸運，也歡迎你看一下這個制度。</p>
            <table class="bidtable">
                <tr>
                    <th>開叫</th>
                    <th></th>
                </tr>
                <tr>
                    <td>1!C</td>
                    <td>2張以上（18-20平均牌型可能有5張!D）。半迫叫。</td>
                </tr>
                <tr>
                    <td>1!D</td>
                    <td>5張以上，或4441!C，也有可能是很強的牌，例如5M-6!D。</td>
                </tr>
            </table>
        </div>
        <div><h2>1!C開叫後續</h2>
            <p>這是我覺得最有趣的部分，所以首先來進行研究。</p>
            <table class="bidtable">
                <tr>
                    <th>1!C</th>
                    <th>2張以上（18-20平均牌型可能有5張!D）。半迫叫。</th>
                </tr>
                <tr>
                    <td>Pass</td>
                    <td>0-4，4或5張梅花。</td>
                </tr>
                <tr>
                    <td>1!D</td>
                    <td>垃圾桶。可能是弱牌，或想要進入1NT的結構。包括
                        <ul>
                            <li>邀請以上的平均牌型試圖推莊</li>
                            <li>4-4高花</li>
                            <li>5張以上方塊</li>
                            <li>0-6不適合Pass的牌</li>
                            <li>適合用1NT架構的低花滿貫試探牌型</li>
                            <li>5張紅心，7-8，想要Pass 1!H</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>1!H</td>
                    <td>自然，7點以上，迫叫一圈，沒有4-4高花除非邀請以上，不會輕答叫。</td>
                </tr>
                <tr>
                    <td>1!S</td>
                    <td>自然，7點以上，迫叫一圈，不會輕答叫。</td>
                </tr>
                <tr>
                    <td>1NT</td>
                    <td>自然，沒有4張高花，適合主打，沒有邀請點力。</td>
                </tr>
                <tr>
                    <td>2!C</td>
                    <td>自然5張以上，迫叫，沒有4張高花。</td>
                </tr>
                <tr>
                    <td>2!D</td>
                    <td>Multi。竄叫。</td>
                </tr>
                <tr>
                    <td>2!H/!S</td>
                    <td>6張以上牌組，10-11。2NT問短門，3M邀請。</td>
                </tr>
            </table>
            <div><h3>1!C-1!D</h3>
                <table class="bidtable">
                    <tr>
                        <th>1!C</th>
                        <th>1!D</th>
                        <th>垃圾桶。可能是弱牌，或想要進入1NT的結構。</th>
                    </tr>
                    <tr>
                        <td colspan="2">1!H!</td>
                        <td>人工叫品。不是18-20點的平均牌，或!C-!H的非平均牌，且
                            <ul>
                                <li>不是15-17（倒叫的牌型）</li>
                                <li>不是4414或4405（叫1!S）</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Pass!</td>
                        <td>4-5張!H，類似於逃跑。</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>1!S!</td>
                        <td>等待。希望進入1NT架構的牌。</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>1NT!</td>
                        <td>4!S-4/5!H，對於低範圍的平均牌型，沒有成局的可能。</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>2!D</td>
                        <td>6張以上方塊，束叫。</td>
                    </tr>
                    <tr>
                        <td colspan="2">1!S</td>
                        <td>自然，!C-!S非平均牌，或4414或4405，不迫叫。</td>
                    </tr>
                    <tr>
                        <td colspan="2">1NT</td>
                        <td>18-20平均牌型，有可能有5張方塊，啟動1NT後續。</td>
                    </tr>
                    <tr>
                        <td colspan="2">2NT</td>
                        <td>6張以上梅花，半平均牌，18-20。</td>
                    </tr>
                </table>
            </div>
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