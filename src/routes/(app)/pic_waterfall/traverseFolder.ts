/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import remote from '@electron/remote'
import {fs, path} from '#preload';
import {sha256sum, isPathDirectory} from '#preload'

// 指定要遍历的根路径
const rootPath = 'D:\\Picture\\五维介质';

// 存储图片文件链接的数组
const imageLinks:any[] = [];

// 递归遍历文件夹
export function traverseFolder(currentPath) {
  const files = fs.readdirSync(currentPath);
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
      if ([".jpg", ".jpeg", ".png", ".gif", ".bmp", ".jfif"].includes(extname)) {
        // 如果是图片文件，将其链接添加到数组中
        // const relativePath = path.relative(rootPath, filePath);
        imageLinks.push('atom://' + filePath);
      }
    }
  }
}

export function imageRetrieval(thepath) {
  traverseFolder(thepath)
  return imageLinks
}
// // 开始遍历
// traverseFolder(rootPath);

// // 打印图片链接列表
// console.log(imageLinks);
