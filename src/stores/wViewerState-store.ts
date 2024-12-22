import { defineStore } from 'pinia';
import type { WImage } from 'app/src-electron/traverseFolder';

// TODO Describe the structure of the store's state and the purpose of this store.
/**
 * Defines a Pinia store named 'setting'.
 *
 * This store is used to manage application settings.
 *
 * @constant {StoreDefinition} useSettingStore - The Pinia store definition for settings.
 */
export const useWViewerStateStore = defineStore('wViewerState', {
  state: () => ({
    ifViewerOpen: false,
    imgs: [] as WImage[],
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2,
  // },
  // actions: {
  //   increment() {
  //     this.counter++;
  //   },
  // },
});
