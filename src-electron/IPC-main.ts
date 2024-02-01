import { ipcMain, shell } from 'electron';
import Store from 'electron-store';
import { schema } from './default-data';

let store = new Store();
// 重构判断是否为空并

import { imageRetrieval } from './traverseFolder';

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

  ipcMain.handle('tool-openLink', (event, link) => {
    console.log(link);
    return shell.openExternal(link);
  });
}
