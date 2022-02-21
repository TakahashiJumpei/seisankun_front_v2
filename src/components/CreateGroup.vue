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
            <button class="create-button" @click="doValidation">
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
import { api_request } from "../js/api.js";
import { SEISANKUN_API_BASE_URL } from "../javascripts/config.js";
export default {
  data() {
    return {
      add_member_name: "",
      add_member_name_error_message: "",
      isAddMemberError: false,
      members: [],
      inputGroupName: "",
      inputGroupNameError: false,
      travel_key: "",
    };
  },
  methods: {
    addMember() {
      if (
        this.add_member_name.trim().length == 0 ||
        this.add_member_name.trim().length > 20
      ) {
        this.isAddMemberError = true;
        return;
      }
      this.isAddMemberError = false;
      this.members.push(this.add_member_name.trim());
      this.add_member_name = "";
    },
    deleteMember(index) {
      this.members.splice(index, 1);
    },
    doValidation() {
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
        console.log("エラー時の処理");
      } else {
        this.createGroup();
      }
    },
    async createGroup() {
      //入力データを取得
      /**
       * グループ名は必須
       * メンバー（任意）
       */
      let _members = [];
      for (let i = 0; i < this.members.length; i++) {
        let _members_unit = {};
        _members_unit.name = this.members[i];
        _members.push(_members_unit);
      }

      let data = {
        travel: { name: `${this.inputGroupName}` },
        members: _members,
      };

      const apihandler = new api_request(SEISANKUN_API_BASE_URL);
      //APIからレスが来るまで後続の処理を止める
      let response = await apihandler.createGroup(data);
      console.log(response);
      this.travel_key = response.data.travel_key;
      //グループ画面へ
      this.toGroup();
    },
    toGroup() {
      this.$router.push({
        name: "Group",
        params: { travel_key: this.travel_key },
      });
    },
    toTop() {
      this.$router.push({ path: "/" });
    },
  },
  beforeCreate: function() {},
  created: function() {},
  beforeMount: function() {},
  mounted: function() {},
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  destroyed: function() {},
};
</script>

<style scoped lang="scss">
@import "../scss/variables";

.main {
  min-height: calc(100vh - #{$header-h} - #{$footer-h});
  padding: $padding-tb $padding-lr;

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
      .input-group-name-form {
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
      .input-member-form {
        margin-top: 4px;
        p {
          color: $base_text_color;
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
            color: $base_text_color;
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
            background-color: $green;
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
            color: $base_text_color;
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
                color: $base_text_color;
                font-size: 16px;
              }
            }
            .delete {
              width: $form-h;
              height: $form-h;
              background-color: $green;
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
      }
    }
  }
}
</style>
