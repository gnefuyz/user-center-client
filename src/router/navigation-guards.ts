import projectSetting from '@/settings/projectSetting'
import { Router, RouteMeta } from 'vue-router'

const getPageTitle = (routeMate: RouteMeta) => {
  const title = routeMate?.title || '用户中心'
  return `${title}-${projectSetting.name}`
}

export default function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    document.title = getPageTitle(to.meta)
    next()
  })
}
