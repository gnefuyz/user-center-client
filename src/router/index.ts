import { App } from 'vue'
import { RouteRecordRaw, RouterScrollBehavior, Router } from 'vue-router'
import createRouterGuards from './navigation-guards'

export const basicRouters: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: '/login',
    meta: {
      show: false
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboadr',
    component: () => import('@/views/home/homeView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login/loginView.vue')
  }
]
export const routes = basicRouters

export const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (savedPosition) {
        resolve(savedPosition)
      } else if (to.hash) {
        resolve({
          el: to.hash,
          behavior: 'smooth'
        })
      } else {
        resolve({ top: 0 })
      }
    }, 500)
  })
}

export const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior
})

export function setupRouter(app: App) {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}

export function setRouterGuards(router: Router) {
  // 创建路由守卫
  createRouterGuards(router)
}

export default router
