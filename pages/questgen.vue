<script setup lang="ts">
import BiddingBox from "~/components/BiddingBox.vue";
import AuctionBox from "~/components/AuctionBox.vue";
import textAuction from "~/modules/textAuction";
import type { Call, Quest, QuestLib } from "~/type/type";
import quest from "~/modules/quest.json";


definePageMeta({
    layout: 'custom'
});

function copy() :void {
    navigator.clipboard.writeText(questJson.value).then(() => {
        copySuccess.value = true;
    });
}

function pushAuction(bid: string) :void {
    if (bid === "Pass") {
        bid = "P";
    }
    auction.value.push({name: bid, explanation: input_text.value, alert: alert.value});
    input_text.value = "";
    alert.value = false;
}

function pushExplanation(bid: string) :void {
    if (Object.keys(explanation.value).length === 0) {
        answer.value = bid;
    }
    explanation.value[bid] = input_text.value;
    input_text.value = "";
}

function auctionClicked(bid: string) :void {
    if (answerMode.value) {
        pushExplanation(bid);
    } else {
        pushAuction(bid);
    }
}
function clearAuction() :void {
    auction.value = [];
}
function deleteBid() :void {
    auction.value.pop();
}
function summitQuest() :void {
    let quest: Quest = {
        spades: spades.value,
        hearts: hearts.value,
        diamonds: diamonds.value,
        clubs: clubs.value,
        auction: auction.value,
        answers: explanation.value,
        correct: answer.value,
        board_num: board_num.value
    };
    allStories.value[selectedQuestType.value].push(quest);
    questList.value.push(quest);
    answerMode.value = false;
    clearAuction();
    explanation.value = {};
    spades.value = "";
    hearts.value = "";
    diamonds.value = "";
    clubs.value = "";
}

function computeSuitHCP(suit: string) :number {
    let sum = 0;
    for (let i = 0; i < suit.length; ++i) {
        switch (suit[i]) {
            case 'A':
                sum += 4
                break;
            case 'K':
                sum += 3;
                break;
            case 'Q':
                sum += 2;
                break;
            case 'J':
                sum += 1;
                break;
            default:
                break;
        }
    }
    return sum;
}

function download() :void {
    let text = JSON.stringify(allStories.value, null, 2)
    let filename = "download.json";
    let element = document.createElement('a');
    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
	document.body.removeChild(element);
}

const answerMode = ref(false);
const input_text = ref("");
const alert = ref(false);
const board_num = ref(1);
const auction = ref<Call[]>([]);
const answer = ref("");
const explanation = ref<{[index: string]: string}>({});
const questList = ref<Quest[]>([]);

const selectedQuestType = ref("開叫");
const allStories = ref<QuestLib>(quest);

const spades = ref("");
const hearts = ref("");
const diamonds = ref("");
const clubs = ref("");
const copySuccess = ref(false);
const questJson = computed(() => JSON.stringify(questList.value, null, 2));
const hcp = computed(() => {
    return computeSuitHCP(spades.value) + computeSuitHCP(hearts.value)
        + computeSuitHCP(diamonds.value) + computeSuitHCP(clubs.value);
});
const cardCount = computed(() => {
    return spades.value.length + hearts.value.length + diamonds.value.length + clubs.value.length;
});

const title = useState('title');
onMounted(() => {
    title.value = "Quest生成器";
});
</script>

<template>
    <header>
        <h1 class="topic"><NuxtLink to="/">QuestGen</NuxtLink></h1>
        題庫：<select id="questlib" v-model="selectedQuestType">
            <option v-for="(x, key) in allStories">{{ key }}</option></select>
        <button @click="download">下載題目</button>
    </header>
    <div class="maingrid">
        <div>
            <label for="spades"><span style="color:black">&#9824;</span> </label>
            <input type="text" id="spades" name="spades" v-model="spades">
        </div>
        <div>
            <label for="hearts"><span style="color:tomato">&#9829;</span> </label>
            <input type="text" id="hearts" name="hearts" v-model="hearts">
        </div>
        <div>
            <label for="diamonds"><span style="color:orange">&#9830;</span> </label>
            <input type="text" id="diamonds" name="diamonds" v-model="diamonds">
        </div>
        <div>
            <label for="clubs"><span style="color:DarkSlateGray">&#9827;</span> </label>
            <input type="text" id="clubs" name="clubs" v-model="clubs">
        </div>
        <div>
            <label for="boardNum">牌號：</label>
            <input v-model="board_num" type="number" id="boardNum" name="boardNum" min="1">
        </div>
        <div>
            <input id="auctionEnter" name="answerMode" type="radio" v-model="answerMode" v-bind:value="false"><label for="auctionEnter">輸入叫序</label>
            <input id="answerEnter" name="answerMode" type="radio" v-model="answerMode" v-bind:value="true"><label for="answerEnter">輸入答案與解釋</label>
        </div>
        <button @click="clearAuction">清除全部叫序</button>
        <button @click="deleteBid">刪除最後叫品</button>
        <p>HCP: {{ hcp }}</p>
        <p>總牌張數： {{ cardCount }}</p>
        <p>總題數： {{ questList.length }}</p>
    </div>
    <bidding-box v-bind:on-click="auctionClicked" showAlert="true" showInput="true" v-model:inputText="input_text" v-model:alert="alert" v-model:auction="auction"/>
    <auction-box v-model:auction="auction" v-model:board_num="board_num"/>
    <h3>Answer: <span v-html="textAuction(answer)"></span></h3>
    <div class="maingrid" v-for="(exp, key) in explanation" :key="key">
        <span v-html="textAuction(key.toString())"></span>
        <input type="text" v-model="explanation[key]" :id="key.toString()">
        <button @click="delete explanation[key]">Delete</button>
        <button @click="answer = key.toString()">Set as answer</button>
    </div>
    <div class="secondgrid">
        <button @click="summitQuest">新增題目</button>
        <button @click="copy">複製JSON</button>
    </div>
    <p>{{ questJson }}</p>


</template>
<style scoped>
.maingrid {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
}
.secondgrid {
    padding: 10px;
    display: grid;
    grid-template-columns: auto auto;
}

.secondgrid button {
    padding: 10px;
}
</style>