import { createRouter, createWebHistory } from "vue-router";

import Login from "@/layout/login.vue";
import Dashboard from "@/layout/dashboard.vue";

import Home from "@/views/home.vue";
import Event from "@/views/event.vue";
import Caleg from "@/views/caleg.vue";

import AddData from "@/views/record/addData.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "link-active",
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      redirect: "/home",
      children: [
        {
          path: "home",
          name: "home",
          component: Home,
        },
        {
          path: "event",
          name: "event",
          component: Event,
        },
        {
          path: "caleg",
          name: "caleg",
          component: Caleg,
        },
        {
          path: "new",
          name: "addData",
          component: AddData,
        },
      ],
    },
  ],
});

import { useAuthStore } from "@/stores/authStore";

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuth = authStore.isLoggedIn;
  if (to.name !== "login" && !isAuth) next({ name: "login" });
  if (to.name == "login" && isAuth) next({ name: "home" });
  else next();
});
export default router;
