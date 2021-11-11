<template>
  <nav>
    <div class="title-wrapper">
      <div class="title-box">
        <span class="title">精算くん</span>
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
    console.log("HeaderCommon.vue beforeCreate");
  },
  created: function() {
    console.log("HeaderCommon.vue created");
  },
  beforeMount: function() {
    console.log("HeaderCommon.vue beforeMount");
  },
  mounted: function() {
    console.log("HeaderCommon.vue mounted");
  },
  beforeUpdate: function() {
    console.log("HeaderCommon.vue beforeUpdate");
  },
  updated: function() {
    console.log("HeaderCommon.vue updated");
  },
  beforeDestroy: function() {
    console.log("HeaderCommon.vue beforeDestroy");
  },
  destroyed: function() {
    console.log("HeaderCommon.vue destroyed");
  },
};
</script>

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