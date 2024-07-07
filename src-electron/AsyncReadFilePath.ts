import fs from 'fs-extra'
import path from 'path'
import imageSize from 'image-size'
import { promisify } from 'util'
import type { WImage } from './traverseFolder'
import { mainWindow } from './electron-main'

const sizeOf = promisify(imageSize)

export default class AsyncReadFilePath {
  picLinks = [] as WImage[]
  /** 有效的图片格式 */
  picFormats = [] as string[]
  /** 任务名称 */
  taskName
  /** 每页分割的大小 */
  pageSize = 20

  constructor(taskName: string, picFormats: string[], pageSize: number) {
    this.taskName = taskName
    this.picFormats = picFormats
    this.pageSize = pageSize || 20
  }

  async readDirectory(dir: string) {
    const stack = [dir]
    const pageStack = [] as WImage[]

    while (stack.length) {
      // 深度优先
      const currentPath = stack.pop()
      if (!currentPath) {
        continue
      }
      const files = await fs.readdir(currentPath, { withFileTypes: true })
      files.sort((a, b) => b.name.localeCompare(a.name, undefined, { sensitivity: 'base' }))

      const result = [] as WImage[]
      for (const file of files) {
        const fullPath = path.join(currentPath, file.name)
        if (file.isDirectory()) {
          stack.push(fullPath)
        } else if (file.isFile()) {
          const extname = path.extname(fullPath).toLowerCase()
          if (this.picFormats.includes(extname)) {
            await sizeOf(fullPath).then(dimensions => {
              result.push({
                source: fullPath,
                src: 'atom://' + fullPath,
                srcThumb: 'atom://' + fullPath,
                width: dimensions?.width,
                height: dimensions?.height,
              })

            }).catch(err => {
              console.log('sizeOf error', err)
            })
          }
        }
      }
      pageStack.push(...result.reverse())
      if (pageStack.length >= this.pageSize) {
        this.picLinks.push(...pageStack.splice(0, this.pageSize))
        this.taskReport()
      }
    }

    if (pageStack.length) {
      this.picLinks.push(...pageStack.splice(0, pageStack.length - 1))
      this.taskReport()
    }

  }

  taskReport() {
    if (mainWindow && this.picLinks.length) {
      mainWindow.webContents.send('async:imageLinks-append', this.taskName, this.picLinks)
    }
  }
}