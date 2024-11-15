<script setup>
import textAuction from '~/modules/textAuction';
import suitSign from '~/modules/suitSign';

const board_num = defineModel('board_num', {default: 1});
const auction = defineModel('auction', {default: []});
const lastBid = defineModel('lastBid', {default: "?"});
const colorLastBid = defineModel('colorLastBid', {default: "#e0fee0"});
const seatHeader = computed(() => {
    let ret = [
        {name: "North", vulnerable: false},
        {name: "East", vulnerable: false},
        {name: "South", vulnerable: false},
        {name: "West", vulnerable: false},
    ];
    switch ((board_num.value - 1) & 0xF) {
        case 0:
        case 7:
        case 10:
        case 13:
            ret[0].vulnerable = false;
            ret[1].vulnerable = false;
            ret[2].vulnerable = false;
            ret[3].vulnerable = false;
            break;
        case 1:
        case 4:
        case 11:
        case 14:
            ret[0].vulnerable = true;
            ret[1].vulnerable = false;
            ret[2].vulnerable = true;
            ret[3].vulnerable = false;
            break;
        case 2:
        case 5:
        case 8:
        case 15:
            ret[0].vulnerable = false;
            ret[1].vulnerable = true;
            ret[2].vulnerable = false;
            ret[3].vulnerable = true;
            break;
        case 3:
        case 6:
        case 9:
        case 12:
            ret[0].vulnerable = true;
            ret[1].vulnerable = true;
            ret[2].vulnerable = true;
            ret[3].vulnerable = true;
            break;
    }
    return ret;
});
</script>

<template>
    <div class="bidding-grid" ref="bidgrid">
        <div class="seat_header" v-for="seat in seatHeader" :key="seat.name" v-bind:style="{ backgroundColor: seat.vulnerable ? 'Tomato' : 'mediumseagreen' }">
            {{ seat.name }}
        </div>
        <div v-for="x in (board_num - 1) & 3"></div>
        <div class="auction_tip" v-bind:style="{backgroundColor: bid.explanation === '' ? '#e0fee0' : 'WhiteSmoke', borderColor: bid.alert ? 'red' : '#e0fee0'}" v-for="(bid, index) in auction" :key="index">
            <span v-html="textAuction(bid.name)">
            </span><span v-if="bid.explanation !== ''" class="auction_tip_text" v-html="suitSign(bid.explanation)"></span>
        </div>
        <div class="auction_tip" v-bind:style="{ 'background-color': colorLastBid }">
            <span v-html="textAuction(lastBid)"></span>
        </div>
    </div>
</template>

<style scoped>
.bidding-grid {
    grid-row: span 3;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    background-color: #e0fee0;
    border-radius: 5px;
}
.bidding-grid > div {
    text-align: center;
    padding: 10px;
    font-family: "Taipei Sans SC Beta", 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;
}
.bidding-grid > .seat_header {
    color: white;
    font-variant: small-caps;
}
.auction_tip {
    position: relative;
    display: inline-block;
    border-radius: 3px;
    border-style: solid;
    border-width: 3px;
    border-color: #e0fee0;
    margin: 2px
}

.auction_tip .auction_tip_text {
    visibility: hidden;
    width: max-content;
    max-width: 400px;
    top: 70%;
    background-color: lemonchiffon;
    color: black;
    text-align: left;
    padding: 5px 5px;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
}

.auction_tip:hover .auction_tip_text {
    visibility: visible;
}
</style>