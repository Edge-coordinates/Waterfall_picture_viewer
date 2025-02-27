

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
// Data INIT
async function initData() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let tmpdata: any
  tmpdata = await window.storeAPI.get('itemNum')
  if (tmpdata !== undefined && tmpdata !== null) setStore.perPageNum = tmpdata
  tmpdata = await window.storeAPI.get('WBreakpoint')
  if (tmpdata !== undefined && tmpdata !== null) setStore.waterfallBreakpoint = tmpdata
  // console.log(await window.storeAPI.get('WBreakpoint'), setStore.waterfallBreakpoint)
  tmpdata = await window.storeAPI.get('cycleUpdate')
  if (tmpdata !== undefined && tmpdata !== null) setStore.cycleUpdate = tmpdata
  tmpdata = await window.storeAPI.get('viewerName')
  if (tmpdata !== undefined && tmpdata !== null) setStore.viewerName = tmpdata
  tmpdata = await window.storeAPI.get('language')
  if (tmpdata !== undefined && tmpdata !== null) {
    setStore.language.value = tmpdata
    setStore.language.label = setStore.languages.find((item) => item.value === tmpdata)!.label
  }
  tmpdata = await window.storeAPI.get('singlePageLoop') 
  if (tmpdata !== undefined && tmpdata !== null) setStore.singlePageLoop = tmpdata
  tmpdata = await window.storeAPI.get('sortMethod')
  if (tmpdata !== undefined && tmpdata !== null) setStore.sortMethod = tmpdata
  tmpdata = await window.storeAPI.get('globalDropFolderOpen')
  if (tmpdata !== undefined && tmpdata !== null) setStore.globalDropFolderOpen = tmpdata
  tmpdata = await window.storeAPI.get('autoPositioning')
  if (tmpdata !== undefined && tmpdata !== null) setStore.autoPositioning = tmpdata
  
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
