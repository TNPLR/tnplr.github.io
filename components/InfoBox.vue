<script setup lang="ts">
withDefaults(defineProps<{ title?: string }>(), {
    title: '補充資訊',
})
</script>

<template>
    <aside class="info-box" :aria-label="title">
        <p class="info-box__title">{{ title }}</p>
        <div class="info-box__content">
            <slot />
        </div>
    </aside>
</template>

<style scoped>
.info-box {
    margin-block: 1em;
    padding: 0.75em 1em;
    border: 1px solid #a7d7bb;
    border-inline-start: 4px solid #278253;
    border-radius: 0.4em;
    background-color: #eff9f2;
    color: #173b28;
    line-height: 1.6;
    overflow-wrap: anywhere;
}

.info-box__title {
    margin: 0 0 0.25em;
    font-weight: bold;
}

.info-box__content :deep(> :first-child) {
    margin-block-start: 0;
}

.info-box__content :deep(> :last-child) {
    margin-block-end: 0;
}

@media print {
    .info-box {
        background-color: transparent;
        border-color: currentColor;
        color: black;
    }

    .info-box__title {
        break-after: avoid;
    }
}
</style>
