<template>
  <div class="container">

    <router-view name="header"></router-view>
    <router-view></router-view>
    <router-view name="footer"></router-view>

  </div>
</template>

<script>
export default {
  methods: {
    beforeEnter() {
      this.$root.$emit("triggerScroll");
    }
  }
};
</script>

<style scoped lang="scss">
@import "./css/ress.css";
$bace_text_color: #534E4E;
$bace_text_font: Noto Sans JP;
.container {
  overflow-y: hidden;
  color: $bace_text_color;
  font-family: $bace_text_font;
}
</style>