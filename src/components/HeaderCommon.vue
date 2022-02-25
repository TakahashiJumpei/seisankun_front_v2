<template>
  <nav>
    <div class="title-wrapper">
      <div class="title-box" @click="toTop">
        <span class="title">Seisan-kun</span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    toTop() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/variables";
@import "../scss/breakpoints/base";

nav {
  width: 100%;
  height: $header-h;
  @media screen and(min-width: $min-width) {
    @import "../scss/breakpoints/768up";
    height: $header-h;
  }
  background-color: $green;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  .title-wrapper {
    .title-box {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      @media screen and(min-width: $min-width) {
        font-size: 32px;
      }
    }
  }
}
</style>
