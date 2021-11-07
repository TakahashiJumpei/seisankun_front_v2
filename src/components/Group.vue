<template>
  <div class="main">

    <div class="inner">
      <div class="title">
        <span>渡韓ごっこin新大久保</span>
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
    console.log("Group.vue beforeCreate");
  },
  created: function () {
    console.log("Group.vue created");
  },
  beforeMount: function () {
    console.log("Group.vue beforeMount");
  },
  mounted: function () {
    console.log("Group.vue mounted");
  },
  beforeUpdate: function () {
    console.log("Group.vue beforeUpdate");
  },
  updated: function () {
    console.log("Group.vue updated");
  },
  beforeDestroy: function () {
    console.log("Group.vue beforeDestroy");
  },
  destroyed: function () {
    console.log("Group.vue destroyed");
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
.main {
  min-height: calc(100vh - 120px - 120px);
  padding: $padding-tb $padding-lr;
  .inner {
  }
}
</style>