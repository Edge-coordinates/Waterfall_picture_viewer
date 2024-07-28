- 不要把分页移出去，把查看器移出去，然后把现在的 Wviewer 放到 Layout 里面？
- 把 setting 也放到 Layout 里面

## 任务

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
