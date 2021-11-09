<template>
  <div class="main">
    <div class="inner">
      <div class="title-wrapper">
        <div class="title">
          <span>グループの作成</span>
        </div>
      </div>
      <div class="input-form-wrapper">
        <div class="input-group-name-form">
          <p>グループ名</p>
          <input type="text" id="group-name" placeholder="グループ名を入力" />
          <span>※1文字以上20文字以内でご記入ください</span>
        </div>
        <div class="input-member-form">
          <p>メンバーの追加</p>
          <div class="member-name-box">
            <input
              type="text"
              id="member-name"
              placeholder="メンバー１を入力"
            />
            <div class="add" @click="add_person">
              <span>+</span>
            </div>
          </div>
          <span>※1文字以上20文字以内でご記入ください</span>
        </div>
        <div id="show-member-form-wrapper">
          <div class="show-member-form">
            <p>メンバー１</p>
            <div class="member-name-box">
              <div class="member-name">
                <span>nakazaway</span>
              </div>
              <div class="delete">
                <span>-</span>
              </div>
            </div>
          </div>
          <div class="show-member-form">
            <p>メンバー２</p>
            <div class="member-name-box">
              <div class="member-name">
                <span>じゅんちゃん</span>
              </div>
              <div class="delete">
                <span>-</span>
              </div>
            </div>
          </div>
          <div class="show-member-form">
            <p>メンバー３</p>
            <div class="member-name-box">
              <div class="member-name">
                <span>yseki</span>
              </div>
              <div class="delete">
                <span>-</span>
              </div>
            </div>
          </div>
          <div class="show-member-form">
            <p>メンバー４</p>
            <div class="member-name-box">
              <div class="member-name">
                <span>ハマ</span>
              </div>
              <div class="delete">
                <span>-</span>
              </div>
            </div>
          </div>
          <div class="show-member-form">
            <p>メンバー５</p>
            <div class="member-name-box">
              <div class="member-name">
                <span>やまぐち</span>
              </div>
              <div class="delete">
                <span>-</span>
              </div>
            </div>
          </div>
          <div class="show-member-form">
            <p>メンバー６</p>
            <div class="member-name-box">
              <div class="member-name">
                <span>濱本将</span>
              </div>
              <div class="delete" @click="delete_person">
                <span>-</span>
              </div>
            </div>
          </div>

          <div class="button-wrapper">
            <div class="create-button-wrapper">
              <button class="create-button" @click="doValidationCheck">
                <span>作成</span>
              </button>
            </div>
            <div class="back-button-wrapper">
              <button class="back-button" @click="toTop">
                <span>戻る</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

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
$form-h: 40px;
$form-bg: #f4f0f0;
$form-border: #707070;

.main {
  min-height: calc(100vh - $header-h - $footer-h);
  padding: $padding-tb $padding-lr;

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
      .input-group-name-form {
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
        }
      }
      .input-member-form {
        margin-top: 4px;
        p {
          color: $bace_text_color;
          font-size: 12px;
        }
        .member-name-box {
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
            border-radius: 4px 0 0 4px;
            box-shadow: 0 2px 0 0 #cbcecf;
          }
          .add {
            width: $form-h;
            height: $form-h;
            background-color: $light_blue;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
            pointer-events: auto;
            span {
              color: white;
              font-size: 22px;
              font-weight: bold;
            }
          }
        }
        span {
          color: #a8a8a8;
          font-size: 10px;
        }
      }
      #show-member-form-wrapper {
        margin-top: 12px;
        .show-member-form {
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
              width: calc(100% - 40px);
              height: $form-h;
              text-indent: 1em;
              background-color: $form-bg;
              border: 1px solid $form-border;
              border-radius: 4px 0 0 4px;
              box-shadow: 0 2px 0 0 #cbcecf;
              display: flex;
              justify-content: start;
              align-items: center;
              span {
                color: $bace_text_color;
                font-size: 16px;
              }
            }
            .delete {
              width: $form-h;
              height: $form-h;
              background-color: $light_blue;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 0 4px 4px 0;
              cursor: pointer;
              pointer-events: auto;
              span {
                color: white;
                font-size: 22px;
                font-weight: bold;
              }
            }
          }
        }
      }
      .button-wrapper{
        padding-top: 60px;
        padding-bottom: 28px;
        .create-button-wrapper{
          display: flex;
          justify-content: center;
          align-items: center;
          .create-button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 188px;
            height: 44px;
            border-radius: 8px;
            background-color: $light_blue;
            box-shadow: 0 2px 0 0 #cbcecf;
            span {
              color: white;
              font-size: 16px;
            }
          }
        }
        .back-button-wrapper{
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
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    add_person() {
      console.log("add_person()");
    },
    delete_person() {
      console.log("delete_person()");
    },
    doValidationCheck() {
      console.log("clicked create button");
      console.log("doValidationCheck()");

      let errors = 0;
      //バリデーション未実装

      if (errors > 0) {
        console.log("errors > 0");

      } else {
        this.toGroup();
      }
    },
    toGroup() {
      console.log("toGroup()");
      this.$router.push({ path: "/Group/" });
    },
    toTop() {
      console.log("clicked back button");
      console.log("toTop()");
      this.$router.push({ path: "/" });
    },
  },
  beforeCreate: function() {
    console.log("CreateGroup.vue beforeCreate");
  },
  created: function() {
    console.log("CreateGroup.vue created");
  },
  beforeMount: function() {
    console.log("CreateGroup.vue beforeMount");
  },
  mounted: function() {
    console.log("CreateGroup.vue mounted");
  },
  beforeUpdate: function() {
    console.log("CreateGroup.vue beforeUpdate");
  },
  updated: function() {
    console.log("CreateGroup.vue updated");
  },
  beforeDestroy: function() {
    console.log("CreateGroup.vue beforeDestroy");
  },
  destroyed: function() {
    console.log("CreateGroup.vue destroyed");
  },
};
</script>
