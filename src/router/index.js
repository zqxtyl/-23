import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 路由表
const routes = [
  {
    path: "/login",
    component: () => import("@/views/login"),
  },
  {
    path: "/",
    component: () => import("@/views/Layout"),
  },
  {
    path: "/layout",
    component: () => import("@/views/Layout"),
    children: [
      {
        path: "/my",
        component: () => import("@/views/My"),
      },
      {
        path: "/home",
        component: () => import("@/views/Home"),
      },
      {
        path: "/video",
        component: () => import("@/views/Video"),
      },
      {
        path:'/qa',
        component:()=>import('@/views/Qa')
      }
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
