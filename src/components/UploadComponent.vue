<script>
export default {
  data() {
    return {
      files: [],
      dropzoneActive: false
    }
  },
  methods: {
    /**
          * 处理拖拽区域的拖入事件
          * @param {Event} event - 拖入事件对象
          */
    dragEnter(event) {
      event.preventDefault();
      this.dropzoneActive = true;
    },
    /**
     * 处理拖拽区域的拖离事件
     * @param {Event} event - 拖离事件对象
     */
    dragLeave(event) {
      event.preventDefault();
      this.dropzoneActive = false;
    },
    /**
     * 处理拖拽区域的拖放事件
     * @param {Event} event - 拖放事件对象
     */
    dragOver(event) {
      event.preventDefault();
    },
    /**
     * 处理文件的拖放上传
     * @param {Event} event - 拖放事件对象
     */
    dropFile(event) {
      event.preventDefault();
      this.dropzoneActive = false;
      const files = event.dataTransfer.files;
      this.handleFiles(files);
      console.log(files);
    },
    /**
     * 处理选择文件按钮的上传事件
     * @param {Event} event - 选择文件事件对象
     */
    selectFile(event) {
      const files = event.target.files;
      this.handleFiles(files);
      console.log(files);
    },
    /**
     * 处理上传的文件列表
     * @param {FileList} files - 文件列表
     */
    handleFiles(files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.files.push(file);
        // 在这里可以执行文件上传的相关操作

      }
    },
    /**
     * 下载文件
     * @param {File} file - 文件对象
     */
    downloadFile(file) {
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      link.click();
      URL.revokeObjectURL(url);
    }
  }
}

</script>
<template>
  <div id="app">
    <div id="dropzone" @click="" @dragenter="dragEnter" @dragleave="dragLeave" @dragover="dragOver" @drop="dropFile">
      将文件拖放到此处
    </div>
    <!-- <input type="file" @change="selectFile" /> -->
    <div v-for="file in files" :key="file.name">
      文件名：{{ file.name }}，大小：{{ file.size }}字节
      <button @click="downloadFile(file)">下载</button>
    </div>
  </div>
</template>


<style>
#dropzone {
  width: 300px;
  height: 200px;
  border: 2px dashed #ccc;
  text-align: center;
  line-height: 200px;
  font-size: 20px;
  color: #999;
}
</style>
