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
          <label for="payment-name">支払い内容</label>
          <input
            type="text"
            name="payment-name"
            placeholder="例：飛行機代"
            v-model="inputPaymentTitle"
          />
          <span v-bind:class="{ red: inputPaymentTitleError }"
            >※1文字以上20文字以内でご記入ください</span
          >
        </div>

        <div class="input-amount-form">
          <label for="amount">支払い金額</label>
          <div class="amount-box">
            <input
              type="text"
              name="amount"
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
          <label for="payer">支払ったメンバー</label>
          <div class="pulldown-box">
            <select v-model="payer_id" name="payer">
              <option
                v-for="member in members"
                :key="member.id"
                v-bind:value="member.id"
              >
                {{ member.name }}
              </option>
            </select>
          </div>
          <span v-bind:class="{ red: payerError }"
            >※支払ったメンバーを選択してください</span
          >
        </div>

        <div id="select-borrower-wrapper">
          <label>誰の分を払ったか</label>
          <div
            v-for="(member, index) in members"
            :key="member.id"
            class="select-borrower-box"
          >
            <label for="borrower">メンバー{{ index + 1 }}</label>
            <div class="member-name-box">
              <input
                type="checkbox"
                name="borrower"
                :id="'member' + member.id"
                :value="member.id"
                v-model="borrowers"
              />
              <label :for="'member' + member.id">
                <span>{{ member.name }}</span>
              </label>
            </div>
          </div>
          <span v-bind:class="{ red: borrowersError }"
            >※支払われたメンバーは1人以上指定してください</span
          >
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
import { api_request } from "../js/api.js";
export default {
  data() {
    return {
      members: [],
      inputPaymentTitle: "",
      inputAmount: "",
      payer_id: null,
      isSelectBorrower: [],
      inputPaymentTitleError: false,
      inputAmountError: false,
      payerError: false,
      borrowersError: false,
      payment_id: 0,
      confirm: false,
      originalPaymentName: "",
      travel_key: "",
      inputAmountErrorText: "※半角数字でご記入ください",
      moneyUnit: "円",
      borrowers: [],
      membersIdList: [],
    };
  },
  methods: {
    async getGroup() {
      this.travel_key = this.$route.params.travel_key;
      const apihandler = new api_request(
        process.env.VUE_APP_SEISANKUN_API_BASE_URL
      );
      let response = await apihandler.getGroup(this.travel_key);
      console.log(response);
      this.members = response.data.members;
      for (let i = 0; i < this.members.length; i++) {
        this.membersIdList.push(this.members[i].id);
      }
      this.getPayment();
    },
    async getPayment() {
      this.payment_id = this.$route.params.payment_id;
      const apihandler = new api_request(
        process.env.VUE_APP_SEISANKUN_API_BASE_URL
      );
      let response = await apihandler.getPayment(this.payment_id);
      console.log(response);
      this.inputPaymentTitle = response.data.payment.title;
      this.originalPaymentName = this.inputPaymentTitle;
      this.inputAmount = response.data.payment.amount;
      this.payer_id = response.data.payment.payer_id;
      for (let i = 0; i < response.data.payment.borrowers.length; i++) {
        this.borrowers.push(response.data.payment.borrowers[i].borrower_id);
      }
    },
    doValidation() {
      let errors = 0;
      if (
        this.inputPaymentTitle.trim().length >= 1 &&
        this.inputPaymentTitle.trim().length <= 20
      ) {
        this.inputPaymentTitleError = false;
      } else {
        this.inputPaymentTitleError = true;
        errors++;
      }
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
      if (!this.payer_id) {
        this.payerError = true;
        errors++;
      } else if (!this.membersIdList.includes(this.payer_id)) {
        this.payerError = true;
        errors++;
      } else {
        this.payerError = false;
      }
      if (this.borrowers.length === 0) {
        this.borrowersError = true;
        errors++;
      } else {
        this.borrowersError = false;
      }
      if (errors > 0) {
        scrollTo(0, 0);
      } else {
        this.editPayment();
      }
    },
    async editPayment() {
      let borrowers = [];
      for (let i = 0; i < this.borrowers.length; i++) {
        let borrowers_unit = {};
        borrowers_unit.borrower_id = this.borrowers[i];
        borrowers.push(borrowers_unit);
      }
      let data = {
        payment: {
          id: Number(this.payment_id),
          travel_key: this.travel_key,
          payer_id: this.payer_id,
          borrowers: borrowers,
          title: this.inputPaymentTitle.trim(),
          amount: Number(String(this.inputAmount).trim()),
        },
      };
      const apihandler = new api_request(
        process.env.VUE_APP_SEISANKUN_API_BASE_URL
      );
      let response = await apihandler.editPayment(data);
      console.log(response);
      this.toGroup();
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
    async deletePayment() {
      const apihandler = new api_request(
        process.env.VUE_APP_SEISANKUN_API_BASE_URL
      );
      let response = await apihandler.deletePayment(Number(this.payment_id));
      console.log(response);
      this.toGroup();
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
  @import "../scss/partials/overlay";
  .inner {
    @import "../scss/partials/title";
    .input-form-wrapper {
      margin-top: 32px;
      @import "../scss/partials/paymentname";
      @import "../scss/partials/priceform";
      @import "../scss/partials/payerform";
      @import "../scss/partials/borrower";
      @import "../scss/partials/paymentbuttons";
    }
  }
}
</style>
