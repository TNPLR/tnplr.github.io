<template>
    <article ref="Article">
        <div><h2>自然制：開叫5542</h2>
            <p>這個制度只寫重點，是個5542的自然制。1!C後續參考蔬菜制。</p>
            <p>低花選擇的方式，主要是選擇較長的，如果相同長度，3-3時叫1!C，若4-4時則自行判斷要叫哪一門低花。但1!H444，基於再叫方便性，建議叫1!D。</p>
            <table class="bidtable">
                <tr>
                    <th colspan="2">開叫</th>
                </tr>
                <tr>
                    <td>1!C</td>
                    <td>2張以上!C。12-21。<ul>
                        <li>12-14, 18-19平均牌，除了有5張高花或方塊以外。</li>
                        <li>4441類型牌型，短紅花者開叫1!C。</li>
                    </ul></td>
                </tr>
                <tr>
                    <td>1!D</td>
                    <td>4張以上!D。12-21。<ul>
                        <li>除了4!D(441)只有4張!D，其他都是5張以上</li>
                        <li>除了5!D(332)以外，其他都是非平均牌</li>
                        <li>4441類型牌型，短黑花者開叫1!D。</li>
                    </ul></td>
                </tr>
                <tr>
                    <td>1!H/!S</td>
                    <td>5張以上，12-21。</td>
                </tr>
                <tr>
                    <td>1NT</td>
                    <td>15-17，可能有5張高花，可能有半平均牌，可能有單張大牌。</td>
                </tr>
                <tr>
                    <td>2!C</td>
                    <td>強牌迫叫。</td>
                </tr>
                <tr>
                    <td>2NT</td>
                    <td>20-21平均牌型，可能有5張高花</td>
                </tr>
            </table>
        </div>
        <bal-minor/>
        <natural-major/>
    </article>
</template>

<script setup>
import replaceSuitSigns from '~/modules/replaceSuitSigns';
import genTOC from '~/modules/genTOC';
const article = useTemplateRef('Article');
const toc = useState('toc');
const title = useState('title');

onMounted(() => {
    title.value = "自然制";
    replaceSuitSigns(article.value);
    genTOC(toc);
});
</script>

<style scoped>

</style>