/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {JSONPreset, JSONSyncPreset} from 'lowdb/node';
import {join} from 'path';
import fs from 'fs-extra';

export async function tmaindb () {
  const fsEOptions = {
    mode: 0o2775,
  };
  const fileName = 'main-db.json';
  const appName = 'waterfall_picture_viewer/databases';

  const platform = process.platform;
  let storagePath;

  if (platform === 'win32') {
    // Windows 平台，使用 APPDATA 环境变量
    const appData: any = process.env.APPDATA;
    storagePath = join(appData, appName);
  } else {
    // Unix 平台（包括 macOS 和 Linux），使用 HOME 环境变量
    const homeDir: any = process.env.HOME;
    storagePath = join(homeDir, appName);
  }

  let maindb;
  console.log(storagePath);
  // storagePath = 'E:/Edge/Learning/Learning_web/export01/a/aaa';
  await fs.ensureDir(storagePath, fsEOptions);
  storagePath = join(storagePath, fileName);
  console.log(storagePath);

  // Read or create db.json
  const defaultData = {posts: []};
  return (maindb = await JSONPreset(storagePath, defaultData));
}
