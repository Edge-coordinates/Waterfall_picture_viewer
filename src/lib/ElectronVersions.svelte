<script lang="ts">
  import {versions} from '#preload';
</script>

<table id="process-versions">
  {#if versions}
    {#each Object.entries(versions) as [lib, version] (lib)}
      <tr>
        <th>{lib} :</th>
        <td>v{version}</td>
      </tr>
    {/each}
  {/if}
</table>

<code>src/lib/ElectronVersions.svelte</code>

<style>
  table {
    margin: auto;
  }
  th {
    text-align: right;
  }
  td {
    text-align: left;
  }
</style>
