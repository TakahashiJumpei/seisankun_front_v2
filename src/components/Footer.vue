<template>
  <footer>
    <div class="footer-container">
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
    <div class="copyright">
      <p>Copyright © 2020-2022 nakazaway & jump All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    toTos() {
      this.$router.push({ path: "/tos/" });
    },
    toPrivacyPolicy() {
      this.$router.push({ path: "/privacy-policy/" });
    },
    toInquiry() {
      const url =
        "https://forms.gle/cWG4zq9akpfsVeK87";
      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";
@import "../scss/breakpoints/base";

footer {
  width: 100%;
  height: $footer-h;
  background-color: $green;
  color: white;
  font-weight: normal;
  padding: 20px 48px;
  .footer-container {
    font-size: 12px;
    @media screen and(min-width: $min-width) {
      font-size: 14px;
    }
    div {
      margin-top: 2px;
      span {
        cursor: pointer;
      }
    }
  }
  .copyright {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 9px;
    @media screen and(min-width: $min-width) {
      font-size: 12px;
    }
  }
}
</style>
