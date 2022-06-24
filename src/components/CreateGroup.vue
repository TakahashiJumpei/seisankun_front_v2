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
          <span v-bind:class="{ red: isAddMemberError || noMemberError }">{{
            member_error_message
          }}</span>
        </div>
        <div id="show-member-form-wrapper">
          <div
            v-for="(member, index) in members"
            :key="member"
            class="show-member-form"
          >
            <label>メンバー{{ index + 1 }}</label>
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
export default {
  data() {
    return {
      add_member_name: "",
      isAddMemberError: false,
      noMemberError: false,
      member_error_message: "※1文字以上20文字以内でご記入ください",
      text_count_member_error_message: "※1文字以上20文字以内でご記入ください",
      no_member_error_message: "※メンバーは1人以上追加してください",
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
        this.member_error_message = this.text_count_member_error_message;
        return;
      }
      this.isAddMemberError = false;
      this.members.push(this.add_member_name.trim());
      this.add_member_name = "";
      this.noMemberError = false;
      this.member_error_message = this.text_count_member_error_message;
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
      if (this.members.length === 0) {
        this.noMemberError = true;
        this.member_error_message = this.no_member_error_message;
        errors++;
      }
      if (errors === 0) {
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
      let options = {
        method: "POST",
        url: `/travel`,
        data: data,
      };
      console.log(options);
      this.$seisankunApi
        .request(options)
        .then((response) => {
          console.log(response);
          this.travel_key = response.data.travel_key;
          this.toGroup();
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
          console.log(
            "ステータスコード：" +
              errStatus +
              "\nシステムエラーが発生しました。"
          );
        });
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
