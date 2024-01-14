import { defineStore } from 'pinia';

export const useSettingStore = defineStore('setting', {
  state: () => ({
    isOpen: false,
    perPageNum: 20,
    imageFormat: ['.png', '.jpg'],
    vNavbar: 1,
    hello: '草泥马'
  }),
  getters: {
    // doubleCount: state => state.counter * 2
  },
  actions: {
    increment () {
      // this.counter++;
    }
  }
});
