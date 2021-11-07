import Vue from "vue";
import Router from "vue-router";
const Top = () => import(/* webpackChunkName: "Top" */ "./components/Top.vue");
const CreateGroup = () => import(/* webpackChunkName: "CreateGroup" */ "./components/CreateGroup.vue");
const Group = () => import(/* webpackChunkName: "Group" */ "./components/Group.vue");
const Tos = () => import(/* webpackChunkName: "Tos" */ "./components/Tos.vue");
const PrivacyPolicy = () => import(/* webpackChunkName: "PrivacyPolicy" */ "./components/PrivacyPolicy.vue");
const Header = () => import(/* webpackChunkName: "Header" */ "./components/Header.vue");
const Footer = () => import(/* webpackChunkName: "Footer" */ "./components/Footer.vue");

Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      components: {
        default: Top,
        header: Header,
        footer: Footer
      }
    },
    {
      path: "/CreateGroup/",
      components: {
        default: CreateGroup,
        header: Header,
        footer: Footer
      }
    },
    {
      path: "/Group/",
      components: {
        default: Group,
        header: Header,
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
        header: Header,
        footer: Footer
      }
    },
    {
      path: "/PrivacyPolicy/",
      components: {
        default: PrivacyPolicy,
        header: Header,
        footer: Footer
      }
    },
  ]
});