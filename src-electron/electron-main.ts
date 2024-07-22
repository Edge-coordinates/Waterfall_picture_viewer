import { app, protocol, BrowserWindow } from 'electron';
import { initialize, enable } from '@electron/remote/main/index.js';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'node:url';

initialize();
const currentDir = fileURLToPath(new URL('.', import.meta.url));
// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

export let mainWindow: BrowserWindow | undefined;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(currentDir, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    // transparent: true,
    // backgroundColor: '##34eb7d',
    useContentSize: true,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      // nodeIntegration: true,
      sandbox: false,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(
        currentDir,
        path.join(
          process.env.QUASAR_ELECTRON_PRELOAD_FOLDER!,
          'electron-preload' + process.env.QUASAR_ELECTRON_PRELOAD_EXTENSION,
        ),
      ),
    },
  });

  enable(mainWindow.webContents);

  // mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEV) {
    mainWindow.loadURL(process.env.APP_URL);
  } else {
    mainWindow.loadFile('index.html');
  }

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    // mainWindow.webContents.on('devtools-opened', () => {
    //   mainWindow?.webContents.closeDevTools();
    // });
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

import { data_init } from './IPC-main';

app.whenReady().then(() => {
  if (mainWindow === undefined) {
    data_init();
    createWindow();
  }
});

app.whenReady().then(() => {
  // 这个需要在app.ready触发之后使用
  // TODO 新方案：https://stackoverflow.com/questions/77340986/what-to-use-now-that-registerfileprotocol-is-deprecated-in-electron
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substring(7);
    callback(decodeURI(path.normalize(url)));
  });
});

import { ipcMains } from './IPC-main';
app.whenReady().then(ipcMains());

// app.on('ready', () => setTimeout(onAppReady, 100));
