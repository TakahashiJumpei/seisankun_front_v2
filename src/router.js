import Vue from "vue";
import Router from "vue-router";
const Top = () => import(/* webpackChunkName: "Top" */ "./components/Top.vue");
const CreateGroup = () => import(/* webpackChunkName: "CreateGroup" */ "./components/CreateGroup.vue");
const Group = () => import(/* webpackChunkName: "Group" */ "./components/Group.vue");
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
      path: "/Group/",
      components: {
        default: Group,
        header: HeaderCommon,
        footer: Footer
      }
    },
    {
      path: "*",
      redirect: "/"
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
  ]
});