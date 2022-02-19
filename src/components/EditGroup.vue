<template>
  <div class="main">
    <div id="overlay" v-bind:class="{ 'confirm-modal': confirm }">
      <transition name="fade">
        <div v-if="confirm" id="popup-confirm">
          <div class="popup-confirm-sub">
            <div class="confirm-name">
              <span v-if="confirm_group">{{ originalGroupName }}</span>
              <span v-else>{{ delete_member_name }}</span>
            </div>
            <div class="confirm-message">
              <span v-if="confirm_group"
                >このグループを本当に削除してもよろしいですか？</span
              >
              <span v-else>このメンバーを本当に削除してもよろしいですか？</span>
            </div>
            <div class="button-wrapper">
              <div class="delete-button-wrapper">
                <button
                  v-if="confirm_group"
                  class="delete-button"
                  @click="deleteGroup"
                >
                  <span>OK</span>
                </button>
                <button v-else class="delete-button" @click="deleteMember">
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
          <span>グループの編集</span>
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
            :key="member.id"
            class="show-member-form"
          >
            <p>メンバー{{ index + 1 }}</p>
            <div class="member-name-box">
              <div class="member-name">
                <span>{{ member.name }}</span>
              </div>
              <div class="delete" @click="confirmDeleteMember(index)">
                <span>-</span>
              </div>
            </div>
          </div>
        </div>

        <div class="button-wrapper">
          <div class="update-button-wrapper">
            <button class="update-button" @click="doValidation">
              <span>変更を確定</span>
            </button>
          </div>
          <div class="back-button-wrapper">
            <button class="back-button" @click="toGroup">
              <span>キャンセル</span>
            </button>
          </div>
          <div class="delete-group-button-wrapper">
            <button class="delete-group-button" @click="confirmDeleteGroup">
              <span>このグループを削除</span>
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
      add_member_name: "",
      add_member_name_error_message: "",
      isAddMemberError: false,
      members: [],
      delete_member_name: "",
      memberIndex: 0,
      inputGroupName: "",
      inputGroupNameError: false,
      confirm: false,
      confirm_group: true,
      originalGroupName: "",
      travel_key: "",
    };
  },
  methods: {
    async addMember() {
      if (
        this.add_member_name.trim().length == 0 ||
        this.add_member_name.trim().length > 20
      ) {
        this.isAddMemberError = true;
        return;
      }
      this.isAddMemberError = false;

      let _member = {};
      _member.name = this.add_member_name.trim();

      let data = {
        travel: { travel_key: this.travel_key },
        members: _member,
      };
      const apihandler = new api_request("http://localhost:10082");
      //APIからレスが来るまで後続の処理を止める
      let response = await apihandler.addMember(data);
      console.log(response);
      //エラー時の処理を実装する

      //APIからID以外の付属情報も返却してもらうようにする
      this.members.push(_member);
      this.add_member_name = "";
      console.log(this.members);
    },
    confirmDeleteMember(index) {
      this.confirm = true;
      this.confirm_group = false;
      this.delete_member_name = this.members[index].name;
      this.memberIndex = index;
      this.delete_member_id = 1;
    },
    async deleteMember() {
      const apihandler = new api_request("http://localhost:10082");
      //APIからレスが来るまで後続の処理を止める
      let response = await apihandler.deleteMember(this.delete_member_id);
      console.log(response);

      this.members.splice(this.memberIndex, 1);
      this.hideConfirmModal();
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
        this.editGroup();
      }
    },
    async editGroup() {
      let data = {
        travel: { name: `${this.inputGroupName}` },
      };
      const apihandler = new api_request("http://localhost:10082");
      //APIからレスが来るまで後続の処理を止める
      let response = await apihandler.editGroup(data);
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
    confirmDeleteGroup() {
      this.confirm = true;
      this.confirm_group = true;
    },
    hideConfirmModal() {
      this.confirm = false;
    },
    async deleteGroup() {
      const apihandler = new api_request("http://localhost:10082");
      //APIからレスが来るまで後続の処理を止める
      let response = await apihandler.deleteGroup(this.travel_key);
      console.log(response);
      //ローカルストレージ内のグループIDを削除する
      //localStorage.getItem("group_hash_key"),
      this.$router.push({ path: "/" });
    },
    async getGroup() {
      this.travel_key = this.$route.params.travel_key;
      const apihandler = new api_request("http://localhost:10082");
      //APIからレスが来るまで後続の処理を止める
      let response = await apihandler.getGroup(this.travel_key);
      console.log(response);
      this.inputGroupName = response.data.travel.name;
      this.originalGroupName = this.inputGroupName;
      this.members = response.data.members;
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
$delete_color: #2c3e50;

.main {
  min-height: calc(100vh - #{$header-h} - #{$footer-h});
  padding: $padding-tb $padding-lr;

  #overlay {
    z-index: 100;
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
        .update-button-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          .update-button {
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
        .delete-group-button-wrapper {
          margin-top: 64px;
          display: flex;
          justify-content: center;
          align-items: center;
          .delete-group-button {
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
