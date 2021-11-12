<template>
  <div class="main">
    <div class="inner">
      <div class="group-top-wrapper">
        <div class="name-and-edit-wrapper">
          <div class="name-wrapper">
            <div class="group-title">
              <span>グループ</span>
            </div>
            <div class="group-name">
              <span>渡韓ごっこin新大久保</span>
            </div>
          </div>
        </div>
      </div>
      nakazawayの貸し借り状況
      
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
  beforeCreate: function() {
    console.log("memberLendingBorrowingDetail.vue beforeCreate");
  },
  created: function() {
    console.log("memberLendingBorrowingDetail.vue created");
  },
  beforeMount: function() {
    console.log("memberLendingBorrowingDetail.vue beforeMount");
  },
  mounted: function() {
    console.log("memberLendingBorrowingDetail.vue mounted");


  },
  beforeUpdate: function() {
    console.log("memberLendingBorrowingDetail.vue beforeUpdate");
  },
  updated: function() {
    console.log("memberLendingBorrowingDetail.vue updated");
  },
  beforeDestroy: function() {
    console.log("memberLendingBorrowingDetail.vue beforeDestroy");
  },
  destroyed: function() {
    console.log("memberLendingBorrowingDetail.vue destroyed");
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
$plus: #206dc5;
$minus: #dd4a76;

.main {
  min-height: calc(100vh - #{$header-h} - #{$footer-h});
  padding: $padding-tb $padding-lr;
  .inner {
    .group-top-wrapper {
      .name-and-edit-wrapper {
        display: flex;
        justify-content: space-between;
        //align-items: center;
        color: $bace_text_color;
        font-weight: bold;
        .name-wrapper {
          .group-title {
            font-size: 10px;
          }
          .group-name {
            font-size: 20px;
          }
        }
        .group-edit-wrapper {
          .group-edit {
            font-size: 10px;
            text-decoration: underline;
            cursor: pointer;
            pointer-events: auto;
          }
        }
      }
      
       
    }
  }
}
</style>
