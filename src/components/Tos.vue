<template>
  <div class="main">
    <div class="inner">
      利用規約ページ
    </div>
  </div>
</template>

<style scoped lang="scss">
$bace_text_color: #534e4e;
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
    console.log("Top.vue beforeCreate");
  },
  created: function() {
    console.log("Top.vue created");
  },
  beforeMount: function() {
    console.log("Top.vue beforeMount");
  },
  mounted: function() {
    console.log("Top.vue mounted");
  },
  beforeUpdate: function() {
    console.log("Top.vue beforeUpdate");
  },
  updated: function() {
    console.log("Top.vue updated");
  },
  beforeDestroy: function() {
    console.log("Top.vue beforeDestroy");
  },
  destroyed: function() {
    console.log("Top.vue destroyed");
  },
};
</script>