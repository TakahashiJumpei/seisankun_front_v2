<template>
  <div class="main">
    <div id="overlay" v-bind:class="{ 'confirm-modal': confirm }">
      <transition name="fade">
        <div v-if="confirm" id="popup-confirm">
          <div class="popup-confirm-sub">
            <div class="confirm-name">
              <span>{{ originalPaymentName }}</span>
            </div>
            <div class="confirm-message">
              <span>この支払いを本当に削除してもよろしいですか？</span>
            </div>
            <div class="button-wrapper">
              <div class="delete-button-wrapper">
                <button class="delete-button" @click="deletePayment">
                  <span>OK</span>
                </button>
              </div>
              <div class="back-button-wrapper">
                <button class="back-button" @click="hideConfirmModal">
                  <span>キャンセル</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="inner">
      <div class="title-wrapper">
        <div class="title">
          <span>支払いの編集</span>
        </div>
      </div>

      <div class="input-form-wrapper">
        <div class="input-payment-name-form">
          <p>支払い内容</p>
          <input
            type="text"
            id="payment-name"
            placeholder="例：飛行機代"
            v-model="inputPaymentName"
          />
          <span v-bind:class="{ red: inputPaymentNameError }"
            >※1文字以上20文字以内でご記入ください</span
          >
        </div>

        <div class="input-price-form">
          <p>支払い金額</p>
          <div class="price-box">
            <input
              type="text"
              id="price"
              placeholder="例：1000"
              v-model="inputPrice"
            />
            <div class="yen">
              <span>円</span>
            </div>
          </div>
          <span v-bind:class="{ red: inputPriceError }"
            >※半角数字でご記入ください</span
          >
        </div>

        <div class="pulldown-payer-form">
          <p>支払ったメンバー</p>
          <div class="pulldown-box">
            <select v-model="payer">
              <option v-for="member in members" :key="member.member_id">
                {{ member }}
              </option>
            </select>
          </div>
        </div>

        <div id="select-payered-wrapper">
          <p>誰の分を払ったか</p>
          <div
            v-for="(member, index) in members"
            :key="member.member_id"
            class="select-payered-box"
          >
            <p>メンバー{{ index + 1 }}</p>
            <div class="member-name-box">
              <div
                class="member-name"
                @click="selectPayered(index)"
                v-bind:class="{ 'select-payered': isSelectPayered[index] }"
              >
                <span>{{ member }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="button-wrapper">
          <div class="update-payment-button-wrapper">
            <button class="update-payment-button" @click="doValidationCheck">
              <span>変更を確定</span>
            </button>
          </div>
          <div class="back-button-wrapper">
            <button class="back-button" @click="toGroup">
              <span>キャンセル</span>
            </button>
          </div>
          <div class="delete-payment-button-wrapper">
            <button class="delete-payment-button" @click="confirmDeletePayment">
              <span>この支払いを削除</span>
            </button>
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
      inputPaymentName: "",
      inputPrice: "",
      payer: "",
      isSelectPayered: [],
      inputPaymentNameError: false,
      inputPriceError: false,
      payment_id: 0,
      confirm: false,
      originalPaymentName: "",
      travel_key: "",
    };
  },
  watch: {},
  filters: {},
  methods: {
    async getPaymentInfo() {
      console.log("getPaymentInfo");

      /**
       * 2つのAPI通信を実装する
       * 非同期にする必要あり？
       * get /travelで全メンバーの取得
       * get /payment/で支払い情報を取得
       */
      this.travel_key = this.$route.params.travel_key;

      const options = {
        method: "GET",
        url: "http://localhost:10082/travel",
        headers: { "Content-Type": "application/json" },
        params: {
          travel_key: this.travel_key,
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
        url: "http://localhost:10082/payment",
        headers: { "Content-Type": "application/json" },
        params: {
          payment_id: "1",
        },
      };
      console.log(options2);

      const axios2 = axios
        .request(options2)
        .then(
          function(response) {
            console.log("status:", response.status);
            switch (response.status) {
              case 200: {
                console.log("body:", response.data);
                this.inputPaymentName = response.data.payment.title;
                this.originalPaymentName = this.inputPaymentName;
                this.inputPrice = response.data.payment.amount;

                //メンバーのIDとborrowsのIDが一致していればtrueにする
                for (let i = 0; i < this.members.length; i++) {
                  for (let j = 0; j < response.data.payment.borrowers[j].length; j++) {
                    if (this.members[i].member_id === response.data.payment.borrowers[j].borrower_id) {
                      this.isSelectPayered.push(true);
                    } else {
                      this.isSelectPayered.push(false);
                    }
                  }
                }
                //ダミー値
                this.isSelectPayered[0] = true;
                this.isSelectPayered[1] = true;
                this.isSelectPayered[2] = false;
                console.log(this.isSelectPayered);

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
            console.error(error);
          }.bind(this)
        );
      //Promise.all([])とawaitを併用する
      await Promise.all([axios1, axios2]);

      //確実に両方の通信が終わったタイミングでセットする
      this.payer = this.members[0];

      // //ダミー支払い内容のセット
      // let dummyInputPaymentName = "飛行機代";
      // this.inputPaymentName = dummyInputPaymentName;

      // //ダミー支払い金額のセット
      // let dummyInputPrice = "100000";
      // this.inputPrice = dummyInputPrice;

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

      // for (let i = 0; i < 6; i++) {
      //   this.isSelectPayered.push(true);
      // }
      // this.isSelectPayered[1] = false;
      // this.isSelectPayered[4] = false;
      // this.isSelectPayered[5] = false;
      // console.log(this.isSelectPayered);

      // this.payer = this.members[0];
    },
    selectPayered(index) {
      console.log("selectPayered(index)");
      if (this.isSelectPayered[index]) {
        this.isSelectPayered[index] = false;
      } else {
        this.isSelectPayered[index] = true;
      }
      this.$forceUpdate(); //強制的にコンポーネントを更新
    },
    doValidationCheck() {
      console.log("clicked add payment button");
      console.log("doValidationCheck()");

      let errors = 0;
      //支払い内容のバリデーション
      if (
        this.inputPaymentName.trim().length >= 1 &&
        this.inputPaymentName.trim().length <= 20
      ) {
        this.inputPaymentNameError = false;
      } else {
        this.inputPaymentNameError = true;
        errors++;
      }
      //支払い金額のバリデーション
      if (
        String(this.inputPrice)
          .trim()
          .match(/^([1-9]\d*|0)$/)
      ) {
        this.inputPriceError = false;
      } else {
        this.inputPriceError = true;
        errors++;
      }

      if (errors > 0) {
        console.log("errors > 0");
      } else {
        console.log("errors == 0");
        this.EditPayment();
      }
    },
    EditPayment: function() {
      console.log("EditPayment()");

      //画面から各種データを取得
      console.log(this.inputPaymentName.trim());
      console.log(String(this.inputPrice).trim());
      console.log(this.payer);
      console.log(this.isSelectPayered);
      console.log(this.payment_id);

      this.payment_id = 1; //ダミー値
      this.payer_id = 1; //ダミー値
      let _borrowers = [];
      for (let i = 0; i < this.isSelectPayered.length; i++) {
        if (this.isSelectPayered[i]) {
          let _borrowers_unit = {};
          _borrowers_unit.member_id = i; //とりあえずiにしておく
          _borrowers.push(_borrowers_unit);
        }
      }
      console.log(_borrowers);

      const options = {
        method: "PUT",
        url: "http://localhost:10082/payment",
        headers: { "Content-Type": "application/json" },
        data: {
          payment: {
            id: this.payment_id,
            travel_key: this.travel_key,
            payer_id: this.payer_id,
            borrowers: _borrowers,
            title: this.inputPaymentName.trim(),
            amount: Number(String(this.inputPrice).trim()),
          },
        },
      };
      console.log(options);

      axios
        .request(options)
        .then(
          function(response) {
            console.log("status:", response.status);
            switch (response.status) {
              case 200:
                console.log("body:", response.data);
                //グループ画面へ
                this.toGroup();
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
    },
    toGroup() {
      console.log("toGroup()");
      this.$router.push({
        name: 'Group',
        params: { travel_key: this.travel_key },
      });
    },
    confirmDeletePayment() {
      console.log("confirmDeletePayment()");
      this.confirm = true;
    },
    hideConfirmModal() {
      console.log("clicked delete payment button");
      console.log("hideConfirmModal()");
      this.confirm = false;
    },
    deletePayment() {
      console.log("deletePayment()");

      this.payment_id = 1; //ダミー値

      const options = {
        method: "DELETE",
        url: "http://localhost:10082/payment",
        headers: { "Content-Type": "application/json" },
        params: {
          payment_id: this.payment_id,
        },
      };
      console.log(options);

      axios
        .request(options)
        .then(
          function(response) {
            console.log("status:", response.status);
            switch (response.status) {
              case 200:
                console.log("body:", response.data);
                this.toGroup();
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

    },
  },
  beforeCreate: function() {
    console.log("EditPayment.vue beforeCreate");
  },
  created: function() {
    console.log("EditPayment.vue created");
  },
  beforeMount: function() {
    console.log("EditPayment.vue beforeMount");
  },
  mounted: function() {
    console.log("EditPayment.vue mounted");
    this.getPaymentInfo();
  },
  beforeUpdate: function() {
    console.log("EditPayment.vue beforeUpdate");
  },
  updated: function() {
    console.log("EditPayment.vue updated");
  },
  beforeDestroy: function() {
    console.log("EditPayment.vue beforeDestroy");
  },
  destroyed: function() {
    console.log("EditPayment.vue destroyed");
  },
};
</script>

<style scoped lang="scss">
$bace_text_color: #534e4e;
$light_blue: #1cb7f0;
$green: #1db8a3;
$gray: #f4f0f0;
$yellow: #fff0bf;
$padding-tb: 32px;
$padding-lr: 30px;
$theme-title-size: 16px;
$header-h: 48px;
$footer-h: 120px;
$form-h: 40px;
$form-bg: #f4f0f0;
$form-border: #707070;
$error_color: #cf5271;
$image_path: "../assets";
$delete_color: #2c3e50;

.main {
  min-height: calc(100vh - #{$header-h} - #{$footer-h});
  padding: $padding-tb $padding-lr;

  #overlay {
    z-index: 200;
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 32px;
    &.confirm-modal {
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      .fade-enter-active,
      .fade-leave-active {
        transition: opacity 1s;
      }
      .fade-enter,
      .fade-leave {
        opacity: 0;
      }
      #popup-confirm {
        .popup-confirm-sub {
          background: #fff;
          width: 100%;
          max-height: 100%;
          margin: 0 auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          border-radius: 3px;
          .confirm-name {
            color: #272643;
            font-size: 16px;
            font-weight: bold;
            font-family: Meiryo;
          }
          .confirm-message {
            margin-top: 8px;
            color: #272643;
            font-size: 14px;
            //font-weight: bold;
            font-family: Meiryo;
          }
          .button-wrapper {
            margin-top: 16px;
            .delete-button-wrapper {
              display: flex;
              justify-content: center;
              align-items: center;
              .delete-button {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 140px;
                height: 32px;
                border-radius: 8px;
                background-color: $green;
                box-shadow: 0 2px 0 0 #cbcecf;
                color: white;
                font-size: 16px;
                cursor: pointer;
                pointer-events: auto;
                &:hover {
                  background-color: #1cb7f0;
                }
              }
            }
            .back-button-wrapper {
              margin-top: 16px;
              display: flex;
              justify-content: center;
              align-items: center;
              .back-button {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 140px;
                height: 32px;
                border-radius: 8px;
                background-color: white;
                border: 1px solid $form-border;
                box-shadow: 0 2px 0 0 #cbcecf;
                span {
                  color: $bace_text_color;
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
    }
  }

  .inner {
    .title-wrapper {
      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        color: $bace_text_color;
        font-size: $theme-title-size;
        font-weight: bold;
      }
    }
    .input-form-wrapper {
      margin-top: 32px;
      .input-payment-name-form {
        p {
          color: $bace_text_color;
          font-size: 12px;
        }
        input {
          margin-top: 4px;
          width: 100%;
          height: $form-h;
          color: $bace_text_color;
          font-size: 16px;
          text-indent: 1em;
          background-color: $form-bg;
          border: 1px solid $form-border;
          border-radius: 4px;
          box-shadow: 0 2px 0 0 #cbcecf;
        }
        span {
          color: #a8a8a8;
          font-size: 10px;
          &.red {
            color: $error_color;
            font-weight: bold;
          }
        }
      }
      .input-price-form {
        margin-top: 4px;
        p {
          color: $bace_text_color;
          font-size: 12px;
        }
        .price-box {
          display: flex;
          justify-content: start;
          align-items: center;
          margin-top: 4px;
          input {
            width: calc(100% - 40px);
            height: $form-h;
            color: $bace_text_color;
            font-size: 16px;
            text-indent: 1em;
            background-color: $form-bg;
            border: 1px solid $form-border;
            border-radius: 4px;
            box-shadow: 0 2px 0 0 #cbcecf;
          }
          .yen {
            width: $form-h;
            height: $form-h;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              color: $bace_text_color;
              font-size: 16px;
              font-weight: normal;
            }
          }
        }
        span {
          color: #a8a8a8;
          font-size: 10px;
          &.red {
            color: $error_color;
            font-weight: bold;
          }
        }
      }
      .pulldown-payer-form {
        margin-top: 4px;
        p {
          color: $bace_text_color;
          font-size: 12px;
        }
        .pulldown-box {
          position: relative;
          &:before {
            display: block;
            content: "";
            position: absolute;
            top: -90%;
            bottom: -100%;
            margin: auto;
            right: 18px;
            width: 18px;
            height: 18px;
            background-size: 18px;
            z-index: 100;
            background-position: center;
            background-repeat: no-repeat;
            background-image: url("#{$image_path}/arrow.png");
            pointer-events: none;
          }
          select {
            margin-top: 4px;
            width: 100%;
            height: $form-h;
            color: $bace_text_color;
            font-size: 16px;
            text-indent: 1em;
            background-color: $form-bg;
            border: 1px solid $form-border;
            border-radius: 4px;
            box-shadow: 0 2px 0 0 #cbcecf;
            option {
            }
          }
        }
      }

      #select-payered-wrapper {
        margin-top: 20px;
        p {
          color: $bace_text_color;
          font-size: 12px;
        }
        & .select-payered-box:first-of-type {
          margin-top: 0;
        }
        .select-payered-box {
          margin-top: 8px;
          p {
            color: $bace_text_color;
            font-size: 12px;
          }
          .member-name-box {
            display: flex;
            justify-content: start;
            align-items: center;
            margin-top: 4px;
            .member-name {
              position: relative;
              width: 100%;
              height: $form-h;
              text-indent: 1em;
              background-color: #707070;
              border: 1px solid $form-border;
              border-radius: 4px;
              box-shadow: 0 2px 0 0 #cbcecf;
              display: flex;
              justify-content: start;
              align-items: center;
              text-decoration-line: line-through;
              span {
                color: $bace_text_color;
                font-size: 16px;
              }
              &.select-payered {
                background-color: $form-bg;
                text-decoration-line: none;
              }
              &.select-payered:before {
                display: block;
                content: "";
                position: absolute;
                top: -100%;
                bottom: 0%;
                left: 95%;
                margin: auto;
                right: 24px;
                width: 24px;
                height: 24px;
                background-size: 24px;
                z-index: 100;
                background-position: center;
                background-repeat: no-repeat;
                background-image: url("#{$image_path}/check.png");
                pointer-events: none;
              }
            }
          }
        }
      }

      .button-wrapper {
        padding-top: 60px;
        padding-bottom: 28px;
        .update-payment-button-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          .update-payment-button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 188px;
            height: 44px;
            border-radius: 8px;
            background-color: $green;
            box-shadow: 0 2px 0 0 #cbcecf;
            color: white;
            font-size: 16px;
            cursor: pointer;
            pointer-events: auto;
            &:hover {
              background-color: #1cb7f0;
            }
          }
        }
        .back-button-wrapper {
          margin-top: 16px;
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
              color: $bace_text_color;
              font-size: 16px;
            }
          }
        }
        .delete-payment-button-wrapper {
          margin-top: 64px;
          display: flex;
          justify-content: center;
          align-items: center;
          .delete-payment-button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 188px;
            height: 44px;
            border-radius: 8px;
            background-color: $delete_color;
            border: 1px solid $form-border;
            box-shadow: 0 2px 0 0 #cbcecf;
            span {
              color: white;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
</style>
