import fs from 'fs-extra';
import path from 'path';
import imageSize from 'image-size';
import { promisify } from 'util';
import type { WImage } from './traverseFolder';
import { mainWindow } from './electron-main';
import { get } from 'http';

const sizeOf = promisify(imageSize);

export default class AsyncReadFilePath {
  picLinks = [] as WImage[];
  /** 有效的图片格式 */
  picFormats = [] as string[];
  /** 有效的视频格式 */
  videoFormats = [] as string[];
  /** 任务名称 */
  taskName;
  /** 每页分割的大小 */
  pageSize = 20;
  sortMethod = 'name-asc';

  constructor(
    taskName: string,
    picFormats: string[],
    videoFormats: string[],
    pageSize: number,
    sortMethod: string,
  ) {
    this.taskName = taskName;
    this.picFormats = picFormats;
    this.videoFormats = videoFormats;
    this.pageSize = pageSize || 20;
    this.sortMethod = sortMethod || 'name-asc';
  }

  async getSortedFilesByDate(files, currentPath) {
  
    // 获取文件的详细信息
    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(currentPath, file.name);
        const stats = await fs.stat(filePath); // 获取文件的状态信息
        file.mtime = stats.mtime; // 添加时间属性
        // return { name: file.name, isDir: file.isDirectory(), mtime: stats.mtime };
      })
    );
    
    // ! 实际上是逆序的，因为是先进后出，所以要反着排序
    if (this.sortMethod === 'time-asc') {
      // 按修改时间升序排列
      files.sort((a, b) => b.mtime - a.mtime);
    } else if (this.sortMethod === 'time-desc') {
      // 按修改时间降序排列
      files.sort((a, b) => a.mtime - b.mtime);
    }
    // console.log('fileDetails', files);
    return files;
  }

  async readDirectory(dir: String | Array<any>) {
    const stack: any = (() => {
      if (typeof dir === 'string') {
        return [dir]; // use this way to avoid judgment of empty strings
      }
      if (Array.isArray(dir)) {
        // Array
        dir.sort((a, b) =>
          b.localeCompare(a, undefined, { sensitivity: 'base' }),
        );
        return dir;
      }
      return '';
    })();
    const pageStack = [] as WImage[];
    
    while (stack.length >= 1) {
      console.log('stack', stack);
      // prioritize in depth
      const currentPath = stack.pop();
      console.log('stack after pop', stack);
      if (!currentPath) {
        continue;
      }
      let files = await fs.readdir(currentPath, { withFileTypes: true });


      console.log('sortMethod', this.sortMethod);
      // ! 实际上是逆序的，因为是先进后出，所以要反着排序
      if(this.sortMethod == 'name-asc') {
        files.sort((a, b) =>
          b.name.localeCompare(a.name, undefined, { sensitivity: 'base' }),
        );
      } else if(this.sortMethod == 'name-desc') {
        files.sort((a, b) =>
          b.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
        );
      } else if(this.sortMethod == 'time-asc') {
        files = await this.getSortedFilesByDate(files, currentPath);
      } else if(this.sortMethod == 'time-desc') {
        files = await this.getSortedFilesByDate(files, currentPath);
      }
      console.log('files', files);
      const result = [] as WImage[];
      for (const file of files) {
        const fullPath = path.join(currentPath, file.name);
        if (file.isDirectory()) {
          stack.push(fullPath);
        } else if (file.isFile()) {
          const extname = path.extname(fullPath).toLowerCase();
          if (this.picFormats.includes(extname)) {
            await sizeOf(fullPath)
              .then((dimensions) => {
                // console.log('sizeOf', dimensions);
                result.push({
                  source: fullPath,
                  src: 'atom://' + fullPath,
                  srcThumb: 'atom://' + fullPath,
                  width: dimensions?.width,
                  height: dimensions?.height,
                });
              })
              .catch((err) => {
                console.log('sizeOf error', err);
              });
          } else if (this.videoFormats.includes(extname)) {
            // console.log('video', fullPath)
            // [{"src": "example.webm", "type": "video/webm"}]
            // result.push({
            //   isVideo: true,
            //   source: fullPath,
            //   originalSrc: 'atom://' + fullPath,
            //   src: {
            //     src: 'atom://' + fullPath,
            //     type: 'video/' + extname.substring(1),
            //   },
            //   srcThumb: 'atom://' + fullPath,
            //   width: 1920,
            //   height: 1080,
            // });
          }
        }
      }
      pageStack.push(...result.reverse());
      if (pageStack.length >= this.pageSize) {
        this.picLinks.push(...pageStack.splice(0, this.pageSize));
        this.taskReport();
      }
    }

    // console.log('pageStack', pageStack);
    if (pageStack.length) {
      this.picLinks.push(...pageStack.splice(0, pageStack.length));
      this.taskReport();
    }
  }

  taskReport() {
    if (mainWindow && this.picLinks.length) {
      console.log('taskReport', this.picLinks.length);
      mainWindow.webContents.send(
        'async:imageLinks-append',
        this.taskName,
        this.picLinks,
      );
    }
  }
}
