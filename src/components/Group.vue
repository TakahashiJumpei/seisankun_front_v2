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
                <span>{{ payment.price | numberFormat }}</span>
                <span>{{ moneyUnit }}</span>
              </div>
              <div class="payment-item-edit" @click="editPayment(payment.id)">
                <img src="../assets/edit.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

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
              <span>{{ seisanResult.price | numberFormat }}</span>
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
                <span>{{ lendingBorrowingItem.price | numberFormat }}</span>
                <span>{{ moneyUnit }}</span>
              </div>
              <div
                class="lending-borrowing-member-money-detail"
                @click="memberLendingBorrowingDetail(lendingBorrowingItem.id)"
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
    </div>
  </div>
</template>

<script>
import { api_request } from "../js/api.js";
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
    };
  },
  filters: {
    numberFormat: function(num) {
      return num.toLocaleString();
    },
  },
  methods: {
    async getGroup() {
      this.travel_key = this.$route.params.travel_key;
      const apihandler = new api_request("http://localhost:10082");
      //APIからレスが来るまで後続の処理を止める
      let response = await apihandler.getGroup(this.travel_key);
      console.log(response);
      this.groupName = response.data.travel.name;
      this.members = response.data.members;
      this.getPaymentHistory();
    },
    async getPaymentHistory() {
      const apihandler = new api_request("http://localhost:10082");
      //APIからレスが来るまで後続の処理を止める
      let response = await apihandler.getPaymentHistory(this.travel_key);
      console.log(response);

      for (let i = 0; i < response.data.payments.length; i++) {
        let _payments_unit = {};
        //支払いIDも取得する必要がある。
        _payments_unit.id = response.data.payments[i].id;
        _payments_unit.name = response.data.payments[i].title;
        _payments_unit.member = response.data.payments[i].payer_name;
        _payments_unit.price = response.data.payments[i].amount;
        this.payments.push(_payments_unit);
      }
      this.getCalculationResults();
    },
    async getCalculationResults() {
      const apihandler = new api_request("http://localhost:10082");
      //APIからレスが来るまで後続の処理を止める
      let response = await apihandler.getCalculationResults(this.travel_key);
      console.log(response);
      for (let i = 0; i < response.data.results.length; i++) {
        let _seisanResults_unit = {};
        _seisanResults_unit.from = response.data.results[i].borrower_name;
        _seisanResults_unit.to = response.data.results[i].lender_name;
        _seisanResults_unit.price = response.data.results[i].borrow_money;
        this.seisanResults.push(_seisanResults_unit);
      }
      this.getBorrowingStatuses();
    },
    async getBorrowingStatuses() {
      const apihandler = new api_request("http://localhost:10082");
      //APIからレスが来るまで後続の処理を止める
      let response = await apihandler.getBorrowingStatuses(this.travel_key);
      console.log(response);

      for (let i = 0; i < response.data.statuses.length; i++) {
        let _lendingBorrowingItems_unit = {};
        _lendingBorrowingItems_unit.id = response.data.statuses[i].member.id;
        _lendingBorrowingItems_unit.member =
          response.data.statuses[i].member.name;
        _lendingBorrowingItems_unit.price =
          response.data.statuses[i].borrow_money;
        if (_lendingBorrowingItems_unit.price > 0) {
          _lendingBorrowingItems_unit.plus = true;
        } else {
          _lendingBorrowingItems_unit.plus = false;
        }
        this.lendingBorrowingItems.push(_lendingBorrowingItems_unit);
      }
    },

    toEditGroup() {
      //グループの編集ページを表示;
      this.$router.push({
        name: "EditGroup",
        params: { travel_key: this.travel_key },
      });
    },
    getGroupUrl() {
      //ダミーで開発サイトのURLを取得
      let dummyUrl = "https://dev-seisan-kun-v2.netlify.app/#/";
      const element = document.createElement("input");
      //element.value = location.href;
      element.value = dummyUrl;
      document.body.appendChild(element);
      element.select();
      document.execCommand("copy");
      document.body.removeChild(element);
    },
    shareForLine() {
      //現在表示中のURLにグループのIDがつく仕組みなので簡単にできそう
      //ダミーで開発サイトのURLを取得
      let dummyUrl = "https://dev-seisan-kun-v2.netlify.app/#/";
      let lineHref =
        "https://line.me/R/msg/text/?" + encodeURIComponent(dummyUrl);
      //let lineHref = "https://line.me/R/msg/text/";
      window.open(lineHref, "_blank");
    },
    addPayment() {
      //支払いの追加ページを表示
      //this.$router.push({ path: "/AddPayment/" });
      this.$router.push({
        name: "AddPayment",
        params: { travel_key: this.travel_key },
      });
    },
    editPayment(payment_id) {
      //支払いの編集ページを表示
      this.$router.push({
        name: "EditPayment",
        params: { travel_key: this.travel_key, payment_id: payment_id },
      });
    },
    memberLendingBorrowingDetail(member_id) {
      //個人の支払い履歴ページを表示
      this.$router.push({
        name: "MemberLendingBorrowingDetail",
        params: { travel_key: this.travel_key, member_id: member_id },
      });
    },
  },
  beforeCreate: function() {},
  created: function() {},
  beforeMount: function() {},
  mounted: function() {
    this.getGroup();
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  destroyed: function() {},
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

.main {
  min-height: calc(100vh - #{$header-h} - #{$footer-h});
  padding: $padding-tb $padding-lr;
  .inner {
    .group-top-wrapper {
      .name-and-edit-wrapper {
        display: flex;
        justify-content: space-between;
        //align-items: center;
        color: $base_text_color;
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
        border-bottom: solid 1px $base_text_color;
        padding-bottom: 8px;
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
        background-color: $green;
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
      color: $base_text_color;
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
          border-bottom: solid 1px $base_text_color;
          padding-bottom: 2px;
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
    }

    .seisan-result-wrapper {
      margin: 0 calc(-#{$padding-lr});
      margin-top: 28px;
      background-color: $gray;
      padding: 8px 18px;
      padding-bottom: 24px;
      color: $base_text_color;
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
          border-bottom: solid 1px $base_text_color;
          padding-bottom: 2px;
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
      color: $base_text_color;
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
          border-bottom: solid 1px $base_text_color;
          padding-bottom: 2px;
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
