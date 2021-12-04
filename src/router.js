import Vue from "vue";
import Router from "vue-router";
const Top = () => import(/* webpackChunkName: "Top" */ "./components/Top.vue");
const CreateGroup = () => import(/* webpackChunkName: "CreateGroup" */ "./components/CreateGroup.vue");
const Group = () => import(/* webpackChunkName: "Group" */ "./components/Group.vue");
const EditGroup = () => import(/* webpackChunkName: "EditGroup" */ "./components/EditGroup.vue");
const AddPayment = () => import(/* webpackChunkName: "AddPayment" */ "./components/AddPayment.vue");
const EditPayment = () => import(/* webpackChunkName: "EditPayment" */ "./components/EditPayment.vue");
const MemberLendingBorrowingDetail = () => import(/* webpackChunkName: "MemberLendingBorrowingDetail" */ "./components/MemberLendingBorrowingDetail.vue");
const Tos = () => import(/* webpackChunkName: "Tos" */ "./components/Tos.vue");
const PrivacyPolicy = () => import(/* webpackChunkName: "PrivacyPolicy" */ "./components/PrivacyPolicy.vue");
const HeaderTop = () => import(/* webpackChunkName: "HeaderTop" */ "./components/HeaderTop.vue");
const HeaderCommon = () => import(/* webpackChunkName: "HeaderCommon" */ "./components/HeaderCommon.vue");
const Footer = () => import(/* webpackChunkName: "Footer" */ "./components/Footer.vue");

Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      components: {
        default: Top,
        header: HeaderTop,
        footer: Footer
      }
    },
    {
      path: "/CreateGroup/",
      components: {
        default: CreateGroup,
        header: HeaderCommon,
        footer: Footer
      }
    },
    {
      path: "/Group/:travel_key",
      name: "Group",
      components: {
        default: Group,
        header: HeaderCommon,
        footer: Footer
      }
    },
    {
      path: "/EditGroup/:travel_key",
      name: 'EditGroup',
      components: {
        default: EditGroup,
        header: HeaderCommon,
        footer: Footer
      }
    },
    {
      path: "/AddPayment/:travel_key",
      name: "AddPayment",
      components: {
        default: AddPayment,
        header: HeaderCommon,
        footer: Footer
      }
    },
    {
      path: "/EditPayment/:travel_key/:payment_id",
      name: "EditPayment",
      components: {
        default: EditPayment,
        header: HeaderCommon,
        footer: Footer
      }
    },
    {
      path: "/MemberLendingBorrowingDetail/:travel_key/:member_id",
      name: "MemberLendingBorrowingDetail",
      components: {
        default: MemberLendingBorrowingDetail,
        header: HeaderCommon,
        footer: Footer
      }
    },    
    {
      path: "/tos/",
      components: {
        default: Tos,
        header: HeaderCommon,
        footer: Footer
      }
    },
    {
      path: "/PrivacyPolicy/",
      components: {
        default: PrivacyPolicy,
        header: HeaderCommon,
        footer: Footer
      }
    },
    // {
    //   path: "*",
    //   redirect: "/"
    // },
  ]
});