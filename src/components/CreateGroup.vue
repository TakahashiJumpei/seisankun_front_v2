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
      let response = await apihandler.createGroup(data);
      console.log(response);
      this.travel_key = response.data.travel_key;
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
};
</script>

<style scoped lang="scss">
@import "../scss/variables";
@import "../scss/breakpoints/base";

.main {
  min-height: calc(100vh - #{$header-h} - #{$footer-h});
  padding: $padding-tb $padding-lr;
  @media screen and(min-width: $min-width) {
    @import "../scss/breakpoints/768up";
    padding: $padding-tb $padding-lr;
  }
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
