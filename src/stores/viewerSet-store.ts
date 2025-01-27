import { defineStore } from 'pinia';

// TODO Describe the structure of the store's state and the purpose of this store.
/**
 * Defines a Pinia store named 'setting'.
 *
 * This store is used to manage application settings.
 *
 * @constant {StoreDefinition} useSettingStore - The Pinia store definition for settings.
 */
export const useSettingStore = defineStore('setting', {
  state: () => ({
    language: {
      label: '',
      value: '',
    },
    languages: [
      {
        label: 'English',
        value: 'en-US',
      },
      {
        label: '简体中文',
        value: 'zh-CN',
      },
    ],
    isOpen: false,
    perPageNum: 20,
    // cycleUpdate: false,
    cycleUpdate: true,
    viewerName: 'photoswipe',
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
    videoFormat: [
      '.mp4',
      '.webm',
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
    getVFormat: state => state.videoFormat,
    getPerPageNum: state => state.perPageNum,
  },
  actions: {
    increment () {
      // this.counter++;
    }
  }
});

/*
TODO - List of videos waiting to be supported by other methods
'.mkv',
'.flv',
'.avi',
'.mov',
'.wmv',
'.rmvb',
'.rm',
'.asf',
'.mpg',
'.mpeg',
'.m4v',
'.3gp',
'.3g2',
'.f4v',
'.hlv',
'.swf',
'.vob',
'.ts',
*/
