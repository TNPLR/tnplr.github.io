<script setup>
import { computed, ref } from "vue";
import BiddingBox from "./BiddingBox.vue";
import AuctionBox from "./AuctionBox.vue";
import textAuction from "./textAuction";

function copy() {
    navigator.clipboard.writeText(questJson.value).then(() => {
        copySuccess.value = true;
    });
}

function pushAuction(bid) {
    if (bid === "Pass") {
        bid = "P";
    }
    auction.value.push({name: bid, explanation: input_text.value, alert: alert.value});
    input_text.value = "";
    alert.value = false;
}

function pushExplanation(bid) {
    if (Object.keys(explanation.value).length === 0) {
        answer.value = bid;
    }
    explanation.value[bid] = input_text.value;
    input_text.value = "";
}

function auctionClicked(bid) {
    if (answerMode.value) {
        pushExplanation(bid);
    } else {
        pushAuction(bid);
    }
}
function clearAuction() {
    auction.value = [];
}
function deleteBid() {
    auction.value.pop();
}
function summitQuest() {
    let quest = {
        spades: spades.value,
        hearts: hearts.value,
        diamonds: diamonds.value,
        clubs: clubs.value,
        auction: auction.value,
        answers: explanation.value,
        correct: answer,
        board_num: board_num.value
    };
    questList.value.push(quest);
    answerMode.value = false;
    clearAuction();
    explanation.value = {};
    spades.value = "";
    hearts.value = "";
    diamonds.value = "";
    clubs.value = "";
}

function computeSuitHCP(suit) {
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

const answerMode = ref(false);
const input_text = ref("");
const alert = ref(false);
const board_num = ref(1);
const auction = ref([]);
const answer = ref("");
const explanation = ref({});
const questList = ref([]);
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
</script>

<template>
    <header>
        <h1 class="topic">QuestGen</h1>
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
            <input v-model="board_num" type="number" id="boardNum" name="boardNum" min="1" value="1">
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
        <span v-html="textAuction(key)"></span>
        <input type="text" v-model="explanation[key]" :id="key">
        <button @click="delete explanation[key]">Delete</button>
        <button @click="answer = key">Set as answer</button>
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