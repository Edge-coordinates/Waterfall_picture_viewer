

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view />
  </n-config-provider>
</template>

<script setup lang="ts">
// window.storeAPI.initData()
import { NConfigProvider } from 'naive-ui'

const themeOverrides = {
  common: {
    primaryColor: '#1976d2'
  },
  // Button: {
  //   textColor: '#FF0000'
  // },
  // Select: {
  //   peers: {
  //     InternalSelection: {
  //       textColor: '#FF0000'
  //     }
  //   }
  // }
}
</script>

<style lang="scss">
@import 'assets/font-awesome-6.4.2-pro.css'
</style>
