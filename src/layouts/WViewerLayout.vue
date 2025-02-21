<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div v-if="viewerName === 'photoswipe'">
    <WviewerPhotoswipe :imgs="list" :next-page="nextPage" :pre-page="prePage" />
  </div>
  <div v-else-if="viewerName === 'biggerpicture'">
    <WviewerBiggerpicture :imgs="list" />
  </div>
  <div v-else-if="viewerName === 'viewerjs'">
    <WviewerViewerjs :imgs="list" />
  </div>
  <div v-else>Please choose a WViewer</div>

  <!-- <WPagination /> -->
  <!-- ANCHOR 页码 -->
  <q-page-sticky position="bottom-left" :offset="[18, 18]">
    <!-- 样式调整！！！！ -->
    <div class="q-pa-lg rounded-full bg-blue-300 bg-opacity-70">
      <q-pagination
        v-model="page"
        color="black"
        :max="pageNum"
        :max-pages="8"
        boundary-numbers
      ></q-pagination>
      <div class="row inline">
        <n-input-number v-model:value="inputPageValue" clearable />
        <q-btn @click="handleChangePage" color="black" label="Go" />
        <q-btn @click="handleLoadMore()" color="black" icon="mdi-autorenew" />
      </div>
    </div>
  </q-page-sticky>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { NInputNumber } from 'naive-ui';
import { onMounted, onUnmounted, reactive, ref, computed, watch } from 'vue';
import WviewerBiggerpicture from 'src/components/WaterFall_biggerpicture.vue';
import WviewerViewerjs from 'components/WaterFall_viewerjs.vue';
import WviewerPhotoswipe from 'components/WaterFall_photoswipe.vue';

// TODO 传入参数有问题，每次更新都会导致查看器UPDATE，这是没有必要的，除非查看器截取部分确实发生了变化（页面内图片更新）

const ifImgPreOK = ref<boolean>(false);
const props = defineProps({
  fpath: {
    type: [Array<string>, String],
    default(rawProps) {
      return [];
    },
  },
});

import { useSettingStore } from 'stores/viewerSet-store';
const setStore = useSettingStore();
import { useWViewerStateStore } from 'stores/wViewerState-store';
const wViewerStateStore = useWViewerStateStore();

import { storeToRefs } from 'pinia';
const { viewerName } = storeToRefs(setStore);

import cloneDeep from 'lodash/cloneDeep';

const list = ref<any>([]);

async function picInfoInit(fpath: Array<String> | String) {
  console.log('picInfoInit', fpath);
  const pFormat = JSON.parse(JSON.stringify(setStore.getPFormat));
  const vFormat = JSON.parse(JSON.stringify(setStore.getVFormat));
  const perPageNum = JSON.parse(JSON.stringify(setStore.getPerPageNum));

  // imgs.value = await window.myToolAPI.traverseFolder(fpath, pFormat)
  if (Array.isArray(fpath) && fpath.length == 1) {
    fpath = fpath[0];
  }
  const theTaskName = Array.isArray(fpath) ? fpath[0] : fpath;
  const paths = cloneDeep(fpath);
  window.myToolAPI.traverseFolderAsync(paths, pFormat, vFormat, perPageNum);
  window.myToolAPI.onAsyncImageLinksAppend((event, taskName, paths) => {
    console.log(paths);
    if (taskName === theTaskName) {
      wViewerStateStore.imgs = paths;
      ifImgPreOK.value = true;
    }
  });
}

wViewerStateStore.$subscribe((mutation, state) => {
  if (true) {
    // console.log(mutation.events);
    // NOTE It is handled directly here because handleLoadMore has no side effects
    console.log('imgs.length:', wViewerStateStore.imgs.length);
    handleLoadMore();
  }
});

const inputPageValue = ref(1);

async function getList({ page, pageSize }) {
  return wViewerStateStore.imgs.slice((page - 1) * pageSize, page * pageSize);
  // .map((element) => {
  //   // Processing of each element?
  //   return {
  //     src: element,
  //     id: element
  //   }
  // });
}

const page = ref(1);
watch(page, (newVal, oldVal) => {
  handleLoadMore();
  if (inputPageValue.value != page.value) inputPageValue.value = page.value;
  if (1) scrollToTop(); // Scroll to top
  console.log('myVariable changed:', newVal);
});
const pageNum = computed(() => {
  return Math.ceil(wViewerStateStore.imgs.length / setStore.perPageNum);
  // return 10
});

function handleChangePage() {
  console.log(setStore.vNavbar);
  page.value = inputPageValue.value;
  // handleLoadMore()
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Using Smooth Scrolling
  });
}

// Load More
function handleLoadMore() {
  // console.log('handleLoadMore!');
  getList({
    page: page.value,
    pageSize: setStore.perPageNum,
  }).then((res) => {
    list.value = res;
    // console.log('list:', list.value)
  });
}

let theCycleUpdateInterval;
function turnOnCycleUpdate() {
  console.log('Turn on cycleUpdate');
  theCycleUpdateInterval = setInterval(handleLoadMore, 500);
}

function nextPage() {
  if (page.value < pageNum.value) {
    page.value = page.value + 1;
    handleLoadMore();
  }
  
}

function prePage() {
  if (page.value > 1) {
    page.value = page.value - 1;
    handleLoadMore();
  }
}

function tEventListening() {
  // * Listening to some messy events
  if (setStore.cycleUpdate) {
    turnOnCycleUpdate();
  }
  // ANCHOR shortcut key
  document.addEventListener('keydown', function (event: any) {
    const key = event.key;
    // Use the shared state in the store to determine if the image viewer is open
    if (!wViewerStateStore.ifViewerOpen) {
      if (key == 'ArrowRight') {
        nextPage();
      }
      if (key == 'ArrowLeft') {
        prePage();
      }
    }
  });
  watch(
    () => setStore.cycleUpdate,
    (newValue, oldValue) => {
      if (newValue) turnOnCycleUpdate();
      else clearInterval(theCycleUpdateInterval);
    },
  );
}

// ANCHOR onMounted
onMounted(() => {
  console.log('WViewerLayout onMounted');
  picInfoInit(props.fpath);
  wViewerStateStore.ifViewerOpen = false;
  tEventListening();
});

// ----------------- Suspended code

// watch(() => props.fpath, (newVal, oldVal) => {
//   if (newVal) {
//     console.log('Fpath changed:', newVal);
//     ifImgPreOK.value = false
//     imgs.value = []
//     picInfoInit(newVal)
//   }
// })
</script>

<style>
button.pswp__button--folder-button {
  /* background: #136912 !important; */
  font-size: 20px;
  color: #fff;
}

button.pswp__button--open-button {
  /* background: #136912 !important; */
  font-size: 20px;
  color: #fff;
}
</style>
