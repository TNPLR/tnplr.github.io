<template>
  <article ref="Article">
    <div><h2>防禦性叫牌緒論</h2>
      <p>敵方開叫以後，我們的「防禦性叫牌方法」並沒有什麼特別之處。</p>
    </div>
  </article>
</template>

<script>
export default {
  mounted() {
    this.$root.replaceSuitSigns(this.$refs.Article);
    this.$root.genTOC();
  }
}
</script>

<style></style>