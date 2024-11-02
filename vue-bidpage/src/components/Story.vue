<template>
    <header>
        <h3 style="color: white; font-family: sans-serif;"><router-link to="/">叫牌練習區</router-link> 題目：<select v-on:change="changeQuest()" v-model="selectedQuest">
        <option v-for="(q, index) in allStories">{{ index+1 }}</option>
    </select></h3>
    </header>
    <div class="story-grid">
        <div class="hand-box">
            <span style="color:black">&#9824;</span> {{ Quest.spades }}<br>
            <span style="color:tomato">&#9829;</span> {{ Quest.hearts }}<br>
            <span style="color:orange">&#9830;</span> {{ Quest.diamonds }}<br>
            <span style="color:DarkSlateGray">&#9827;</span> {{ Quest.clubs }}<br>
        </div>
        <div>
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
            </div>
        </div>
        <div>
            <div class="answer-grid">
                <button v-for="bid in ['1C', '2C', '3C', '4C', '5C', '6C', '7C', 'Pass', '1D', '2D', '3D', '4D', '5D', '6D', '7D', 'X', '1H', '2H', '3H', '4H', '5H', '6H', '7H', 'XX', '1S', '2S', '3S', '4S', '5S', '6S', '7S']" v-on:click="showExplanation(bid)"><span v-html="textAuction(bid)"></span></button>
            </div>
        </div>
        <div id="explanation">
            <h2><span v-html="textAuction(Explanation[0])"></span></h2>
            <p style="font-size: 24px;">{{ Explanation[1] }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // Quest is an object of question
            Quest: {spades: "AKQJT", hearts: "QJ65", diamonds: "32", clubs: "32", auction: ['1S','P','2H','P','?'], answers: {'3H': '這是正確的答案，有支持要優先叫出，尤其是在高花，不需要有多餘力量。'}},
            Explanation: ["", ""],
            selectedQuest: 1,
            allStories: [
                {spades: "AKQJT", hearts: "QJ65", diamonds: "32", clubs: "32", auction: ['1S','P','2H','P','?'], answers: {'3H': '這是正確的答案，有支持要優先叫出，尤其是在高花，不需要有多餘力量。'}},
                {spades: "", hearts: "", diamonds: "", clubs: "AKQJT98765432", auction: ['?'], answers: {'2C': '可以接受的答案，因為這是一個迫叫，但有更好的答案', '7C': '最好的答案，直接決定合約，避免同伴誤會。'}},
                {spades: "QJ32", hearts: "AJ63", diamonds: "K5", clubs: "J96", auction: ['?'], answers: {'1C': '正確：有12個點要開叫，由於我們打5542，所以這種牌只能開叫梅花。', '1D': '錯誤：方塊開叫保證四張', '1H': '錯誤：高花開叫要有五張才行', '1S': '錯誤：高花開叫要有五張才行'}}
            ],
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
            if (this.Quest.answers[bid] !== undefined) {
                this.Explanation[1] = this.Quest.answers[bid];
            } else {
                this.Explanation[1] = "答案錯誤，請再試試看！";
            }
        },
        changeQuest() {
            this.Quest = this.allStories[this.selectedQuest-1]
        },
    },
    mounted() {
        this.$root.$data.showBook = false;
        document.documentElement.style.overflow = 'hidden';
    },
    unmounted() {
        this.$root.$data.showBook = true;
        document.documentElement.style.overflow = 'scroll';
    }
}
</script>

<style scoped>
.story-grid {
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 40% 60%;
    font-size: 25px;
}
.story-grid > div {
    text-align: left;
    padding: 20px 0;
}
.bidding-grid {
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
    padding: 20px;
}
.answer-grid {
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto auto;
}
button {
    font-size: 30px;
    padding: 5px 0;
}
select {
    font-family: "游明朝 Light", serif;
    font-weight: bold;
    font-size: 28px;
}
header {
    font-family: "Taipei Sans SC Beta", sans-serif;
    font-weight: bold;
    background-color: green;
    padding: 5px 20px;
}
</style>