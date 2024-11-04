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
                <button v-on:click="showExplanation('Pass')" style="grid-column: span 3;">Pass</button>
                <button v-for="bid in ['X', 'XX']" v-on:click="showExplanation(bid)" style="grid-column: span 2;">{{ bid }}</button>
                <button v-for="number in 7" v-on:click="selectedLevel = number">{{ number }}</button>
                <button v-for="bid in ['1C','1D','1H','1S','1NT']" v-on:click="showExplanation(bid)" v-show="selectedLevel === 1"><span v-html="textAuction(bid)"></span></button>
                <button v-for="bid in ['2C','2D','2H','2S','2NT']" v-on:click="showExplanation(bid)" v-show="selectedLevel === 2"><span v-html="textAuction(bid)"></span></button>
                <button v-for="bid in ['3C','3D','3H','3S','3NT']" v-on:click="showExplanation(bid)" v-show="selectedLevel === 3"><span v-html="textAuction(bid)"></span></button>
                <button v-for="bid in ['4C','4D','4H','4S','4NT']" v-on:click="showExplanation(bid)" v-show="selectedLevel === 4"><span v-html="textAuction(bid)"></span></button>
                <button v-for="bid in ['5C','5D','5H','5S','5NT']" v-on:click="showExplanation(bid)" v-show="selectedLevel === 5"><span v-html="textAuction(bid)"></span></button>
                <button v-for="bid in ['6C','6D','6H','6S','6NT']" v-on:click="showExplanation(bid)" v-show="selectedLevel === 6"><span v-html="textAuction(bid)"></span></button>
                <button v-for="bid in ['7C','7D','7H','7S','7NT']" v-on:click="showExplanation(bid)" v-show="selectedLevel === 7"><span v-html="textAuction(bid)"></span></button>
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
        },
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