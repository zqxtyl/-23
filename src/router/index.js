import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    component:()=>import('@/views/login')
  },
  {
    path:'/',
    component:()=>import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
