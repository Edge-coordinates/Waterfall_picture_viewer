<template>
  <q-page style="margin-top: 20px;">
    <!-- <div class="row items-center justify-evenly">
      <router-link to="/test" class="btn">Go to Test</router-link>
      <button class="btn" @click="querydb">Button</button>
      <button class="btn" @click="picInfoInit">Button</button>
    </div> -->
    <div v-if="ifImgPreOK" class="h-full">
      <water-fall :imgs="imgs"></water-fall>
      <!-- <water-fall /> -->
    </div>
    <div v-else class="flex justify-center">
      <n-config-provider :locale="zhCN" :date-locale="dateZhCN" class="w-11/12">
        <n-upload ref="upload" directory directory-dnd :on-change="onUpload" :max="1" :default-upload="false"
          :show-file-list="false">
          <n-upload-dragger>
            <div style="margin-bottom: 12px">
              <q-icon name="mdi-upload" size="3rem"></q-icon>
            </div>
            <n-text style="font-size: 16px">
              点击或者拖动文件夹到该区域来打开
            </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0">
              目前仅支持文件夹
            </n-p>
          </n-upload-dragger>
        </n-upload>
      </n-config-provider>
    </div>
    <div v-if="!ifImgPreOK" class="mx-2.5 my-4">
      <p class="text-h6">Tips:</p>
      <q-list separator>
        <q-item v-ripple>
          <i class="fa-regular fa-face-smile-hearts text-base"></i>
          <p>&nbsp;&nbsp;打开图片查看器之后，使用 <kbd class="kbd kbd-sm bg-white">Ctrl</kbd> +
            <kbd class="kbd kbd-sm bg-white">鼠标滚轮</kbd>调整图片大小;图片查看器支持<kbd class="kbd kbd-sm bg-white">◀︎</kbd>
            <kbd class="kbd kbd-sm bg-white">▶︎</kbd>快捷键切换图片~
          </p>
        </q-item>

        <q-item clickable v-ripple>
          <i class="fa-sharp fa-regular fa-comment-heart text-base"></i>
          <p>&nbsp;&nbsp;图片查看器支持左右快捷键翻页，支持<kbd class="kbd kbd-sm bg-white">Esc</kbd>快捷键退出</p>
        </q-item>

        <q-item clickable v-ripple>
          <i class="fa-sharp fa-regular fa-house-chimney-heart text-base"></i>
          <p>&nbsp;&nbsp;祝您使用愉快！</p>
        </q-item>
      </q-list>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab icon="mdi-plus" active-icon="mdi-close" direction="up" color="accent">
        <q-fab-action @click="stateInitialization" color="primary" icon="mdi-refresh" />
        <q-fab-action @click="openSetModal" color="primary" icon="mdi-cog" />
      </q-fab>
    </q-page-sticky>
  </q-page>
  <set-component />
</template>

<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { NUpload, NUploadDragger, NConfigProvider, NP, NText } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'

import { ref } from 'vue'
import type { UploadInst } from 'naive-ui'

import WaterFall from 'components/WaterFall.vue'
import SetComponent from 'components/SetComponent.vue'

const upload = ref<UploadInst | null>()
const ifImgPreOK = ref<boolean>(false)
const imgs = ref([])

import { useSettingStore } from 'stores/viewerSet-store';
const setStore = useSettingStore()


function openSetModal() {

  console.log('ddd')
  querydb()
  setStore.isOpen = true
  console.log(setStore.isOpen)
}

function stateInitialization() {
  upload.value?.clear()
  imgs.value = []
  ifImgPreOK.value = false
  console.log(imgs.value)
}

async function querydb() {
  console.log(await window.storeAPI.get('itemNum'))
  // console.log(await window.storeAPI.set('itemxxxxum', 'hahahahahh'))
  // console.log(await window.storeAPI.get('itemxxxxum'))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // window.storeAPI.get('itemNum').then((res: any) => {
  //   console.log(res)
  // })
}

async function picInfoInit(fpath) {
  console.log('picInfoInit')
  let aa = JSON.parse(JSON.stringify(setStore.getPFormat))
  console.log(aa)
  imgs.value = await window.myToolAPI.traverseFolder(fpath, aa)
  // console.log(imgs.value)
  ifImgPreOK.value = true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onUpload(e: any) {
  let fpath = e.file.fullPath
  const fullfpath = e.file.file.path
  let rt = fpath.split('/')[1]
  fpath = fullfpath.split(rt)[0] + rt + '\\'
  // console.log(rt, fpath, fullfpath)
  console.log(e)

  picInfoInit(fpath)
}
</script>
