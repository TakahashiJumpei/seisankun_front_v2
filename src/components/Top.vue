<template>
  <div class="main">
    <div class="loding" v-bind:class="{ 'loding-active': loding }">
      <div>
        <span>読み込み中...</span>
      </div>
      <img src="../assets/loding.gif" alt="" />
    </div>
    <div class="inner" v-bind:class="{ 'loding-active': loding }">
      <div class="explain-wrapper">
        <div class="explain-title">
          <span>Seisan-kunとは？</span>
        </div>
        <div class="explain-sentence">
          <span
            >Seisan-kunは、旅行での面倒な立替計算を自動で計算してくれるサービスです！<br />旅行の最後に立て替えた内容を1つ1つ精算するのは大変ですよね..<br />でも、Seisan-kunに支払い内容を入力しておくだけで、最終的に誰が誰にいくら払えば良いかが一目でわかります！</span
          >
        </div>
      </div>
      <div class="start-button-wrapper">
        <button class="start-button" @click="toCreateGroup">
          <span>はじめる</span>
        </button>
      </div>
      <div v-if="pastGroupsFlag" class="past-groups-wrapper">
        <div class="past-groups-title">
          <span>過去に閲覧したグループ</span>
        </div>
        <div class="past-groups">
          <div
            v-for="pastGroup in pastGroups"
            :key="pastGroup.id"
            class="past-group"
            @click="toGroup(pastGroup.travel_key)"
          >
            <div class="past-group-date">
              <span>{{ pastGroup.created_at }}</span>
            </div>
            <div class="past-group-name">
              <span>{{ pastGroup.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="feature-wrapper">
        <div class="feature-title">
          <span>Seisan-kunの特徴</span>
        </div>
        <div class="feature-items">
          <div class="feature-item">
            <div class="feature-item-title">
              <span>・最終的に誰が誰にいくら払えば良いかが一目瞭然</span>
            </div>
            <div class="feature-item-text">
              <span>支払い内容を入力するだけで簡単に精算内容が分かります</span>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-item-title">
              <span>・アプリのインストール不要</span>
            </div>
            <div class="feature-item-text">
              <span
                >お使いのブラウザから簡単にアクセスできます。URLを共有するだけで、旅行のメンバーに簡単に共有することが可能です。</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="howto-wrapper">
        <div class="howto-title">
          <span>Seisan-kunの使い方</span>
        </div>
        <div class="howto-items">
          <div class="howto-item">
            <div class="howto-item-title">
              <span>１．グループを作成</span>
            </div>
            <div class="howto-item-text">
              <span
                >まずは、グループの作成をします。<br />グループのタイトルとメンバーを設定します。</span
              >
            </div>
          </div>
          <div class="howto-item">
            <div class="howto-item-title">
              <span>２．メンバーに共有</span>
            </div>
            <div class="howto-item-text">
              <span
                >グループの作成が完了しましたら、メンバーへ精算グループのURLを共有できます。<br />メンバーは共有されたURLにアクセスするだけで精算グループの内容を確認できます。（LINEでの共有も可能）</span
              >
            </div>
          </div>
          <div class="howto-item">
            <div class="howto-item-title">
              <span>３．立替内容の追加</span>
            </div>
            <div class="howto-item-text">
              <span
                >画面の表示に従い、立替内容（支払い内容/金額/支払ったメンバー/誰の分を払ったか）を入力して追加します。</span
              >
            </div>
          </div>
          <div class="howto-item">
            <div class="howto-item-title">
              <span>４．精算内容の確認</span>
            </div>
            <div class="howto-item-text">
              <span
                >精算グループ画面の下部で、精算内容の確認ができます。<br />メンバーごとの支払いの状況も確認することができます。</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupIDs: [],
      pastGroups: [],
      pastGroupsFlag: false,
      loding: true,
    };
  },
  methods: {
    toCreateGroup() {
      this.$router.push({ path: "/group/create" });
    },
    toGroup(key) {
      this.$router.push({
        name: "Group",
        params: { travel_key: key },
      });
    },
    checkLocalStarage() {
      this.groupIDs = JSON.parse(localStorage.getItem("groupIDs"));

      if (!this.groupIDs || this.groupIDs.length === 0) {
        this.hideLoding();
        return;
      }

      this.getPastGroups();
    },
    getPastGroups() {
      /**
       * NOTE:
       * 仕様：複数エラーとなる場合があるので、200の場合とエラーの場合で個数を数えて、総リクエスト数と一致した場合、ローディングアニメーションを終了させるようにする。
       * 最後のレスポンスが、成功orエラーで返ってくるかはわからないので、両方にif文でのローディングアニメーションを終了する処理へ繋がるようにしておく。
       */
      let success_count = 0;
      let error_count = 0;
      let tmpPastGroups = [];
      for (let i = 0; i < this.groupIDs.length; i++) {
        let options = {
          method: "GET",
          url: `/travel`,
          params: { travel_key: this.groupIDs[i] },
        };
        this.$seisankunApi
          .request(options)
          .then((response) => {
            tmpPastGroups.push(response.data.travel);
            success_count++;
            if (success_count + error_count == this.groupIDs.length) {
              //本来の順番にソートする
              for (let j = 0; j < this.groupIDs.length; j++) {
                for (let k = 0; k < tmpPastGroups.length; k++) {
                  if (this.groupIDs[j] === tmpPastGroups[k].travel_key) {
                    this.pastGroups.push(tmpPastGroups[k]);
                    break;
                  }
                }
              }
              for (let j = 0; j < tmpPastGroups.length; j++) {
                this.pastGroups[j].created_at = this.convertDate(
                  this.pastGroups[j].created_at
                );
              }
              this.pastGroupsFlag = true;
              this.hideLoding();
            }
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
            if (errStatus == 401) {
              this.unauthorized();
            }
            if (errStatus == 403) {
              this.forbidden();
            }
            if (errStatus == 400 || errStatus == 502 || errStatus == 503) {
              this.serverError();
            }
            error_count++;
            if (success_count + error_count == this.groupIDs.length) {
              //本来の順番にソートする
              for (let j = 0; j < this.groupIDs.length; j++) {
                for (let k = 0; k < tmpPastGroups.length; k++) {
                  if (this.groupIDs[j] === tmpPastGroups[k].travel_key) {
                    this.pastGroups.push(tmpPastGroups[k]);
                    break;
                  }
                }
              }
              for (let j = 0; j < tmpPastGroups.length; j++) {
                this.pastGroups[j].created_at = this.convertDate(
                  this.pastGroups[j].created_at
                );
              }
              if (this.pastGroups.length > 0) {
                this.pastGroupsFlag = true;
              }
              this.hideLoding();
            }
          });
      }
    },
    convertDate(created_at) {
      let yyyy = created_at.substr(0, 4);
      let mm = created_at.substr(5, 2);
      let dd = created_at.substr(8, 2);
      return yyyy + "/" + mm + "/" + dd;
    },
    hideLoding() {
      this.loding = false;
    },
    unauthorized() {
      this.$router.push({
        name: "Unauthorized",
      });
    },
    forbidden() {
      this.$router.push({
        name: "Forbidden",
      });
    },
    serverError() {
      this.$router.push({
        name: "ServerError",
      });
    },
  },
  mounted: function() {
    this.checkLocalStarage();
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";
@import "../scss/breakpoints/base";

.main {
  min-height: calc(100vh - #{$headerTop-h} - #{$footer-h});
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
    .explain-wrapper {
      .explain-title {
        color: $base_text_color;
        font-size: $theme-title-size;
        @media screen and(min-width: $min-width) {
          @import "../scss/breakpoints/768up";
          font-size: $theme-title-size;
        }
        font-weight: bold;
        border-bottom: solid 1px $base_text_color;
        padding-bottom: 8px;
      }
      .explain-sentence {
        margin-top: 8px;
        color: $base_text_color;
        font-size: 12px;
        @media screen and(min-width: $min-width) {
          font-size: 18px;
        }
        font-weight: normal;
      }
    }
    .start-button-wrapper {
      margin-top: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      .start-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 48px;
        @media screen and(min-width: $min-width) {
          width: 240px;
          height: 56px;
        }
        border-radius: 8px;
        background-color: $green;
        color: white;
        font-size: 24px;
      }
    }
    .past-groups-wrapper {
      margin-top: 32px;
      .past-groups-title {
        display: flex;
        justify-content: center;
        align-items: center;
        color: $base_text_color;
        font-size: $theme-sub-title-size;
        @media screen and(min-width: $min-width) {
          @import "../scss/breakpoints/768up";
          font-size: $theme-title-size;
        }
        font-weight: bold;
        border-bottom: solid 1px $base_text_color;
        padding-bottom: 8px;
      }
      .past-groups {
        margin-top: 16px;
        color: $base_text_color;
        font-size: 12px;
        font-weight: normal;
        .past-group {
          margin: 0px 16px;
          margin-top: 16px;
          border-radius: 8px;
          background-color: $gray;
          padding: 12px 24px;
          cursor: pointer;
          .past-group-date {
            font-size: 10px;
            @media screen and(min-width: $min-width) {
              @import "../scss/breakpoints/768up";
              font-size: 12px;
            }
          }
          .past-group-name {
            font-size: $theme-font-size;
            @media screen and(min-width: $min-width) {
              @import "../scss/breakpoints/768up";
              font-size: $theme-font-size;
            }
            font-weight: bold;
          }
        }
      }
    }
    .feature-wrapper {
      background-color: $yellow;
      color: $base_text_color;
      margin: 0 calc(-#{$padding-lr});
      margin-top: 32px;
      padding: $padding-tb $padding-lr;
      @media screen and(min-width: $min-width) {
        @import "../scss/breakpoints/768up";
        margin: 0 calc(-#{$padding-lr});
        margin-top: 32px;
        padding: $padding-tb $padding-lr;
      }
      .feature-title {
        font-size: $theme-title-size;
        @media screen and(min-width: $min-width) {
          @import "../scss/breakpoints/768up";
          font-size: $theme-title-size;
        }
        font-weight: bold;
        border-bottom: solid 1px $base_text_color;
        padding-bottom: 8px;
      }
      .feature-items {
        .feature-item {
          margin-top: 16px;
          .feature-item-title {
            font-size: 12px;
            @media screen and(min-width: $min-width) {
              font-size: 18px;
            }
            font-weight: bold;
          }
          .feature-item-text {
            margin-top: 1em;
            margin-left: 1em;
            font-size: 10px;
            @media screen and(min-width: $min-width) {
              font-size: 16px;
            }
            font-weight: normal;
          }
        }
      }
    }
    .howto-wrapper {
      margin: 0 calc(-#{$padding-lr});
      margin-top: 32px;
      padding: 0 $padding-lr;
      color: $base_text_color;
      .howto-title {
        font-size: $theme-title-size;
        @media screen and(min-width: $min-width) {
          @import "../scss/breakpoints/768up";
          font-size: $theme-title-size;
        }
        font-weight: bold;
        border-bottom: solid 1px $base_text_color;
        padding-bottom: 8px;
      }
      .howto-items {
        .howto-item {
          margin-top: 16px;
          .howto-item-title {
            font-size: 12px;
            @media screen and(min-width: $min-width) {
              font-size: 18px;
            }
            font-weight: bold;
          }
          .howto-item-text {
            margin-top: 1em;
            margin-left: 1em;
            font-size: 10px;
            @media screen and(min-width: $min-width) {
              font-size: 16px;
            }
            font-weight: normal;
          }
        }
      }
    }
  }
}
</style>
