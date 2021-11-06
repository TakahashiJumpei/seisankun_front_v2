import Vue from "vue";
import Router from "vue-router";
const Top = () => import(/* webpackChunkName: "Top" */ "./components/Top.vue");
const CreateGroup = () => import(/* webpackChunkName: "CreateGroup" */ "./components/CreateGroup.vue");
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
      path: "*",
      redirect: "/"
    }
  ]
});