<template>
  <div class="main">
    <div class="inner">
      <div class="title-wrapper">
        <div class="title">
          <span>支払いの追加</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  watch: {
  },
  methods: {
  },
  beforeCreate: function() {
    console.log("AddPayment.vue beforeCreate");
  },
  created: function() {
    console.log("AddPayment.vue created");
  },
  beforeMount: function() {
    console.log("AddPayment.vue beforeMount");
  },
  mounted: function() {
    console.log("AddPayment.vue mounted");
  },
  beforeUpdate: function() {
    console.log("AddPayment.vue beforeUpdate");
  },
  updated: function() {
    console.log("AddPayment.vue updated");
  },
  beforeDestroy: function() {
    console.log("AddPayment.vue beforeDestroy");
  },
  destroyed: function() {
    console.log("AddPayment.vue destroyed");
  },
};
</script>

<style scoped lang="scss">
$bace_text_color: #534e4e;
$light_blue: #1cb7f0;
$gray: #f4f0f0;
$yellow: #fff0bf;
$padding-tb: 32px;
$padding-lr: 30px;
$theme-title-size: 16px;
$header-h: 48px;
$footer-h: 120px;
$form-h: 40px;
$form-bg: #f4f0f0;
$form-border: #707070;
$error_color: #cf5271;

.main {
  min-height: calc(100vh - #{$header-h} - #{$footer-h});
  padding: $padding-tb $padding-lr;

  .inner {
    .title-wrapper {
      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        color: $bace_text_color;
        font-size: $theme-title-size;
        font-weight: bold;
      }
    }
    
  }
}
</style>
