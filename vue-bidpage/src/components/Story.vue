<template id="storytemplate">
    <header class="headergrid">
        <div class="storyopt">
            <router-link to="/">叫牌練習區</router-link>
        </div>
        <div class="storyopt" id="qtypeopt">
            題庫：<select v-on:change="selectedQuest = 1; changeQuest();" v-model="selectedQuestType">
                <option v-for="q in questType">{{ q }}</option></select>
        </div>
        <div class="storyopt">
            題目：<select v-on:change="changeQuest()" v-model="selectedQuest">
                <option v-for="(q, index) in allStories[selectedQuestType]">{{ index+1 }}</option></select>
        </div>
        <div class="storyopt">
            <button class="questset" v-bind:disabled="selectedQuest <= 1" v-on:click="selectedQuest--; changeQuest();">上一題</button>
            <button class="questset" v-bind:disabled="selectedQuest >= allStories[selectedQuestType].length" v-on:click="selectedQuest++; changeQuest();">下一題</button>
            <button class="questset" v-on:click="showExplanation(Quest.correct)">公布答案</button>
        </div>
        <div style="clear: left;"></div>
    </header>
    <div class="story-grid">
        <div class="hand-box">
            <span style="color:black">&#9824;</span> {{ Quest.spades }} 
            <span style="color:tomato">&#9829;</span> {{ Quest.hearts }} 
            <span style="color:orange">&#9830;</span> {{ Quest.diamonds }} 
            <span style="color:DarkSlateGray">&#9827;</span> {{ Quest.clubs }} 
        </div>
        <div class="auctiongrid">
            <div class="bidding-grid" ref="bidgrid">
                <div class="seat_header" v-for="seat in seatHeader" :key="seat.name" v-bind:style="{ backgroundColor: seat.vulnerable ? 'Tomato' : 'mediumseagreen' }">
                    {{ seat.name }}
                </div>
                <div v-for="x in (Quest.board_num - 1) & 3"></div>
                <div class="auction_tip" v-bind:style="{backgroundColor: bid.explanation === '' ? '#e0fee0' : 'WhiteSmoke', borderColor: bid.alert ? 'red' : '#e0fee0'}" v-for="(bid, index) in Quest.auction" :key="index">
                    <span v-html="textAuction(bid.name)">
                    </span><span v-if="bid.explanation !== ''" class="auction_tip_text">{{ bid.explanation }}</span></div>

                    <div class="auction_tip" v-bind:style="{ 'background-color': explanationColor }"><span v-html="textAuction(Explanation[2])"></span></div>
            </div>
        </div>
        <div>
            <bidding-box v-bind:onClick="showExplanation" v-bind:showOnClick="textAuction" v-model:selectedLevel="selectedLevel" v-model:showDouble="showdouble" v-model:showReDouble="showredouble" v-model:maxHiddenBid="maxhiddenbid" ref="bbox"/>
        </div>
        <div id="explanation">
            <h3 ><span v-html="textAuction(Explanation[0])"></span></h3>
            <p>{{ Explanation[1] }}</p>
        </div>
    </div>
</template>

<script>
import BiddingBox from "./BiddingBox.vue";
import quest from "./quest.json"
export default {
    data() {
        return {
            // Quest is an object of question
            Quest: {},
            Explanation: ["", "", "?"],
            showdouble: false,
            showredouble: false,
            maxhiddenbid: '',
            seatHeader: [
                {name: "North", vulnerable: true},
                {name: "East", vulnerable: false},
                {name: "South", vulnerable: false},
                {name: "West", vulnerable: false},
            ],
            selectedLevel: undefined,
            selectedQuestType: '開叫',
            selectedQuest: 1,
            explanationColor: 'white',
            questType: ['開叫', '低花開叫的答叫', '高花開叫的答叫', '1NT開叫的答叫','2NT開叫的答叫', '低花開叫的再叫', '迫叫1NT後續','其他'],
            allStories: quest,
        };
    },
    methods: {
        textAuction(bid) {
            let text = bid;
            text = text.replace(/([1-7])H/, "$1<span style=\"color:tomato\">&#9829;</span>");
            text = text.replace(/([1-7])D/, "$1<span style=\"color:orange\">&#9830;</span>");
            text = text.replace(/([1-7])C/, "$1<span style=\"color:DarkSlateGray\">&#9827;</span>");
            text = text.replace(/([1-7])S/, "$1<span style=\"color:black\">&#9824;</span>");
            return text;
        },
        replaceSuitSigns(ref) {
            let text = ref.innerHTML;
            text = text.replace(/!H/g, "<span style=\"color:tomato\">&#9829;</span>");
            text = text.replace(/!D/g, "<span style=\"color:orange\">&#9830;</span>");
            text = text.replace(/!C/g, "<span style=\"color:DarkSlateGray\">&#9827;</span>");
            ref.innerHTML = text.replace(/!S/g, "<span style=\"color:black\">&#9824;</span>");
        },
        showExplanation(bid) {
            this.Explanation[0] = bid;
            this.Explanation[2] = bid;
            if (this.Quest.correct === bid) {
                this.explanationBidStyle(2);
            } else {
                this.explanationBidStyle(1);
            }
            if (this.Quest.answers[bid] !== undefined) {
                this.Explanation[1] = this.Quest.answers[bid];
            } else if (this.Quest.correct === bid) {
                this.Explanation[1] = "答案正確！";
            } else {
                this.Explanation[1] = "答案錯誤，請再試試看！";
            }
        },
        explanationBidStyle(type) {
            switch (type) {
                case 0:
                    this.explanationColor = '#e0fee0';
                    break;
                case 1:
                    this.explanationColor = 'Gainsboro';
                    break;
                case 2:
                    this.explanationColor = 'Moccasin';
            }
        },
        changeQuest() {
            this.Explanation[0] = "";
            this.Explanation[1] = "";
            this.Explanation[2] = "?";
            this.explanationBidStyle(0);
            this.Quest = this.allStories[this.selectedQuestType][this.selectedQuest-1];
            this.selectedLevel = undefined;
            // Set vulnerability
            let cn = (this.Quest.board_num - 1) & 0xF;
            switch (cn) {
                case 0:
                case 7:
                case 10:
                case 13:
                    this.seatHeader[0].vulnerable = false;
                    this.seatHeader[1].vulnerable = false;
                    this.seatHeader[2].vulnerable = false;
                    this.seatHeader[3].vulnerable = false;
                    break;
                case 1:
                case 4:
                case 11:
                case 14:
                    this.seatHeader[0].vulnerable = true;
                    this.seatHeader[1].vulnerable = false;
                    this.seatHeader[2].vulnerable = true;
                    this.seatHeader[3].vulnerable = false;
                    break;
                case 2:
                case 5:
                case 8:
                case 15:
                    this.seatHeader[0].vulnerable = false;
                    this.seatHeader[1].vulnerable = true;
                    this.seatHeader[2].vulnerable = false;
                    this.seatHeader[3].vulnerable = true;
                    break;
                case 3:
                case 6:
                case 9:
                case 12:
                    this.seatHeader[0].vulnerable = true;
                    this.seatHeader[1].vulnerable = true;
                    this.seatHeader[2].vulnerable = true;
                    this.seatHeader[3].vulnerable = true;
                    break;
            }
            
            // Print correct bidding choices (by bridge rules)
            this.lockBidButton(this.Quest.auction)
        },
        lockBidButton(auction) {
            if (auction === undefined || auction.length == 0) {
                this.maxhiddenbid = '';
                this.showdouble = false;
                this.showredouble = false;
                return;
            }
            let tmp_auction = auction.slice().reverse();
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
                this.maxhiddenbid = '';
                this.showdouble = false;
                this.showredouble.display = false;
                return;
            }
            this.maxhiddenbid = maxbid;

            if ((doubled & 1) === 1 && redoubled === 0) {
                this.showdouble = false;
                this.showredouble = true;
            } else if ((maxbid_i & 1) === 1 && doubled === 0) {
                this.showdouble = true;
                this.showredouble = false;
            } else {
                this.showdouble = false;
                this.showredouble = false;
            }
        }
    },
    mounted() {
        this.changeQuest();
        this.$root.$data.showBook = false;
        //document.documentElement.style.overflow = 'hidden';
    },
    unmounted() {
        this.$root.$data.showBook = true;
        //document.documentElement.style.overflow = 'scroll';
    }
}
</script>

<style scoped>
#storytemplate {
    overflow: hidden;
}
.headergrid {
    display: grid;
    grid-template-columns: auto auto auto auto;
}
.storyopt {
    font-family: "游明朝 Light", serif;
    font-weight: bold;
    font-size: large;
    line-height: 100px;
    color: white;
    float: left;
    padding: 0px 20px;
}
.story-grid {
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 45% 55%;
    grid-template-rows: auto auto auto;
    font-size: 25px;
}
.story-grid > div {
    text-align: left;
    padding: 20px 0;
}
.auctiongrid {
    grid-row: span 2;
}
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
#explanation {
    grid-column: span 2;
    padding: 20px;
}
#explanation > p {
    font-size: 20px;
}
.answer-grid {
    display: grid;
    grid-template-columns: 16% 14% 14% 14% 14% 14% 14%;
}
button {
    font-size: medium;
    margin: 2px;
    padding: 5px 0;
}
.questset {
    font-family: "Taipei Sans SC Beta", sans-serif;
    font-size: inherit;
    padding: 5px;
    margin: 0 10px;
}
select {
    font-family: "游明朝 Light", serif;
    font-weight: bold;
    font-size: large;
}

header {
    font-family: "Taipei Sans SC Beta", sans-serif;
    font-weight: bold;
    padding: 5px 20px;
    background-color: green;
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
    background-color: khaki;
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

@media (max-width: 900px) {
    #templategrid {
        overflow: scroll;
    }
    .headergrid {
        font-size: 14px;
        display: grid;
        grid-template-columns: auto auto;
    }
    .story-grid {
        width: 100%;
        height: auto;
        grid-template-columns: 100%;
        grid-template-rows: auto;
        font-size: 20px;
    }
    .story-grid > div {
        grid-column: 1;
    }
    .auctiongrid {
        grid-row: 2;
    }
    #handbox {
        grid-row: 1;
    }
    .bidding-grid {
        grid-row: 3;
    } 
    #explanation {
        grid-row: 4;
    }
    #explanation > p {
        font-size: 16px;
    }
    #explanation > h3 {
        display: none;
    }
    .storyopt {
        font-size: 14px;
        line-height: 50px;
    }
    .storyopt select {
        font-size: 14px;
    }
    #qtypeopt select {
        font-size: 12px;
    }
    button {
        font-size: 16px;
        padding: 5px 0;
    }
    .header {
        padding: 0 20px;
    }
    .questset {
        font-size: 12px;
        padding: 2px;
        margin: 0 2px;
    }
    #explanation {
        padding: 10px;
    }
}
</style>