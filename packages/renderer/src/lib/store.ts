/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
class MyStore {
	setStoreValue(key, value) {
		// 使用 ipcRenderer 发送设置数据的消息给主进程
		window.electron.ipcRenderer.setStoreValue(key, value);
	}
  
	getStoreValue(key) {
		window.electron.ipcRenderer.getStoreValue(key); 
	}
  }

export const myStore = new MyStore();