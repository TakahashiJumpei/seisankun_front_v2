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
    <div id="overlay" v-bind:class="{ 'error-modal': delete_member_error }">
      <transition name="fade">
        <div v-if="delete_member_error" id="popup-error">
          <div class="popup-error-sub">
            <div class="error-name">
              <span>{{ error_delete_member_name }}</span>
            </div>
            <div class="error-message">
              <span
                >このメンバーは、立て替えに関与しているため削除ができません</span
              >
            </div>
            <div class="button-wrapper">
              <div class="back-button-wrapper">
                <button class="back-button" @click="hideErrorModal">
                  <span>戻る</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="loding" v-bind:class="{ 'loding-active': loding }">
      <div>
        <span>読み込み中...</span>
      </div>
      <img src="../assets/loding.gif" alt="" />
    </div>
    <div class="inner" v-bind:class="{ 'loding-active': loding }">
      <div class="title-wrapper">
        <div class="title">
          <span>グループの編集</span>
        </div>
      </div>
      <div class="input-form-wrapper">
        <div class="input-group-name-form">
          <label for="group-name">グループ名</label>
          <input
            type="text"
            name="group-name"
            v-model="inputGroupName"
            id="group-name"
            placeholder="グループ名を入力"
          />
          <span v-bind:class="{ red: inputGroupNameError }"
            >※1文字以上20文字以内でご記入ください</span
          >
        </div>
        <div class="input-member-form">
          <label for="add-member">メンバーの追加</label>
          <div class="member-name-box">
            <input
              type="text"
              name="add-member"
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
            <label>メンバー{{ index + 1 }}</label>
            <div class="member-name-box">
              <div class="member-name">
                <span>{{ member.name }}</span>
              </div>
              <div class="delete" @click="doValidationDeleteMember(index)">
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
export default {
  data() {
    return {
      add_member_name: "",
      add_member_name_error_message: "",
      isAddMemberError: false,
      members: [],
      delete_member_name: "",
      error_delete_member_name: "",
      memberIndex: 0,
      inputGroupName: "",
      inputGroupNameError: false,
      confirm: false,
      confirm_group: true,
      delete_member_error: false,
      originalGroupName: "",
      travel_key: "",
      travel_id: null,
      groupIDs: [],
      delete_member_id: 0,
      loding: true,
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
        member: _member,
      };
      let options = {
        method: "POST",
        url: `/member`,
        data: data,
      };
      this.$seisankunApi
        .request(options)
        .then((response) => {
          console.log(response);
          console.log(JSON.stringify(response));
          _member.id = response.data.member_id;
          _member.can_delete = true;
          this.members.push(_member);
          this.add_member_name = "";
          console.log(this.members);
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
          console.log("エラー");
        });
    },
    doValidationDeleteMember(index) {
      if (!this.members[index].can_delete) {
        this.delete_member_error = true;
        this.error_delete_member_name = this.members[index].name;
        return;
      }
      this.confirmDeleteMember(index);
    },
    confirmDeleteMember(index) {
      console.log(index);
      this.confirm = true;
      this.confirm_group = false;
      this.delete_member_name = this.members[index].name;
      this.memberIndex = index;
      this.delete_member_id = this.members[index].id;
    },
    async deleteMember() {
      console.log(this.delete_member_id);
      let options = {
        method: "DELETE",
        url: `/member`,
        params: { member_id: this.delete_member_id },
      };
      this.$seisankunApi
        .request(options)
        .then((response) => {
          console.log(response);
          console.log(this.members);
          this.members.splice(this.memberIndex, 1);
          this.hideConfirmModal();
        })
        .catch((err) => {
          console.log(err.response);
          console.log(JSON.stringify(err.response));
          let errStatus;
          for (let key of Object.keys(err)) {
            if (key === "response") {
              errStatus = err[key].status;
            }
          }
          if (typeof errStatus === "undefined") {
            errStatus = "なし";
          }
          console.log("エラー");
        });
    },
    doValidation() {
      let errors = 0;
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
        travel: { id: this.travel_id, name: `${this.inputGroupName}` },
      };
      console.log(data);
      let options = {
        method: "PUT",
        url: `/travel`,
        data: data,
      };
      this.$seisankunApi
        .request(options)
        .then((response) => {
          console.log(response);
          this.toGroup();
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
          console.log("エラー");
        });
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
    hideErrorModal() {
      this.delete_member_error = false;
    },
    async deleteGroup() {
      let options = {
        method: "DELETE",
        url: `/travel`,
        params: { travel_key: this.travel_key },
      };
      this.$seisankunApi
        .request(options)
        .then((response) => {
          console.log(response);
          console.log(JSON.stringify(response));
          this.groupIDs = JSON.parse(localStorage.getItem("groupIDs"));
          for (let i = 0; i < this.groupIDs.length; i++) {
            if (this.groupIDs[i] === this.travel_key) {
              this.groupIDs.splice(i, 1);
              break;
            }
          }
          localStorage.setItem("groupIDs", JSON.stringify(this.groupIDs));
          this.$router.push({ path: "/" });
        })
        .catch((err) => {
          console.log(err.response);
          console.log(JSON.stringify(err.response));
          let errStatus;
          for (let key of Object.keys(err)) {
            if (key === "response") {
              errStatus = err[key].status;
            }
          }
          if (typeof errStatus === "undefined") {
            errStatus = "なし";
          }
          console.log("エラー");
        });
    },
    async getGroup() {
      this.travel_key = this.$route.params.travel_key;
      let options = {
        method: "GET",
        url: `/travel`,
        params: { travel_key: this.travel_key },
      };
      this.$seisankunApi
        .request(options)
        .then((response) => {
          console.log(response);
          console.log(JSON.stringify(response));
          this.travel_id = response.data.travel.id;
          this.inputGroupName = response.data.travel.name;
          this.originalGroupName = this.inputGroupName;
          this.members = response.data.members;

          this.hideLoding();
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
          console.log("エラー");
        });
    },
    hideLoding() {
      this.loding = false;
    },
  },
  mounted: function() {
    this.getGroup();
  },
};
</script>

<style lang="scss" scoped>
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
  @import "../scss/partials/loding";
  .inner {
    display: block;
    &.loding-active {
      display: none;
    }
    @import "../scss/partials/title";
    .input-form-wrapper {
      margin-top: 32px;
      @import "../scss/partials/groupname";
      @import "../scss/partials/addmemberform";
      @import "../scss/partials/members";
      @import "../scss/partials/groupbuttons";
    }
  }
}
</style>
