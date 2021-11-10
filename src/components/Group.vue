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
          <div class="group-edit-wrapper">
            <div class="group-edit">
              <span>グループの編集</span>
            </div>
          </div>
        </div>
        <div class="member-wrapper">
          <div class="member-title">
            <span>メンバー</span>
          </div>
          <div id="members">
            <span>nakazaway</span>
            <span>, </span>
            <span>じゅんちゃん</span>
            <span>, </span>
            <span>yseki</span>
            <span>, </span>
            <span>ハマ</span>
            <span>, </span>
            <span>やまぐち</span>
            <span>, </span>
            <span>濱本将</span>
          </div>
        </div>
        <hr />
        <div class="share-wrapper">
          <div class="url">
            <img src="../assets/link.png" alt="" />
            <span>リンクをコピー</span>
          </div>
          <div class="line">
            <img src="../assets/line.gif" alt="" />
            <span>LINEで共有</span>
          </div>
        </div>
      </div>

      <div class="add-payment-button-wrapper">
        <button class="add-payment-button" @click="addPayment">
          <span>支払いの追加</span>
        </button>
      </div>

      <div class="payment-list-wrapper">
        <div class="payment-list-title">
          <span>支払い内容一覧</span>
        </div>
        <div class="payment-items">
          <div class="payment-item">
            <div class="payment-item-left">
              <div class="payment-item-name">
                <span>飛行機代</span>
              </div>
              <div class="payment-item-member">
                <span>nakazawayが立て替え</span>
              </div>
            </div>
            <div class="payment-item-right">
              <div class="payment-item-price">
                <span>100,000円</span>
              </div>
              <div class="payment-item-edit">
                <img src="../assets/edit.png" alt="" />
              </div>
            </div>
          </div>
          <hr />
          <div class="payment-item">
            <div class="payment-item-left">
              <div class="payment-item-name">
                <span>ホテル代</span>
              </div>
              <div class="payment-item-member">
                <span>じゅんちゃんが立て替え</span>
              </div>
            </div>
            <div class="payment-item-right">
              <div class="payment-item-price">
                <span>80,000円</span>
              </div>
              <div class="payment-item-edit">
                <img src="../assets/edit.png" alt="" />
              </div>
            </div>
          </div>
          <hr />
          <div class="payment-item">
            <div class="payment-item-left">
              <div class="payment-item-name">
                <span>夕食代</span>
              </div>
              <div class="payment-item-member">
                <span>nakazawayが立て替え</span>
              </div>
            </div>
            <div class="payment-item-right">
              <div class="payment-item-price">
                <span>20,000円</span>
              </div>
              <div class="payment-item-edit">
                <img src="../assets/edit.png" alt="" />
              </div>
            </div>
          </div>
          <hr />
          <div class="payment-item">
            <div class="payment-item-left">
              <div class="payment-item-name">
                <span>タクシー代</span>
              </div>
              <div class="payment-item-member">
                <span>ysekiが立て替え</span>
              </div>
            </div>
            <div class="payment-item-right">
              <div class="payment-item-price">
                <span>4,000円</span>
              </div>
              <div class="payment-item-edit">
                <img src="../assets/edit.png" alt="" />
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>

      <div class="seisan-result-wrapper">
        <div class="seisan-result-title">
          <span>精算結果</span>
        </div>
        <div class="seisan-result-items">
          <div class="seisan-result-item">
            <div class="seisan-result-item-money-flow">
              <span>じゅんちゃん → nakazaway</span>
            </div>
            <div class="seisan-result-item-money">
              <span>100,000円</span>
            </div>
          </div>
          <hr />
          <div class="seisan-result-item">
            <div class="seisan-result-item-money-flow">
              <span>じゅんちゃん → yseki</span>
            </div>
            <div class="seisan-result-item-money">
              <span>50,000円</span>
            </div>
          </div>
          <hr />
          <div class="seisan-result-item">
            <div class="seisan-result-item-money-flow">
              <span>yseki → nakazaway</span>
            </div>
            <div class="seisan-result-item-money">
              <span>50,000円</span>
            </div>
          </div>
          <hr />
        </div>
      </div>

      <div class="lending-borrowing-wrapper">
        <div class="lending-borrowing-title">
          <span>貸し借りの状況</span>
        </div>
        <div class="lending-borrowing-items">
          <div class="lending-borrowing-item">
            <div class="lending-borrowing-item-left">
              <div class="lending-borrowing-member">
                <span>nakazaway</span>
              </div>
            </div>
            <div class="lending-borrowing-item-right">
              <div class="lending-borrowing-member-money plus">
                <span>+ 36,000円</span>
              </div>
              <div class="lending-borrowing-member-money-detail">
                <img src="../assets/search.png" alt="" />
              </div>
            </div>
          </div>
          <hr />
          <div class="lending-borrowing-item">
            <div class="lending-borrowing-item-left">
              <div class="lending-borrowing-member">
                <span>じゅんちゃん</span>
              </div>
            </div>
            <div class="lending-borrowing-item-right">
              <div class="lending-borrowing-member-money plus">
                <span>+ 2,000円</span>
              </div>
              <div class="lending-borrowing-member-money-detail">
                <img src="../assets/search.png" alt="" />
              </div>
            </div>
          </div>
          <hr />
          <div class="lending-borrowing-item">
            <div class="lending-borrowing-item-left">
              <div class="lending-borrowing-member">
                <span>yseki</span>
              </div>
            </div>
            <div class="lending-borrowing-item-right">
              <div class="lending-borrowing-member-money plus">
                <span>+ 4,000円</span>
              </div>
              <div class="lending-borrowing-member-money-detail">
                <img src="../assets/search.png" alt="" />
              </div>
            </div>
          </div>
          <hr />
          <div class="lending-borrowing-item">
            <div class="lending-borrowing-item-left">
              <div class="lending-borrowing-member">
                <span>ハマ</span>
              </div>
            </div>
            <div class="lending-borrowing-item-right">
              <div class="lending-borrowing-member-money minus">
                <span>- 300,000円</span>
              </div>
              <div class="lending-borrowing-member-money-detail">
                <img src="../assets/search.png" alt="" />
              </div>
            </div>
          </div>
          <hr />
          <div class="lending-borrowing-item">
            <div class="lending-borrowing-item-left">
              <div class="lending-borrowing-member">
                <span>やまぐち</span>
              </div>
            </div>
            <div class="lending-borrowing-item-right">
              <div class="lending-borrowing-member-money minus">
                <span>- 12,000円</span>
              </div>
              <div class="lending-borrowing-member-money-detail">
                <img src="../assets/search.png" alt="" />
              </div>
            </div>
          </div>
          <hr />
          <div class="lending-borrowing-item">
            <div class="lending-borrowing-item-left">
              <div class="lending-borrowing-member">
                <span>濱本将</span>
              </div>
            </div>
            <div class="lending-borrowing-item-right">
              <div class="lending-borrowing-member-money minus">
                <span>- 8,000円</span>
              </div>
              <div class="lending-borrowing-member-money-detail">
                <img src="../assets/search.png" alt="" />
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div class="lending-borrowing-explain-wrapper">
          <div class="lending-borrowing-explain">
            <div class="blue-explain">
              <span><span class="blue">青字</span>は受け取るべき金額</span>
            </div>
            <div class="red-explain">
              <span><span class="red">赤字</span>は支払うべき金額</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
      .member-wrapper {
        margin-top: 12px;
        margin-bottom: 8px;
        font-size: 10px;
        font-weight: bold;
        .member-title {
        }
        #members {
        }
      }
      .share-wrapper {
        margin-top: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
        .url {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          pointer-events: auto;
          img {
            width: 18px;
            height: 18px;
          }
          span {
            margin-left: 4px;
          }
        }
        .line {
          margin-left: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          pointer-events: auto;
          img {
            width: 20px;
            height: 20px;
          }
          span {
            margin-left: 4px;
          }
        }
      }
    }

    .add-payment-button-wrapper {
      margin-top: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      .add-payment-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 32px;
        border-radius: 4px;
        background-color: $light_blue;
        box-shadow: 0 2px 0 0 #cbcecf;
        span {
          color: white;
          font-size: 14px;
        }
      }
    }

    .payment-list-wrapper {
      margin: 0 calc(-#{$padding-lr});
      margin-top: 40px;
      background-color: $yellow;
      padding: 8px 18px;
      padding-bottom: 24px;
      color: $bace_text_color;
      .payment-list-title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
      }
      .payment-items {
        .payment-item {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .payment-item-left {
            .payment-item-name {
              font-size: 16px;
              font-weight: bold;
            }
            .payment-item-member {
              font-size: 10px;
              font-weight: normal;
            }
          }
          .payment-item-right {
            display: flex;
            justify-content: center;
            align-items: center;
            .payment-item-price {
              font-size: 18px;
              font-weight: bold;
            }
            .payment-item-edit {
              margin-left: 8px;
              width: 22px;
              height: 22px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 4px;
              border: 1px solid $bace_text_color;
              cursor: pointer;
              pointer-events: auto;
              img {
                width: 15px;
                height: 15px;
              }
            }
          }
        }
      }
    }

    .seisan-result-wrapper {
      margin: 0 calc(-#{$padding-lr});
      margin-top: 28px;
      background-color: $gray;
      padding: 8px 18px;
      padding-bottom: 24px;
      color: $bace_text_color;
      .seisan-result-title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
      }
      .seisan-result-items {
        .seisan-result-item {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .seisan-result-item-money-flow {
            font-size: 12px;
            font-weight: bold;
          }
          .seisan-result-item-money {
            font-size: 18px;
            font-weight: bold;
          }
        }
      }
    }

    .lending-borrowing-wrapper {
      margin: 0 calc(-#{$padding-lr});
      margin-top: 28px;
      padding: 0 18px;
      color: $bace_text_color;
      .lending-borrowing-title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
      }
      .lending-borrowing-items {
        .lending-borrowing-item {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .lending-borrowing-item-left {
            display: flex;
            justify-content: center;
            align-items: center;
            .lending-borrowing-member {
              font-size: 12px;
              font-weight: bold;
            }
          }
          .lending-borrowing-item-right {
            display: flex;
            justify-content: center;
            align-items: center;
            .lending-borrowing-member-money {
              font-size: 16px;
              font-weight: bold;
              &.plus {
                color: $plus;
              }
              &.minus {
                color: $minus;
              }
            }
            .lending-borrowing-member-money-detail {
              margin-left: 8px;
              width: 22px;
              height: 22px;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              pointer-events: auto;
              img {
                width: 15px;
                height: 15px;
              }
            }
          }
        }
      }
      .lending-borrowing-explain-wrapper {
        margin-top: 8px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .lending-borrowing-explain {
          font-size: 10px;
          color: $bace_text_color;
          .blue-explain {
            .blue {
              color: $plus;
            }
          }
          .red-explain {
            .red {
              color: $minus;
            }
          }
        }
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    addPayment() {
      console.log("addPayment()");
    },
  },
  beforeCreate: function() {
    console.log("Group.vue beforeCreate");
  },
  created: function() {
    console.log("Group.vue created");
  },
  beforeMount: function() {
    console.log("Group.vue beforeMount");
  },
  mounted: function() {
    console.log("Group.vue mounted");
  },
  beforeUpdate: function() {
    console.log("Group.vue beforeUpdate");
  },
  updated: function() {
    console.log("Group.vue updated");
  },
  beforeDestroy: function() {
    console.log("Group.vue beforeDestroy");
  },
  destroyed: function() {
    console.log("Group.vue destroyed");
  },
};
</script>
