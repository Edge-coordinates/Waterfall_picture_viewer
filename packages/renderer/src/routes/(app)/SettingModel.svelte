<script>
	// @ts-nocheck
	import { item_num, viewer_navbar } from '/@/store/stores';
	let ipc
	import { onMount } from 'svelte';
	onMount(() => {
		ipc = window.electron.ipcRenderer;
		// a = ipcRenderer.getStoreValue('itemNum')
		// item_num.update(a)
		// ipcRenderer.setStoreValue('itemNum', 76);
		// console.log('ddd')
		// a = ipcRenderer.getStoreValue('itemNum');
	});
	function submitFrom(event) {
		console.log($item_num, $viewer_navbar);
		ipc.setStoreValue('itemNum', $item_num);
		if($viewer_navbar) ipc.setStoreValue('viewer_navbar', 1);
		else ipc.setStoreValue('viewer_navbar', 0);
	}
	function closeSetting(event) {
		document.getElementById('my_modal_setting').removeAttribute('open');
		document.getElementById('my_modal_setting').addA('open');
	}
</script>

<div>
	<!-- Open the modal using ID.showModal() method -->
	<dialog id="my_modal_setting" class="modal">
		<div class="modal-box">
			<form method="dialog">
				<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
			</form>

			<h3 class="font-bold text-lg">配置</h3>
			<p class="font-bold label-text">临时使用在输入数据之后直接关闭此Modal即可。保存配置后请自行手动关闭Modal。</p>
			<div class="font-bold py-4">
				<div class="py-2">
					<div class="form-control w-full max-w-xs">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label">
							<span class="label-text">每页图片数目:</span>
						</label>
						<input
							type="number"
							placeholder="输入一个数字"
							class="input input-ghost w-full max-w-xs"
							bind:value={$item_num}
						/>
					</div>

					<div class="form-control w-full max-w-xs">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label">
							<span class="label-text"> 是否打开图片查看器的底部图片集预览:</span>
						</label>
						<input type="checkbox" class="toggle toggle-info" bind:checked={$viewer_navbar} />
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label">
							<span class="label-text-alt">
								<i class="fa-regular fa-triangle-exclamation"></i>
								<span>打开图片集预览可能导致卡顿，此选项变更后需手动点击重新加载按钮以生效。</span></span
							>
						</label>
					</div>
				</div>
				<div style="float:right;">
					<button class="btn btn-neutral" type="submit" on:click={submitFrom}>保存为默认配置</button>
					<!-- <button class="btn btn-neutral" type="reset" on:click={closeSetting}>临时使用</button> -->
				</div>
			</div>
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
</div>
