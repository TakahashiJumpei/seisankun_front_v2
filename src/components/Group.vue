<template>
  <div class="main">
    <div class="loding" v-bind:class="{ 'loding-active': loding }">
      <div>
        <span>読み込み中...</span>
      </div>
      <img src="../assets/loding.gif" alt="" />
    </div>
    <div class="inner" v-bind:class="{ 'loding-active': loding }">
      <div class="group-top-wrapper">
        <div class="name-and-edit-wrapper">
          <div class="name-wrapper">
            <div class="group-title">
              <span>グループ</span>
            </div>
            <div class="group-name">
              <span>{{ groupName }}</span>
            </div>
          </div>
          <div class="group-edit-wrapper">
            <div class="group-edit" @click="toEditGroup">
              <span>グループの編集</span>
            </div>
          </div>
        </div>
        <div class="member-wrapper">
          <div class="member-title">
            <span>メンバー</span>
          </div>
          <span v-for="(member, index) in members" :key="member.id">
            <span>{{ member.name }}</span>
            <span v-if="index != Object.keys(members).length - 1">, </span>
          </span>
        </div>
        <div class="share-wrapper">
          <div class="url" @click="getGroupUrl">
            <img src="../assets/link.png" alt="" />
            <span>リンクをコピー</span>
          </div>
          <div class="line" @click="shareForLine">
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

      <template v-if="!paymentExist">
        <div class="payment-none-wrapper">
          <div class="payment-none-sentence">
            <div><span>まだ立替記録がありません。</span></div>
            <div>
              <span
                >「支払いの追加」から立て替えた記録を追加していきましょう。</span
              >
            </div>
            <div><span>支払いの追加をすると精算結果を表示します。</span></div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="payment-list-wrapper">
          <div class="payment-list-title">
            <span>支払い内容一覧</span>
          </div>
          <div class="payment-items">
            <div
              v-for="payment in payments"
              :key="payment.id"
              class="payment-item"
            >
              <div class="payment-item-left">
                <div class="payment-item-name">
                  <span>{{ payment.name }}</span>
                </div>
                <div class="payment-item-member">
                  <span>{{ payment.member }}が立て替え</span>
                </div>
              </div>
              <div class="payment-item-right">
                <div class="payment-item-price">
                  <span>{{ payment.price | numberRound | numberFormat }}</span>
                  <span>{{ moneyUnit }}</span>
                </div>
                <div class="payment-item-edit" @click="editPayment(payment.id)">
                  <img src="../assets/edit.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <template v-if="calculationResultsExist">
          <div class="seisan-result-wrapper">
            <div class="seisan-result-title">
              <span>精算結果</span>
            </div>
            <div class="seisan-result-items">
              <div
                v-for="seisanResult in seisanResults"
                :key="seisanResult.id"
                class="seisan-result-item"
              >
                <div class="seisan-result-item-money-flow">
                  <span>{{ seisanResult.from }}</span>
                  <span> → </span>
                  <span>{{ seisanResult.to }}</span>
                </div>
                <div class="seisan-result-item-money">
                  <span>{{
                    seisanResult.price | numberRound | numberFormat
                  }}</span>
                  <span>{{ moneyUnit }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="lending-borrowing-wrapper">
            <div class="lending-borrowing-title">
              <span>貸し借りの状況</span>
            </div>
            <div class="lending-borrowing-items">
              <div
                v-for="lendingBorrowingItem in lendingBorrowingItems"
                :key="lendingBorrowingItem.id"
                class="lending-borrowing-item"
              >
                <div class="lending-borrowing-item-left">
                  <div class="lending-borrowing-member">
                    <span>{{ lendingBorrowingItem.member }}</span>
                  </div>
                </div>
                <div class="lending-borrowing-item-right">
                  <div
                    class="lending-borrowing-member-money"
                    v-bind:class="{
                      plus: lendingBorrowingItem.plus,
                      minus: !lendingBorrowingItem.plus,
                    }"
                  >
                    <span>{{ lendingBorrowingItem.plus ? "+" : "" }}</span>
                    <span>{{
                      lendingBorrowingItem.price | numberRound | numberFormat
                    }}</span>
                    <span>{{ moneyUnit }}</span>
                  </div>
                  <div
                    class="lending-borrowing-member-money-detail"
                    @click="
                      memberLendingBorrowingDetail(lendingBorrowingItem.id)
                    "
                  >
                    <img src="../assets/search.png" alt="" />
                  </div>
                </div>
              </div>
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
        </template>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      members: [],
      payments: [],
      seisanResults: [],
      lendingBorrowingItems: [],
      groupName: "",
      travel_key: "",
      moneyUnit: "円",
      groupIDs: [],
      paymentExist: false,
      calculationResultsExist: false,
      loding: true,
    };
  },
  filters: {
    numberRound: function(num) {
      return Math.round(num);
    },
    numberFormat: function(num) {
      return num.toLocaleString();
    },
  },
  methods: {
    saveGroupToLacalStrage() {
      console.log(this.travel_key);
      this.groupIDs = JSON.parse(localStorage.getItem("groupIDs"));
      console.log(this.groupIDs);
      /**
       * NOTE:
       * グループIDが一致していなかったら、配列の先頭に追加する
       * 一致した場合、すでに配列に存在している当該IDを配列の先頭に移動させる
       * 追加後、配列の要素数が１１個になったら最古の要素を削除する
       */
      if (this.groupIDs !== null) {
        for (let i = 0; i < this.groupIDs.length; i++) {
          if (this.groupIDs[i] === this.travel_key) {
            this.groupIDs.splice(i, 1);
            break;
          }
        }
      } else {
        this.groupIDs = [];
      }
      this.groupIDs.unshift(this.travel_key);
      if (this.groupIDs.length > 10) {
        this.groupIDs.pop();
      }
      localStorage.setItem("groupIDs", JSON.stringify(this.groupIDs));
    },
    async getGroup() {
      this.travel_key = this.$route.params.travel_key;
      let options = {
        method: "GET",
        url: `/travel`,
        params: { travel_key: this.travel_key },
      };
      this.$seisankunApi
        .request(options)
        .then((response) => {
          console.log(response);
          console.log(JSON.stringify(response));
          this.groupName = response.data.travel.name;
          this.members = response.data.members;
          this.saveGroupToLacalStrage();
          this.getPaymentHistory();
        })
        .catch((err) => {
          let errStatus;
          for (let key of Object.keys(err)) {
            if (key === "response") {
              errStatus = err[key].status;
            }
          }
          if (typeof errStatus === "undefined") {
            errStatus = "なし";
          }
          console.log("エラー");
        });
    },
    async getPaymentHistory() {
      let options = {
        method: "GET",
        url: `/payment/history`,
        params: { travel_key: this.travel_key },
      };
      this.$seisankunApi
        .request(options)
        .then((response) => {
          console.log(response);
          console.log(JSON.stringify(response));
          if (response.data.payments.length === 0) {
            this.paymentExist = false;

            this.hideLoding();
            return;
          }
          this.paymentExist = true;
          for (let i = 0; i < response.data.payments.length; i++) {
            let _payments_unit = {};
            _payments_unit.id = response.data.payments[i].id;
            _payments_unit.name = response.data.payments[i].title;
            _payments_unit.member = response.data.payments[i].payer_name;
            _payments_unit.price = response.data.payments[i].amount;
            this.payments.push(_payments_unit);
          }
          this.getCalculationResults();
        })
        .catch((err) => {
          let errStatus;
          for (let key of Object.keys(err)) {
            if (key === "response") {
              errStatus = err[key].status;
            }
          }
          if (typeof errStatus === "undefined") {
            errStatus = "なし";
          }
          console.log("エラー");
        });
    },
    async getCalculationResults() {
      let options = {
        method: "GET",
        url: `/calculation/results`,
        params: { travel_key: this.travel_key },
      };
      this.$seisankunApi
        .request(options)
        .then((response) => {
          console.log(response);
          console.log(JSON.stringify(response));
          /**
           * NOTE:グループにメンバーが１名のみの状況で支払いが1件以上ある場合、精算結果は未返却となる？
           */
          if (response.data.length === 0) {
            this.calculationResultsExist = false;

            this.hideLoding();
            return;
          }
          this.calculationResultsExist = true;
          for (let i = 0; i < response.data.length; i++) {
            let _seisanResults_unit = {};
            _seisanResults_unit.from = response.data[i].borrower_name;
            _seisanResults_unit.to = response.data[i].lender_name;
            _seisanResults_unit.price = response.data[i].borrow_money;
            this.seisanResults.push(_seisanResults_unit);
          }
          console.log(this.seisanResults);
          this.getBorrowingStatuses();
        })
        .catch((err) => {
          console.log(err.response);
          console.log(JSON.stringify(err.response));
          let errStatus;
          for (let key of Object.keys(err)) {
            if (key === "response") {
              errStatus = err[key].status;
            }
          }
          if (typeof errStatus === "undefined") {
            errStatus = "なし";
          }
          console.log("エラー");
        });
    },
    async getBorrowingStatuses() {
      let options = {
        method: "GET",
        url: `/borrowing/statuses`,
        params: { travel_key: this.travel_key },
      };
      this.$seisankunApi
        .request(options)
        .then((response) => {
          console.log(response);
          console.log(JSON.stringify(response));
          for (let i = 0; i < response.data.statuses.length; i++) {
            let _lendingBorrowingItems_unit = {};
            _lendingBorrowingItems_unit.id =
              response.data.statuses[i].member.id;
            _lendingBorrowingItems_unit.member =
              response.data.statuses[i].member.name;
            _lendingBorrowingItems_unit.price =
              response.data.statuses[i].lend_borrow_money;
            if (_lendingBorrowingItems_unit.price > 0) {
              _lendingBorrowingItems_unit.plus = true;
            } else {
              _lendingBorrowingItems_unit.plus = false;
            }
            this.lendingBorrowingItems.push(_lendingBorrowingItems_unit);
          }
          console.log(this.lendingBorrowingItems);

          this.hideLoding();
        })
        .catch((err) => {
          let errStatus;
          for (let key of Object.keys(err)) {
            if (key === "response") {
              errStatus = err[key].status;
            }
          }
          if (typeof errStatus === "undefined") {
            errStatus = "なし";
          }
          console.log("エラー");
        });
    },
    toEditGroup() {
      this.$router.push({
        name: "EditGroup",
        params: { travel_key: this.travel_key },
      });
    },
    getGroupUrl() {
      let dummyUrl = "https://dev-seisan-kun-v2.netlify.app/#/";
      const element = document.createElement("input");
      element.value = dummyUrl;
      document.body.appendChild(element);
      element.select();
      document.execCommand("copy");
      document.body.removeChild(element);
    },
    shareForLine() {
      let dummyUrl = "https://dev-seisan-kun-v2.netlify.app/#/";
      let lineHref =
        "https://line.me/R/msg/text/?" + encodeURIComponent(dummyUrl);
      window.open(lineHref, "_blank");
    },
    addPayment() {
      this.$router.push({
        name: "AddPayment",
        params: { travel_key: this.travel_key },
      });
    },
    editPayment(payment_id) {
      this.$router.push({
        name: "EditPayment",
        params: { travel_key: this.travel_key, payment_id: payment_id },
      });
    },
    memberLendingBorrowingDetail(member_id) {
      this.$router.push({
        name: "MemberLendingBorrowingDetail",
        params: { travel_key: this.travel_key, member_id: member_id },
      });
    },
    hideLoding() {
      this.loding = false;
    },
  },
  mounted: function() {
    this.getGroup();
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";
@import "../scss/breakpoints/base";

.main {
  min-height: calc(100vh - #{$header-h} - #{$footer-h});
  padding: $padding-tb $padding-lr;
  @media screen and(min-width: $min-width) {
    @import "../scss/breakpoints/768up";
    padding: $padding-tb $padding-lr;
  }
  @import "../scss/partials/loding";
  .inner {
    display: block;
    &.loding-active {
      display: none;
    }
    .group-top-wrapper {
      .name-and-edit-wrapper {
        display: flex;
        justify-content: space-between;
        color: $base_text_color;
        font-weight: bold;
        .name-wrapper {
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
        .group-edit-wrapper {
          .group-edit {
            font-size: 10px;
            @media screen and(min-width: $min-width) {
              font-size: 16px;
            }
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
        @media screen and(min-width: $min-width) {
          font-size: 16px;
        }
        font-weight: bold;
        color: $base_text_color;
        border-bottom: solid 1px $base_text_color;
        padding-bottom: 8px;
      }
      .share-wrapper {
        margin-top: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $base_text_color;
        font-size: 10px;
        @media screen and(min-width: $min-width) {
          font-size: 12px;
        }
        .url {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          pointer-events: auto;
          img {
            width: 18px;
            height: 18px;
            @media screen and(min-width: $min-width) {
              width: 22px;
              height: 22px;
            }
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
            @media screen and(min-width: $min-width) {
              width: 24px;
              height: 24px;
            }
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
        @media screen and(min-width: $min-width) {
          width: 240px;
          height: 44px;
        }
        border-radius: 4px;
        background-color: $green;
        box-shadow: 0 2px 0 0 #cbcecf;
        span {
          color: white;
          font-size: 14px;
          @media screen and(min-width: $min-width) {
            font-size: 18px;
          }
        }
      }
    }

    .payment-none-wrapper {
      background-color: $gray;
      margin: 0 calc(-#{$padding-lr});
      margin-top: 40px;
      padding: 18px 48px;
      font-size: 12px;
      @media screen and(min-width: $min-width) {
        @import "../scss/breakpoints/768up";
        margin: 0 calc(-#{$padding-lr});
        margin-top: 40px;
        padding: 24px 48px;
        font-size: 16px;
      }
      color: $base_text_color;
      .payment-none-sentence {
        div {
          @media screen and(min-width: $min-width) {
            @import "../scss/breakpoints/768up";
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }

    .payment-list-wrapper {
      background-color: $yellow;
      margin: 0 calc(-#{$padding-lr});
      margin-top: 40px;
      padding: 8px 18px;
      padding-bottom: 24px;
      @media screen and(min-width: $min-width) {
        @import "../scss/breakpoints/768up";
        margin: 0 calc(-#{$padding-lr});
        margin-top: 40px;
        padding: 8px $padding-lr;
        padding-bottom: 24px;
      }
      color: $base_text_color;
      .payment-list-title {
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
      .payment-items {
        .payment-item {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: solid 1px $base_text_color;
          padding-bottom: 2px;
          .payment-item-left {
            .payment-item-name {
              font-size: 16px;
              @media screen and(min-width: $min-width) {
                font-size: 20px;
              }
              font-weight: bold;
            }
            .payment-item-member {
              font-size: 10px;
              @media screen and(min-width: $min-width) {
                font-size: 14px;
              }
              font-weight: normal;
            }
          }
          .payment-item-right {
            display: flex;
            justify-content: center;
            align-items: center;
            .payment-item-price {
              font-size: 18px;
              @media screen and(min-width: $min-width) {
                font-size: 24px;
              }
              font-weight: bold;
            }
            .payment-item-edit {
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
    }

    .seisan-result-wrapper {
      background-color: $gray;
      margin: 0 calc(-#{$padding-lr});
      margin-top: 28px;
      padding: 8px 18px;
      padding-bottom: 24px;
      @media screen and(min-width: $min-width) {
        @import "../scss/breakpoints/768up";
        margin: 0 calc(-#{$padding-lr});
        margin-top: 28px;
        padding: 8px $padding-lr;
        padding-bottom: 24px;
      }
      color: $base_text_color;
      .seisan-result-title {
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
      .seisan-result-items {
        .seisan-result-item {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: solid 1px $base_text_color;
          padding-bottom: 2px;
          .seisan-result-item-money-flow {
            font-size: 12px;
            @media screen and(min-width: $min-width) {
              font-size: 16px;
            }
            font-weight: bold;
          }
          .seisan-result-item-money {
            font-size: 18px;
            @media screen and(min-width: $min-width) {
              font-size: 24px;
            }
            font-weight: bold;
          }
        }
      }
    }

    .lending-borrowing-wrapper {
      margin: 0 calc(-#{$padding-lr});
      margin-top: 28px;
      padding: 0 18px;
      @media screen and(min-width: $min-width) {
        @import "../scss/breakpoints/768up";
        margin: 0 calc(-#{$padding-lr});
        margin-top: 28px;
        padding: 0 $padding-lr;
      }
      color: $base_text_color;
      .lending-borrowing-title {
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
      .lending-borrowing-items {
        .lending-borrowing-item {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: solid 1px $base_text_color;
          padding-bottom: 2px;
          .lending-borrowing-item-left {
            display: flex;
            justify-content: center;
            align-items: center;
            .lending-borrowing-member {
              font-size: 12px;
              @media screen and(min-width: $min-width) {
                font-size: 16px;
              }
              font-weight: bold;
            }
          }
          .lending-borrowing-item-right {
            display: flex;
            justify-content: center;
            align-items: center;
            .lending-borrowing-member-money {
              font-size: 16px;
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
            .lending-borrowing-member-money-detail {
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
      .lending-borrowing-explain-wrapper {
        margin-top: 8px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .lending-borrowing-explain {
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
</style>
