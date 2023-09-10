<!-- Waterfall.svelte -->
<script>
    let images = [
        "https://unsplash.it/1600/900?random&1",
        "https://unsplash.it/900/1600?random&1",
        
        "https://unsplash.it/1600/900?random&2",
        "https://unsplash.it/900/1600?random&2",
        
        "https://unsplash.it/1600/900?random&3",
        "https://unsplash.it/900/1600?random&3",
        
        "https://unsplash.it/1600/900?random&4",
        "https://unsplash.it/900/1600?random&4",

        
        "https://unsplash.it/1600/900?random&5",
        "https://unsplash.it/900/1600?random&5",
        
        "https://unsplash.it/1600/900?random&6",
        "https://unsplash.it/900/1600?random&6",
        "https://unsplash.it/1600/900?random&7",
        "https://unsplash.it/900/1600?random&7",

        
        "https://unsplash.it/1600/900?random&8",
        "https://unsplash.it/900/1600?random&8",
        
        "https://unsplash.it/1600/900?random&9",
        "https://unsplash.it/900/1600?random&19",
        
        "https://unsplash.it/1600/900?random&10",
        "https://unsplash.it/900/1600?random&10",
      // 添加更多图片链接
    ];
    function handleClick(event) {
    const imgSrc = event.target.src;
    console.log(imgSrc);
  }
  </script>
  
  <a href="/">home</a>
  <div class="columns-auto columns-3xs gap-4">
      {#each images as image (image)}
          <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src={image} alt="Image" on:click={} class="rounded shadow" style="padding-bottom: 8px;">
      {/each}
  </div>

  <div class="sm:columns-2 md:columns-3 lg:columns-4 xl:columns-8 gap-4">
    <div>test text</div>
    <div>test text</div><div>test text</div><div>test text</div><div>test text</div><div>test text</div><div>test text</div><div>test text</div><div>test text</div><div>test text</div><div>test text</div><div>test text</div><div>test text</div><div>test text</div><div>test text</div><div>test text</div><div>test text</div><div>test text</div><div>test text</div><div>test text</div><div>test text</div><div>test text</div><div>test text</div><div>test text</div>
</div>
