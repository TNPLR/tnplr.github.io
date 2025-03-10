<script setup lang="ts">
import suitSign from "~/modules/suitSign";
import textAuction from "~/modules/textAuction";
import allStories from "~/modules/quest.json";
import type { NameOfCall, Quest } from "~/type/type";

definePageMeta({
    title: '叫牌練習區',
    layout: 'custom'
});

const quest = ref<Quest>(allStories[0]["quests"][0] as Quest);
const Explanation = ref(["", "", "?"]);
const selectedLevel = ref<number | undefined>(undefined);
const selectedQuestType = ref("開叫");
const selectedQuest = ref(1);
const qtCookie = useCookie<keyof typeof allStories | string | undefined>('questtype');
const qCookie = useCookie<number>('questnumber');
const explanationType = ref(0);
const title = useState('title');

const selectedQuestTypeIndex = computed(() => {
    return allStories.findIndex(x => x.name === selectedQuestType.value);
});


const explanationColor = computed(() => {
    switch (explanationType.value) {
        case 0:
            return '#e0fee0';
        case 1:
            return 'Gainsboro';
        case 2:
            return 'Moccasin';
        default:
            return '#e0fee0';
    }
});

function showExplanation(bid: NameOfCall) {
    Explanation.value[0] = bid;
    Explanation.value[2] = bid;
    if (quest.value.correct === bid) {
        explanationType.value = 2;
    } else {
        explanationType.value = 1;
    }
    if (quest.value.answers[bid] !== undefined && quest.value.answers[bid] !== "") {
        Explanation.value[1] = quest.value.answers[bid];
        Explanation.value[1] = suitSign(Explanation.value[1]);
    } else if (quest.value.correct === bid) {
        Explanation.value[1] = "答案正確！";
    } else {
        Explanation.value[1] = "答案錯誤，請再試試看！";
    }
}

function changeQuest() {
    Explanation.value[0] = "";
    Explanation.value[1] = "";
    Explanation.value[2] = "?";
    explanationType.value = 0;
    quest.value = allStories[selectedQuestTypeIndex.value]["quests"][selectedQuest.value-1] as Quest;

    qtCookie.value = selectedQuestType.value;
    qCookie.value = selectedQuest.value;

    selectedLevel.value = undefined;
}

onMounted(() => {
    if (qtCookie.value !== undefined) {
        const questtypeindex = allStories.findIndex(x => x.name === selectedQuestType.value);
        if (questtypeindex !== -1) {
            selectedQuestType.value = qtCookie.value as string;
            if (typeof qCookie.value === "number" && qCookie.value < allStories[questtypeindex].quests.length) {
                selectedQuest.value = qCookie.value;
            }
        }
    }
    title.value = "自然制練習區";
    changeQuest();
});

</script>

<template id="storytemplate">
    <header class="headergrid">
        <div class="storyopt">
            <NuxtLink to="/">叫牌練習區</NuxtLink>
        </div>
        <div class="storyopt" id="qtypeopt">
            題庫：<select id="questlib" v-on:change="selectedQuest = 1; changeQuest();" v-model="selectedQuestType">
                <option v-for="x in allStories">{{ x.name }}</option></select>
        </div>
        <div class="storyopt">
            題目：<select id="questno" v-on:change="changeQuest()" v-model="selectedQuest">
                <option v-for="(q, index) in allStories[selectedQuestTypeIndex].quests">{{ index+1 }}</option></select>
        </div>
        <div class="storyopt">
            <button class="questset" v-bind:disabled="selectedQuest <= 1" v-on:click="selectedQuest--; changeQuest();">上一題</button>
            <button class="questset" v-bind:disabled="selectedQuest >= allStories[selectedQuestTypeIndex].quests.length" v-on:click="selectedQuest++; changeQuest();">下一題</button>
            <button class="questset" v-on:click="showExplanation(quest.correct)">公布答案</button>
        </div>
        <div style="clear: left;"></div>
    </header>
    <div class="story-grid">
        <div class="hand-box">
            <span style="color:black">&#9824;</span> {{ quest.spades }} 
            <span style="color:tomato">&#9829;</span> {{ quest.hearts }} 
            <span style="color:orange">&#9830;</span> {{ quest.diamonds }} 
            <span style="color:DarkSlateGray">&#9827;</span> {{ quest.clubs }} 
        </div>
        <div class="auctiongrid">
            <auction-box v-model:board_num="quest.board_num" v-model:auction="quest.auction" v-model:lastBid="Explanation[2]" v-model:colorLastBid="explanationColor"/>
        </div>
        <div>
            <p>{{ typeof quest.description === "string" ? quest.description : "" }}</p>
        </div>
        <div>
            <bidding-box v-bind:onClick="showExplanation" v-bind:showOnClick="textAuction" v-model:selectedLevel="selectedLevel" v-model:auction="quest.auction" ref="bbox"/>
        </div>
        <div id="explanation">
            <h3 ><span v-html="textAuction(Explanation[0])"></span></h3>
            <p v-html="Explanation[1]"></p>
        </div>
    </div>
</template>

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
    grid-template-rows: auto auto auto auto;
    font-size: 25px;
}
.story-grid > div {
    text-align: left;
    padding: 20px 0;
}
.auctiongrid {
    grid-row: span 3;
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