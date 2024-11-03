<template id="storytemplate">
    <header class="headergrid">
        <div class="storyopt">
            <router-link to="/">叫牌練習區</router-link>
        </div>
        <div class="storyopt">
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
            Explanation: ["", "", "?"],
            selectedLevel: undefined,
            selectedQuestType: '開叫',
            selectedQuest: 1,
            explanationColor: 'white',
            questType: ['開叫', '低花開叫的答叫', '高花開叫的答叫', '1NT開叫的答叫','2NT開叫的答叫', '低花開叫的再叫', '其他'],
            allStories: {
                '開叫': [
                    {spades: "AQ93", hearts: "9", diamonds: "KJT3", clubs: "KJ74", auction: [], answers: {'1C': '錯誤：同時有4張方塊的時候，方塊比較優先', '1D': '正確', '1S': '錯誤：開叫黑桃要有5張以上才行。'}, correct: '1D'},
                    {spades: "AKQ", hearts: "94", diamonds: "AKJ6", clubs: "J975", auction: [], answers: {'1C': '錯誤：同時有4張方塊的時候，方塊比較優先', '1D': '正確', '1S': '錯誤：開叫黑桃要有5張以上才行。'}, correct: '1D'},
                    {spades: "A53", hearts: "Q8", diamonds: "AK53", clubs: "AK65", auction: [], answers: {'1D': '錯誤：4張方塊本來應該叫這個叫品，但此時是平均牌，這個點力範圍有更好的叫品', '1NT': '錯誤：1NT是15-17點的平均牌型', '2NT': '正確，20-21點平均牌型叫2NT'}, correct: '2NT'},
                    {spades: "AKJ54", hearts: "AT52", diamonds: "K85", clubs: "A", auction: [], answers: {'1S': '正確'}, correct: '1S'},
                    {spades: "A6", hearts: "AKJ92", diamonds: "K85", clubs: "KQ4", auction: [], answers: {'1H': '錯誤：這個點力範圍的平均牌型有更好的叫品', '2NT': '正確，即便有5張高花，20-21點平均牌型叫2NT'}, correct: '2NT'},
                    {spades: "Q974", hearts: "A975", diamonds: "K73", clubs: "A3", auction: [], answers: {'1C': '正確：這是這個叫品最短的梅花長度。', '1D': '錯誤：方塊要有四張才能叫這個叫品'}, correct: '1C'},
                    {spades: "AT5", hearts: "8732", diamonds: "K95", clubs: "KQ8", auction: [], answers: {'1C': '正確', '1D': '錯誤：方塊要有四張才能叫這個叫品'}, correct: '1C'},
                    {spades: "Q853", hearts: "AKJ", diamonds: "AKQ", clubs: "A74", auction: [], answers: {'Pass': '錯誤：12點以上一定要開叫', '1C': '錯誤：這個點力範圍不能一線開叫。', '2C': '正確：22點以上的牌必從此叫品開始'}, correct: '2C'},
                    {spades: "94", hearts: "9", diamonds: "JT2", clubs: "AKQJT65", auction: [], answers: {'Pass': '錯誤：這個牌比想像中還要強', '1C': '錯誤：這個點力範圍不能一線開叫。', '2C': '錯誤：這個是代表力量很強，不是代表梅花', '3C': '錯誤：梅花太好了不行叫這個', '3NT': '正確：這是Gambling 3NT的標準牌，AKQ帶頭七張牌，沒有旁門大牌（A或K）'}, correct: '3NT'},
                    {spades: "AK7", hearts: "Q4", diamonds: "AJT843", clubs: "Q3", auction: [], answers: {'Pass': '錯誤：12點以上一定要開叫', '1D': '有更好的叫品：這個點力範圍，而方塊沒有很堅強時，有更好的叫品。', '1NT': '正確：雖然不是平均牌，但這種「半平均牌」可以叫1NT。'}, correct: '1NT'},
                    {spades: "AK", hearts: "Q4", diamonds: "JT843", clubs: "AQT5", auction: [], answers: {'Pass': '錯誤：12點以上一定要開叫', '1D': '有更好的叫品：這個點力範圍的5422牌型，而5張是低花時，有更好的叫品。', '1NT': '正確：雖然不是平均牌，但這種「半平均牌」可以叫1NT。'}, correct: '1NT'},
                    {spades: "AK32", hearts: "AJ63", diamonds: "K5", clubs: "J96", auction: [], answers: {'1C': '錯誤：雖然我們打5542，但這樣的平均牌有更優先的叫品。', '1D': '錯誤：方塊開叫保證四張', '1H': '錯誤：高花開叫要有五張才行', '1S': '錯誤：高花開叫要有五張才行', '1NT': '正確：15-17平均牌型的牌原則上開叫1NT。'}, correct: '1NT'},
                    {spades: "", hearts: "", diamonds: "", clubs: "AKQJT98765432", auction: [], answers: {'2C': '可以接受的答案，因為這是一個迫叫，但有更好的答案', '7C': '最好的答案，直接決定合約，避免同伴誤會。'},correct: '7C'},
                    {spades: "QJ32", hearts: "AJ63", diamonds: "K5", clubs: "J96", auction: [], answers: {'1C': '正確：有12個點要開叫，由於我們打5542，所以這種牌只能開叫梅花。', '1D': '錯誤：方塊開叫保證四張', '1H': '錯誤：高花開叫要有五張才行', '1S': '錯誤：高花開叫要有五張才行'}, correct: '1C'},
                    {spades: 'QJ43', hearts: 'AT', diamonds: 'KQT96', clubs: 'T7', auction: [], correct: '1D', answers: {'1S': '錯誤：高花要五張才能叫出', '1D': '正確：原則上叫出最長的花色', }},
                    {spades: 'KJ932', hearts: 'AQT', diamonds: '64', clubs: 'A92', auction: [], correct: '1S', answers: {'1S': '正確：原則上五張高花是最重要的叫品', '1NT': '錯誤：要15-17點才能叫1NT', }},
                    {spades: 'AQJ5', hearts: 'AK4', diamonds: 'AQ', clubs: 'T764', auction: [], correct: '2NT', answers: {'2NT': '正確，20-21平均牌型', '1NT': '錯誤，這是15-17平均牌型', '1C': '錯誤，這個範圍的平均牌型有其他叫品', '1S': '錯誤，這個叫品要5張黑桃', }},
                    {spades: 'QJ7', hearts: 'A43', diamonds: 'K43', clubs: 'Q862', auction: [], correct: '1C', answers: {'1C': '正確，沒有其他可以叫的叫品', '1NT': '錯誤，這個叫品點力要15-17點', }},
                    {spades: 'KQ765', hearts: 'A5', diamonds: '8754', clubs: 'AQ', auction: [], correct: '1S', answers: {'1NT': '錯誤，這個是非平均牌，而5張的花色是高花，通常不會忽略掉', '1S': '正確，5張高花優先叫出', '1D': '錯誤，有一門5張高花，應該優先叫出', }},
                    {spades: '3', hearts: 'AT987', diamonds: '5', clubs: 'AKQ965', auction: [], correct: '1H', answers: {'1C': '錯誤，雖然梅花非常強，長度也更長，但因為點力不夠，因此以高花為優先', '1H': '正確，5張高花優先叫出', '2C': '錯誤，這個是代表強牌的叫品，不代表梅花', }},
                    {spades: 'QJ4', hearts: 'KQ76', diamonds: 'Q95', clubs: 'AQ3', auction: [], correct: '1NT', answers: {'1NT': '正確。15-17平均牌型', '1C': '錯誤。這個範圍的平均牌不能叫這個叫品', '1H': '錯誤。這個叫品保證5張紅心', }},
                    {spades: 'J85', hearts: 'AT9', diamonds: 'KJ95', clubs: 'KJ9', auction: [], correct: '1D', answers: {'1D': '正確。此叫品保證4張方塊', '1NT': '錯誤。雖然是平均牌型，但點力不是15-17點', '1C': '錯誤。方塊比梅花長，所以不行叫這個', }},
                    {spades: 'AQT3', hearts: 'T84', diamonds: 'AT3', clubs: 'A73', auction: [], correct: '1C', answers: {'1C': '正確。這個叫品保證2張梅花。因為其他叫品都不適合，所以叫此叫品', '1S': '錯誤。此叫品保證5張黑桃', '1NT': '錯誤。1NT要15-17點才行', }},
                    {spades: 'QT42', hearts: 'KJ62', diamonds: 'Q53', clubs: 'A9', auction: [], correct: '1C', answers: {'1C': '正確。這是這個叫品保證的最短梅花，也是唯一一個2張梅花的牌型', '1H': '錯誤。要五張紅心才能叫這個叫品', }},
                    {spades: 'A4', hearts: 'AQ96', diamonds: 'K74', clubs: 'K964', auction: [], correct: '1NT', answers: {'1NT': '正確。1NT是15-17平均牌型', '1C': '錯誤。這個範圍的平均牌型有其他叫品', '1H': '錯誤。這個叫品保證五張紅心以上', }},
                    {spades: '', hearts: 'QT4', diamonds: 'KQT43', clubs: 'KQ864', auction: [], correct: '1D', answers: {'1D': '正確。同時有兩門等長花色，叫比較高的那個花色', '1C': '錯誤。同時有兩門等長花色，叫比較高的那個花色', '2NT': '錯誤。2NT開叫是20-21平均牌型。蓋叫的2NT才是這樣的牌型', }},
                    {spades: 'T32', hearts: 'AKJT9', diamonds: 'KQJ', clubs: '92', auction: [], correct: '1H', answers: {'1H': '正確。此叫品保證5張紅心，也是我們最優先的叫品', '1NT': '錯誤。這個叫品是15-17點平均牌型', '2H': '錯誤。這個叫品是不到開叫點力的竄叫', }},
                    {spades: 'QJ8643', hearts: 'AQ72', diamonds: 'K5', clubs: '7', auction: [], correct: '1S', answers: {'1S': '正確。此叫品保證5張以上，6張當然很好', '1H': '錯誤。開叫應該要叫最長的花色，且此叫品保證5張紅心', }},
                    {spades: 'KJ43', hearts: 'K4', diamonds: 'AQ762', clubs: 'K9', auction: [], correct: '1NT', answers: {'1D': '不是最佳叫品，因為這種5張低花的半平均牌，不是很好叫，所以有更好的叫品可以使用', '1S': '錯誤。此叫品保證5張黑桃', '1NT': '正確。為了讓後續叫牌好叫，所以把這樣的牌當作1NT的牌型', }},
                    {spades: 'KT932', hearts: 'Q93', diamonds: 'AKT', clubs: 'A4', auction: [], correct: '1NT', answers: {'1S': '可以叫這個叫品，但不是我的正確答案。這副牌的黑桃品質普通，而且是平均牌型，也可以叫1NT', '1NT': '正確。5張普通高花的平均牌型，15-17點，建議叫1NT', }},
                    {spades: 'J82', hearts: 'AT942', diamonds: 'T', clubs: 'AKQ3', auction: [], correct: '1H', answers: {'1H': '正確。5張高花是優先叫品', '1C': '錯誤，雖然梅花有很多大牌，但張數才是叫牌的重點所在', }},
                    {spades: 'J7', hearts: 'AT9753', diamonds: 'T63', clubs: 'K7', auction: [], correct: '2H', answers: {'2H': '正確。這是竄叫，詳細可參考234定律。', }},
                    {spades: 'J3', hearts: 'JT9754', diamonds: 'KJ32', clubs: '9', auction: [], correct: 'Pass', answers: {'2H': '錯誤。牌組品質和點力都有點糟，除非特別約定過，否則不要竄叫', }},
                    {spades: '62', hearts: 'KT9652', diamonds: 'J83', clubs: 'K8', auction: [], correct: '2H', answers: {'2H': '正確。點力適合，牌組不差，可以竄叫', }},
                    {spades: '86', hearts: 'KQJ532', diamonds: 'A6', clubs: 'T75', auction: [], correct: '1H', answers: {'1H': '正確。雖然點力沒有到12點，但紅心牌組很好，所以可以開叫', }},
                ],
                '低花開叫的答叫': [
                    {spades: "T74", hearts: "AQJ", diamonds: "T2", clubs: "Q7542", auction: ['1C','P',], answers: {'3C': '錯誤：梅花要假設同伴是3張，要有6張才能叫這個叫品。', '1H': '錯誤：要有4張紅心才能叫。', '1NT': '正確，6-9(10)點，沒有4張高花。', '2C': '錯誤：這要有11點以上才能叫'}, correct: '1NT'},
                    {spades: "T8643", hearts: "865", diamonds: "A3", clubs: "J64", auction: ['1C','P',], answers: {'Pass': '錯誤：正常要6點才能答叫，但有一張A的時候，可以破例答叫。', '1S': '正確'}, correct: '1S'},
                    {spades: "KQ84", hearts: "T", diamonds: "T92", clubs: "AJT62", auction: ['1C','P',], answers: {'Pass': '錯誤：6點以上一定要答叫。', '2C': '錯誤。這裡要高花優先。', '1S': '正確'}, correct: '1S'},
                    {spades: "AK32", hearts: "7632", diamonds: "95", clubs: "976", auction: ['1C','P',], answers: {'Pass': '錯誤：6點以上一定要答叫。', '1H': '正確', '1S': '錯誤。兩門高花同時有4張，要叫紅心（不管有沒有大牌）'}, correct: '1H'},
                    {spades: "JT82", hearts: "KQJ8", diamonds: "KJT83", clubs: "", auction: ['1C','P',], answers: {'Pass': '錯誤：6點以上一定要答叫。', '1D': '錯誤：沒有迫叫成局的力量時，高花優先答叫', '1H': '正確', '1S': '錯誤。兩門高花同時有4張，要叫紅心'}, correct: '1H'},
                    {spades: "K865", hearts: "9", diamonds: "Q9876", clubs: "T96", auction: ['1C','P',], answers: {'Pass': '正確：6點以上一定要答叫，但5個好點也可以考慮叫牌。', '1S': '正確', '1D': '錯誤。沒有迫叫成局的力量時，高花優先答叫。'}, correct: '1S'},
                    {spades: "2", hearts: "KT6", diamonds: "KJ96", clubs: "AKQ83", auction: ['1C','P',], answers: {'Pass': '錯誤：6點以上一定要答叫。', '2C': '錯誤：有更精準的叫品可以使用。', '3S': '正確。Splinter支持，5張以上梅花且黑桃短。'}, correct: '3S'},
                    {spades: "82", hearts: "94", diamonds: "K42", clubs: "AK9642", auction: ['1C','P',], answers: {'Pass': '錯誤：6點以上一定要答叫。', '2C': '正確。這稱為低花反序，用在邀請力量以上的低花支持，且沒有4張高花時。', '3C': '錯誤。由於我們打低花反序，這個叫品的力量是6-9點左右'}, correct: '2C'},
                    {spades: "JT7", hearts: "93", diamonds: "J4", clubs: "AQ6543", auction: ['1C','P',], answers: {'Pass': '錯誤：6點以上一定要答叫。', '3C': '正確，我們打低花反序，這個叫品的力量是6-9點左右，6張以上梅花', '1S': '錯誤。叫高花要有4張'}, correct: '3C'},
                    {spades: "AKT9", hearts: "Q652", diamonds: "QJT9", clubs: "2", auction: ['1C','P',], answers: {'1D': '錯誤：迫叫成局的情形，長度一樣時，高花優先', '1H': '正確：高花優先叫，兩門高花都四張時，叫紅心。', '1S': '錯誤：兩門高花都四張時，優先叫紅心。'}, correct: '1H'},
                    {spades: 'AT6', hearts: 'AQ876', diamonds: 'K83', clubs: '97', auction: ['1C', 'P', ], correct: '1H', answers: {'1H': '正確。答叫保證4張紅心', 'Pass': '錯誤。6點以上一定要答叫', }},
                    {spades: 'T7432', hearts: 'Q', diamonds: 'QJ6', clubs: '7643', auction: ['1C', 'P', ], correct: 'Pass', answers: {'Pass': '正確。不到6點的牌不一定要答叫，而這個點力很差，所以可以Pass', '1S': '錯誤。點力不到6個點，且不是好點，不必叫牌', '2C': '錯誤。這個叫品保證5張梅花，11個點以上', }},
                    {spades: '5', hearts: '98764', diamonds: 'K765', clubs: 'T72', auction: ['1C', 'P', ], correct: 'Pass', answers: {'Pass': '正確。不到6個點可以直接Pass', }},
                    {spades: 'T943', hearts: 'KJ97', diamonds: '2', clubs: 'AQT9', auction: ['1C', 'P', ], correct: '1H', answers: {'1H': '正確。4-4高花時先叫紅心', '1S': '錯誤。4-4高花先叫紅心', '2C': '錯誤。此叫品保證5張梅花，11個點', '1NT': '錯誤。有4張高花應該叫出。', }},
                    {spades: 'Q54', hearts: 'KJ2', diamonds: 'T85', clubs: 'Q754', auction: ['1C', 'P', ], correct: '1NT', answers: {'1NT': '正確。6-9點，沒有4張高花', '3C': '錯誤。這個叫品要有6張梅花', }},
                    {spades: 'QJT98', hearts: '643', diamonds: 'A753', clubs: '9', auction: ['1C', 'P', ], correct: '1S', answers: {'1S': '正確。4張高花以上，6點以上的叫品', '1D': '錯誤。這個叫品雖然保證4張方塊而已，但有更長的高花應該優先叫', }},
                    {spades: 'AQ872', hearts: 'Q98', diamonds: 'KQ8', clubs: 'A6', auction: ['1D', 'P', ], correct: '1S', answers: {'1S': '正確，這個叫品保證4張黑桃，沒有點力上限', '1NT': '錯誤。答叫1NT是6-9點，沒有4張高花'}},
                    {spades: 'A63', hearts: 'QJ', diamonds: 'QT', clubs: 'QJT954', auction: ['1D', 'P', ], correct: '2C', answers: {'2C': '正確。5張以上梅花，迫叫成局（二蓋一），表示12個點以上', '1NT': '錯誤。1NT是6-9點，沒有4張高花', '3C': '錯誤。BTU的制度沒有特別約定這個叫品，通常是梅花長牌組的邀請牌型', '3NT': '錯誤。雖然合約很可能停在3NT，但同伴點力沒有上限，還有探索滿貫的空間', }},
                    {spades: 'K82', hearts: 'AJ876', diamonds: 'K4', clubs: 'J43', auction: ['1D', 'P', ], correct: '1H', answers: {'1H': '正確，優先叫出最長的花色，尤其是高花', }},
                    {spades: 'A96', hearts: 'T9', diamonds: '98', clubs: 'AT9875', auction: ['1D', 'P', ], correct: '1NT', answers: {'1NT': '正確。6-9點，沒有4張高花', '2C': '錯誤。這個叫品要有12個點以上', }},
                    {spades: 'AKQ84', hearts: 'A8', diamonds: 'KQ8', clubs: '643', auction: ['1D', 'P', ], correct: '1S', answers: {'1S': '正確。5張黑桃優先叫出。沒有點力上限', }},
                    {spades: 'A74', hearts: 'KQT5', diamonds: 'J95', clubs: 'QT5', auction: ['1D', 'P', ], correct: '1H', answers: {'1H': '正確。此叫品保證4張紅心，6點以上，沒有點力上限', }},
                    {spades: '3', hearts: 'QT83', diamonds: 'KJ984', clubs: 'AJ2', auction: ['1D', 'P', ], correct: '1H', answers: {'1H': '正確。4張高花優先', '2D': '錯誤。有5張高花要優先叫出', }},
                    {spades: '965', hearts: 'Q8', diamonds: 'KJ', clubs: 'K97543', auction: ['1D', 'P', ], correct: '1NT', answers: {'1NT': '正確。6-9點，沒有4張高花', '2C': '錯誤。二蓋一要12點以上，是迫叫成局的牌', '2NT': '錯誤。10-11點才是叫2NT', }},
                    {spades: '942', hearts: 'K953', diamonds: 'QT4', clubs: 'JT4', auction: ['1D', 'P', ], correct: '1H', answers: {'1H': '正確。4張紅心要優先叫出', '1NT': '錯誤。這是6-9點沒有4張高花', }},
                    {spades: 'KJ53', hearts: 'KT', diamonds: 'K93', clubs: '5432', auction: ['1D', 'P', ], correct: '1S', answers: {'1S': '正確', '1NT': '錯誤。這是6-9點，沒有4張高花', '2NT': '錯誤。這是10-11點，沒有4張高花', }},
                    {spades: 'QJT4', hearts: 'A4', diamonds: 'Q93', clubs: 'K642', auction: ['1D', 'P', ], correct: '1S', answers: {'1S': '正確，這個叫品沒有點力上限', }},
                    {spades: 'KT653', hearts: 'QJ', diamonds: 'Q65', clubs: 'T86', auction: ['1D', 'P', ], correct: '1S', answers: {'1S': '正確', '1NT': '錯誤，有4張以上高花要先叫出', }},
                    {spades: '9', hearts: '9754', diamonds: 'KJ64', clubs: '8654', auction: ['1D', 'P', ], correct: 'Pass', answers: {'Pass': '正確，沒有6個點不用答叫', }},
                    {spades: 'T', hearts: 'AQ6', diamonds: 'AJ72', clubs: 'JT973', auction: ['1D', 'P', ], correct: '2D', answers: {'2D': '正確，11點以上，4張以上方塊', '2C': '也可以接受，但通常有支持會優先支持。12點以上，5張以上梅花', }},
                    {spades: 'K8753', hearts: '4', diamonds: 'QJ53', clubs: 'K86', auction: ['1D', 'P', ], correct: '1S', answers: {'1S': '正確，有4張以上高花要優先叫出', '1NT': '錯誤。有4張以上高花要優先叫出', '3D': '錯誤。要有5張以上方塊才能叫', }},
                    {spades: '7643', hearts: '752', diamonds: 'K83', clubs: 'KT8', auction: ['1D', 'P', ], correct: '1S', answers: {}},
                ],
                '高花開叫的答叫': [
                    {spades: 'AJ96432', hearts: '', diamonds: 'Q54', clubs: 'K97', auction: ['1H', 'P', ], correct: '1S', answers: {'1S': '正確。這個叫品保證4張黑桃，6點以上', }},{spades: 'A854', hearts: 'A75', diamonds: 'KT94', clubs: 'K9', auction: ['1H', 'P', ], correct: '1S', answers: {'1S': '正確，點力太強，不能直接支持紅心', '2H': '錯誤。這個叫品表示8-10點的紅心支持（通常3張）', '4H': '錯誤。這個叫品表示5張紅心的竄叫（低於開叫點力）'}},
                    {spades: 'K75', hearts: '943', diamonds: 'KJ865', clubs: '87', auction: ['1H', 'P', ], correct: '1NT', answers: {'1NT': '正確。6-7點三張支持要經過迫叫的1NT', '2H': '錯誤。的確應該優先支持紅心，但這代表8-10點的紅心', '2D': '錯誤。這個叫品要12點以上才能叫', }},
                    {spades: '872', hearts: 'J96', diamonds: 'KT', clubs: 'J8743', auction: ['1H', 'P', ], correct: 'Pass', answers: {'Pass': '正確。6點以下不必答叫', '2H': '錯誤。這個支持要有8-10點', '1NT': '錯誤。6點以下不必答叫', }},
                    {spades: 'AT7', hearts: '', diamonds: '83', clubs: 'AKQJ6532', auction: ['1H', 'P', ], correct: '2C', answers: {'2C': '正確。這個叫品表示12點以上，3張以上梅花', }},
                    {spades: 'AQ', hearts: 'QT873', diamonds: '54', clubs: 'AK82', auction: ['1H', 'P', ], correct: '2NT', answers: {'2NT': '正確。這是Jacoby 2NT特約，表示4張以上王牌支持與12點以上', '4H': '錯誤。這個叫品是竄叫，不到開叫點力', '2C': '錯誤。這副牌的紅心更值得趕快支持', }},
                    {spades: 'Q9', hearts: 'T3', diamonds: '62', clubs: 'AKT7543', auction: ['1H', 'P', ], correct: '1NT', answers: {'1NT': '正確。原則上沒有迫叫成局的點力都叫1NT', '2C': '錯誤。這個叫品要有12點以上', '2H': '錯誤。要有3張以上紅心才能支持', }},
                    {spades: 'AT6', hearts: 'QJ83', diamonds: '9', clubs: 'A8642', auction: ['1H', 'P', ], correct: '4D', answers: {'4D': '正確。這是Splinter叫品，表示低限的成局牌，叫的花色是短門。目標是找到27點的滿貫', }},
                    {spades: 'K742', hearts: 'A5', diamonds: 'J7632', clubs: '97', auction: ['1H', 'P', ], correct: '1S', answers: {'1S': '正確。此叫品保證6點以上，4張以上黑桃', '2D': '錯誤。這個是二蓋一迫叫成局，要有12個點', '2H': '錯誤。要有三張支持才能叫這個叫品', }},
                    {spades: 'KQ9862', hearts: 'T52', diamonds: '6', clubs: 'J97', auction: ['1D', 'P', ], correct: '1S', answers: {'1S': '正確，雖然有3張紅心支持，但因為不是8-10點的情形不能直接支持，如果沒有4張黑桃，就叫1NT迫叫', '1NT': '錯誤。可以表示4張黑桃的時候應該要優先表示', '2H': '錯誤。此叫品要8-10點', }},
                    {spades: '64', hearts: 'Q3', diamonds: 'AJ83', clubs: 'AK976', auction: ['1H', 'P', ], correct: '2C', answers: {}},
                    {spades: '753', hearts: 'AKJ3', diamonds: 'K654', clubs: 'KQ', auction: ['1H', 'P', ], correct: '2NT', answers: {}},
                    {spades: 'KQ5', hearts: '6', diamonds: 'AKQT85', clubs: 'QT7', auction: ['1H', 'P', ], correct: '2D', answers: {}},
                    {spades: 'K2', hearts: 'J9542', diamonds: '852', clubs: 'T75', auction: ['1H', 'P', ], correct: '4H', answers: {'4H': '正確。這是五張紅心的竄叫', }},
                    {spades: 'Q974', hearts: 'J', diamonds: 'A85', clubs: 'KT983', auction: ['1H', 'P', ], correct: '1S', answers: {'2C': '錯誤。這要12個點以上才能叫', }},
                    {spades: 'K97', hearts: 'AJ', diamonds: 'J2', clubs: 'Q75432', auction: ['1H', 'P', ], correct: '1NT', answers: {'2C': '錯誤。這要12點以上才能叫', }},
                    {spades: 'Q42', hearts: '8', diamonds: 'T862', clubs: 'K8732', auction: ['1H', 'P', ], correct: 'Pass', answers: {}},
                    {spades: 'KT873', hearts: 'K94', diamonds: 'T6', clubs: 'K98', auction: ['1H', 'P', ], correct: '1S', answers: {'1S': '正確，雖然是8-10點三張紅心支持，但也是可以先叫其他花色，尤其是這副牌比點力本身表示得更好', '2H': '一半正確。這是8-10點三張紅心支持，但因為這副牌有三張K，如果有黑桃配合會是很好的情形', }},
                    {spades: 'K8', hearts: 'K54', diamonds: 'Q96', clubs: 'KQJ62', auction: ['1H', 'P', ], correct: '2C', answers: {'2C': '正確。先叫二蓋一迫叫成局以後，再支持紅心', }},
                    {spades: '963', hearts: 'AQ7', diamonds: 'Q9532', clubs: 'A3', auction: ['1H', 'P', ], correct: '2D', answers: {'2D': '正確。先叫二蓋一迫叫成局以後，再支持紅心', }},
                    {spades: 'AJ87', hearts: 'K9643', diamonds: '5', clubs: '652', auction: ['1H', 'P', ], correct: '4H', answers: {}},
                    {spades: 'Q875', hearts: 'K4', diamonds: 'AJ43', clubs: 'Q65', auction: ['1S', 'P', ], correct: '2NT', answers: {'2NT': '正確。這個是Jacoby 2NT，4張以上高花支持，迫叫成局', '2D': '錯誤。有更好的叫品', }},
                    {spades: 'Q3', hearts: 'K764', diamonds: 'T9642', clubs: 'K8', auction: ['1S', 'P', ], correct: '1NT', answers: {'1NT': '正確。迫叫1NT，用在高花開叫以後，沒有迫叫成局的大部分牌', }},
                    {spades: 'A7', hearts: 'J953', diamonds: 'QT9875', clubs: 'Q', auction: ['1S', 'P', ], correct: '1NT', answers: {'1NT': '正確。迫叫1NT，用在高花開叫以後，沒有迫叫成局的大部分牌', }},
                    {spades: 'K86', hearts: 'J72', diamonds: '964', clubs: 'K876', auction: ['1S', 'P', ], correct: '1NT', answers: {'1NT': '正確。迫叫1NT，用在高花開叫以後，沒有迫叫成局的大部分牌。在這裡是6-7點的三張支持', }},
                    {spades: 'K', hearts: 'QJ', diamonds: 'KQ532', clubs: 'T9864', auction: ['1S', 'P', ], correct: '1NT', answers: {'1NT': '正確。迫叫1NT，用在高花開叫以後，沒有迫叫成局的大部分牌', }},
                    {spades: '97', hearts: 'KQJT85', diamonds: 'A82', clubs: 'J3', auction: ['1S', 'P', ], correct: '2H', answers: {'2H': '正確。牌型很好，可以當作迫叫成局來叫', '1NT': '半對。由於牌型很好，可以當作迫叫成局叫牌', }},
                    {spades: '98', hearts: 'AJ8762', diamonds: 'Q3', clubs: 'Q86', auction: ['1S', 'P', ], correct: '1NT', answers: {'1NT': '正確。迫叫1NT，用在高花開叫以後，沒有迫叫成局的大部分牌', }},
                    {spades: 'JT974', hearts: 'T95', diamonds: 'KJ75', clubs: '7', auction: ['1S', 'P', ], correct: '4S', answers: {'4S': '正確。這是竄叫', }},
                    {spades: '', hearts: 'KQT95', diamonds: '9643', clubs: 'QJT2', auction: ['1S', 'P', ], correct: '1NT', answers: {'1NT': '正確。迫叫1NT，用在高花開叫以後，沒有迫叫成局的大部分牌', '2H': '錯誤。二蓋一要有12點以上才能叫', }},
                    {spades: 'A', hearts: '85', diamonds: 'QJ32', clubs: 'AJ9754', auction: ['1S', 'P', ], correct: '2C', answers: {}},
                    {spades: 'J9862', hearts: '6', diamonds: 'AJT7', clubs: 'AJ7', auction: ['1S', 'P', ], correct: '4H', answers: {'4H': '正確，這個是低限迫叫成局，紅心短門，四張以上黑桃支持的Splinter特約', }},
                ],
                '1NT開叫的答叫': [
                    {spades: 'AJ865', hearts: 'Q32', diamonds: '7', clubs: 'K972', auction: ['1NT', 'P', ], correct: '2H', answers: {'2H': '正確，轉換黑桃', }},
                    {spades: '9852', hearts: 'AT', diamonds: 'T765', clubs: 'QJ7', auction: ['1NT', 'P', ], correct: 'Pass', answers: {}},
                    {spades: '94', hearts: 'Q9832', diamonds: 'K7', clubs: 'KJ72', auction: ['1NT', 'P', ], correct: '2D', answers: {'2D': '正確，轉換紅心', }},
                    {spades: 'Q54', hearts: 'AKQJ9873', diamonds: '', clubs: 'QJ', auction: ['1NT', 'P', ], correct: '2D', answers: {'2D': '正確，轉換紅心', }},
                    {spades: 'KQ87', hearts: 'AK85', diamonds: 'T9', clubs: 'A74', auction: ['1NT', 'P', ], correct: '2C', answers: {'2C': '正確，問4張高花', }},
                    {spades: 'Q9', hearts: 'AJT', diamonds: 'AQ74', clubs: 'QT42', auction: ['1NT', 'P', ], correct: '3NT', answers: {'4NT': '其實很接近邊緣，但理論上不能夠叫這個', }},
                    {spades: '82', hearts: 'QT954', diamonds: 'AQT97', clubs: 'Q', auction: ['1NT', 'P', ], correct: '2D', answers: {'2D': '正確，轉換紅心', }},
                    {spades: '4', hearts: 'QT963', diamonds: 'KQJ93', clubs: 'J4', auction: ['1NT', 'P', ], correct: '2D', answers: {}},
                    {spades: 'A62', hearts: 'Q', diamonds: '7532', clubs: 'K8652', auction: ['1NT', 'P', ], correct: '2NT', answers: {'2NT': '正確。平均牌，邀請（對於15-17的1NT大約需要9點）', }},
                    {spades: 'T', hearts: 'Q85', diamonds: 'KJT73', clubs: 'QJT8', auction: ['1NT', 'P', ], correct: '2NT', answers: {}},
                    {spades: 'AJ63', hearts: '643', diamonds: 'QJ8', clubs: '542', auction: ['1NT', 'P', ], correct: 'Pass', answers: {}},
                    {spades: 'T9742', hearts: 'KT873', diamonds: '', clubs: 'K54', auction: ['1NT', 'P', ], correct: '2C', answers: {'2C': '正確。正常Stayman要有邀請點力才能叫出，但這個情況是準備在同伴回答2D以後叫2H表示兩門高花的弱牌', '2D': '錯誤。有更好的叫品', '2H': '錯誤。有更好的叫品', }},
                    {spades: 'T97', hearts: '42', diamonds: 'JT5', clubs: 'AKQ87', auction: ['1NT', 'P', ], correct: '3NT', answers: {}},
                    {spades: 'J9842', hearts: '72', diamonds: 'AJ5', clubs: 'J43', auction: ['1NT', 'P', ], correct: '2H', answers: {}},
                    {spades: 'QJ97', hearts: 'T84', diamonds: 'Q7', clubs: '9743', auction: ['1NT', 'P', ], correct: 'Pass', answers: {}},
                    {spades: 'J9743', hearts: 'J985', diamonds: 'T', clubs: 'KT8', auction: ['1NT', 'P', ], correct: '2H', answers: {'2H': '正確。轉換黑桃，完全沒有點力下限。', }},
                    {spades: '854', hearts: 'QJ42', diamonds: 'KJ9', clubs: '876', auction: ['1NT', 'P', ], correct: 'Pass', answers: {}},
                    {spades: 'J', hearts: 'KJ4', diamonds: 'AJ87', clubs: 'KJT87', auction: ['1NT', 'P', ], correct: '3NT', answers: {}},
                    {spades: 'K642', hearts: '963', diamonds: 'KQ986', clubs: 'J', auction: ['1NT', 'P', ], correct: '2C', answers: {'2C': '正確。4張黑桃，所以先用Stayman問高花', }},
                    {spades: 'A83', hearts: 'AKT98', diamonds: 'T8', clubs: '985', auction: ['1NT', 'P', ], correct: '2D', answers: {}},
                    {spades: 'AT973', hearts: '86', diamonds: 'J973', clubs: 'QJ', auction: ['1NT', 'P', ], correct: '2H', answers: {}},
                ],
                '2NT開叫的答叫': [
                    {spades: 'QJ2', hearts: '742', diamonds: 'KT', clubs: 'AJ754', auction: ['2NT', 'P', ], correct: '3NT', answers: {}},
                    {spades: 'Q9', hearts: 'J632', diamonds: '972', clubs: 'AT43', auction: ['2NT', 'P', ], correct: '3C', answers: {'3C': '正確。問高花', }},
                    {spades: 'T962', hearts: '832', diamonds: 'T73', clubs: '952', auction: ['2NT', 'P', ], correct: 'Pass', answers: {}},
                    {spades: '7543', hearts: '87643', diamonds: 'T863', clubs: '', auction: ['2NT', 'P', ], correct: '3D', answers: {}},
                    {spades: 'Q4', hearts: 'T54', diamonds: 'J98', clubs: 'AQ985', auction: ['2NT', 'P', ], correct: '3NT', answers: {}},
                    {spades: 'Q2', hearts: 'Q932', diamonds: 'K8', clubs: 'AQT93', auction: ['2NT', 'P', ], correct: '3C', answers: {'3C': '正確。先問4張高花，再決定要去哪一個滿貫', }},
                    {spades: 'T52', hearts: 'AQ94', diamonds: '4', clubs: 'K9873', auction: ['2NT', 'P', ], correct: '3C', answers: {}},
                    {spades: 'K85', hearts: '852', diamonds: 'QT65', clubs: 'T65', auction: ['2NT', 'P', ], correct: '3NT', answers: {}},
                    {spades: 'J942', hearts: '4', diamonds: 'KQJ874', clubs: 'T9', auction: ['2NT', 'P', ], correct: '3C', answers: {}},
                    {spades: '983', hearts: 'T873', diamonds: 'T8', clubs: '9765', auction: ['2NT', 'P', ], correct: 'Pass', answers: {}},
                    {spades: 'Q8762', hearts: 'KJT6', diamonds: '75', clubs: '73', auction: ['2NT', 'P', ], correct: '3C', answers: {'3C': '正確。5-4高花或4-5高花，通常可以使用Smolen特約，但要依照和同伴的約定而定', }},
                    {spades: 'T3', hearts: 'KJ84', diamonds: 'KJT94', clubs: '92', auction: ['2NT', 'P', ], correct: '3C', answers: {}},
                    {spades: 'T953', hearts: '754', diamonds: 'JT4', clubs: '732', auction: ['2NT', 'P', ], correct: 'Pass', answers: {}},
                    {spades: 'Q87643', hearts: '96', diamonds: 'Q62', clubs: '97', auction: ['2NT', 'P', ], correct: '4H', answers: {'4H': '正確。這個值得試成局。Texas轉換表示6張高花以上的牌', }},
                    {spades: 'T32', hearts: '7', diamonds: 'K8752', clubs: 'QJ73', auction: ['2NT', 'P', ], correct: '3NT', answers: {}},
                    {spades: 'KJ2', hearts: 'KJT952', diamonds: '53', clubs: 'J3', auction: ['2NT', 'P', ], correct: '4D', answers: {}},
                    {spades: 'QJ98754', hearts: '2', diamonds: '752', clubs: '43', auction: ['2NT', 'P', ], correct: '4H', answers: {'4H': '正確。轉換黑桃，值得試一試成局', '3H': '半正確。但稍微有點保守', }},
                ],
                '低花開叫的再叫': [
                    {spades: 'AT7', hearts: 'AQJ3', diamonds: 'Q4', clubs: '8752', auction: ['1C', 'P', '1H', 'P', ], correct: '2H', answers: {'2H': '正確。有四張紅心時可以優先支持', }},
                    {spades: 'KJ84', hearts: 'KQ', diamonds: 'Q4', clubs: 'JT543', auction: ['1C', 'P', '1H', 'P', ], correct: '1S', answers: {}},
                    {spades: 'KQT8', hearts: 'K654', diamonds: 'A9', clubs: 'J42', auction: ['1C', 'P', '1H', 'P', ], correct: '2H', answers: {}},
                    {spades: 'JT52', hearts: 'AK52', diamonds: '5', clubs: 'AQ93', auction: ['1C', 'P', '1H', 'P', ], correct: '2H', answers: {}},
                    {spades: 'AJ94', hearts: 'KJ', diamonds: 'JT7', clubs: 'QJ96', auction: ['1C', 'P', '1H', 'P', ], correct: '1S', answers: {}},{spades: 'K97', hearts: 'Q754', diamonds: '74', clubs: 'AK72', auction: ['1C', 'P', '1H', 'P', ], correct: '2H', answers: {}},
                    {spades: 'KJ98', hearts: '42', diamonds: 'A62', clubs: 'KQ72', auction: ['1C', 'P', '1H', 'P', ], correct: '1S', answers: {}},{spades: 'J', hearts: 'Q5', diamonds: 'J973', clubs: 'AKQ986', auction: ['1C', 'P', '1H', 'P', ], correct: '2C', answers: {}},
                    {spades: 'A632', hearts: 'KJT', diamonds: 'T2', clubs: 'AT53', auction: ['1C', 'P', '1H', 'P', ], correct: '1S', answers: {}},{spades: 'KT', hearts: 'J2', diamonds: 'AT54', clubs: 'KJ872', auction: ['1C', 'P', '1H', 'P', ], correct: '2C', answers: {}},
                    {spades: 'KT3', hearts: '8765', diamonds: 'A', clubs: 'AQ972', auction: ['1C', 'P', '1H', 'P', ], correct: '2H', answers: {}},{spades: 'AJ73', hearts: 'J62', diamonds: 'QT', clubs: 'AJ82', auction: ['1C', 'P', '1H', 'P', ], correct: '1S', answers: {}},
                    {spades: 'AT62', hearts: '7652', diamonds: 'AJ', clubs: 'AT3', auction: ['1C', 'P', '1H', 'P', ], correct: '2H', answers: {}},{spades: 'A74', hearts: 'A85', diamonds: 'K4', clubs: 'K8654', auction: ['1C', 'P', '1H', 'P', ], correct: '1NT', answers: {}},
                    {spades: 'T9', hearts: 'Q763', diamonds: 'A9', clubs: 'AK654', auction: ['1C', 'P', '1H', 'P', ], correct: '2H', answers: {}},{spades: 'A7', hearts: 'J6', diamonds: 'Q73', clubs: 'AQT653', auction: ['1C', 'P', '1H', 'P', ], correct: '2C', answers: {}},
                    {spades: 'K62', hearts: 'Q32', diamonds: '', clubs: 'AQJ8765', auction: ['1C', 'P', '1H', 'P', ], correct: '2C', answers: {}},
                    {spades: 'J974', hearts: 'T', diamonds: 'AT4', clubs: 'AKJ65', auction: ['1C', 'P', '1H', 'P', ], correct: '1S', answers: {}},
                    {spades: 'Q5', hearts: 'AK76', diamonds: 'T85', clubs: 'AT65', auction: ['1C', 'P', '1H', 'P', ], correct: '2H', answers: {}},
                    {spades: 'K92', hearts: 'Q53', diamonds: 'J6', clubs: 'AQ862', auction: ['1C', 'P', '1H', 'P', ], correct: '1NT', answers: {}},
                ],
                '其他': [
                    {spades: "AKQJT", hearts: "QJ65", diamonds: "32", clubs: "32", auction: ['1S','P','2H','P',], answers: {'3H': '這是正確的答案，有支持要優先叫出，尤其是在高花，不需要有多餘力量。'}, correct: '3H'},
                    {spades: "AKT9", hearts: "AQ65", diamonds: "AJT9", clubs: "2", auction: ['1NT','P','2C','P','2S','P','3H','P','4C','P','4NT','P','5C','P',], answers: {'5D': '正確：詢問有無黑桃Q'}, correct: '5D'}
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
    font-size: 28px;
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
.answer-grid {
    display: grid;
    grid-template-columns: 16% 14% 14% 14% 14% 14% 14%;
}
button {
    font-size: 30px;
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
    font-size: 28px;
}
header {
    font-family: "Taipei Sans SC Beta", sans-serif;
    font-weight: bold;
    background-color: green;
    padding: 5px 20px;
}
@media (max-width: 800px) {
    #templategrid {
        overflow: scroll;
    }
    .headergrid {
        font-size: 16px;
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
    .storyopt {
        font-size: 16px;
        line-height: 50px;
    }
    .storyopt select {
        font-size: 16px;
    }
    button {
        font-size: 16px;
        padding: 5px 0;
    }
    .header {
        padding: 0 20px;
    }
    .questset {
        padding: 2px;
        margin: 0 2px;
    }
}
</style>