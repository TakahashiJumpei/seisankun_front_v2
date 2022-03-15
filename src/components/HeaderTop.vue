<template>
  <nav>
    <div class="title-wrapper">
      <div class="sub-title-box">
        <span class="sub-title">〜旅行時の面倒な立替計算からオサラバ〜</span>
      </div>
      <div class="title-box">
        <span class="title">Seisan-kun</span>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
@import "../scss/variables";
@import "../scss/breakpoints/base";

nav {
  width: 100%;
  height: $headerTop-h;
  @media screen and(min-width: $min-width) {
    @import "../scss/breakpoints/768up";
    height: $headerTop-h;
  }
  background-color: $green;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  .title-wrapper {
    .sub-title-box {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      @media screen and(min-width: $min-width) {
        font-size: 28px;
      }
    }
    .title-box {
      margin-top: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32px;
      @media screen and(min-width: $min-width) {
        font-size: 52px;
      }
    }
  }
}
</style>
