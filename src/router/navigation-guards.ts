import { Router, RouteMeta } from 'vue-router'

const getPageTitle = (routeMate: RouteMeta) => {
  if (routeMate?.title) {
    return routeMate.title
  }
  return '用户中心'
}

export default function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    document.title = getPageTitle(to.meta)
    next()
  })
}
