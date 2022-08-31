<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<h1>Select a kubernetes context:</h1>

<div>
  {#await data.ctxListP}
    loading
  {:then ctxList}
    <ul>
      {#each ctxList as ctx}
        <li><a href="/ctx/{ctx}">{ctx}</a></li>
      {/each}
    </ul>
  {/await}
</div>

<div>
  <a href="/about">About</a>
</div>
