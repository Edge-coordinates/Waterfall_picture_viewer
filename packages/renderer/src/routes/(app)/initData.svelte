<script lang="ts">
	// @ts-nocheck

	/* eslint-disable no-useless-catch */
	/* eslint-disable @typescript-eslint/no-unused-vars */
	/* eslint-disable @typescript-eslint/no-explicit-any */
	import { onMount } from 'svelte';
	import { item_num, viewer_navbar } from '/@/store/stores';

  onMount(async() => {
    let tmp
		let ipc: any = window.electron.ipcRenderer
		tmp = await ipc.getStoreValue('itemNum') as number;
		item_num.set(tmp);
    tmp = await ipc.getStoreValue('viewer_navbar') as number;
    viewer_navbar.set(tmp)
	});
</script>

<div class="initData"></div>
