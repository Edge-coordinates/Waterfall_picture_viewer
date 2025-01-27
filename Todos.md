- [Part1](#part1)
  - [缩略图](#缩略图)
  - [当前版本记事](#当前版本记事)
  - [Bugs](#bugs)
- [规范化](#规范化)
- [自定义灯箱](#自定义灯箱)
- [TODO](#todo)
- [Note](#note)
- [布局](#布局)

## Part1
### 缩略图
支援缩略图目录，及同级目录下有 thumbnails 文件夹都支援（及读取图片的时候判断一下同级目录下是否有 thumbnails 文件夹 或者 根目录下 有无 thumbnails 及 thumbnails文件夹内是否有该图片的缩略图）
该结构受 Steam 支持？

### 当前版本记事
- Fix 文件读取少读的Bug
-

### Bugs
- [ ] 直接记录时当文件夹中文件个数小于pagenumber时，会发生读少的情况
- [ ] 长文件名（中间有空格和-的文件名）展示错误："kieed23232 - 1829852267304140916 - Copy (2).gif"
- [ ]  当重载新的文件夹，应当放弃对旧文件夹的读取，防止旧文件夹非常大，浪费过多的时间去读


## 规范化
- 规范后端交互接口，可以让不同的前端给出不同的收集要求，比如photoswipe需要大小，viewerjs不需要。


- https://github.com/dimsemenov/photoswipe-video-plugin
我仍然想知道，是否自己重写灯箱，或者利用好现有灯箱

还是自己重写灯箱更好一点，不好不好，重写灯箱要自己处理手势之类的东西，太烦人了，想办法解决Video封面图以及大小

将所有逻辑独立出来，toolbox, 比如图片删除逻辑，应该是公用的才对

还是研究 Photoswipe 的 API 以及插件的运作方式吧。。。

## 自定义灯箱
新解决方案，用 bigger-picture 重构，目前唯一问题就是 视频尺寸

https://codesandbox.io/p/sandbox/bigger-picture-video-hua-lang-forked-8gdtlj

通过
https://photoswipe.com/data-sources/#custom-html-markup
实现动态的获取图片/视频的尺寸


灯箱设计：
- Core： 当灯箱打开后，我们要有一个指向当前ID的指针
这在删除的时候会出现问题，设计滞后

我们有一个图片列表

图片查看器使用 bigger-picture（X），我需要一个不带灯箱的图片查看器，要不就是


- 不要把分页移出去，把查看器移出去，然后把现在的 Wviewer 放到 Layout 里面？
- 把 setting 也放到 Layout 里面

## TODO
- [ ] 更改软件名称为 WViewer
- [ ] 滚动到页面底部自动识别继续滚动的话加载下一页，包括动画效果
- [ ] 已经加载了文件夹的前提下，能不能再直接拖动别的文件夹进软件边框范围内重新加载新的文件夹
- [ ] 添加到右键目录菜单
- [ ] 找一个本地数据库调试工具
- [ ] 浏览器开发者插件: https://devtools.vuejs.org/guide/standalone
- [ ] 打包大小分析
- [ ] 瀑布流：默认开启的定位图片支持
- [ ] 瀑布流：滚动持续加载支持
- [ ] This PIC is not good, use ThisPicIndex instead

- 优化文件夹获取算法

- [ ] 添加视频格式支持！  （怎样获取大小数据呢？）
通过 https://www.npmjs.com/package/file-type 判断文件类型，通过 前端方案，动态载入（瀑布流变动？） 大小数据。

- 如果上述方案不可行，用户可选择 图片查看器引擎，从而支持图片+视频查看。
viewer.js v-viewer。 https://videojs.com/city 不好？

bigger-picture: https://github.com/henrygd/bigger-picture
```
// open (will be a child of the target element above)
bp.open({
  items: document.querySelectorAll('#images a'),
})
```
选择器使用 ID + Class
所以支持视频， a 标签 或者 <video> 标签《？《  （测试别的标签是否可行）
这些都是参考的库。

#任务列表
- [ ] LazyLoad: https://github.com/hilongjw/vue-lazyload
- [ ] 增加分页处加载动画
- [ ] 增加图片准备 转圈效果（没啥意义）

多语言尝试 i18n

支援 图片压缩，缩略图（同样采用async 策略）
支持策略设置，Async 缩略图，就是 缩略图优先加载，没有就算《

重新设计 主页，支持最近打开图库（当然可以开/关）

支持记忆阅读到的内容 （分页* 每页个数）

目前的规划《


https://github.com/lokesh/lightbox2


## Note
窗口名称 依据 package.json productName

## 布局
├── components/          # 通用组件
│   ├── auth/
│   │   ├── Login.vue
│   │   └── Register.vue
│   ├── dashboard/
│   │   ├── Overview.vue
│   │   └── Stats.vue
│   ├── settings/
|   |   ├── 查看器.vue
│   │   ├── 瀑布流.vue
│   │   └── 瀑布流分页.vue
│   └── shared/
│       ├── Header.vue
│       └── Footer.vue
├── directives/          # 自定义指令
│   └── click-outside.js
├── layouts/             # 页面布局组件
│   ├── DefaultLayout.vue
│   └── AuthLayout.vue
