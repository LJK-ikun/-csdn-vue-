import { createRouter, createWebHistory } from 'vue-router'
import VueCookies from 'vue-cookies'
const routerObject = {
  '1-1': '/blog/list',
  '1-2': '/blog/category',
  '2-1': '/special/list',
  '3-1': '/settings/my',
  '3-2': '/settings/user',
  '3-3': '/settings/sysInfo',
  '4-1': '/recovery/list'
};

const routes = [
  {
    name:'登录',
    path:'/login',
    component: () => import('../view/Login.vue')
  },
  {
    name:'框架页',
    path:'/',
    component: () => import('../view/Framework.vue'),
    children: [
      {
        name:'博客管理',
        path: routerObject['1-1'],
        component: () => import('../view/blog/Blog.vue')
      }
    ]
  }
]

//创建路由器
const router = createRouter({
  routes,
  history: createWebHistory(),
})

router.beforeEach((to, from) => {
  const userInfo = VueCookies.get("userInfo");
  if (!userInfo && to.path !== "/login") {
    return '/login'; // 直接返回重定向路径
  }
  // 无需调用 next()，默认允许导航
});
export default router
