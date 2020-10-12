import Vue from "vue";
import VueRouter from "vue-router";
import List from "../views/List.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "List",
    component: List
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  }
];

const router = new VueRouter({
  routes
});

export default router;
