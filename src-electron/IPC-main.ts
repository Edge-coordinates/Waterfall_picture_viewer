import { ipcMain, shell } from 'electron';
import Store from 'electron-store';
import { schema } from './default-data';

const fs = require('fs-extra');
import trash from 'trash';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isFileSync (path) {
  try {
    // 使用 fs.existsSync 检查路径是否存在
    if (fs.existsSync(path)) {
      // 使用 fs.statSync 获取路径的状态
      const stats = fs.statSync(path);
      // 判断是否是文件
      return stats.isFile();
    }
    return false;
  } catch (err) {
    // 处理错误
    console.error('Error checking file synchronously:', err);
    return false;
  }
}

let store = new Store();
// 重构判断是否为空并

import { imageRetrieval, imageRetrievalAsync } from './traverseFolder';

export function data_init () {
  if (!store.get('itemNum')) store = new Store({ schema });
  console.log('pre inited.');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export function ipcMains (value: void): any {
  ipcMain.on('read-file', event => {
    // const fileContent = fs.readFileSync('./file-to-read.txt', { encoding: 'utf-8' })
    const fileContent = 'ddd';
    // Send back an IPC event to the renderer process with the file content.
    event.sender.send('read-file-success', fileContent);
  });

  ipcMain.handle('store-get', (event, key) => {
    // console.log(store.get(key));
    return store.get(key);
  });

  ipcMain.handle('store-set', (event, key, value) => {
    return store.set(key, value);
  });

  ipcMain.handle('store-delete', (event, key) => {
    // console.log(store.get(key));
    store.delete(key);
    return 1;
  });

  ipcMain.handle('tool-traverseFolder', (event, path, pFormats) => {
    console.log(path, pFormats);
    return imageRetrieval(path, pFormats);
  });

  ipcMain.handle('tool-traverseFolder-async', (event, path, pFormats, pPageNum) => {
    return imageRetrievalAsync(path, pFormats, pPageNum);
  });

  ipcMain.handle('tool-openLink', (event, link) => {
    console.log(link);
    return shell.openExternal(link);
  });

  ipcMain.handle('tool-openPath', (event, link) => {
    shell.openPath(link);
  });

  ipcMain.handle('tool-delPic', (event, src) => {
    // fs.removeSync(src);
    if (isFileSync(src)) {
      trash(src);
    }
    console.log('Del: ', src);
  });
}
