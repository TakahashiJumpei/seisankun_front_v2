<template>
  <div id="app">
    <div class="container">
      <router-view name="header"></router-view>
      <router-view></router-view>
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  components: {
    Footer,
  },
};
</script>

<style scoped lang="scss">
@import "./css/ress.css";
#app{
  background-color: #c7cfd665;
}
.container {
  overflow-y: hidden;
  max-width: 834px;
  margin: 0 auto;
  background-color: #FFF;
}
</style>
