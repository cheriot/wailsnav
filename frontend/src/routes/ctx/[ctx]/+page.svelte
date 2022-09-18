<script lang="ts">
  import type { PageData } from './$types';
  import Navigation from '$lib/components/navigation.svelte';
  import SimpleList from '$lib/components/simpleList.svelte';

  export let data: PageData;

  function toItems(nsList: string[]): { name: string; path: string }[] {
    return nsList.map((ns) => {
      return { name: ns, path: `/ctx/${data.ctx}/ns/${ns}` };
    });
  }
</script>

<Navigation ctx={data.ctx} />

<div class="section">
  <div class="container">
    <h1 class="title">{data.ctx} overview</h1>

    <div class="menu">
      {#await data.nsListP}
        loading
      {:then nsList}
        <SimpleList items={toItems(nsList)} />
      {/await}
    </div>
  </div>
</div>
