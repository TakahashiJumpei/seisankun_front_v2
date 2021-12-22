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
$base_text_color: #534E4E;
$base_text_font: Noto Sans JP;
.container {
  overflow-y: hidden;
  color: $base_text_color;
  font-family: $base_text_font;
}
</style>
