import Vue from "vue";
import Router from "vue-router";
const Top = () => import(/* webpackChunkName: "Top" */ "./components/Top.vue");
const CreateGroup = () =>
  import(/* webpackChunkName: "CreateGroup" */ "./components/CreateGroup.vue");
const Group = () =>
  import(/* webpackChunkName: "Group" */ "./components/Group.vue");
const EditGroup = () =>
  import(/* webpackChunkName: "EditGroup" */ "./components/EditGroup.vue");
const AddPayment = () =>
  import(/* webpackChunkName: "AddPayment" */ "./components/AddPayment.vue");
const EditPayment = () =>
  import(/* webpackChunkName: "EditPayment" */ "./components/EditPayment.vue");
const MemberLendingBorrowingDetail = () =>
  import(
    /* webpackChunkName: "MemberLendingBorrowingDetail" */ "./components/MemberLendingBorrowingDetail.vue"
  );
const Tos = () => import(/* webpackChunkName: "Tos" */ "./components/Tos.vue");
const PrivacyPolicy = () =>
  import(
    /* webpackChunkName: "PrivacyPolicy" */ "./components/PrivacyPolicy.vue"
  );
const HeaderTop = () =>
  import(/* webpackChunkName: "HeaderTop" */ "./components/HeaderTop.vue");
const HeaderCommon = () =>
  import(
    /* webpackChunkName: "HeaderCommon" */ "./components/HeaderCommon.vue"
  );
const NotFound = () =>
  import(/* webpackChunkName: "NotFound" */ "./components/NotFound.vue");
const Unauthorized = () =>
  import(
    /* webpackChunkName: "Unauthorized" */ "./components/Unauthorized.vue"
  );
const Forbidden = () =>
  import(
    /* webpackChunkName: "Forbidden" */ "./components/Forbidden.vue"
  );
const ServerError = () =>
  import(
    /* webpackChunkName: "ServerError" */ "./components/ServerError.vue"
  );

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      components: {
        default: Top,
        header: HeaderTop,
      },
    },
    {
      path: "/group/create",
      components: {
        default: CreateGroup,
        header: HeaderCommon,
      },
    },
    {
      path: "/group/:travel_key",
      name: "Group",
      components: {
        default: Group,
        header: HeaderCommon,
      },
    },
    {
      path: "/group/edit/:travel_key",
      name: "EditGroup",
      components: {
        default: EditGroup,
        header: HeaderCommon,
      },
    },
    {
      path: "/payment/add/:travel_key",
      name: "AddPayment",
      components: {
        default: AddPayment,
        header: HeaderCommon,
      },
    },
    {
      path: "/payment/edit/:travel_key/:payment_id",
      name: "EditPayment",
      components: {
        default: EditPayment,
        header: HeaderCommon,
      },
    },
    {
      path: "/member/history/:travel_key/:member_id",
      name: "MemberLendingBorrowingDetail",
      components: {
        default: MemberLendingBorrowingDetail,
        header: HeaderCommon,
      },
    },
    {
      path: "/tos/",
      components: {
        default: Tos,
        header: HeaderCommon,
      },
    },
    {
      path: "/privacy-policy/",
      components: {
        default: PrivacyPolicy,
        header: HeaderCommon,
      },
    },
    {
      path: 'NotFound',
      name: 'NotFound',
      components: {
        default: NotFound,
        header: HeaderCommon,
      }
    },
    {
      path: "*",
      name: "Unauthorized",
      components: {
        default: Unauthorized,
        header: HeaderCommon,
      },
    },
    {
      path: "*",
      name: "Forbidden",
      components: {
        default: Forbidden,
        header: HeaderCommon,
      },
    },
    {
      path: "*",
      name: "ServerError",
      components: {
        default: ServerError,
        header: HeaderCommon,
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x : 0, y : 0}
    }
  }
});
