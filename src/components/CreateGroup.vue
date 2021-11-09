<template>
  <div class="main">

    <div class="inner">
      <div class="title">
        <span>グループの作成</span>
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
  methods: {
    
  },
  beforeCreate: function () {
    console.log("CreateGroup.vue beforeCreate");
  },
  created: function () {
    console.log("CreateGroup.vue created");
  },
  beforeMount: function () {
    console.log("CreateGroup.vue beforeMount");
  },
  mounted: function () {
    console.log("CreateGroup.vue mounted");
  },
  beforeUpdate: function () {
    console.log("CreateGroup.vue beforeUpdate");
  },
  updated: function () {
    console.log("CreateGroup.vue updated");
  },
  beforeDestroy: function () {
    console.log("CreateGroup.vue beforeDestroy");
  },
  destroyed: function () {
    console.log("CreateGroup.vue destroyed");
  },
};
</script>


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
  min-height: calc(100vh - $header-h - $footer-h);
  padding: $padding-tb $padding-lr;
  .inner {
  }
}
</style>