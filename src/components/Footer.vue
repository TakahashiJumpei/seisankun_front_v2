<template>
  <footer>
    <div class="footer-1">
      <div>
        <span>利用規約</span>
      </div>
      <div>
        <span>プライバシーポリシー</span>
      </div>
      <div>
        <span>お問い合わせ</span>
      </div>
    </div>
    <div class="footer-2">
      <small id="footer-text"
        >Copyright © 2020-2021 nakazaway All Rights Reserved.</small
      >
    </div>
  </footer>
</template>

<style scoped lang="scss">
$light_blue: #1cb7f0;
footer {
  width: 100%;
  height: 120px;
  background-color: $light_blue;
  color: white;
  font-weight: normal;
  padding: 0 48px;
  padding-top: 20px;
  .footer-1 {
    font-size: 10px;
  }
  .footer-2 {
    margin-top: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 9px;
  }
}
</style>