import { defineStore } from 'pinia';

export const useSettingStore = defineStore('setting', {
  state: () => ({
    isOpen: false,
    perPageNum: 20,
    imageFormat: [
      '.webp',
      '.jxl',
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.bmp',
      '.jfif'
    ],
    vNavbar: 1,
    waterfallBreakpoint: {
      1400: {
        rowPerView: 5
      },
      1200: {
        // 当屏幕宽度小于等于1200
        rowPerView: 4
      },
      800: {
        // 当屏幕宽度小于等于800
        rowPerView: 3
      },
      500: {
        // 当屏幕宽度小于等于500
        rowPerView: 2
      }
    },
    hello: '草泥马'
  }),
  getters: {
    // doubleCount: state => state.counter * 2
    getPFormat: state => state.imageFormat
  },
  actions: {
    increment () {
      // this.counter++;
    }
  }
});
