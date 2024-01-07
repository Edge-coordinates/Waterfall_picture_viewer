// This file should augment the properties of the `Window` with the type of the
// `ContextBridgeApi` from `Electron.contextBridge` declared in `src/preload.ts`.
import type {
  myWindowAPI,
  storeAPI,
  myToolAPI
} from 'app/src-electron/electron-preload';

declare global {
  interface Window {
    myWindowAPI: myWindowAPI;
    storeAPI: storeAPI;
    myToolAPI: myToolAPI;
  }
}
