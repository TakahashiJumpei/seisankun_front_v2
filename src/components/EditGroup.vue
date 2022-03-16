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
      groupIDs: [],
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
      const apihandler = new api_request(process.env.VUE_APP_SEISANKUN_API_BASE_URL);
      let response = await apihandler.addMember(data);
      console.log(response);
      //TODO: エラー時の処理を実装する

      //TODO: APIからID以外の付属情報も返却してもらうようにする
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
      const apihandler = new api_request(process.env.VUE_APP_SEISANKUN_API_BASE_URL);
      let response = await apihandler.deleteMember(this.delete_member_id);
      console.log(response);

      this.members.splice(this.memberIndex, 1);
      this.hideConfirmModal();
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
        travel: { name: `${this.inputGroupName}` },
      };
      const apihandler = new api_request(process.env.VUE_APP_SEISANKUN_API_BASE_URL);
      let response = await apihandler.editGroup(data);
      console.log(response);
      //TODO: エラー時の処理を実装する
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
      const apihandler = new api_request(process.env.VUE_APP_SEISANKUN_API_BASE_URL);
      let response = await apihandler.deleteGroup(this.travel_key);
      console.log(response);
      this.groupIDs = JSON.parse(localStorage.getItem("groupIDs"));
      for (let i = 0; i < this.groupIDs.length; i++) {
        if (this.groupIDs[i] === this.travel_key) {
          this.groupIDs.splice(i, 1);
          break;
        }
      }
      localStorage.setItem('groupIDs', JSON.stringify(this.groupIDs));
      this.$router.push({ path: "/" });
    },
    async getGroup() {
      this.travel_key = this.$route.params.travel_key;
      const apihandler = new api_request(process.env.VUE_APP_SEISANKUN_API_BASE_URL);
      let response = await apihandler.getGroup(this.travel_key);
      console.log(response);
      this.inputGroupName = response.data.travel.name;
      this.originalGroupName = this.inputGroupName;
      this.members = response.data.members;
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
      @import "../scss/partials/groupname";
      @import "../scss/partials/addmemberform";
      @import "../scss/partials/members";
      @import "../scss/partials/groupbuttons";
    }
  }
}
</style>
