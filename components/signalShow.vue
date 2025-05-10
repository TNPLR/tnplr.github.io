<template>
    <span class="signalFont" v-for="(char, index) in props.text.split('')" :key="index">
        <span :style=" { fontWeight: (index.toString() === props.x) ? 'bold' : '', textDecoration: (index.toString() === props.y) ? 'underline' : ''} ">{{ char }}</span>
    </span>
</template>
  
<script setup lang="ts">
const props = defineProps({
    text: {type: String, required: true},
    x: String,
    y: String
});
</script>
  
  <style scoped>
  .text-container {
    font-size: 16px;
  }
  
  .text-content {
    position: relative;
    line-height: 1.5;
  }
  
  .bold-text {
    font-weight: bold;
  }

  .signalFont {
    font-family: Helvetica, sans-serif;
  }
</style>