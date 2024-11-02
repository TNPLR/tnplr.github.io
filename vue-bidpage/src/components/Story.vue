<template>
    <header>
        <h3 style="color: white; font-family: sans-serif;"><router-link to="/">叫牌練習區</router-link>
        題庫：<select v-on:change="selectedQuest = 1; changeQuest();" v-model="selectedQuestType">
        <option v-for="q in questType">{{ q }}</option></select>
            題目：<select v-on:change="changeQuest()" v-model="selectedQuest">
        <option v-for="(q, index) in allStories[selectedQuestType]">{{ index+1 }}</option></select>
        <button id="nextquest" v-show="selectedQuest > 1" v-on:click="selectedQuest--; changeQuest();">上一題</button>
        <button id="nextquest" v-show="selectedQuest + 1 < allStories[selectedQuestType].length" v-on:click="selectedQuest++; changeQuest();">下一題</button>
    </h3>
    </header>
    <div class="story-grid">
        <div class="hand-box">
            <span style="color:black">&#9824;</span> {{ Quest.spades }} 
            <span style="color:tomato">&#9829;</span> {{ Quest.hearts }} 
            <span style="color:orange">&#9830;</span> {{ Quest.diamonds }} 
            <span style="color:DarkSlateGray">&#9827;</span> {{ Quest.clubs }} 
        </div>
        <div style="grid-row: span 2;">
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
            <h3><span v-html="textAuction(Explanation[0])"></span></h3>
            <p style="font-size: 24px;">{{ Explanation[1] }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // Quest is an object of question
            Quest: {},
            Explanation: ["", ""],
            selectedLevel: undefined,
            selectedQuestType: '開叫',
            selectedQuest: 1,
            questType: ['開叫', '首次答叫', '其他'],
            allStories: {
                '開叫': [
                    {spades: "AQ93", hearts: "9", diamonds: "KJT3", clubs: "KJ74", auction: ['?'], answers: {'1C': '錯誤：同時有4張方塊的時候，方塊比較優先', '1D': '正確', '1S': '錯誤：開叫黑桃要有5張以上才行。'}},
                    {spades: "AKQ", hearts: "94", diamonds: "AKJ6", clubs: "J975", auction: ['?'], answers: {'1C': '錯誤：同時有4張方塊的時候，方塊比較優先', '1D': '正確', '1S': '錯誤：開叫黑桃要有5張以上才行。'}},
                    {spades: "A53", hearts: "Q8", diamonds: "AK53", clubs: "AK65", auction: ['?'], answers: {'1D': '錯誤：4張方塊本來應該叫這個叫品，但此時是平均牌，這個點力範圍有更好的叫品', '1NT': '錯誤：1NT是15-17點的平均牌型', '2NT': '正確，20-21點平均牌型叫2NT'}},
                    {spades: "AKJ54", hearts: "AT52", diamonds: "K85", clubs: "A", auction: ['?'], answers: {'1S': '正確'}},
                    {spades: "A6", hearts: "AKJ92", diamonds: "K85", clubs: "KQ4", auction: ['?'], answers: {'1H': '錯誤：這個點力範圍的平均牌型有更好的叫品', '2NT': '正確，即便有5張高花，20-21點平均牌型叫2NT'}},
                    {spades: "Q974", hearts: "A975", diamonds: "K73", clubs: "A3", auction: ['?'], answers: {'1C': '正確：這是這個叫品最短的梅花長度。', '1D': '錯誤：方塊要有四張才能叫這個叫品'}},
                    {spades: "AT5", hearts: "8732", diamonds: "K95", clubs: "KQ8", auction: ['?'], answers: {'1C': '正確', '1D': '錯誤：方塊要有四張才能叫這個叫品'}},
                    {spades: "Q853", hearts: "AKJ", diamonds: "AKQ", clubs: "A74", auction: ['?'], answers: {'Pass': '錯誤：12點以上一定要開叫', '1C': '錯誤：這個點力範圍不能一線開叫。', '2C': '正確：22點以上的牌必從此叫品開始'}},
                    {spades: "94", hearts: "9", diamonds: "JT2", clubs: "AKQJT65", auction: ['?'], answers: {'Pass': '錯誤：這個牌比想像中還要強', '1C': '錯誤：這個點力範圍不能一線開叫。', '2C': '錯誤：這個是代表力量很強，不是代表梅花', '3C': '錯誤：梅花太好了不行叫這個', '3NT': '正確：這是Gambling 3NT的標準牌，AKQ帶頭七張牌，沒有旁門大牌（A或K）'}},
                    {spades: "AK7", hearts: "Q4", diamonds: "AJT843", clubs: "Q3", auction: ['?'], answers: {'Pass': '錯誤：12點以上一定要開叫', '1D': '有更好的叫品：這個點力範圍，而方塊沒有很堅強時，有更好的叫品。', '1NT': '正確：雖然不是平均牌，但這種「半平均牌」可以叫1NT。'}},
                    {spades: "AK", hearts: "Q4", diamonds: "JT843", clubs: "AQT5", auction: ['?'], answers: {'Pass': '錯誤：12點以上一定要開叫', '1D': '有更好的叫品：這個點力範圍的5422牌型，而5張是低花時，有更好的叫品。', '1NT': '正確：雖然不是平均牌，但這種「半平均牌」可以叫1NT。'}},
                    {spades: "AK32", hearts: "AJ63", diamonds: "K5", clubs: "J96", auction: ['?'], answers: {'1C': '錯誤：雖然我們打5542，但這樣的平均牌有更優先的叫品。', '1D': '錯誤：方塊開叫保證四張', '1H': '錯誤：高花開叫要有五張才行', '1S': '錯誤：高花開叫要有五張才行', '1NT': '正確：15-17平均牌型的牌原則上開叫1NT。'}},
                    {spades: "", hearts: "", diamonds: "", clubs: "AKQJT98765432", auction: ['?'], answers: {'2C': '可以接受的答案，因為這是一個迫叫，但有更好的答案', '7C': '最好的答案，直接決定合約，避免同伴誤會。'}},
                    {spades: "QJ32", hearts: "AJ63", diamonds: "K5", clubs: "J96", auction: ['?'], answers: {'1C': '正確：有12個點要開叫，由於我們打5542，所以這種牌只能開叫梅花。', '1D': '錯誤：方塊開叫保證四張', '1H': '錯誤：高花開叫要有五張才行', '1S': '錯誤：高花開叫要有五張才行'}},
                ],
                '首次答叫': [
                    {spades: "AKT9", hearts: "Q652", diamonds: "QJT9", clubs: "2", auction: ['1C','P','?'], answers: {'1D': '錯誤：迫叫成局的情形，長度一樣時，高花優先', '1H': '正確：高花優先叫，兩門高花都四張時，叫紅心。', '1S': '錯誤：兩門高花都四張時，優先叫紅心。'}}
                ],
                '其他': [
                    {spades: "AKQJT", hearts: "QJ65", diamonds: "32", clubs: "32", auction: ['1S','P','2H','P','?'], answers: {'3H': '這是正確的答案，有支持要優先叫出，尤其是在高花，不需要有多餘力量。'}},
                    {spades: "AKT9", hearts: "AQ65", diamonds: "AJT9", clubs: "2", auction: ['1NT','P','2C','P','2S','P','3H','P','4D','P','4NT','P','5C','P','?'], answers: {'5D': '正確：詢問有無黑桃Q'}}
                ],
            }
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
            this.Quest = this.allStories[this.selectedQuestType][this.selectedQuest-1]
        },
    },
    mounted() {
        this.changeQuest();
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
    grid-template-columns: 45% 55%;
    grid-template-rows: auto auto auto;
    font-size: 25px;
}
.story-grid > div {
    text-align: left;
    padding: 20px 0;
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
.answer-grid {
    display: grid;
    grid-template-columns: 16% 14% 14% 14% 14% 14% 14%;
}
button {
    font-size: 30px;
    padding: 5px 0;
}
#lastquest {
    font-family: "Taipei Sans SC Beta", sans-serif;
    font-size: inherit;
    padding: 5px;
    margin: 0 10px;
}
#nextquest {
    font-family: "Taipei Sans SC Beta", sans-serif;
    font-size: inherit;
    padding: 5px;
    margin: 0 10px;
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