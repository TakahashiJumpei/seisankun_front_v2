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
@import "../scss/breakpoints/768up";

nav {
  width: 100%;
  height: $header-h;
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
    }
  }
}
</style>
