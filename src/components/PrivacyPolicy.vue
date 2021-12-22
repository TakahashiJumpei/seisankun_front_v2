<template>
  <div class="main">
    <div class="inner">
      プライバシーポリシーページ
    </div>
  </div>
</template>

<style scoped lang="scss">
$base_text_color: #534e4e;
$light_blue: #1cb7f0;
$gray: #f4f0f0;
$yellow: #fff0bf;
$padding-tb: 32px;
$padding-lr: 48px;
$theme-title-size: 16px;
$header-h: 48px;
$footer-h: 120px;
.main {
  min-height: calc(100vh - #{$header-h} - #{$footer-h});
  padding: $padding-tb $padding-lr;
  .inner {
  }
}
</style>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  beforeCreate: function() {
    console.log("PrivacyPolicy.vue beforeCreate");
  },
  created: function() {
    console.log("PrivacyPolicy.vue created");
  },
  beforeMount: function() {
    console.log("PrivacyPolicy.vue beforeMount");
  },
  mounted: function() {
    console.log("PrivacyPolicy.vue mounted");
  },
  beforeUpdate: function() {
    console.log("PrivacyPolicy.vue beforeUpdate");
  },
  updated: function() {
    console.log("PrivacyPolicy.vue updated");
  },
  beforeDestroy: function() {
    console.log("PrivacyPolicy.vue beforeDestroy");
  },
  destroyed: function() {
    console.log("PrivacyPolicy.vue destroyed");
  },
};
</script>
