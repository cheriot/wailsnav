<script lang="ts">
  import type { PageData } from './$types';
  import Navigation from '$lib/components/navigation.svelte';
  import SimpleList from '$lib/components/simpleList.svelte';

  export let data: PageData;

  function toItems(ctxList: string[]): { name: string; href: string }[] {
    return ctxList.map((ctx) => {
      return { name: ctx, href: `/ctx/${ctx}` };
    });
  }
</script>

<div class="section">
  <div class="container">
    <h1 class="title">Select a kubernetes context</h1>

    {#await data.ctxListP}
      loading
    {:then ctxList}
      <SimpleList items={toItems(ctxList)} />
    {/await}
  </div>
</div>
