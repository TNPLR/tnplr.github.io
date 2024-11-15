<template>
    <article ref="Article">
        <div><h2>自然制：高花開叫</h2>
            <p>這是一個五張高花開叫的制度，也因此高花開叫先天上就與低花開叫有所不同。所以，在高花開叫的這個部分，我們便設計一套簡易的制度來使用。在基本的架構上，採用的是Bridge World Standard 2017 的方案（可能是1980年代的產物）。在某些後續採用 Mike Lawrence 介紹的方法。</p>
            <table class="bidtable">
                <tr>
                    <th colspan="2">開叫</th>
                </tr>
                <tr>
                    <td>1!H</td>
                    <td>5張以上紅心，12-21。</td>
                </tr>
                <tr>
                    <td>1!S</td>
                    <td>5張以上黑桃，12-21。</td>
                </tr>
            </table>
            <p>當同時兩門開叫條件皆符合時，開叫較長的花色；相同花色長度，開叫較高的花色（黑桃）。</p>
            <p>在1M開叫過後，可以將整個制度分成四大架構。1NT占有制度的重要角色，處理各種未達迫叫成局的牌型。1M-2!C/!D與1!S-2!H這些叫品是「二蓋一」迫叫成局的叫品，後續可以處理高花的配合、低花的配合等牌型。1M-3!C/!D是跳叫（Jump Shift），不同制度有不同約定方法：有人將這些叫品當作高花配合叫品，有人將他們約定成極強的滿貫試探叫品，有人將他們約成弱阻塞性的叫品，而我長期將他們當成邀請的叫品來使用。剩下的叫品，幾乎都作為各種形式的高花配合來使用。</p>
        </div>
        <div><h3>高花支持架構</h3>
            <p>就易於理解而言，這個章節不應該放在這個位置，但由於「表示支持優先」是一個常見的叫牌原則（雖非沒有例外），故將這個內容優先放入。</p>
            <p>由於這是一個5張高花的制度，有3張以上高花，即算是有配合。有配合的情況下，我們必須再區分點力範圍與張數，以加強叫牌的精準度。基本上如下表：</p>
            <table>
                <tr>
                    <th></th>
                    <th>3張支持</th>
                    <th>4張支持</th>
                    <th>5張以上支持</th>
                </tr>
                <tr>
                    <td style="text-align: right;">0-5點</td>
                    <td>Pass</td>
                    <td>Pass</td>
                    <td>4M</td>
                </tr>
                <tr>
                    <td style="text-align: right;">6-7點</td>
                    <td>1NT-2X-2M</td>
                    <td>2M</td>
                    <td>4M</td>
                </tr>
                <tr>
                    <td style="text-align: right;">8-10點</td>
                    <td>2M</td>
                    <td>2M</td>
                    <td>4M</td>
                </tr>
                <tr>
                    <td style="text-align: right;">10-11點</td>
                    <td>1NT-2X-3M</td>
                    <td>3M</td>
                    <td>4M</td>
                </tr>
                <tr>
                    <td style="text-align: right;">12點以上</td>
                    <td>二蓋一</td>
                    <td>Splinter / 2NT</td>
                    <td>Splinter / 2NT</td>
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

<style scoped>
article {
    width: 100%;
    padding: 0;
}
</style>