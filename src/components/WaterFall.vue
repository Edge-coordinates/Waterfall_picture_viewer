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
            :key="url"
            :href="url"
            :data-pswp-width="item.width"
            :data-pswp-height="item.height"
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
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { NInputNumber } from 'naive-ui';
import { onMounted, onUnmounted, reactive, ref, computed, watch } from 'vue';
import { Waterfall, LazyImg } from 'vue-waterfall-plugin-next';
// import WPagination from './WPagination.vue'
// 重新处理
// import type { ViewCard } from './waterfall'
import 'vue-waterfall-plugin-next/dist/style.css';

import { useSettingStore } from 'stores/viewerSet-store';
const setStore = useSettingStore();
import { useWViewerStateStore } from 'stores/wViewerState-store';
const wViewerStateStore = useWViewerStateStore();

const props = defineProps({
  imgs: {
    type: Array<any>,
    default(rawProps) {
      return [];
    },
  },
});
// import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
// import 'vue-waterfall-plugin-next/dist/style.css'
// import { getList } from '../api'
import loading from 'assets/loading.png';
import error from 'assets/error.png';

// ANCHOR 查看器初始化
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
let lightbox: any, thisPic: string;
let isLightboxOpen = ref(false);

function handleViewerKeyDown(event) {
  // * 查看器内部 检查是否按下了特定的键，例如 Ctrl + S
  if (event.key === 'Delete') {
    event.preventDefault(); // 阻止默认行为（例如保存网页）
    console.log('pressed Delete.');
    // let pswpImgSrc: any = document.querySelector('img.pswp__img')
    // pswpImgSrc = <string>pswpImgSrc!.getAttribute('src').replace(/atom:\/\//g, '')
    // pswpImgSrc = decodeURIComponent(pswpImgSrc)
    let pswpImgSrc = decodeURIComponent(thisPic).replace(/atom:\/\//g, '');
    console.log(pswpImgSrc);
    if (confirm('确定要删除图片嘛？')) {
      window.myToolAPI.delPic(pswpImgSrc);
      // console.log(getFolder(pswpImgSrc, /atom:\/\//g))
      // 在瀑布流中删除图片！！
      const indexToDelete = wViewerStateStore.imgs.findIndex(
        (img: any) => img.source === pswpImgSrc,
      );
      if (indexToDelete !== -1) {
        wViewerStateStore.imgs.splice(indexToDelete, 1);
        console.log(`Object with source '${pswpImgSrc}' deleted.`);
        // TODO 图片删除后，查看器不会自动退出，应写方法退出查看器
        // There is no need to call handleLoadMore, because all changes depart HandleLoadMore.
      } else {
        console.log(`Object with source '${pswpImgSrc}' not found.`);
      }
      // handleLoadMore()
    }
  }
  // 可以添加其他条件检查
}

// 首次加载
onMounted(() => {
  if (!lightbox) {
    lightbox = new PhotoSwipeLightbox({
      gallery: '#pic-wrapper',
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.on('uiRegister', function () {
      lightbox.pswp.ui.registerElement({
        name: 'folder-button',
        ariaLabel: 'Open in folder',
        order: 9,
        isButton: true,
        html: '<i class="fa-regular fa-folder-open"></i>',
        onClick: (event, el) => {
          // if (confirm('Do you want to toggle zoom?')) {
          //   lightbox.pswp.toggleZoom();
          // }
          let pswpImgSrc = decodeURIComponent(thisPic).replace(
            /atom:\/\//g,
            '',
          );
          window.myToolAPI.showItemInFolder(pswpImgSrc);
          // alert('回头再做的在文件夹打开。')
        },
      });
      lightbox.pswp.ui.registerElement({
        name: 'open-button',
        ariaLabel: 'Open with default software',
        order: 8,
        isButton: true,
        html: '<i class="fa-duotone fa-images"></i>',
        onClick: (event, el) => {
          // if (confirm('Do you want to toggle zoom?')) {
          //   lightbox.pswp.toggleZoom();
          // }
          let pswpImgSrc = decodeURIComponent(thisPic).replace(
            /atom:\/\//g,
            '',
          );
          window.myToolAPI.openPath(pswpImgSrc);
          // alert('回头再做的在文件夹打开。')
        },
      });
    });

    lightbox.on('contentActivate', ({ content }) => {
      console.log('contentActivate', content.data.src);
      thisPic = content.data.src;
    });

    lightbox.on('openingAnimationStart', () => {
      // 开始监听 查看器内 快捷键
      document.addEventListener('keydown', handleViewerKeyDown);
      isLightboxOpen.value = true;
      wViewerStateStore.ifViewerOpen = true;
      console.log('openingAnimationStart');
    });

    lightbox.on('closingAnimationStart', () => {
      document.removeEventListener('keydown', handleViewerKeyDown);
      isLightboxOpen.value = false;
      wViewerStateStore.ifViewerOpen = false;
      console.log('closingAnimationStart');
    });

    lightbox.init();
  }
});

onUnmounted(() => {
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
});

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
function imageLoad(url: string, event: any) {
  // console.log(`${url}: 加载完成`)
}

function imageError(url: string) {
  console.error(`${url}: 加载失败`);
}

function imageSuccess(url: string) {
  // console.log(`${url}: 加载成功`)
  // let imgs = document.querySelectorAll('.lazy__img')
}
</script>

<style>
.viewer-info {
  color: #fff;
  font-family: 'Font Awesome 6 Pro';
  font-size: 0.75rem;
  line-height: 1.5rem;
  text-align: center;
}

.viewer-info::before {
  content: '\f129';
}

/*
button.pswp__button--folder-button {
  font-size: 20px;
  color: #fff;
}

button.pswp__button--open-button {
  font-size: 20px;
  color: #fff;
}
*/

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
