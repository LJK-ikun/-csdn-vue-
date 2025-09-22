import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name:'登录',
    path:'/login',
    component: () => import('../view/Login.vue')
  },
]

//创建路由器
const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
