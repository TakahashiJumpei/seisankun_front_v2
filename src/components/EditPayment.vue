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
            v-model="inputPaymentTitle"
          />
          <span v-bind:class="{ red: inputPaymentTitleError }"
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
              v-model="inputAmount"
            />
            <div class="money-unit">
              <span>{{ moneyUnit }}</span>
            </div>
          </div>
          <span v-bind:class="{ red: inputAmountError }">{{
            inputAmountErrorText
          }}</span>
        </div>

        <div class="pulldown-payer-form">
          <p>支払ったメンバー</p>
          <div class="pulldown-box">
            <select v-model="payer">
              <option v-for="member in members" :key="member.id">
                {{ member.name }}
              </option>
            </select>
          </div>
        </div>

        <div id="select-borrower-wrapper">
          <p>誰の分を払ったか</p>
          <div
            v-for="(member, index) in members"
            :key="member.id"
            class="select-borrower-box"
          >
            <p>メンバー{{ index + 1 }}</p>
            <div class="member-name-box">
              <div
                class="member-name"
                @click="selectBorrower(index)"
                v-bind:class="{ 'select-borrower': isSelectBorrower[index] }"
              >
                <span>{{ member.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="button-wrapper">
          <div class="update-payment-button-wrapper">
            <button class="update-payment-button" @click="doValidation">
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
      inputPaymentTitle: "",
      inputAmount: "",
      payer: "",
      payer_id: 0,
      isSelectBorrower: [],
      inputPaymentTitleError: false,
      inputAmountError: false,
      payment_id: 0,
      confirm: false,
      originalPaymentName: "",
      travel_key: "",
      inputAmountErrorText: "※半角数字でご記入ください",
      moneyUnit: "円",
    };
  },
  methods: {
    async getPaymentInfo() {
      /**
       * 2つのAPI通信を実装する
       * 非同期にする必要あり？
       * get /travelで全メンバーの取得
       * get /payment/で支払い情報を取得
       */
      this.travel_key = this.$route.params.travel_key;
      this.payment_id = this.$route.params.payment_id;

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
                this.members = response.data.members;
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
            console.log(error);
          }.bind(this)
        );

      await Promise.all([axios1]);

      const options2 = {
        method: "GET",
        url: "http://localhost:10082/payment",
        headers: { "Content-Type": "application/json" },
        params: {
          payment_id: this.payment_id,
        },
      };

      axios
        .request(options2)
        .then(
          function(response) {
            switch (response.status) {
              case 200: {
                this.inputPaymentTitle = response.data.payment.title;
                this.originalPaymentName = this.inputPaymentTitle;
                this.inputAmount = response.data.payment.amount;
                this.payer_id = response.data.payment.payer_id;
                for (let i = 0; i < this.members.length; i++) {
                  if (this.payer_id === this.members[i].id) {
                    this.payer = this.members[i].name;
                  }
                }
                //メンバーのIDとborrowsのIDが一致していればtrueにする
                for (let i = 0; i < this.members.length; i++) {
                  for (
                    let j = 0;
                    j < response.data.payment.borrowers.length;
                    j++
                  ) {
                    if (
                      this.members[i].id ===
                      response.data.payment.borrowers[j].borrower_id
                    ) {
                      this.isSelectBorrower.push(true);
                    } else {
                      this.isSelectBorrower.push(false);
                    }
                  }
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
            console.log(error);
          }.bind(this)
        );
    },
    selectBorrower(index) {
      if (this.isSelectBorrower[index]) {
        this.isSelectBorrower[index] = false;
      } else {
        this.isSelectBorrower[index] = true;
      }
      this.$forceUpdate(); //強制的にコンポーネントを更新
    },
    doValidation() {
      let errors = 0;
      //支払い内容のバリデーション
      if (
        this.inputPaymentTitle.trim().length >= 1 &&
        this.inputPaymentTitle.trim().length <= 20
      ) {
        this.inputPaymentTitleError = false;
      } else {
        this.inputPaymentTitleError = true;
        errors++;
      }
      //支払い金額のバリデーション
      if (
        !String(this.inputAmount)
          .trim()
          .match(/^([1-9]\d*|0)$/)
      ) {
        this.inputAmountError = true;
        this.inputAmountErrorText = "※半角数字でご記入ください";
        errors++;
      } else if (String(this.inputAmount).trim().length > 10) {
        this.inputAmountError = true;
        this.inputAmountErrorText = "料金は10桁以内でご入力ください";
        errors++;
      } else {
        this.inputAmountError = false;
      }

      if (errors > 0) {
        scrollTo(0, 0);
      } else {
        this.EditPayment();
      }
    },
    EditPayment: function() {
      //画面から各種データを取得
      const selected = this.members.find((item) => item.name === this.payer);
      this.payer_id = selected.id;

      let _borrowers = [];
      for (let i = 0; i < this.isSelectBorrower.length; i++) {
        if (this.isSelectBorrower[i]) {
          let _borrowers_unit = {};
          _borrowers_unit.member_id = this.members[i].id;
          _borrowers.push(_borrowers_unit);
        }
      }

      const options = {
        method: "PUT",
        url: "http://localhost:10082/payment",
        headers: { "Content-Type": "application/json" },
        data: {
          payment: {
            id: Number(this.payment_id),
            travel_key: this.travel_key,
            payer_id: this.payer_id,
            borrowers: _borrowers,
            title: this.inputPaymentTitle.trim(),
            amount: Number(String(this.inputAmount).trim()),
          },
        },
      };

      axios
        .request(options)
        .then(
          function(response) {
            switch (response.status) {
              case 200:
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
            console.log(error);
          }.bind(this)
        );
    },
    toGroup() {
      this.$router.push({
        name: "Group",
        params: { travel_key: this.travel_key },
      });
    },
    confirmDeletePayment() {
      this.confirm = true;
    },
    hideConfirmModal() {
      this.confirm = false;
    },
    deletePayment() {
      const options = {
        method: "DELETE",
        url: "http://localhost:10082/payment",
        headers: { "Content-Type": "application/json" },
        params: {
          payment_id: Number(this.payment_id),
        },
      };

      axios
        .request(options)
        .then(
          function(response) {
            switch (response.status) {
              case 200:
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
            console.log(error);
          }.bind(this)
        );
    },
  },
  beforeCreate: function() {},
  created: function() {},
  beforeMount: function() {},
  mounted: function() {
    this.getPaymentInfo();
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
                  background-color: $green;
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
                  color: $base_text_color;
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
        color: $base_text_color;
        font-size: $theme-title-size;
        font-weight: bold;
      }
    }
    .input-form-wrapper {
      margin-top: 32px;
      .input-payment-name-form {
        p {
          color: $base_text_color;
          font-size: 12px;
        }
        input {
          margin-top: 4px;
          width: 100%;
          height: $form-h;
          color: $base_text_color;
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
          color: $base_text_color;
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
            color: $base_text_color;
            font-size: 16px;
            text-indent: 1em;
            background-color: $form-bg;
            border: 1px solid $form-border;
            border-radius: 4px;
            box-shadow: 0 2px 0 0 #cbcecf;
          }
          .money-unit {
            width: $form-h;
            height: $form-h;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              color: $base_text_color;
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
          color: $base_text_color;
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
            color: $base_text_color;
            font-size: 16px;
            text-indent: 1em;
            background-color: $form-bg;
            border: 1px solid $form-border;
            border-radius: 4px;
            box-shadow: 0 2px 0 0 #cbcecf;
          }
        }
      }

      #select-borrower-wrapper {
        margin-top: 20px;
        p {
          color: $base_text_color;
          font-size: 12px;
        }
        & .select-borrower-box:first-of-type {
          margin-top: 0;
        }
        .select-borrower-box {
          margin-top: 8px;
          p {
            color: $base_text_color;
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
                color: $base_text_color;
                font-size: 16px;
              }
              &.select-borrower {
                background-color: $form-bg;
                text-decoration-line: none;
              }
              &.select-borrower:before {
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
              background-color: $green;
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
              color: $base_text_color;
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
