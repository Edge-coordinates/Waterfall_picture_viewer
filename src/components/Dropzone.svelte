<script>
// @ts-nocheck

  let selectedFiles = [];
  let webkitdirectory, directory
  function handleFileSelect(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      selectedFiles.push(files[i].name);
    }
  }

  function handleFileInputChange(event) {
    console.log('ddd')
    const files = event.target.files;
    // console.log(event)
    for (let i = 0; i < files.length; i++) {
      selectedFiles.push(files[i].name);
    }
  }
</script>

<div
  class="drop-zone"
  on:drop={handleFileSelect}
  on:dragover={event => event.preventDefault()}
  style="position: relative;"
>
 <div id="modify-text">
    上传文件
 </div>
  <input
    id="file-input"
    type="file"
    webkitdirectory directory
    on:change={handleFileInputChange}
  />
</div>
<ul>
  {#each selectedFiles as file}
    <li>{file}</li>
  {/each}
</ul>

<style>
  .drop-zone {
    width: 100%;
    height: 100px;
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
  }
  #file-input {
    width: 100%; /* 子元素的宽度占满父元素 */
    height: 100%; /* 子元素的高度占满父元素 */
    overflow: hidden;
    cursor: pointer;
    opacity: 0;
  }
  #modify-text {
    width: 100px;
    height: 100px;
    /* background-color: lightcoral; */
    position: absolute; /* 子元素绝对定位 */
    top: 50%; /* 上边界位于父元素中垂线的50%位置 */
    left: 50%; /* 左边界位于父元素中横线的50%位置 */
    transform: translate(-50%, -50%); /* 使用transform平移子元素的中心点到父元素的中心点 */
  }
</style>
