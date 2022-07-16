import { createWebHistory, RouteRecordRaw, createRouter } from 'vue-router'
import { get_user_info } from '@/common/js/user'

const routes: RouteRecordRaw [] = [
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (typeof to.meta.title === 'string') {
    document.title = to.meta.title
  }
  const user_info = get_user_info()
  if (!user_info) {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
