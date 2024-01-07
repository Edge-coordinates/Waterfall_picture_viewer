/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 *
 * WARNING!
 * If accessing Node functionality (like importing @electron/remote) then in your
 * electron-main.ts you will need to set the following when you instantiate BrowserWindow:
 *
 * mainWindow = new BrowserWindow({
 *   // ...
 *   webPreferences: {
 *     // ...
 *     sandbox: false // <-- to be able to import @electron/remote in preload script
 *   }
 * }
 */

export type storeAPI = {
  // Declare a `readFile` function that will return a promise. This promise
  // will contain the data of the file read from the main process.
  get: (key: any) => any;
  set: (key: any, value: any) => any;
  initData: () => any;
};

export type myWindowAPI = {
  minimize: () => Promise<any>;
  toggleMaximize: () => Promise<any>;
  close: () => Promise<any>;
};

export type myToolAPI = {
  traverseFolder: (path: string) => any;
};

import { contextBridge, ipcRenderer } from 'electron';
import { BrowserWindow } from '@electron/remote';

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const myToolAPIs: myToolAPI = {
  async traverseFolder (path) {
    return await ipcRenderer.invoke('tool-traverseFolder', path);
  }
};

contextBridge.exposeInMainWorld('myToolAPI', myToolAPIs);

const myStoreAPI: storeAPI = {
  async get (key) {
    return await ipcRenderer.invoke('store-get', key);
  },

  async set (key, value) {
    return await ipcRenderer.invoke('store-set', key, value);
    // store.set(key, value);
  },

  initData () {
    // store = new Store();
    // // 重构判断是否为空并
    // if (!store.get('itemNum')) store.store = schema;
    console.log('data inited');
  }
};

contextBridge.exposeInMainWorld('storeAPI', myStoreAPI);

contextBridge.exposeInMainWorld('myWindowAPI', {
  minimize () {
    BrowserWindow.getFocusedWindow()!.minimize();
  },

  toggleMaximize () {
    const win = BrowserWindow.getFocusedWindow()!;

    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  },

  close () {
    BrowserWindow.getFocusedWindow()!.close();
  }
});
