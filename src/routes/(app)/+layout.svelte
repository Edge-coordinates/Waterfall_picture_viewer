<script>
    import ExpandMenu from "./expandMenu.svelte";
</script>

<div class="navbar bg-neutral rounded-lg shadow-lg fixed top-0 left-0 w-full z-50">
    <div class="navbar-start">
        <!-- <a class="btn btn-ghost normal-case text-xl text-base-100" href="/"
            >瀑布流图片查看器</a
        > -->
        <div class="btn btn-ghost normal-case text-xl text-base-100">瀑布流图片查看器</div>
    </div>
    <div class="navbar-center">
        <ul class="menu menu-vertical lg:menu-horizontal text-base-100">
            <li><a class="link link-hover" href="/">首页</a></li>
            <li><a class="link link-hover" href="/pic_waterfall">图片查看器</a></li>
          </ul>
    </div>
    <div class="navbar-end"><ExpandMenu/></div>
</div>

<slot />
