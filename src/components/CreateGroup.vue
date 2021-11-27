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
          <input
            type="text"
            v-model="inputGroupName"
            id="group-name"
            placeholder="グループ名を入力"
          />
          <span v-bind:class="{ red: inputGroupNameError }"
            >※1文字以上20文字以内でご記入ください</span
          >
        </div>
        <div class="input-member-form">
          <p>メンバーの追加</p>
          <div class="member-name-box">
            <input
              type="text"
              id="member-name"
              placeholder="メンバーの名前を入力"
              v-model="add_member_name"
            />
            <div class="add" @click="addMember()">
              <span>+</span>
            </div>
          </div>
          <span v-bind:class="{ red: isAddMemberError }"
            >※1文字以上20文字以内でご記入ください</span
          >
        </div>
        <div id="show-member-form-wrapper">
          <div
            v-for="(member, index) in members"
            :key="member"
            class="show-member-form"
          >
            <p>メンバー{{ index + 1 }}</p>
            <div class="member-name-box">
              <div class="member-name">
                <span>{{ member }}</span>
              </div>
              <div class="delete" @click="deleteMember(index)">
                <span>-</span>
              </div>
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
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      add_member_name: "",
      add_member_name_error_message: "",
      isAddMemberError: false,
      members: [],
      inputGroupName: "",
      inputGroupNameError: false,
    };
  },
  watch: {},
  methods: {
    addMember() {
      console.log("addMember()");
      if (
        this.add_member_name.trim().length == 0 ||
        this.add_member_name.trim().length > 20
      ) {
        this.isAddMemberError = true;
        console.log(this.isAddMemberError);
        return;
      }
      this.isAddMemberError = false;
      this.members.push(this.add_member_name.trim());
      this.add_member_name = "";
    },
    deleteMember(index) {
      console.log("deleteMember(index)");
      this.members.splice(index, 1);
    },
    doValidationCheck() {
      console.log("clicked create button");
      console.log("doValidationCheck()");

      let errors = 0;
      //グループ名のバリデーション
      if (
        this.inputGroupName.trim().length >= 1 &&
        this.inputGroupName.trim().length <= 20
      ) {
        this.inputGroupNameError = false;
      } else {
        this.inputGroupNameError = true;
        errors++;
      }

      if (errors > 0) {
        console.log("errors > 0");
      } else {
        console.log("errors == 0");
        this.createGroup();
      }
    },
    createGroup: function() {
      console.log("createGroup()");

      //入力データを取得
      /**
       * グループ名は必須
       * メンバー（任意）
       */
      console.log(this.inputGroupName);
      console.log(this.members);
      let _members = [];
      for (let i = 0; i < this.members.length; i++) {
        let _members_unit = {};
        _members_unit.name = this.members[i];
        _members.push(_members_unit);
      }
      console.log(_members);

      const options = {
        method: "POST",
        url: "http://localhost:10082/travel",
        headers: { "Content-Type": "application/json" },
        data: {
          travel: { name: `${this.inputGroupName}` },
          members: _members,
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
                console.log(response.data.hash_key);
                localStorage.setItem("group_hash_key", response.data.hash_key);
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
      //localStorage.getItem("group_hash_key");
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
$error_color: #cf5271;

.main {
  min-height: calc(100vh - #{$header-h} - #{$footer-h});
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
          &.red {
            color: $error_color;
            font-weight: bold;
          }
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
          &.red {
            color: $error_color;
            font-weight: bold;
          }
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
      .button-wrapper {
        padding-top: 60px;
        padding-bottom: 28px;
        .create-button-wrapper {
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
      }
    }
  }
}
</style>
