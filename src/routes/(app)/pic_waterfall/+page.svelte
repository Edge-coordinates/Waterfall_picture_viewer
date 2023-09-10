<script lang="ts">
  import {onMount} from 'svelte';
  import Masonry from '/@/components/Masonry.svelte';
  import Viewer from 'viewerjs';
  import {imageRetrieval} from './traverseFolder';
  let rootPath = '';
  let allitems: any[] = [],
    items: any[] = []; // 实现分页
  let itemNum = 150,
    page = 0,
    pagenum = 0;
  let refreshLayout;
  function refreshpic() {
    const gallery = new Viewer(<HTMLElement>document.getElementById('pic-wrapper'));
  }
  onMount(() => {
    initData();
    // items = imageRetrieval(rootPath);
    // console.log('vvvvsvv');
    window.addEventListener('dragover', event => {
      event.preventDefault();
      // console.log(event);
    });
    window.addEventListener('drop', event => {
      event.preventDefault(); // 阻止浏览器默认行为
      let files = event.dataTransfer?.files;
      if (files && files.length > 0) {
        // console.log('已拖放文件夹:', files[0].path); // 文件夹路径
        rootPath = files[0].path;
        allitems = imageRetrieval(rootPath);
        // ---------------- 初始化数据
        pagenum = Math.ceil(allitems.length / itemNum);
        items = allitems.slice(page * itemNum, (page + 1) * itemNum);
        // console.log(items);
      }
    });
  });

  function handleClickres(event) {
    window.location.reload();
  }
  function initData() {
    allitems.length = 0;
    items.length = 0;
    rootPath = '';
    refreshLayout = null;
  }

  function updateItems() {
    scrollTo(0, 0);
    // items.length = 0
    items = allitems.slice(page * itemNum, (page + 1) * itemNum);
  }

  function handleClickPage(event) {
    const buttonText = event.target.textContent; // 获取按钮元素的文本内容
    page = Number(buttonText) - 1;
    updateItems();
    console.log(buttonText);
  }

  function prePage() {
    if (page > 0) page -= 1;
    updateItems();
  }
  function nextPage() {
    if (page < pagenum - 1) page += 1;
    updateItems();
  }
  function handleKeyPress(event) {
    if (event.key === 'ArrowLeft') {
      // 左箭头键被按下
      const element = document.querySelector('.viewer-in');
      if (!element) {
        console.log('dddd')
        prePage();
      }
      console.log(element);
      console.log('左箭头键被按下');
    } else if (event.key === 'ArrowRight') {
      // 右箭头键被按下
      const element = document.querySelector('.viewer-in');
      if (!element) {
        nextPage();
      }
      console.log('右箭头键被按下');
    }
  }
</script>

<svelte:document on:keyup={handleKeyPress} />

<div
  class="pic-wrapper"
  id="pic-wrapper"
>
  {#if rootPath}
    <Masonry
      colWidth="minmax(Min(16em, 100%), 1fr)"
      {items}
      bind:refreshLayout
    >
      {#each items as item}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <img
          id={item}
          class="rounded shadow"
          src={item}
          on:load={refreshLayout}
          on:load={refreshpic}
        />
      {/each}
    </Masonry>
    <!-- 分页 -->
    <div class="join flex justify-center">
      <button
        class="join-item btn btn-md"
        on:click={prePage}>«</button
      >
      {#each Array.from({length: page}, (_, i) => i + 1) as number (number)}
        <button
          class="join-item btn btn-md"
          on:click={handleClickPage}>{number}</button
        >
      {/each}
      <button class="join-item btn btn-md btn-active">{page + 1}</button>
      {#each Array.from({length: pagenum - page - 1}, (_, i) => i + page + 2) as number (number)}
        <button
          class="join-item btn btn-md"
          on:click={handleClickPage}>{number}</button
        >
      {/each}
      <button
        class="join-item btn btn-md"
        on:click={nextPage}>»</button
      >
    </div>
  {:else}
    <h2 class="text-xl font-bold text-center">将文件夹拖放到窗口以开始</h2>
  {/if}
</div>

<div
  class="fixed-element tooltip"
  data-tip="重新加载"
>
  <button
    class="btn btn-square"
    on:click={handleClickres}
  >
    <i class="gg-edit-unmask" />
  </button>
</div>

<style>
  .pic-wrapper {
    margin-top: 90px;
    margin-left: 2.5%;
    margin-right: 2.5%;
  }
  .fixed-element {
    position: fixed; /* 使用固定定位 */
    bottom: 10px; /* 距离窗口底部的距离为0 */
    right: 10px; /* 距离窗口右侧的距离为0 */
    /* background-color: lightblue;
    padding: 10px; */
  }
</style>
