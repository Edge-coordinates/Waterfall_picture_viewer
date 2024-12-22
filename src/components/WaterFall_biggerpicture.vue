<template>
  <div id="pic-wrapper" class="page-b-content">
    <Waterfall
      :list="imgs"
      :row-key="options.rowKey"
      :gutter="options.gutter"
      :has-around-gutter="options.hasAroundGutter"
      :width="options.width"
      :breakpoints="options.breakpoints"
      :img-selector="options.imgSelector"
      :background-color="options.backgroundColor"
      :lazyload="options.lazyload"
      :load-props="options.loadProps"
    >
      <template #item="{ item, url }">
        <div
          class="bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg hover:shadow-gray-600 group"
        >
          <a
            v-if="item.isVideo"
            :key="url + '-' + item.id"
            :data-width="item.width"
            :data-height="item.height"
            :data-sources= "JSON.stringify(item.src)"
            class="overflow-hidden"
          >
            <video
              :src="item.originalSrc"
              class="cursor-pointer transition-all duration-300 ease-linear group-hover:scale-105"
              controls
            ></video>
          </a>
          <!-- set data-thumb will causes an load pic error -->
          <a
            v-else
            :key="url"
            :data-width="item.width"
            :data-height="item.height"
            :data-img="url.replace(/ /g, '%20')"
            :data-source="item.source"
            class="overflow-hidden"
          >
            <!-- <a :key="url" :href="url"
          :data-source="item.source" class="overflow-hidden"> -->
            <LazyImg
              :url="url"
              alt=""
              class="cursor-pointer transition-all duration-300 ease-linear group-hover:scale-105"
              @load="imageLoad(url, $event)"
              @error="imageError"
              @success="imageSuccess"
            />
            <!-- <img :src="url" alt="" class="cursor-pointer transition-all duration-300 ease-linear group-hover:scale-105" /> -->
          </a>
          <!-- <div class="px-4 pt-2 pb-4 border-t border-t-gray-800">
          <h2 class="pb-4 text-gray-50 group-hover:text-yellow-300">
            {{ item }}
            + {{ url }}
          </h2>
        </div> -->
        </div>
      </template>
    </Waterfall>
  </div>
  <BPControllers v-if="wViewerStateStore.ifViewerOpen" />
</template>

<!-- 用 bigger-picture rebuild -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  reactive,
  ref,
  computed,
  watch,
  onUpdated,
} from 'vue';

// ANCHOR - Props
const props = defineProps({
  imgs: {
    type: Array<any>,
    default(rawProps) {
      return [];
    },
  },
});

// ANCHOR - Viewer Initialization
import BiggerPicture from 'bigger-picture';
// import style
import 'bigger-picture/css';
// bp: BiggerPicture instance
let bp: any, imageLinks: any, thisPic: string = '';
// Waterfall initialization
import { Waterfall, LazyImg } from 'vue-waterfall-plugin-next';
import 'vue-waterfall-plugin-next/dist/style.css';

// Store initialization
import { useSettingStore } from 'stores/viewerSet-store';
const setStore = useSettingStore();
import { useWViewerStateStore } from 'stores/wViewerState-store';
const wViewerStateStore = useWViewerStateStore();

// Other resources
import BPControllers from './w-viewer/BPControllers.vue';
import loading from 'assets/loading.png';
import error from 'assets/error.png';

//ANCHOR - logical beginning
function handleViewerOpen(e: any) {
  e.preventDefault();
  console.log('handleViewerOpen');
  console.log(e.currentTarget);
  bp.open({
    items: imageLinks,
    el: e.currentTarget,
    onOpen: () => (wViewerStateStore.ifViewerOpen = true),
    onClose: () => (wViewerStateStore.ifViewerOpen = false),
  });
}

function handleViewerKeyDown(event) {
  //* Viewer internal Checks if a specific key was pressed, e.g. Ctrl + S
  if (event.key === 'Delete') {
    event.preventDefault(); // Blocking default behavior (e.g. saving web pages)
    console.log('pressed Delete.');
    // let pswpImgSrc: any = document.querySelector('img.pswp__img')
    // pswpImgSrc = <string>pswpImgSrc!.getAttribute('src').replace(/atom:\/\//g, '')
    // pswpImgSrc = decodeURIComponent(pswpImgSrc)
    let pswpImgSrc = decodeURIComponent(thisPic).replace(/atom:\/\//g, '');
    console.log(pswpImgSrc);
    if (confirm('确定要删除图片嘛？')) {
      window.myToolAPI.delPic(pswpImgSrc);
      // console.log(getFolder(pswpImgSrc, /atom:\/\//g))
      // Delete images in the waterfall!
      const indexToDelete = wViewerStateStore.imgs.findIndex(
        (img: any) => img.source === pswpImgSrc,
      );
      if (indexToDelete !== -1) {
        wViewerStateStore.imgs.splice(indexToDelete, 1);
        console.log(`Object with source '${pswpImgSrc}' deleted.`);
        // TODO After the image is deleted, the viewer will not exit automatically, you should write a method to exit the viewer
        // There is no need to call handleLoadMore, because all changes depart HandleLoadMore.
      } else {
        console.log(`Object with source '${pswpImgSrc}' not found.`);
      }
      // handleLoadMore()
    }
  }
  //* Additional condition checks can be added
}

onUpdated(() => {
  console.log('onUpdated');
  // grab image links
  imageLinks = document.querySelectorAll('#pic-wrapper a');
  // console.log(imageLinks);
  for (let link of imageLinks) {
    link.addEventListener('click', handleViewerOpen);
  }
});

// 首次加载
onMounted(() => {
  if (!bp) {
    // initialize
    bp = BiggerPicture({
      target: document.body,
    });
  }
});

onUnmounted(() => {});

const options = computed(() => {
  return {
    // 唯一key值
    rowKey: 'id',
    // 卡片之间的间隙
    gutter: 10,
    // 是否有周围的gutter
    hasAroundGutter: true,
    // 卡片在PC上的宽度
    width: 320,
    // 自定义行显示个数，主要用于对移动端的适配
    breakpoints: setStore.waterfallBreakpoint,
    // 动画效果
    animationEffect: 'animate__fadeInUp',
    // 动画时间
    animationDuration: 1000,
    // 动画延迟
    animationDelay: 300,
    // 背景色
    backgroundColor: '#FFFFFF',
    // imgSelector
    imgSelector: 'src',
    // 加载配置
    loadProps: {
      loading,
      error,
    },
    // 是否懒加载
    lazyload: false,
    crossOrigin: false,
  };
});
function imageLoad(url: string, event: any) {
  // console.log(`${url}: Loading complete`)
}

function imageError(url: string) {
  console.error(`${url}: failed to load`);
}

function imageSuccess(url: string) {
  // console.log(`${url}: Loaded successfully`)
  // let imgs = document.querySelectorAll('.lazy__img')
}
</script>

<style>
.bp-wrap {
  margin-top: 20px;
}
</style>
