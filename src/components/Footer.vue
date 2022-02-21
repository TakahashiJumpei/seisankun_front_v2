<template>
  <footer>
    <div class="footer-1">
      <div>
        <span @click="toTos">利用規約</span>
      </div>
      <div>
        <span @click="toPrivacyPolicy">プライバシーポリシー</span>
      </div>
      <div>
        <span @click="toInquiry">お問い合わせ</span>
      </div>
    </div>
    <div class="footer-2">
      <small id="footer-text"
        >Copyright © 2020-2021 nakazaway All Rights Reserved.</small
      >
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    toTos() {
      //利用規約ページを表示
      this.$router.push({ path: "/Tos/" });
    },
    toPrivacyPolicy(){
      //プライバシーポリシーページを表示
      this.$router.push({ path: "/PrivacyPolicy/" });
    },
    toInquiry(){
      //お問い合わせページを表示
      //11/07v1の問い合わせフォームに遷移、仕様確定後実装
      const url = 'https://docs.google.com/forms/d/e/1FAIpQLSdcaHWXI4n_lgJXaD4yrGft3_G8-OFI_tqdYhBobbPX8j5j9Q/viewform'
      window.open(url, '_blank')
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/variables";

footer {
  width: 100%;
  height: $footer-h;
  background-color: $green;
  color: white;
  font-weight: normal;
  padding: 20px 48px;
  .footer-1 {
    font-size: 10px;
  }
  .footer-2 {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 9px;
  }
}
</style>
