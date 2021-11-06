<template>
  <div class="main">

    <div class="inner">
      <div class="back-to-top">
        <router-link to="/" exact>TOPへ戻る</router-link>
      </div>

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
.main {
  min-height: calc(100vh - 12px - 48px);
  padding-top: 80px;
  padding-bottom: 80px;
  width: 700px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>