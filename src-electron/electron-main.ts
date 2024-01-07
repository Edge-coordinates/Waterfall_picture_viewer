import { app, protocol, BrowserWindow } from 'electron';
import { initialize, enable } from '@electron/remote/main';
import path from 'path';
import os from 'os';

initialize();
// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

let mainWindow: BrowserWindow | undefined;

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
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
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  });

  enable(mainWindow.webContents);

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });
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

app.whenReady().then(() => {
  if (mainWindow === undefined) {
    createWindow();
  }
});

app.whenReady().then(() => {
  // 这个需要在app.ready触发之后使用
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substring(7);
    callback(decodeURI(path.normalize(url)));
  });
});

import { ipcMains } from './IPC-main';
app.whenReady().then(ipcMains());

// app.on('ready', () => setTimeout(onAppReady, 100));
