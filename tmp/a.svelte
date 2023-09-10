<script>
    import { onMount } from 'svelte';
    import Masonry from 'masonry-layout';
  
    let container;
  
    onMount(() => {
      new Masonry(container, {
        itemSelector: '.grid-item',
        columnWidth: 200,
        gutter: 10
      });
    });
  </script>
  
  <style>
    .grid-item { width: 200px; }
  </style>
  
  <div bind:this={container}>
    <div class="grid-item"><img src="image1.jpg" alt="Image 1"></div>
    <div class="grid-item"><img src="image2.jpg" alt="Image 2"></div>
    <div class="grid-item"><img src="image3.jpg" alt="Image 3"></div>
    <div class="grid-item"><img src="image4.jpg" alt="Image 4"></div>
    <div class="grid-item"><img src="image5.jpg" alt="Image 5"></div>
  </div>