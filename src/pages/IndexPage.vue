<template>
  <q-page style="margin-top: 20px">
    <div v-if="ifLoadPath" class="h-full">
      <water-fall-layout :fpath="fpath"></water-fall-layout>
      <!-- <water-fall /> -->
    </div>
    <div v-else class="flex justify-center">
      <n-config-provider :locale="zhCN" :date-locale="dateZhCN" class="w-11/12">
        <upload-component :onUpload="onUpload" />
      </n-config-provider>
    </div>
    <div v-if="!ifLoadPath" class="mx-2.5 my-4">
      <p class="text-h6">Tips:</p>
      <q-list separator>
        <q-item v-ripple>
          <i class="fa-regular fa-face-smile-hearts text-base"></i>
          <p>
            &nbsp;&nbsp;打开图片查看器之后，使用
            <kbd class="kbd kbd-sm bg-white">Ctrl</kbd> +
            <kbd class="kbd kbd-sm bg-white">鼠标滚轮</kbd
            >调整图片大小;图片查看器支持<kbd class="kbd kbd-sm bg-white"
              >◀︎</kbd
            >
            <kbd class="kbd kbd-sm bg-white">▶︎</kbd>快捷键切换图片~
          </p>
        </q-item>

        <q-item clickable v-ripple>
          <i class="fa-sharp fa-regular fa-comment-heart text-base"></i>
          <p>
            &nbsp;&nbsp;图片查看器支持左右快捷键翻页，支持<kbd
              class="kbd kbd-sm bg-white"
              >Esc</kbd
            >快捷键退出。您也可以按<kbd class="kbd kbd-sm bg-white">Delete</kbd
            >键来删除当前正在浏览的图片！（会删除到回收站，不保证稳定！）
          </p>
        </q-item>

        <q-item clickable v-ripple>
          <i class="fa-sharp fa-regular fa-house-chimney-heart text-base"></i>
          <p>&nbsp;&nbsp;祝您使用愉快！ {{ $t('hello') }}</p>
        </q-item>
      </q-list>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        icon="mdi-plus"
        active-icon="mdi-close"
        direction="up"
        color="accent"
      >
        <q-fab-action
          @click="stateInitialization"
          color="primary"
          icon="mdi-refresh"
        />
        <q-fab-action @click="openSetModal" color="primary" icon="mdi-cog" />
      </q-fab>
    </q-page-sticky>
  </q-page>
  <settings-layout />
  <init-language />
</template>

<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { NUpload, NUploadDragger, NConfigProvider, NP, NText } from 'naive-ui';
import { zhCN, dateZhCN } from 'naive-ui';

import { ref, onMounted, nextTick, watch } from 'vue';
import type { UploadInst } from 'naive-ui';

import initLanguage from 'components/settings/initLanguage.vue';

import WaterFallLayout from 'layouts/WViewerLayout.vue';
import SettingsLayout from 'src/layouts/SettingsLayout.vue';
import UploadComponent from 'src/components/UploadComponent.vue';

const ifLoadPath = ref<boolean>(false);
const upload = ref<UploadInst | null>();
let fpath = ref<string | string[]>('');

import { useSettingStore } from 'stores/viewerSet-store';
const setStore = useSettingStore();
import { useWViewerStateStore } from 'stores/wViewerState-store';
const wViewerStateStore = useWViewerStateStore();

onMounted(() => {
  console.log('IndexPage mounted');
  watch(() => setStore.sortMethod, async (newValue, oldValue) => {
    console.log('sortMethod changed', newValue, oldValue);
    stateInitialization();
    nextTick(() => {
      onUpload(fpath.value);
    });
  })
  if (setStore.globalDropFolderOpen) {
    document.addEventListener('dragover', (event) => {
      event.preventDefault(); // 阻止默认行为（防止浏览器打开文件）
    });

    document.addEventListener('drop', (event: any) => {
      event.preventDefault(); // 阻止默认行为
      // console.log(event);
      stateInitialization();
      nextTick(() => {
        const files = event.dataTransfer.files;
        console.log('dropFile', files);
        let finalFiles: any = [];
        for (let i = 0; i < files.length; i++) {
          const file: any = files[i].path;
          finalFiles.push(file);
          // 在这里可以执行文件上传的相关操作
        }
        console.log('UploadComponent: handleFiles');
        if (files.length === 0) {
          return;
        }
        onUpload(finalFiles);
      });
    });
  }
});

function openSetModal() {
  // init setting data
  querydb();
  setStore.isOpen = true;
}

async function querydb() {
  // TODO document link
  console.log(await window.storeAPI.get('itemNum'));
}

function onUpload(paths: any) {
  console.log('onUpload!');
  fpath.value = paths;
  ifLoadPath.value = true;
  // picInfoInit(fpath)
}

function stateInitialization() {
  upload.value?.clear();
  ifLoadPath.value = false;
  wViewerStateStore.$reset();
  // The logic for modifying the Imgs array should be moved to the Layout file
  // use watch function
}
</script>
