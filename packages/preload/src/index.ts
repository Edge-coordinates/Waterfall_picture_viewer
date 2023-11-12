/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @module preload
 */

import * as fs from 'fs';
import * as path from 'path';

export {sha256sum} from './nodeCrypto';
export {versions} from './versions';
export {isPathDirectory} from './filetools';
export {tmaindb} from './jsondb';
export {fs, path};

import {contextBridge, ipcRenderer, IpcRendererEvent} from 'electron';

const electronHandler = {
  ipcRenderer: {
    setStoreValue: (key: string, value: any) => {
      ipcRenderer.send('setStore', key, value);
    },

    getStoreValue (key: string) {
      const resp = ipcRenderer.sendSync('getStore', key);
      return resp;
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);
