<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Masonry from '/@/components/Masonry.svelte';
	import Viewer from 'viewerjs';
	import { imageRetrieval } from './traverseFolder';
	import {sha256sum, isPathDirectory} from '#preload'

	import { item_num, viewer_navbar } from '/@/store/stores';

	let rootPath: any = null;
	let allitems: any[] = [],
		items: any[] = []; // 实现分页
	let itemNum = 150,
		page = 0,
		pagenum = 0,
		isNavbar;
	let refreshLayout;
	let cntt = 0;
	function refreshpic(event) {
		console.log('update gallery.' + cntt++);
		const gallery: any = new Viewer(<HTMLElement>document.getElementById('pic-wrapper'), {
			navbar: isNavbar,
			toolbar: {
				zoomIn: 3,
				zoomOut: 3,
				oneToOne: 2,
				reset: 2,
				prev: 2,
				play: {
					show: 2,
					size: 'large'
				},
				next: 2,
				rotateLeft: 2,
				rotateRight: 2,
				flipHorizontal: 2,
				flipVertical: 2,

				info: function () {
					// console.log('info');
					alert('以后再做的文件详细信息展示');
				}
			}
		});
		console.log(gallery);
	}

	function initData() {
		allitems.length = 0;
		items.length = 0;
		rootPath = null;
		refreshLayout = null;
		const gallery = null;
		(page = 0), (pagenum = 0);
		// console.log(allitems, items, rootPath, refreshLayout);
	}

	const unsubscribe_itemNum = item_num.subscribe((value) => {
		itemNum = value;
	});
	const unsubscribe_viewer_navbar = viewer_navbar.subscribe((value) => {
		if (value) isNavbar = 1;
		else isNavbar = 0;
	});

	onMount(() => {
		// items = imageRetrieval(rootPath);
		// console.log('Mount');
		// console.log(rootPath);
		window.addEventListener('dragover', (event) => {
			event.preventDefault();
			// console.log(event);
		});
		window.addEventListener('drop', (event) => {
			event.preventDefault(); // 阻止浏览器默认行为
			if (!rootPath) {
				initData();
				let files: any = event.dataTransfer?.files;
				if (files && files.length > 0) {
					// console.log('已拖放文件夹:', files[0].path); // 文件夹路径
					rootPath = files[0].path;
					allitems = imageRetrieval(rootPath);
					console.log(isPathDirectory(rootPath))
					// ---------------- 初始化数据
					pagenum = Math.ceil(allitems.length / itemNum);
					items = allitems.slice(page * itemNum, (page + 1) * itemNum);
					// console.log(allitems, items, rootPath, refreshLayout);
				}
			}
		});
	});

	onDestroy(() => {
		unsubscribe_itemNum();
		unsubscribe_viewer_navbar();
	});

	function handleClickres(event) {
		// window.location.reload();
		initData();
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
				console.log('dddd');
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

<div class="wrapper">
	{#if rootPath}
		<div class="pic-wrapper" id="pic-wrapper">
			<Masonry colWidth="minmax(Min(16em, 100%), 1fr)" {items} bind:refreshLayout>
				{#each items as item}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-missing-attribute -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<img
						id={item}
						class="rounded shadow"
						src={item}
						on:load={refreshLayout}
						on:load={refreshpic}
					/>
				{/each}
			</Masonry>
		</div>
		<!-- 分页 -->
		<div class="join flex justify-center">
			<button class="join-item btn btn-md" on:click={prePage}>«</button>
			{#each Array.from({ length: page }, (_, i) => i + 1) as number (number)}
				<button class="join-item btn btn-md" on:click={handleClickPage}>{number}</button>
			{/each}
			<button class="join-item btn btn-md btn-active">{page + 1}</button>
			{#each Array.from({ length: pagenum - page - 1 }, (_, i) => i + page + 2) as number (number)}
				<button class="join-item btn btn-md" on:click={handleClickPage}>{number}</button>
			{/each}
			<button class="join-item btn btn-md" on:click={nextPage}>»</button>
		</div>
	{:else}
		<h2 class="text-xl font-bold text-center">将文件夹拖放到窗口以开始</h2>
	{/if}
</div>

<div class="fixed-element tooltip" data-tip="重新加载">
	<button class="btn btn-square" on:click={handleClickres}>
		<i class="gg-edit-unmask" />
	</button>
</div>

<style>
	.wrapper {
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
