<template>
  <div class="main">
    <div class="inner">
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
      <div class="past-groups-wrapper">
        <div class="past-groups-title">
          <span>過去に閲覧したグループ</span>
        </div>
        <div class="past-groups">
          <!-- ダミーデータを作成して表示中 -->
          <div class="past-group" @click="toGroup">
            <div class="past-group-date">
              <span>2021/08/24</span>
            </div>
            <div class="past-group-name">
              <span>渡韓ごっこin新大久保</span>
            </div>
          </div>
          <div class="past-group" @click="toGroup">
            <div class="past-group-date">
              <span>2020/07/31</span>
            </div>
            <div class="past-group-name">
              <span>九州旅行！！</span>
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
      travel_key: "",
    };
  },
  methods: {
    toCreateGroup() {
      console.log("clicked toCreateGroup()");
      //グループの作成ページを表示
      this.$router.push({ path: "/CreateGroup/" });
    },
    toGroup() {
      console.log("clicked toGroup()");
      //どのグループかtravel_keyでを特定する必要あり
      //グループページを表示
      this.travel_key = "aaaabbbbccccdddd";

      this.$router.push({
        name: "Group",
        params: { travel_key: this.travel_key },
      });
    },
  },
  beforeCreate: function() {
    console.log("Top.vue beforeCreate");
  },
  created: function() {
    console.log("Top.vue created");
  },
  beforeMount: function() {
    console.log("Top.vue beforeMount");
  },
  mounted: function() {
    console.log("Top.vue mounted");

    /**
     * ローカルストレージから過去のグループIDを取得する（あれば）
     * あれば、そのグループIDをkeyにGET /travelでグループデータを取ってくる
     */

    // localStorage.getItem("group_hash_key");
    // console.log(localStorage.getItem("group_hash_key"));
  },
  beforeUpdate: function() {
    console.log("Top.vue beforeUpdate");
  },
  updated: function() {
    console.log("Top.vue updated");
  },
  beforeDestroy: function() {
    console.log("Top.vue beforeDestroy");
  },
  destroyed: function() {
    console.log("Top.vue destroyed");
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
$padding-lr: 48px;
$theme-title-size: 16px;
$headerTop-h: 120px;
$footer-h: 120px;
.main {
  min-height: calc(100vh - #{$headerTop-h} - #{$footer-h});
  padding: $padding-tb $padding-lr;
  .inner {
    .explain-wrapper {
      .explain-title {
        color: $base_text_color;
        font-size: $theme-title-size;
        font-weight: bold;
        border-bottom: solid 1px $base_text_color;
        padding-bottom: 8px;
      }
      .explain-sentence {
        margin-top: 8px;
        color: $base_text_color;
        font-size: 12px;
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
        font-size: $theme-title-size;
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
          .past-group-date {
            font-size: 10px;
          }
          .past-group-name {
            font-size: $theme-title-size;
            font-weight: bold;
          }
        }
      }
    }
    .feature-wrapper {
      margin: 0 calc(-#{$padding-lr});
      margin-top: 32px;
      background-color: $yellow;
      padding: $padding-tb $padding-lr;
      color: $base_text_color;
      .feature-title {
        font-size: $theme-title-size;
        font-weight: bold;
        border-bottom: solid 1px $base_text_color;
        padding-bottom: 8px;
      }
      .feature-items {
        .feature-item {
          margin-top: 16px;
          .feature-item-title {
            font-size: 12px;
            font-weight: bold;
          }
          .feature-item-text {
            margin-top: 1em;
            margin-left: 1em;
            font-size: 10px;
            font-weight: normal;
          }
        }
      }
    }
    .howto-wrapper {
      margin: 0 calc(-#{$padding-lr});
      margin-top: 32px;
      //background-color: $yellow;
      padding: 0 $padding-lr;
      color: $base_text_color;
      .howto-title {
        font-size: $theme-title-size;
        font-weight: bold;
        border-bottom: solid 1px $base_text_color;
        padding-bottom: 8px;
      }
      .howto-items {
        .howto-item {
          margin-top: 16px;
          .howto-item-title {
            font-size: 12px;
            font-weight: bold;
          }
          .howto-item-text {
            margin-top: 1em;
            margin-left: 1em;
            font-size: 10px;
            font-weight: normal;
          }
        }
      }
    }
  }
}
</style>
