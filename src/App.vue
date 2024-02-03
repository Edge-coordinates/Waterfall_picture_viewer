

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view />
  </n-config-provider>
</template>

<script setup lang="ts">
// window.storeAPI.initData()
import { NConfigProvider } from 'naive-ui'

import { onMounted } from 'vue'

import { useSettingStore } from 'stores/viewerSet-store';
const setStore = useSettingStore()
async function initData() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let tmpdata: any
  if (tmpdata = await window.storeAPI.get('itemNum')) setStore.perPageNum = tmpdata
  if (tmpdata = await window.storeAPI.get('WBreakpoint')) setStore.waterfallBreakpoint = tmpdata
  console.log(await window.storeAPI.get('WBreakpoint'), setStore.waterfallBreakpoint)
  console.log('APP setData inited!')
}

onMounted(() => {
  initData()
})

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
