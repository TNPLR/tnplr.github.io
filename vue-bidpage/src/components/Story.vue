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
                <div class="header">
                    North
                </div>
                <div class="header">
                    East
                </div>
                <div class="header">
                    South
                </div>
                <div class="header">
                    West
                </div>
                <div v-for="text in Quest.auction"><span v-html="textAuction(text)"></span></div>
                <div v-bind:style="{ 'background-color': explanationColor }"><span v-html="textAuction(Explanation[2])"></span></div>
            </div>
        </div>
        <div>
            <div class="answer-grid">
                <button v-on:click="showExplanation('Pass')" v-bind:disabled="!bidbutton[0].display" style="grid-column: span 3;">Pass</button>
                <button v-for="bid in bidbutton.slice(1, 3)" :key="bid.name" v-on:click="showExplanation(bid.name)" v-bind:disabled="!bid.display" style="grid-column: span 2;"><span v-html="textAuction(bid.name)"></span></button>
                <button v-for="number in 7" v-on:click="selectedLevel = number">{{ number }}</button>
                <button v-for="bid in bidbutton.slice(3, 8)" :key="bid.name"  v-on:click="showExplanation(bid.name)" v-show="selectedLevel === 1" v-bind:disabled="!bid.display"><span v-html="textAuction(bid.name)"></span></button>
                <button v-for="bid in bidbutton.slice(8, 13)" :key="bid.name"  v-on:click="showExplanation(bid.name)" v-show="selectedLevel === 2" v-bind:disabled="!bid.display"><span v-html="textAuction(bid.name)"></span></button>
                <button v-for="bid in bidbutton.slice(13, 18)" :key="bid.name"  v-on:click="showExplanation(bid.name)" v-show="selectedLevel === 3" v-bind:disabled="!bid.display"><span v-html="textAuction(bid.name)"></span></button>
                <button v-for="bid in bidbutton.slice(18, 23)" :key="bid.name"  v-on:click="showExplanation(bid.name)" v-show="selectedLevel === 4" v-bind:disabled="!bid.display"><span v-html="textAuction(bid.name)"></span></button>
                <button v-for="bid in bidbutton.slice(23, 28)" :key="bid.name"  v-on:click="showExplanation(bid.name)" v-show="selectedLevel === 5" v-bind:disabled="!bid.display"><span v-html="textAuction(bid.name)"></span></button>
                <button v-for="bid in bidbutton.slice(28, 33)" :key="bid.name"  v-on:click="showExplanation(bid.name)" v-show="selectedLevel === 6" v-bind:disabled="!bid.display"><span v-html="textAuction(bid.name)"></span></button>
                <button v-for="bid in bidbutton.slice(33, 38)" :key="bid.name"  v-on:click="showExplanation(bid.name)" v-show="selectedLevel === 7" v-bind:disabled="!bid.display"><span v-html="textAuction(bid.name)"></span></button>
            </div>
        </div>
        <div id="explanation">
            <h3 ><span v-html="textAuction(Explanation[0])"></span></h3>
            <p>{{ Explanation[1] }}</p>
        </div>
    </div>
</template>

<script>
import quest from "./quest.json"
export default {
    data() {
        return {
            // Quest is an object of question
            Quest: {},
            Explanation: ["", "", "?"],
            bidbutton: [
                {name: "Pass", display: true},
                {name: "X", display: true},
                {name: "XX", display: true},
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
                    this.explanationColor = 'white';
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
            
            // Print correct bidding choices (by bridge rules)
            this.lockBidButton(this.Quest.auction)
        },
        lockBidButton(auction) {
            if (auction === undefined || auction.length == 0) {
                this.bidbutton[1].display = false;
                this.bidbutton[2].display = false;
                return;
            }
            let tmp_auction = auction.slice().reverse();
            // 1 is the previous bidder
            let doubled = 0;
            let redoubled = 0;
            let maxbid_i = undefined;

            let maxbid = undefined;
            

            for (let i = 0; i < tmp_auction.length; i++) {
                if (tmp_auction[i] == "P") {
                    continue;
                }
                if (tmp_auction[i] == "X") {
                    doubled = i + 1;
                    continue;
                }
                if (tmp_auction[i] == "XX") {
                    redoubled = i + 1;
                    continue
                }
                maxbid = tmp_auction[i];
                maxbid_i = i + 1;
                break;
            }
            if (maxbid === undefined) {
                this.bidbutton[1].display = false;
                this.bidbutton[2].display = false;
                this.bidbutton.slice(3).forEach(bid => {bid.display = true;});
                return;
            }
            let index = this.bidbutton.findIndex((bid) => {return bid.name == maxbid;});
            this.bidbutton.slice(3, index + 1).forEach((b) => {b.display = false});
            this.bidbutton.slice(index + 1).forEach(bid => {bid.display = true;});
            if ((doubled & 1) === 1 && redoubled === 0) {
                this.bidbutton[1].display = false;
                this.bidbutton[2].display = true;
            } else if ((maxbid_i & 1) === 1 && doubled === 0) {
                this.bidbutton[1].display = true;
                this.bidbutton[2].display = false;
            } else {
                this.bidbutton[1].display = false;
                this.bidbutton[2].display = false;
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
    grid-template-columns: auto auto auto auto;
}
.bidding-grid > div {
    text-align: center;
    padding: 10px;
    font-family: "Taipei Sans SC Beta", 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;
}
.bidding-grid > .header {
    background-color: mediumseagreen;
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
    background-color: green;
    padding: 5px 20px;
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