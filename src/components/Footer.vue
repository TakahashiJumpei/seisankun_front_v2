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
  data() {
    return {};
  },
  methods: {
    toTos() {
      console.log("clicked toTos()");
      //利用規約ページを表示
      this.$router.push({ path: "/Tos/" });
    },
    toPrivacyPolicy(){
      console.log("clicked toPrivacyPolicy()");
      //プライバシーポリシーページを表示
      this.$router.push({ path: "/PrivacyPolicy/" });
    },
    toInquiry(){
      console.log("clicked toInquiry()");
      //お問い合わせページを表示
      //11/07v1の問い合わせフォームに遷移、仕様確定後実装
      const url = 'https://docs.google.com/forms/d/e/1FAIpQLSdcaHWXI4n_lgJXaD4yrGft3_G8-OFI_tqdYhBobbPX8j5j9Q/viewform'
      window.open(url, '_blank')
    },

  },
  beforeCreate: function() {
    console.log("Footer.vue beforeCreate");
  },
  created: function() {
    console.log("Footer.vue created");
  },
  beforeMount: function() {
    console.log("Footer.vue beforeMount");
  },
  mounted: function() {
    console.log("Footer.vue mounted");
  },
  beforeUpdate: function() {
    console.log("Footer.vue beforeUpdate");
  },
  updated: function() {
    console.log("Footer.vue updated");
  },
  beforeDestroy: function() {
    console.log("Footer.vue beforeDestroy");
  },
  destroyed: function() {
    console.log("Footer.vue destroyed");
  },
};
</script>

<style scoped lang="scss">
$light_blue: #1cb7f0;
$green: #1db8a3;
$footer-h: 120px;
footer {
  width: 100%;
  height: $footer-h;
  background-color: $green;
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
