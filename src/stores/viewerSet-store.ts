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
