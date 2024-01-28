<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div id="pic-wrapper" class="page-b-content">
    <Waterfall :list="list" :row-key="options.rowKey" :gutter="options.gutter"
      :has-around-gutter="options.hasAroundGutter" :width="options.width" :breakpoints="options.breakpoints"
      :img-selector="options.imgSelector" :background-color="options.backgroundColor" :lazyload="options.lazyload"
      :load-props="options.loadProps">
      <template #item="{ item, url }">
        <div
          class="bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg hover:shadow-gray-600 group">
          <a :key="url" :href="url" :data-pswp-width="item.width" :data-pswp-height="item.height" class="overflow-hidden">
            <LazyImg :url="url" alt=""
              class="cursor-pointer transition-all duration-300 ease-linear group-hover:scale-105" @load="imageLoad"
              @error="imageError" @success="imageSuccess" />
            <!-- <img :src="url" alt="" /> -->
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

  <q-page-sticky position="bottom-left" :offset="[18, 18]">
    <!-- 样式调整！！！！ -->
    <div class="q-pa-lg rounded-full bg-blue-300 bg-opacity-70">
      <q-pagination v-model="page" color="black" :max="pageNum" :max-pages="8" boundary-numbers></q-pagination>
      <div class="row inline">
        <n-input-number v-model:value="inputPageValue" clearable /> <q-btn @click="handleChangePage" color="black"
          label="Go" /> <q-btn @click="handleLoadMore()" color="black" icon="mdi-autorenew" />
      </div>
    </div>
  </q-page-sticky>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { NInputNumber } from 'naive-ui'
import { onMounted, onUnmounted, reactive, ref, computed, watch } from 'vue'
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
// 重新处理
// import type { ViewCard } from './waterfall'
import 'vue-waterfall-plugin-next/dist/style.css'

import { useSettingStore } from 'stores/viewerSet-store';
const setStore = useSettingStore()

const props = defineProps({
  imgs: {
    type: Array,
    default(rawProps) {
      return []
    }
  }
})
const inputPageValue = ref(1)

// const list = computed(() => {

// })


// import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
// import 'vue-waterfall-plugin-next/dist/style.css'
// import { getList } from '../api'
import loading from 'assets/loading.png'
import error from 'assets/error.png'

async function getList({ page, pageSize }) {
  return props.imgs?.slice((page - 1) * pageSize, page * pageSize)
  // .map((element) => {
  //   // 对每个元素进行处理?
  //   return {
  //     src: element,
  //     id: element
  //   }
  // });
}

const page = ref(1)
watch(page, (newVal, oldVal) => {
  handleLoadMore()
  if (inputPageValue.value != page.value) inputPageValue.value = page.value
  if (1) scrollToTop()//滚动到顶部
  console.log('myVariable changed:', newVal);
});
const pageNum = computed(() => {
  return Math.ceil(props.imgs.length / setStore.perPageNum)
  // return 10
})
const list = ref<any>([])

function handleChangePage() {
  console.log(setStore.vNavbar)
  page.value = inputPageValue.value
  // handleLoadMore()
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 使用平滑滚动
  });
}

// 加载更多
function handleLoadMore() {
  getList({
    page: page.value,
    pageSize: setStore.perPageNum,
  }).then((res) => {
    list.value = res
  })
}

// 首次加载
onMounted(() => {
  handleLoadMore()
  if (!lightbox) {
    lightbox = new PhotoSwipeLightbox({
      gallery: '#pic-wrapper',
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();
  }
})

onUnmounted(() => {
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
})

const options = reactive({
  // 唯一key值
  rowKey: 'id',
  // 卡片之间的间隙
  gutter: 10,
  // 是否有周围的gutter
  hasAroundGutter: true,
  // 卡片在PC上的宽度
  width: 320,
  // 自定义行显示个数，主要用于对移动端的适配
  breakpoints: {
    1400: {
      rowPerView: 5,
    },
    1200: {
      // 当屏幕宽度小于等于1200
      rowPerView: 4,
    },
    800: {
      // 当屏幕宽度小于等于800
      rowPerView: 3,
    },
    500: {
      // 当屏幕宽度小于等于500
      rowPerView: 2,
    },
  },
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
})


import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
let lightbox: any


// import 'viewerjs/dist/viewer.css'
// import { directive as viewer } from 'v-viewer'
// const vViewer = viewer({
//   debug: true,
// })

// let viewerConfig = reactive({
//   navbar: 0,
//   toolbar: {
//     zoomIn: 3,
//     zoomOut: 3,
//     oneToOne: 2,
//     reset: 2,
//     prev: 2,
//     play: {
//       show: 2,
//       size: 'large'
//     },
//     next: 2,
//     rotateLeft: 2,
//     rotateRight: 2,
//     flipHorizontal: 2,
//     flipVertical: 2,

//     info: function () {
//       // console.log('info');
//       alert('以后再做的文件详细信息展示');
//       console.log(error)
//     }
//   }
// })

function imageLoad(url: string) {
  console.log(`${url}: 加载完成`)
  // console.log('update gallery.' + cntt++);
  // gallery = new Viewer(<HTMLElement>document.getElementById('pic-wrapper'), viewerConfig);
  // console.log(gallery);
}

function imageError(url: string) {
  console.error(`${url}: 加载失败`)
}

function imageSuccess(url: string) {
  console.log(`${url}: 加载成功`)
}
</script>

<style>
.viewer-info {
  color: #fff;
  font-family: "Font Awesome 6 Pro";
  font-size: 0.75rem;
  line-height: 1.5rem;
  text-align: center;
}

.viewer-info::before {
  content: "\f129";
}

/* .page-b-content {
  padding: 20px;
  background-color: #ffffff;
}

.page-menus {
  position: fixed;
  left: 20px;
  bottom: 20px;
}

.page-menus__item {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #e7e7e7;
  background-color: #ffffff;
  margin-bottom: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #ffffff;
}

.page-menus__item.active {
  background-color: #e75932;
  color: #ffffff;
} */
</style>
