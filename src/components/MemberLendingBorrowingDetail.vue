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
                <span>{{ lending.price | numberFormat }}</span>
                <span>{{ moneyUnit }}</span>
              </div>
              <div class="lending-item-edit" @click="toEditPayment(lending.id)">
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
              <span>{{ lendingsSum | numberFormat }}</span>
              <span>{{ moneyUnit }}</span>
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
                <span>{{ borrowing.price | numberFormat }}</span>
                <span>{{ moneyUnit }}</span>
              </div>
              <div
                class="borrowing-item-edit"
                @click="toEditPayment(borrowing.id)"
              >
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
              <span>{{ borrowingsSum | numberFormat }}</span>
              <span>{{ moneyUnit }}</span>
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
                <span>{{ differencePrice | numberFormat }}</span>
                <span>{{ moneyUnit }}</span>
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
import { api_request } from "../js/api.js";
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
      moneyUnit: "円",
    };
  },
  filters: {
    numberFormat: function(num) {
      return num.toLocaleString();
    },
  },
  methods: {
    toEditPayment(id) {
      id = 1;
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
    async getGroup() {
      this.travel_key = this.$route.params.travel_key;
      this.member_id = this.$route.params.member_id;
      const apihandler = new api_request(process.env.VUE_APP_SEISANKUN_API_BASE_URL);
      let response = await apihandler.getGroup(this.travel_key);
      console.log(response);
      this.groupName = response.data.travel.name;
      this.members = response.data.members;
      for (let i = 0; i < this.members.length; i++) {
        if (Number(this.member_id) === this.members[i].id) {
          this.member = this.members[i].name;
        }
      }
      this.getBorrowingHistory();
    },
    async getBorrowingHistory() {
      const apihandler = new api_request(process.env.VUE_APP_SEISANKUN_API_BASE_URL);
      let response = await apihandler.getBorrowingHistory(this.member_id);
      console.log(response);
      for (let i = 0; i < response.data.histories.length; i++) {
        if (response.data.histories[i].payment.borrow_money > 0) {
          let _lendings_unit = {};
          _lendings_unit.name = response.data.histories[i].payment.title;
          _lendings_unit.member = response.data.histories[i].user.name;
          _lendings_unit.price =
            response.data.histories[i].payment.borrow_money;
          this.lendings.push(_lendings_unit);
        } else {
          let _borrowings_unit = {};
          _borrowings_unit.name = response.data.histories[i].payment.title;
          _borrowings_unit.member = response.data.histories[i].user.name;
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
    },
  },
  mounted: function() {
    this.getGroup();
  },
};
</script>

<style lang="scss">
@import "../scss/variables";
@import "../scss/breakpoints/base";

.main {
  min-height: calc(100vh - #{$header-h} - #{$footer-h});
  padding: $padding-tb $padding-lr;
  @media screen and(min-width: $min-width) {
    @import "../scss/breakpoints/768up";
    padding: $padding-tb $padding-lr;
  }
  .inner {
    .group-name-wrapper {
      color: $base_text_color;
      font-weight: bold;
      padding-bottom: 8px;
      border-bottom: solid 1px $base_text_color;
      .group-title {
        font-size: 10px;
        @media screen and(min-width: $min-width) {
          font-size: 16px;
        }
      }
      .group-name {
        font-size: 20px;
        @media screen and(min-width: $min-width) {
          font-size: 28px;
        }
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
        @media screen and(min-width: $min-width) {
          @import "../scss/breakpoints/768up";
          font-size: $theme-title-size;
        }
        font-weight: bold;
        font-size: 20px;
      }
    }

    .lending-list-wrapper {
      background-color: $yellow;
      margin: 0 calc(-#{$padding-lr});
      margin-top: 28px;
      padding: 12px 18px;
      padding-bottom: 30px;
      @media screen and(min-width: $min-width) {
        @import "../scss/breakpoints/768up";
        margin: 0 calc(-#{$padding-lr});
        margin-top: 28px;
        padding: 12px $padding-lr;
        padding-bottom: 30px;
      }
      color: $base_text_color;
      .lending-list-title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        @media screen and(min-width: $min-width) {
          @import "../scss/breakpoints/768up";
          font-size: $theme-title-size;
        }
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
              @media screen and(min-width: $min-width) {
                font-size: 20px;
              }
              font-weight: bold;
            }
          }
          .lending-item-right {
            display: flex;
            justify-content: center;
            align-items: center;
            .lending-item-price {
              font-size: 18px;
              @media screen and(min-width: $min-width) {
                font-size: 24px;
              }
              font-weight: bold;
            }
            .lending-item-edit {
              margin-left: 8px;
              width: 22px;
              height: 22px;
              @media screen and(min-width: $min-width) {
                width: 24px;
                height: 24px;
              }
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
                @media screen and(min-width: $min-width) {
                  width: 18px;
                  height: 18px;
                }
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
            @media screen and(min-width: $min-width) {
              font-size: 22px;
            }
            font-weight: bold;
          }
          .lending-sum-price {
            margin-left: 8px;
            font-size: 18px;
            @media screen and(min-width: $min-width) {
              font-size: 24px;
            }
            font-weight: bold;
          }
        }
      }
    }

    .borrowing-list-wrapper {
      background-color: $yellow;
      margin: 0 calc(-#{$padding-lr});
      margin-top: 20px;
      padding: 12px 18px;
      padding-bottom: 30px;
      @media screen and(min-width: $min-width) {
        @import "../scss/breakpoints/768up";
        margin: 0 calc(-#{$padding-lr});
        margin-top: 20px;
        padding: 12px $padding-lr;
        padding-bottom: 30px;
      }
      color: $base_text_color;
      .borrowing-list-title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        @media screen and(min-width: $min-width) {
          @import "../scss/breakpoints/768up";
          font-size: $theme-title-size;
        }
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
              @media screen and(min-width: $min-width) {
                font-size: 20px;
              }
              font-weight: bold;
            }
            .borrowing-item-member {
              font-size: 10px;
              @media screen and(min-width: $min-width) {
                font-size: 14px;
              }
              font-weight: normal;
            }
          }
          .borrowing-item-right {
            display: flex;
            justify-content: center;
            align-items: center;
            .borrowing-item-price {
              font-size: 18px;
              @media screen and(min-width: $min-width) {
                font-size: 24px;
              }
              font-weight: bold;
            }
            .borrowing-item-edit {
              margin-left: 8px;
              width: 22px;
              height: 22px;
              @media screen and(min-width: $min-width) {
                width: 24px;
                height: 24px;
              }
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
                @media screen and(min-width: $min-width) {
                  width: 18px;
                  height: 18px;
                }
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
            @media screen and(min-width: $min-width) {
              font-size: 22px;
            }
            font-weight: bold;
          }
          .borrowing-sum-price {
            margin-left: 8px;
            font-size: 18px;
            @media screen and(min-width: $min-width) {
              font-size: 24px;
            }
            font-weight: bold;
          }
        }
      }
    }

    .difference-wrapper {
      background-color: $yellow;
      margin: 0 calc(-#{$padding-lr});
      margin-top: 20px;
      padding: 12px 18px;
      @media screen and(min-width: $min-width) {
        @import "../scss/breakpoints/768up";
        margin: 0 calc(-#{$padding-lr});
        margin-top: 20px;
        padding: 12px $padding-lr;
      }
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
              @media screen and(min-width: $min-width) {
                font-size: 22px;
              }
              font-weight: bold;
            }
            .difference-price {
              margin-left: 32px;
              font-size: 18px;
              @media screen and(min-width: $min-width) {
                font-size: 24px;
              }
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
              @media screen and(min-width: $min-width) {
                font-size: 14px;
              }
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
      @import "../scss/partials/backbutton";
    }
  }
}
</style>
