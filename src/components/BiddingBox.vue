<script setup>
import { onMounted, ref, watch } from 'vue'
import textAuction from './textAuction.js';
const showDouble = ref(false);
const showReDouble = ref(false);
const showAlert = defineModel('showAlert', {default: false});
const selectedLevel = defineModel('selectedLevel', { default: undefined});
const maxHiddenBid = ref('');
const showInput = defineModel('showInput', {default: false});
const inputText = defineModel('inputText', {default: ""});
const alert = defineModel('alert', {default: false});
const auction = defineModel('auction', {default: []});

const props = defineProps({
    onClick: {
        type: Function,
        default() {
            return 0;
        }
    },
    showOnClick: {
        type: Function,
        default(bid) {
            return textAuction(bid);
        }
    },
});

const bidbutton = ref([
    {name: "1C", display: true},
    {name: "1D", display: true},
    {name: "1H", display: true},
    {name: "1S", display: true},
    {name: "1NT", display: true},
    {name: "2C", display: true},
    {name: "2D", display: true},
    {name: "2H", display: true},
    {name: "2S", display: true},
    {name: "2NT", display: true},
    {name: "3C", display: true},
    {name: "3D", display: true},
    {name: "3H", display: true},
    {name: "3S", display: true},
    {name: "3NT", display: true},
    {name: "4C", display: true},
    {name: "4D", display: true},
    {name: "4H", display: true},
    {name: "4S", display: true},
    {name: "4NT", display: true},
    {name: "5C", display: true},
    {name: "5D", display: true},
    {name: "5H", display: true},
    {name: "5S", display: true},
    {name: "5NT", display: true},
    {name: "6C", display: true},
    {name: "6D", display: true},
    {name: "6H", display: true},
    {name: "6S", display: true},
    {name: "6NT", display: true},
    {name: "7C", display: true},
    {name: "7D", display: true},
    {name: "7H", display: true},
    {name: "7S", display: true},
    {name: "7NT", display: true},
]);

const minLevel = ref(1);

function hidBid(maxbid) {
    const i = bidbutton.value.findIndex(x => x.name === maxbid);
    bidbutton.value.slice(0, i+1).forEach(bid => {bid.display = false;});
    bidbutton.value.slice(i+1).forEach(bid => {bid.display = true;});
    minLevel.value = Math.floor((i+1)/5+1);
}

function lockBidButton(auction) {
    if (auction === undefined || auction.length == 0) {
        maxHiddenBid.value = '';
        showDouble.value = false;
        showReDouble.value = false;
        return;
    }
    const tmp_auction = auction.slice().reverse();
    // 1 is the previous bidder
    let doubled = 0;
    let redoubled = 0;
    let maxbid_i = undefined;
    let maxbid = undefined; 

    for (let i = 0; i < tmp_auction.length; i++) {
        if (tmp_auction[i].name == "P") {
            continue;
        }
        if (tmp_auction[i].name == "X") {
            doubled = i + 1;
            continue;
        }
        if (tmp_auction[i].name == "XX") {
            redoubled = i + 1;
            continue
        }
        maxbid = tmp_auction[i].name;
        maxbid_i = i + 1;
        break;
    }
    if (maxbid === undefined) {
        maxHiddenBid.value = '';
        showDouble.value = false;
        showReDouble.value = false;
        return;
    }
    maxHiddenBid.value = maxbid;

    if ((doubled & 1) === 1 && redoubled === 0) {
        showDouble.value = false;
        showReDouble.value = true;
    } else if ((maxbid_i & 1) === 1 && doubled === 0) {
        showDouble.value = true;
        showReDouble.value = false;
    } else {
        showDouble.value = false;
        showReDouble.value = false;
    }
}

watch (auction, lockBidButton, {deep: true});
watch (maxHiddenBid, hidBid);
</script>            


<template>
    <div class="answer-grid">
        <button v-on:click="onClick('Pass')" style="grid-column: span 2;">Pass</button>

        <button v-on:click="onClick('X')" v-bind:style="{visibility: showDouble ? 'visible' : 'hidden'}" style="grid-column: span 2;"><span v-html="showOnClick('X')"></span></button>
        <button v-on:click="onClick('XX')" v-bind:style="{visibility: showReDouble ? 'visible' : 'hidden'}" style="grid-column: span 2;"><span v-html="showOnClick('XX')"></span></button>
        <button @click="alert = !alert" v-bind:style="{visibility: showAlert ? 'visible' : 'hidden'}" v-bind:class="alert ? 'alertClass' : ''">Alert</button>

        <button v-for="number in 7" v-bind:style="{visibility: minLevel <= number ? 'visible' : 'hidden'}" v-on:click="selectedLevel = number">{{ number }}</button>

        <button v-for="bid in bidbutton.slice(0, 5)" :key="bid.name"  v-on:click="onClick(bid.name)" v-show="selectedLevel === 1" v-bind:style="{visibility: bid.display ? 'visible' : 'hidden'}"><span v-html="showOnClick(bid.name)"></span></button>
        <button v-for="bid in bidbutton.slice(5, 10)" :key="bid.name"  v-on:click="onClick(bid.name)" v-show="selectedLevel === 2" v-bind:style="{visibility: bid.display ? 'visible' : 'hidden'}"><span v-html="showOnClick(bid.name)"></span></button>
        <button v-for="bid in bidbutton.slice(10, 15)" :key="bid.name"  v-on:click="onClick(bid.name)" v-show="selectedLevel === 3" v-bind:style="{visibility: bid.display ? 'visible' : 'hidden'}"><span v-html="showOnClick(bid.name)"></span></button>
        <button v-for="bid in bidbutton.slice(15, 20)" :key="bid.name"  v-on:click="onClick(bid.name)" v-show="selectedLevel === 4" v-bind:style="{visibility: bid.display ? 'visible' : 'hidden'}"><span v-html="showOnClick(bid.name)"></span></button>
        <button v-for="bid in bidbutton.slice(20, 25)" :key="bid.name"  v-on:click="onClick(bid.name)" v-show="selectedLevel === 5" v-bind:style="{visibility: bid.display ? 'visible' : 'hidden'}"><span v-html="showOnClick(bid.name)"></span></button>
        <button v-for="bid in bidbutton.slice(25, 30)" :key="bid.name"  v-on:click="onClick(bid.name)" v-show="selectedLevel === 6" v-bind:style="{visibility: bid.display ? 'visible' : 'hidden'}"><span v-html="showOnClick(bid.name)"></span></button>
        <button v-for="bid in bidbutton.slice(30, 35)" :key="bid.name"  v-on:click="onClick(bid.name)" v-show="selectedLevel === 7" v-bind:style="{visibility: bid.display ? 'visible' : 'hidden'}"><span v-html="showOnClick(bid.name)"></span></button>
        <input id="explanationInput" name="explanationInput" type="text" v-model="inputText" v-bind:style="{visibility: showInput ? 'visible' : 'hidden', gridColumn: '6 / span 2'}">
    </div>
</template>

<style scoped>
.answer-grid {
    display: grid;
    grid-template-columns: 15% 14% 14% 14% 14% 14% 15%;
}
button {
    font-size: medium;
    margin: 2px;
    padding: 5px 0;
}
.alertClass {
    background-color: red;
    color: white;
    font-weight: bold;
}
</style>