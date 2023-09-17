<script lang="ts">
  import {sha256sum} from '#preload';

  let rawString = 'Hello World';

  $: hashedString = (sha256sum || (() => ''))(rawString);
</script>

<table>
  <tr>
    <th>
      <label for="reactive-hash-raw-value">Raw value :</label>
    </th>
    <td>
      <input
        id="reactive-hash-raw-value"
        bind:value={rawString}
        type="text"
      />
    </td>
  </tr>

  <tr>
    <th>
      <label for="reactive-hash-hashed-value">Hashed by node:crypto :</label>
    </th>
    <td>
      <input
        id="reactive-hash-hashed-value"
        bind:value={hashedString}
        readonly
        type="text"
      />
    </td>
  </tr>
</table>
<code>src/lib/ReactiveHash.svelte</code>

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
