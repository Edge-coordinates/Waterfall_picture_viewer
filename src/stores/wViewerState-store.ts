import { defineStore } from 'pinia';
import type { WImage } from 'app/src-electron/traverseFolder';

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
