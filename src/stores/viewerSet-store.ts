import { defineStore } from 'pinia';

/**
 * Defines a Pinia store named 'setting'.
 *
 * This store is used to manage application settings.
 *
 * @constant {StoreDefinition} useSettingStore - The Pinia store definition for settings.
 */
export const useSettingStore = defineStore('setting', {
  state: () => ({
    isOpen: false,
    perPageNum: 20,
    cycleUpdate: false,
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
        // When the screen width is less than or equal to 1200
        rowPerView: 4
      },
      800: {
        // When the screen width is less than or equal to 800
        rowPerView: 3
      },
      500: {
        // When the screen width is less than or equal to 500
        rowPerView: 2
      }
    },
    hello: '草泥马'
  }),
  getters: {
    // doubleCount: state => state.counter * 2
    getPFormat: state => state.imageFormat,
    getPerPageNum: state => state.perPageNum,
  },
  actions: {
    increment () {
      // this.counter++;
    }
  }
});
