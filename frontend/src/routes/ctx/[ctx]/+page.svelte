<script lang="ts">
  import type { PageData } from './$types';
  import Navigation from '$lib/components/navigation.svelte';

  export let data: PageData;
</script>

<Navigation ctx={data.ctx} />

<div class="section">
  <div class="container">
    <h1 class="title">{data.ctx} overview</h1>

    {#await data.nsListP}
      loading
    {:then nsList}
      <ul>
        {#each nsList as ns}
          <li><a href="/ctx/{data.ctx}/ns/{ns}">{ns}</a></li>
        {/each}
      </ul>
    {/await}
  </div>
</div>
