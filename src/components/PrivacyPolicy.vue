<template>
  <div class="main">
    <div class="inner">
      プライバシーポリシーページ
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/variables";
@import "../scss/breakpoints/base";

.main {
  min-height: calc(100vh - #{$header-h} - #{$footer-h});
  padding: $padding-tb $padding-lr;
  @media screen and(min-width: $min-width) {
    @import "../scss/breakpoints/768up";
    padding: $padding-tb $padding-lr;
  }
}
</style>
