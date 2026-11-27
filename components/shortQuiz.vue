<script setup lang="ts">
import AuctionBox from '~/components/AuctionBox.vue';
import suitSign from '~/modules/suitSign';
import textAuction from '~/modules/textAuction';
import type { Quest } from '~/type/type';

const props = withDefaults(defineProps<{
    title: string;
    questions: readonly Quest[];
    auctionMode?: 1 | 2 | 3;
}>(), { auctionMode: 3 });
const sharedAuction = computed(() => props.questions[0]);
const selections = reactive(new WeakMap<Quest, string>());
const bidStrains = ['C', 'D', 'H', 'S', 'NT'];

function bidRank(bid: string): number {
    const strain = bidStrains.indexOf(bid.slice(1));
    if (!/^[1-7]/.test(bid) || strain === -1) return 35;
    return (Number(bid[0]) - 1) * bidStrains.length + strain;
}

const questions = computed(() => props.questions.map((quest) => {
    const explainedBids = Object.keys(quest.answers)
        .filter(bid => quest.answers[bid]?.trim());
    const options = explainedBids.slice(0, 5);
    if (explainedBids.includes(quest.correct) && !options.includes(quest.correct)) {
        options[4] = quest.correct;
    }
    options.sort((a, b) => bidRank(a) - bidRank(b));
    return { quest, options };
}));
</script>

<template>
    <section class="short-quiz" :aria-label="title" data-preserve-suit-signs>
        <div class="quiz-title">{{ title }}</div>
        <AuctionBox
            v-if="auctionMode === 2 && sharedAuction"
            :board_num="sharedAuction.board_num"
            :auction="sharedAuction.auction"
        />
        <ol>
            <li v-for="({ quest, options }, index) in questions" :key="index">
                <div class="quiz-hand">
                    <span><span v-html="suitSign('!S')"></span> {{ quest.spades }}</span>
                    <span><span v-html="suitSign('!H')"></span> {{ quest.hearts }}</span>
                    <span><span v-html="suitSign('!D')"></span> {{ quest.diamonds }}</span>
                    <span><span v-html="suitSign('!C')"></span> {{ quest.clubs }}</span>
                </div>
                <p v-if="quest.description" v-html="suitSign(quest.description)"></p>
                <AuctionBox
                    v-if="auctionMode === 3"
                    :board_num="quest.board_num"
                    :auction="quest.auction"
                    :last-bid="selections.get(quest) ?? '?'"
                />
                <div class="quiz-options" role="group" :aria-label="`第 ${index + 1} 題的叫品選項`">
                    <button
                        v-for="bid in options"
                        :key="bid"
                        type="button"
                        :aria-pressed="selections.get(quest) === bid"
                        :class="{ 'incorrect-answer': selections.get(quest) === bid && bid !== quest.correct }"
                        @click="selections.set(quest, bid)"
                        v-html="textAuction(bid)"
                    ></button>
                </div>
                <div aria-live="polite">
                    <p
                        v-if="selections.has(quest)"
                        v-html="suitSign(quest.answers[selections.get(quest) ?? ''] ?? '')"
                    ></p>
                </div>
            </li>
        </ol>
    </section>
</template>

<style scoped>
.short-quiz {
    margin-block: 1.5em;
    padding: 1rem;
    border: 2px solid seagreen;
    border-radius: 0.5rem;
    background: #f2faf4;
}

.quiz-title {
    color: #215f3e;
    font-size: 1.25em;
    font-weight: bold;
}

.short-quiz ol {
    margin-bottom: 0;
    padding-inline-start: 1.5em;
}

.short-quiz li + li {
    margin-top: 1rem;
}

.quiz-hand,
.quiz-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-block: 0.5rem;
}

.quiz-options button {
    padding: 0.35em 0.75em;
    border: 1px solid seagreen;
    border-radius: 0.25rem;
    background: white;
    color: inherit;
    font: inherit;
    cursor: pointer;
}

.quiz-options button[aria-pressed="true"] {
    background: #ccebd6;
}

.quiz-options button.incorrect-answer {
    background: #f8d7da;
    border-color: #b94a55;
}

.short-quiz :deep(.seat_header) {
    padding-inline: 0;
}
</style>
