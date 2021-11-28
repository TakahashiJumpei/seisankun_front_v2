<template>
  <nav>
    <div class="title-wrapper">
      <div class="sub-title-box">
        <span class="sub-title">〜旅行時の面倒な立替計算からオサラバ〜</span>
      </div>
      <div class="title-box">
        <span class="title">Seisan-kun</span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
  },
  beforeCreate: function() {
    console.log("HeaderTop.vue beforeCreate");
  },
  created: function() {
    console.log("HeaderTop.vue created");
  },
  beforeMount: function() {
    console.log("HeaderTop.vue beforeMount");
  },
  mounted: function() {
    console.log("HeaderTop.vue mounted");
  },
  beforeUpdate: function() {
    console.log("HeaderTop.vue beforeUpdate");
  },
  updated: function() {
    console.log("HeaderTop.vue updated");
  },
  beforeDestroy: function() {
    console.log("HeaderTop.vue beforeDestroy");
  },
  destroyed: function() {
    console.log("HeaderTop.vue destroyed");
  },
};
</script>

<style scoped lang="scss">
$light_blue: #1cb7f0;
$green: #1db8a3;
$headerTop-h: 120px;
nav {
  width: 100%;
  height: $headerTop-h;
  background-color: $green;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  .title-wrapper {
    .sub-title-box{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
    }
    .title-box {
      margin-top: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32px;
    }
  }
}
</style>