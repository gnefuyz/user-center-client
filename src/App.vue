<template>
  <!-- <el-button @click="changRoutes">change</el-button>
    <nav>
      <template v-for="(route, index) in routeMenus" :key="route.name">
        <router-link :to="route.path">{{ route.name }}</router-link>
        <span v-if="index !== routeMenus.length - 1"> | </span>
      </template>
    </nav> -->
  <router-view></router-view>
</template>

<!-- <script lang="ts" setup>
import router from '@/router'

const reactiveRouter = ref(router)

const routes = ref(reactiveRouter.value.getRoutes())

const routeMenus = computed(() => {
  return routes.value.filter((value) => value.meta?.show !== false)
})

function changRoutes() {
  if (routes.value[1].meta.show !== false) {
    routes.value[1].meta.show = false
  } else {
    routes.value[1].meta.show = true
  }
}

watch(
  () => reactiveRouter.value.options.routes.length,
  () => {
    routes.value = reactiveRouter.value.getRoutes()
  }
)
</script> -->

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
}
</style>
