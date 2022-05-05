import 'vue-router'

declare module 'vue-router' {
  export interface RouteMeta {
    title?: string // 标题
    showMenu?: boolean // 是否显示菜单
  }
}
