<template>
  <div>
    <div class="hvr-grow-shadow rounded-lg w-full flex flex-col" @click="selectFolders" @dragenter="dragEnter" @dragleave="dragLeave" @dragover="dragOver" @drop="dropFile">
        <div class="text-center text-6xl">
          <q-icon name="mdi-upload"></q-icon>
        </div>
        <div class="text-center text-2xl">点击或者拖动文件夹到该区域来打开</div>
        <div class="text-center text-xl" style="color: #999;">支持多选</div>
    </div>
    <!-- <input type="file" @change="selectFile" /> -->
    <!-- <div v-for="file in files" :key="file">
      {{ file }}
    </div> -->
  </div>
</template>


<script>
export default {
  data() {
    return {
      dropzoneActive: false
    }
  },
  props: {
    onUpload: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    async selectFolders(event) {
      const files = await window.myToolAPI.selectFolders()
      console.log('selectFolders', files);
      if (files.length === 0) {
        return;
      }
      this.onUpload(files);
    },
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
      console.log('dropFile', files);
      this.handleFiles(files);
    },
    /**
     * 处理上传的文件列表
     * @param {FileList} files - 文件列表
     */
    handleFiles(files) {
      let finalFiles = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i].path;
        finalFiles.push(file);
        // 在这里可以执行文件上传的相关操作

      }
      console.log('UploadComponent: handleFiles');
      if (files.length === 0) {
        return;
      }
      this.onUpload(finalFiles);
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

<style>
.dropzone-content {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
/* Grow-Shadow */
.hvr-grow-shadow {
  border: 1px dashed #ccc;
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
}
.hvr-grow-shadow:hover, .hvr-grow-shadow:focus, .hvr-grow-shadow:active {
  border: 2px dashed #93c5fd;
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.01);
  transform: scale(1.01);
}
</style>
