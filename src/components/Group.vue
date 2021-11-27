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
          <span v-for="(member, index) in members" :key="member.member_id">
            <span>{{ member }}</span>
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
            :key="payment.payment_id"
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
                <span>{{ payment.price | numberFormat }}円</span>
              </div>
              <div class="payment-item-edit" @click="editPayment">
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
            :key="seisanResult.seisanResult_id"
            class="seisan-result-item"
          >
            <div class="seisan-result-item-money-flow">
              <span>{{ seisanResult.from }}</span>
              <span> → </span>
              <span>{{ seisanResult.to }}</span>
            </div>
            <div class="seisan-result-item-money">
              <span>{{ seisanResult.price | numberFormat }}円</span>
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
            :key="lendingBorrowingItem.lendingBorrowingItem_id"
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
                <span>{{ lendingBorrowingItem.price | numberFormat }}円</span>
              </div>
              <div
                class="lending-borrowing-member-money-detail"
                @click="memberLendingBorrowingDetail"
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
import axios from "axios";
export default {
  data() {
    return {
      members: [],
      payments: [],
      seisanResults: [],
      lendingBorrowingItems: [],
      groupName: "",
    };
  },
  filters: {
    numberFormat: function(num) {
      return num.toLocaleString();
    },
  },
  methods: {
    async getGroupInfo() {
      console.log("Group.vue getGroupInfo");

      //ここでAPI通信を行い、グループIDをKeyにグループデータを取得する
      /**
       * 4つのAPI通信を実装する
       * 非同期にする必要あり？
       * get /travel
       * get /payment/history
       * get/ calculation/results
       * get/ borrowing/statuses
       */

      localStorage.getItem("group_hash_key");
      console.log(localStorage.getItem("group_hash_key"));

      const options = {
        method: "GET",
        url: "http://localhost:10082/travel",
        headers: { "Content-Type": "application/json" },
        params: {
          hash_key: localStorage.getItem("group_hash_key"),
        },
      };
      console.log(options);

      const axios1 = axios
        .request(options)
        .then(
          function(response) {
            console.log("status:", response.status);
            switch (response.status) {
              case 200:
                console.log("body:", response.data);
                this.groupName = response.data.travel.name;
                for (let i = 0; i < response.data.members.length; i++) {
                  this.members.push(response.data.members[i].name);
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
            console.error(error);
          }.bind(this)
        );

      const options2 = {
        method: "GET",
        url: "http://localhost:10082/payment/history",
        headers: { "Content-Type": "application/json" },
        params: {
          hash_key: localStorage.getItem("group_hash_key"),
        },
      };
      console.log(options2);

      const axios2 = axios
        .request(options2)
        .then(
          function(response) {
            console.log("status:", response.status);
            switch (response.status) {
              case 200:
                console.log("body:", response.data);
                for (let i = 0; i < response.data.payments.length; i++) {
                  let _payments_unit = {};
                  _payments_unit.title = response.data.payments[i].title;
                  _payments_unit.member = response.data.payments[i].payer_id;
                  _payments_unit.price = response.data.payments[i].amount;
                  this.payments.push(_payments_unit);
                }
                console.log(this.payments);
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
            console.error(error);
          }.bind(this)
        );

      const options3 = {
        method: "GET",
        url: "http://localhost:10082/calculation/results",
        headers: { "Content-Type": "application/json" },
        params: {
          hash_key: localStorage.getItem("group_hash_key"),
        },
      };
      console.log(options3);

      const axios3 = axios
        .request(options3)
        .then(
          function(response) {
            console.log("status:", response.status);
            switch (response.status) {
              case 200:
                console.log("body:", response.data);
                for (let i = 0; i < response.data.results.length; i++) {
                  let _seisanResults_unit = {};
                  _seisanResults_unit.from = response.data.results[i].borrower_name;
                  _seisanResults_unit.to = response.data.results[i].lender_name;
                  _seisanResults_unit.price = response.data.results[i].borrow_money;
                  this.seisanResults.push(_seisanResults_unit);
                }
                console.log(this.seisanResults);
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
            console.error(error);
          }.bind(this)
        );

      const options4 = {
        method: "GET",
        url: "http://localhost:10082/borrowing/statuses",
        headers: { "Content-Type": "application/json" },
        params: {
          hash_key: localStorage.getItem("group_hash_key"),
        },
      };
      console.log(options4);

      const axios4 = axios
        .request(options4)
        .then(
          function(response) {
            console.log("status:", response.status);
            switch (response.status) {
              case 200:
                console.log("body:", response.data);
                for (let i = 0; i < response.data.statuses.length; i++) {
                  let _lendingBorrowingItems_unit = {};
                  _lendingBorrowingItems_unit.member = response.data.statuses[i].member.name;
                  _lendingBorrowingItems_unit.price = response.data.statuses[i].borrow_money;
                  if(_lendingBorrowingItems_unit.price > 0){
                    _lendingBorrowingItems_unit.plus = true
                  }else{
                    _lendingBorrowingItems_unit.plus = false
                  }
                  this.lendingBorrowingItems.push(_lendingBorrowingItems_unit);
                }
                console.log(this.lendingBorrowingItems);
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
            console.error(error);
          }.bind(this)
        );
      //Promise.all([])とawaitを併用する
      await Promise.all([axios1, axios2, axios3, axios4]);
      console.log("bbbbbb")

      // //ダミーグループ名のセット
      // let dummyGroupName = "渡韓ごっこin新大久保";
      // this.groupName = dummyGroupName;

      // //ダミーメンバーのセット
      // let dummyMembers = [
      //   "nakazaway",
      //   "じゅんちゃん",
      //   "yseki",
      //   "ハマ",
      //   "やまぐち",
      //   "濱本将",
      // ];
      // this.members = dummyMembers;

      // //ダミー支払い内容レコードのセット
      // let dummyPayments = [
      //   { name: "飛行機代", member: "nakazaway", price: 100000 },
      //   { name: "ホテル代", member: "じゅんちゃん", price: 80000 },
      //   { name: "夕食代", member: "nakazaway", price: 20000 },
      //   { name: "タクシー代", member: "yseki", price: 4000 },
      // ];
      // this.payments = dummyPayments;

      // //ダミー精算結果レコードのセット
      // let dummySeisanResults = [
      //   { from: "じゅんちゃん", to: "nakazaway", price: 100000 },
      //   { from: "じゅんちゃん", to: "yseki", price: 50000 },
      //   { from: "yseki", to: "nakazaway", price: 50000 },
      // ];
      // this.seisanResults = dummySeisanResults;

      // //ダミー貸し借りの状況レコードのセット
      // let dummyLendingBorrowingItems = [
      //   { member: "nakazaway", price: 36000, plus: true },
      //   { member: "じゅんちゃん", price: 2000, plus: true },
      //   { member: "yseki", price: 4000, plus: true },
      //   { member: "ハマ", price: 300000, plus: false },
      //   { member: "やまぐち", price: 12000, plus: false },
      //   { member: "濱本将", price: 8000, plus: false },
      // ];
      // this.lendingBorrowingItems = dummyLendingBorrowingItems;
    },
    toEditGroup() {
      console.log("clicked toEditGroup()");
      //グループの編集ページを表示
      this.$router.push({ path: "/EditGroup/" });
    },
    getGroupUrl() {
      console.log("clicked getGroupUrl()");
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
      console.log("clicked shareForLine()");
      //現在表示中のURLにグループのIDがつく仕組みなので簡単にできそう
      //ダミーで開発サイトのURLを取得
      let dummyUrl = "https://dev-seisan-kun-v2.netlify.app/#/";
      let lineHref =
        "https://line.me/R/msg/text/?" + encodeURIComponent(dummyUrl);
      //let lineHref = "https://line.me/R/msg/text/";
      window.open(lineHref, "_blank");
    },
    addPayment() {
      console.log("addPayment()");
      //支払いの追加ページを表示
      this.$router.push({ path: "/AddPayment/" });
    },
    editPayment() {
      console.log("editPayment()");
      //支払いの編集ページを表示
      this.$router.push({ path: "/EditPayment/" });
    },
    memberLendingBorrowingDetail() {
      console.log("memberLendingBorrowingDetail()");
      //支払いの編集ページを表示
      this.$router.push({ path: "/MemberLendingBorrowingDetail/" });
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
    this.getGroupInfo();
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
        border-bottom: solid 1px $bace_text_color;
        padding-bottom: 8px;
        .member-title {
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
          border-bottom: solid 1px $bace_text_color;
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
          border-bottom: solid 1px $bace_text_color;
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
          border-bottom: solid 1px $bace_text_color;
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
