<template>
  <div class="container">

    <router-view name="header"></router-view>
    <router-view></router-view>
    <Footer/>

  </div>
</template>

<script>
import Footer from '@/components/Footer'
export default {
  components: {
    Footer
  }
};
</script>

<style scoped lang="scss">
@import "./css/ress.css";
.container {
  overflow-y: hidden;
}
</style>
