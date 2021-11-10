<template>
  <nav>
    <div class="title-wrapper">
      <div class="title-box">
        <span class="title">精算くん</span>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
$light_blue: #1cb7f0;
$header-h: 48px;
nav {
  width: 100%;
  height: $header-h;
  background-color: $light_blue;
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