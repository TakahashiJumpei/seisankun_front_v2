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
              <span v-if="confirm_group">このグループを本当に削除してもよろしいですか？</span>
              <span v-else>このメンバーを本当に削除してもよろしいですか？</span>
            </div>
            <div class="button-wrapper">
              <div class="delete-button-wrapper">
                <button v-if="confirm_group" class="delete-button" @click="deleteGroup">
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
            :key="member"
            class="show-member-form"
          >
            <p>メンバー{{ index + 1 }}</p>
            <div class="member-name-box">
              <div class="member-name">
                <span>{{ member }}</span>
              </div>
              <div class="delete" @click="confirmDeleteMember(index)">
                <span>-</span>
              </div>
            </div>
          </div>
        </div>

        <div class="button-wrapper">
          <div class="update-button-wrapper">
            <button class="update-button" @click="doValidationCheck">
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
import axios from "axios";
export default {
  data() {
    return {
      add_member_name: "",
      add_member_name_error_message: "",
      isAddMemberError: false,
      members: [],//idも持つように改修する
      delete_member_name: "",
      memberIndex: 0,
      inputGroupName: "",
      inputGroupNameError: false,
      confirm: false,
      confirm_group: true,
      originalGroupName: "",
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

      let _member = {};
      _member.name = this.add_member_name.trim();
      localStorage.getItem("group_hash_key");
      console.log(localStorage.getItem("group_hash_key"));

      const options = {
        method: "POST",
        url: "http://localhost:10082/member",
        headers: { "Content-Type": "application/json" },
        data: {
          travel: { hash_key: localStorage.getItem("group_hash_key") },
          members: _member,
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
                console.log("member_id:", response.data.member_id);
                this.members.push(this.add_member_name.trim());
                this.add_member_name = "";
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
    confirmDeleteMember(index) {
      console.log("confirmDeleteMember(index)");
      this.confirm = true;
      this.confirm_group = false;
      this.delete_member_name = this.members[index];
      this.memberIndex = index;
      this.delete_member_id = 1;
    },
    deleteMember() {
      console.log("deleteMember()");
      console.log(this.memberIndex);

      const options = {
        method: "DELETE",
        url: "http://localhost:10082/member",
        headers: { "Content-Type": "application/json" },
        params: {
          member_id: this.delete_member_id,
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
                this.members.splice(this.memberIndex, 1);
                this.hideConfirmModal();
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
        this.EditGroup();
      }
    },
    EditGroup: function() {
      console.log("EditGroup()");

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
        method: "PUT",
        url: "http://localhost:10082/travel",
        headers: { "Content-Type": "application/json" },
        data: {
          travel: { name: `${this.inputGroupName}` },
          //members: _members,
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
      this.$router.push({ path: "/Group/" });
    },
    confirmDeleteGroup() {
      console.log("confirmDeleteGroup()");
      this.confirm = true;
      this.confirm_group = true;
    },
    hideConfirmModal() {
      console.log("hideConfirmModal()");
      this.confirm = false;
    },
    deleteGroup() {
      console.log("clicked delete group button");
      console.log("deleteGroup()");

      const options = {
        method: "DELETE",
        url: "http://localhost:10082/travel",
        headers: { "Content-Type": "application/json" },
        params: {
          hash_key: localStorage.getItem("group_hash_key"),
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
                //ローカルストレージ内のグループIDを削除する
                //localStorage.getItem("group_hash_key"),
                this.$router.push({ path: "/" });
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
    console.log("EditGroup.vue beforeCreate");
  },
  created: function() {
    console.log("EditGroup.vue created");
  },
  beforeMount: function() {
    console.log("EditGroup.vue beforeMount");
  },
  mounted: function() {
    console.log("EditGroup.vue mounted");

    localStorage.getItem("group_hash_key");
    console.log(localStorage.getItem("group_hash_key"));

    const options = {
      method: "GET",
      url: "http://localhost:10082/travel",
      headers: { "Content-Type": "application/json" },
      params: {
        hash_key: localStorage.getItem("group_hash_key"),
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
              this.inputGroupName = response.data.travel.name;
              this.originalGroupName = this.inputGroupName;
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

    // //ダミーグループ名のセット
    // let dummyGroupName = "渡韓ごっこin新大久保";
    // this.groupName = dummyGroupName;
    // this.inputGroupName = this.groupName;

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
  },
  beforeUpdate: function() {
    console.log("EditGroup.vue beforeUpdate");
  },
  updated: function() {
    console.log("EditGroup.vue updated");
  },
  beforeDestroy: function() {
    console.log("EditGroup.vue beforeDestroy");
  },
  destroyed: function() {
    console.log("EditGroup.vue destroyed");
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
