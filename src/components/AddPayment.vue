<template>
  <div class="main">
    <div class="inner">
      <div class="title-wrapper">
        <div class="title">
          <span>支払いの追加</span>
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
            <select v-model="payer_id">
              <option
                v-for="member in members"
                :key="member.id"
                v-bind:value="member.id"
              >
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
              <input
                type="checkbox"
                :id="'member' + member.id"
                :value="member.id"
                v-model="borrowers"
              />
              <label :for="'member' + member.id">
                <span>{{ member.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="button-wrapper">
          <div class="add-payment-button-wrapper">
            <button class="add-payment-button" @click="doValidation">
              <span>追加</span>
            </button>
          </div>
          <div class="back-button-wrapper">
            <button class="back-button" @click="toGroup">
              <span>キャンセル</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api_request } from "../js/api.js";
import { SEISANKUN_API_BASE_URL } from "../javascripts/config.js";
export default {
  data() {
    return {
      members: [],
      inputPaymentTitle: "",
      inputAmount: "",
      payer_id: null,
      inputPaymentTitleError: false,
      inputAmountError: false,
      travel_key: "",
      inputAmountErrorText: "※半角数字でご記入ください",
      moneyUnit: "円",
      borrowers: [],
    };
  },
  methods: {
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
        this.addPayment();
      }
    },
    async addPayment() {
      //画面から各種データを取得
      //借り手の取得
      let borrowers = [];
      for (let i = 0; i < this.borrowers.length; i++) {
        let borrowers_unit = {};
        borrowers_unit.borrower_id = this.borrowers[i];
        borrowers.push(borrowers_unit);
      }
      let data = {
        payment: {
          travel_key: this.travel_key,
          payer_id: this.payer_id,
          borrowers: borrowers,
          title: this.inputPaymentTitle.trim(),
          amount: Number(String(this.inputAmount).trim()),
        },
      };
      const apihandler = new api_request(SEISANKUN_API_BASE_URL);
      //APIからレスが来るまで後続の処理を止める
      let response = await apihandler.addPayment(data);
      console.log(response);
      //エラー時の処理を実装する
      //グループ画面へ
      this.toGroup();
    },
    toGroup() {
      this.$router.push({
        name: "Group",
        params: { travel_key: this.travel_key },
      });
    },
    async getGroup() {
      this.travel_key = this.$route.params.travel_key;
      const apihandler = new api_request(SEISANKUN_API_BASE_URL);
      //APIからレスが来るまで後続の処理を止める
      let response = await apihandler.getGroup(this.travel_key);
      console.log(response);
      this.members = response.data.members;
      for (let i = 0; i < this.members.length; i++) {
        this.borrowers.push(i + 1);
      }
      this.payer_id = this.members[0].id;
    },
  },
  beforeCreate: function() {},
  created: function() {},
  beforeMount: function() {},
  mounted: function() {
    //グループ情報の取得
    this.getGroup();
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  destroyed: function() {},
};
</script>

<style scoped lang="scss">
@import "../scss/variables";
@import "../scss/breakpoints/base";
@import "../scss/breakpoints/768up";

.main {
  min-height: calc(100vh - #{$header-h} - #{$footer-h});
  padding: $padding-tb $padding-lr;
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
