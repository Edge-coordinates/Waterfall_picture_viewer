/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import remote from '@electron/remote'
import fs from 'fs-extra';
import * as path from 'path';
import AsyncReadFilePath from './AsyncReadFilePath';

// import { promisify } from 'util';
import sizeOf from 'image-size';

// 指定要遍历的根路径
// const rootPath = 'D:\\Picture\\五维介质';

// 存储图片文件链接的数组
// 数据结构更改：使用对象数组，同时使用 map 维护数组下标，异步获取图片大小和其他参数。
let imageLinks: any[] = [];

let picLinks: WImage[];
const picMetaMap = new Map();
let picFormats: any[] = [
  '.webp',
  '.jxl',
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.bmp',
  '.jfif'
];
let videoFormats: any[] = [
  '.mp4',
  '.webm',
]

export interface WImage {
  source: string;
  src: string|any;
  srcThumb: string;
  width?: number;
  height?: number;
  isVideo?: boolean;
  originalSrc?: string;
}

function isPathDirectory (thepath: string) {
  const thefile = fs.statSync(thepath);
  return thefile.isDirectory();
}

export function imageRetrieval (thepath, pFormats) {
  if (pFormats) picFormats = pFormats;
  // console.log(pFormats, picFormats);
  // 清空
  imageLinks = [];
  picLinks = [];
  traverseFolderObjects(thepath);
  console.log('Finish traverseFolderObjects!');
  return picLinks;
}

// ANCHOR Async Entry
// * Main Entry
export function imageRetrievalAsync(thepath: String | Array<any>, pFormats, vFormats, pageSize, sortMethod) {
  if (pFormats) picFormats = pFormats;
  if (vFormats) videoFormats = vFormats;
  const taskName = Array.isArray(thepath) ? thepath[0] : thepath;
  const asyncReadFilePath = new AsyncReadFilePath(taskName, picFormats, videoFormats, pageSize, sortMethod);
  asyncReadFilePath.readDirectory(thepath)
}


function generateRamStr(len, charSet?: string) {
  const chars = charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomStr = "";
  for (var i = 0; i < len; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return randomStr;
}



// // 开始遍历
// traverseFolder(rootPath);

// // 打印图片链接列表
// console.log(imageLinks);

// 递归遍历文件夹
export function traverseFolder (currentPath) {
  const files = fs.readdirSync(currentPath);
  // console.log(files);
  files.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  for (const file of files) {
    const filePath = path.join(currentPath, file);
    // const thefile = fs.statSync(filePath);
    // console.log(sha256sum(filePath))
    if (isPathDirectory(filePath)) {
      // 如果是文件夹，递归遍历
      traverseFolder(filePath);
    } else {
      // 如果是文件，检查文件扩展名是否是图片格式
      const extname = path.extname(filePath).toLowerCase();
      if (picFormats.includes(extname)) {
        // 如果是图片文件，将其链接添加到数组中
        // const relativePath = path.relative(rootPath, filePath);
        imageLinks.push('atom://' + filePath);
      }
    }
  }
}

function traverseFolderObjects (currentPath) {
  const files = fs.readdirSync(currentPath);
  // console.log(files);
  files.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  for (const file of files) {
    const filePath = path.join(currentPath, file);
    // const thefile = fs.statSync(filePath);
    // console.log(sha256sum(filePath))
    if (isPathDirectory(filePath)) {
      // 如果是文件夹，递归遍历
      traverseFolderObjects(filePath);
    } else {
      // 如果是文件，检查文件扩展名是否是图片格式
      const extname = path.extname(filePath).toLowerCase();
      if (picFormats.includes(extname)) {
        // 如果是图片文件，将其链接添加到数组中
        // const relativePath = path.relative(rootPath, filePath);
        picLinks.push({
          source: filePath,
          src: 'atom://' + filePath,
          srcThumb: 'atom://' + filePath
        });
        picMetaMap.set(filePath, picLinks.length - 1);
        try{
          const dimensions = sizeOf(filePath);
          picLinks[picMetaMap.get(filePath)].height = dimensions.height;
          picLinks[picMetaMap.get(filePath)].width = dimensions.width;
        }catch (err) {}
        // console.log(picLinks[picMetaMap.get(filePath)]);

        // 异步方案，有问题
        // sizeOf(filePath)
        //   .then(dimensions => {
        //     console.log(dimensions.width, dimensions.height);
        //     console.log(filePath);
        //     picLinks[picMetaMap.get(filePath)].height = dimensions.height;
        //     picLinks[picMetaMap.get(filePath)].width = dimensions.width;
        //     console.log(picLinks[picMetaMap.get(filePath)]);
        //   })
        //   .catch(err => console.error(err));
      }
    }
  }
}
