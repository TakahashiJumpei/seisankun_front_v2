<template>
  <div class="main">
    <div class="inner">
      <div class="group-name-wrapper">
        <div class="group-title">
          <span>グループ</span>
        </div>
        <div class="group-name">
          <span>{{ groupName }}</span>
        </div>
      </div>

      <div class="title-wrapper">
        <div class="title">
          <span>{{ member }}の<br />貸し借り状況</span>
        </div>
      </div>

      <div class="lending-list-wrapper">
        <div class="lending-list-title">
          <span>支払ったもの</span>
        </div>
        <div class="lending-items">
          <div
            v-for="lending in lendings"
            :key="lending.id"
            class="lending-item"
          >
            <div class="lending-item-left">
              <div class="lending-item-name">
                <span>{{ lending.name }}</span>
              </div>
            </div>
            <div class="lending-item-right">
              <div class="lending-item-price">
                <span>{{ lending.price | numberFormat }}円</span>
              </div>
              <div class="lending-item-edit" @click="editPayment(lending.id)">
                <img src="../assets/edit.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="lending-sum-wrapper">
          <div class="lending-sum-box">
            <div class="lending-sum-title">
              <span>①支払い合計</span>
            </div>
            <div class="lending-sum-price">
              <span>{{ lendingsSum | numberFormat }}円</span>
            </div>
          </div>
        </div>
      </div>

      <div class="borrowing-list-wrapper">
        <div class="borrowing-list-title">
          <span>立て替えられたもの</span>
        </div>
        <div class="borrowing-items">
          <div
            v-for="borrowing in borrowings"
            :key="borrowing.id"
            class="borrowing-item"
          >
            <div class="borrowing-item-left">
              <div class="borrowing-item-name">
                <span>{{ borrowing.name }}</span>
              </div>
              <div class="borrowing-item-member">
                <span>{{ borrowing.member }}が立て替え</span>
              </div>
            </div>
            <div class="borrowing-item-right">
              <div class="borrowing-item-price">
                <span>{{ borrowing.price | numberFormat }}円</span>
              </div>
              <div class="borrowing-item-edit" @click="editPayment(borrowing.id)">
                <img src="../assets/edit.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="borrowing-sum-wrapper">
          <div class="borrowing-sum-box">
            <div class="borrowing-sum-title">
              <span>②立て替えられた合計</span>
            </div>
            <div class="borrowing-sum-price">
              <span>{{ borrowingsSum | numberFormat }}円</span>
            </div>
          </div>
        </div>
      </div>

      <div class="difference-wrapper">
        <div class="difference-box">
          <div class="difference-inner-box">
            <div class="difference-sub-box">
              <div class="difference-title">
                <span>①と②の差額</span>
              </div>
              <div
                class="difference-price"
                v-bind:class="{
                  plus: differencePricePlus,
                  minus: !differencePricePlus,
                }"
              >
                <span>{{ differencePricePlus ? "+" : "-" }}</span>
                <span>{{ differencePrice | numberFormat }}円</span>
              </div>
            </div>
            <div class="difference-lending-borrowing-explain-wrapper">
              <div class="difference-lending-borrowing-explain">
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

      <div class="back-button-wrapper">
        <button class="back-button" @click="toGroup">
          <span>戻る</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      members: [],
      member: "",
      lendings: [],
      lendingsSum: 0,
      borrowings: [],
      borrowingsSum: 0,
      differencePrice: 0,
      differencePricePlus: true,
      member_id: 0,
      groupName: "",
      travel_key: "",
    };
  },
  watch: {},
  filters: {
    numberFormat: function(num) {
      return num.toLocaleString();
    },
  },
  methods: {
    editPayment(id) {
      id = 1;
      //支払いの編集ページを表示
      this.$router.push({
        name: "EditPayment",
        params: { travel_key: this.travel_key, payment_id: id },
      });
    },
    toGroup() {
      this.$router.push({
        name: "Group",
        params: { travel_key: this.travel_key },
      });
    },
    async getInfo() {

      /**
       * 2つのAPI通信を実装する
       * 非同期にする必要あり？
       * get /travel
       * get/ borrowing/history
       */
      this.travel_key = this.$route.params.travel_key;
      this.member_id = this.$route.params.member_id;

      const options = {
        method: "GET",
        url: "http://localhost:10082/travel",
        headers: { "Content-Type": "application/json" },
        params: {
          travel_key: this.travel_key,
        },
      };

      const axios1 = axios
        .request(options)
        .then(
          function(response) {
            switch (response.status) {
              case 200:
                this.groupName = response.data.travel.name;
                for (let i = 0; i < response.data.members.length; i++) {
                  let _members_unit = {};
                  _members_unit.id = response.data.members[i].id;
                  _members_unit.name = response.data.members[i].name;
                  this.members.push(_members_unit);
                }
                for (let i = 0; i < this.members.length; i++) {
                  if(Number(this.member_id) === this.members[i].id){
                    this.member = this.members[i].name;
                  }
                }
                break;
              case 401:
                break;
              case 403:
                break;
              case 404:
                break;
              case 500:
                break;
              default:
                break;
            }
          }.bind(this)
        )
        .catch(
          function(error) {
          }.bind(this)
        );

      await Promise.all([axios1]);

      const options2 = {
        method: "GET",
        url: "http://localhost:10082/borrowing/history",
        headers: { "Content-Type": "application/json" },
        params: {
          member_id: this.member_id,
        },
      };

      axios
        .request(options2)
        .then(
          function(response) {
            switch (response.status) {
              case 200: {

                for (let i = 0; i < response.data.histories.length; i++) {
                  if (response.data.histories[i].payment.borrow_money > 0) {
                    let _lendings_unit = {};
                    // _lendings_unit.id =
                    //   response.data.histories[i].payment.id;
                    _lendings_unit.name =
                      response.data.histories[i].payment.title;
                    _lendings_unit.member =
                      response.data.histories[i].user.name;
                    _lendings_unit.price =
                      response.data.histories[i].payment.borrow_money;
                    this.lendings.push(_lendings_unit);
                  } else {
                    let _borrowings_unit = {};
                    // _borrowings_unit.id =
                    //   response.data.histories[i].payment.id;
                    _borrowings_unit.name =
                      response.data.histories[i].payment.title;
                    _borrowings_unit.member =
                      response.data.histories[i].user.name;
                    _borrowings_unit.price = Math.abs(
                      response.data.histories[i].payment.borrow_money
                    );
                    this.borrowings.push(_borrowings_unit);
                  }
                }

                for (let i = 0; i < this.lendings.length; i++) {
                  this.lendingsSum += Number(this.lendings[i].price);
                }

                for (let i = 0; i < this.borrowings.length; i++) {
                  this.borrowingsSum += Number(this.borrowings[i].price);
                }

                this.differencePrice = this.lendingsSum - this.borrowingsSum;
                if (this.differencePrice > 0) {
                  this.differencePricePlus = true;
                } else {
                  this.differencePricePlus = false;
                  this.differencePrice = Math.abs(this.differencePrice);
                }

                break;
              }
              case 401:
                break;
              case 403:
                break;
              case 404:
                break;
              case 500:
                break;
              default:
                break;
            }
          }.bind(this)
        )
        .catch(
          function(error) {
          }.bind(this)
        );
    },
  },
  beforeCreate: function() {
  },
  created: function() {
  },
  beforeMount: function() {
  },
  mounted: function() {
    this.getInfo();
  },
  beforeUpdate: function() {
  },
  updated: function() {
  },
  beforeDestroy: function() {
  },
  destroyed: function() {
  },
};
</script>

<style scoped lang="scss">
$base_text_color: #534e4e;
$light_blue: #1cb7f0;
$green: #1db8a3;
$gray: #f4f0f0;
$yellow: #fff0bf;
$padding-tb: 32px;
$padding-lr: 30px;
$theme-title-size: 16px;
$header-h: 48px;
$footer-h: 120px;
$plus: #206dc5;
$minus: #dd4a76;
$form-border: #707070;

.main {
  min-height: calc(100vh - #{$header-h} - #{$footer-h});
  padding: $padding-tb $padding-lr;
  .inner {
    .group-name-wrapper {
      color: $base_text_color;
      font-weight: bold;
      padding-bottom: 8px;
      border-bottom: solid 1px $base_text_color;
      .group-title {
        font-size: 10px;
      }
      .group-name {
        font-size: 20px;
      }
    }

    .title-wrapper {
      margin-top: 20px;
      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        color: $base_text_color;
        font-size: $theme-title-size;
        font-weight: bold;
        font-size: 20px;
      }
    }

    .lending-list-wrapper {
      margin: 0 calc(-#{$padding-lr});
      margin-top: 28px;
      background-color: $yellow;
      padding: 12px 18px;
      padding-bottom: 30px;
      color: $base_text_color;
      .lending-list-title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
      }
      .lending-items {
        .lending-item {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: solid 1px $base_text_color;
          padding-bottom: 2px;
          .lending-item-left {
            .lending-item-name {
              font-size: 16px;
              font-weight: bold;
            }
          }
          .lending-item-right {
            display: flex;
            justify-content: center;
            align-items: center;
            .lending-item-price {
              font-size: 18px;
              font-weight: bold;
            }
            .lending-item-edit {
              margin-left: 8px;
              width: 22px;
              height: 22px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 4px;
              border: 1px solid $base_text_color;
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
      .lending-sum-wrapper {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 16px;
        .lending-sum-box {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          border-bottom: solid 1px $base_text_color;
          padding-bottom: 2px;
          .lending-sum-title {
            font-size: 16px;
            font-weight: bold;
          }
          .lending-sum-price {
            margin-left: 8px;
            font-size: 18px;
            font-weight: bold;
          }
        }
      }
    }

    .borrowing-list-wrapper {
      margin: 0 calc(-#{$padding-lr});
      margin-top: 20px;
      background-color: $yellow;
      padding: 12px 18px;
      padding-bottom: 30px;
      color: $base_text_color;
      .borrowing-list-title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
      }
      .borrowing-items {
        .borrowing-item {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: solid 1px $base_text_color;
          padding-bottom: 2px;
          .borrowing-item-left {
            .borrowing-item-name {
              font-size: 16px;
              font-weight: bold;
            }
            .borrowing-item-member {
              font-size: 10px;
              font-weight: normal;
            }
          }
          .borrowing-item-right {
            display: flex;
            justify-content: center;
            align-items: center;
            .borrowing-item-price {
              font-size: 18px;
              font-weight: bold;
            }
            .borrowing-item-edit {
              margin-left: 8px;
              width: 22px;
              height: 22px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 4px;
              border: 1px solid $base_text_color;
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
      .borrowing-sum-wrapper {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 16px;
        .borrowing-sum-box {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          border-bottom: solid 1px $base_text_color;
          padding-bottom: 2px;
          .borrowing-sum-title {
            font-size: 16px;
            font-weight: bold;
          }
          .borrowing-sum-price {
            margin-left: 8px;
            font-size: 18px;
            font-weight: bold;
          }
        }
      }
    }

    .difference-wrapper {
      margin: 0 calc(-#{$padding-lr});
      margin-top: 20px;
      background-color: $yellow;
      padding: 12px 18px;
      color: $base_text_color;
      .difference-box {
        display: flex;
        justify-content: center;
        align-items: center;
        .difference-inner-box {
          .difference-sub-box {
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: solid 1px $base_text_color;
            padding-bottom: 2px;
            .difference-title {
              font-size: 16px;
              font-weight: bold;
            }
            .difference-price {
              margin-left: 32px;
              font-size: 18px;
              font-weight: bold;
              &.plus {
                color: $plus;
              }
              &.minus {
                color: $minus;
              }
            }
          }
          .difference-lending-borrowing-explain-wrapper {
            margin-top: 8px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .difference-lending-borrowing-explain {
              font-size: 10px;
              color: $base_text_color;
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

    .back-button-wrapper {
      margin-top: 32px;
      padding-bottom: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      .back-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 188px;
        height: 44px;
        border-radius: 8px;
        background-color: white;
        border: 1px solid $form-border;
        box-shadow: 0 2px 0 0 #cbcecf;
        span {
          color: $base_text_color;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
