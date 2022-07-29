<template>
  <div class="main">
    <div class="inner">
      <div class="not-found-display">
        <h1 id="notfound_code">403</h1>
        <h2 id="notfound_message">Forbidden</h2>
        <router-link to="/" class="top-back-link">Topページへ</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../scss/variables";
@import "../scss/breakpoints/base";

.main {
  min-height: calc(100vh - #{$header-h} - #{$footer-h});
  padding: 0 $padding-lr $padding-tb $padding-lr;
  @media screen and(min-width: $min-width) {
    @import "../scss/breakpoints/768up";
    padding: 0 $padding-lr $padding-tb $padding-lr;
  }
  .inner {
    .not-found-display {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      padding: 20px 10px;
      #notfound_code {
        font-size: 500%;
        margin: 0;
        padding: 0;
      }
      #notfound_message {
        font-size: 100%;
        margin: 0;
        padding: 0;
      }
      .top-back-link {
        font-weight: bold;
        margin-top: 30px;
        border-bottom: solid 2px #cf5271;
        color: #cf5271;
        text-decoration: none;
        &:hover {
          opacity: 70%;
        }
      }
    }
  }
}
</style>
