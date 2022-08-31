<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<h1>{data.ctx} overview</h1>

{#await data.nsListP}
  loading
{:then nsList}
  <ul>
    {#each nsList as ns}
      <li><a href="/ctx/{data.ctx}/ns/{ns}">{ns}</a></li>
    {/each}
  </ul>
{/await}
