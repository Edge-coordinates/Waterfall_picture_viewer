<script>
  // 生成一个包含从 10 到 20 的数字序列的数组
  let numbers = Array.from({ length: 10 }, (_, i) => i + 10);
</script>

{#each numbers as number (number)}
  <p>{number}</p>
{/each}