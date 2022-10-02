<script lang="ts">
  import type { PageData } from './$types';
  import Navigation from '$lib/components/navigation.svelte';
  import MenuList from '$lib/components/menuList.svelte';

  export let data: PageData;

  function toItems(nsList: string[]): { name: string; href: string }[] {
    return nsList.map((ns) => {
      return { name: ns, href: `/ctx/${data.ctx}/ns/${ns}` };
    });
  }
</script>

<Navigation ctx={data.ctx} />

<div class="section">
  <div class="container">
    <h1 class="title">{data.ctx} overview</h1>

    <div class="menu">
      {#await data.remote.nsListP}
        loading
      {:then nsList}
        <MenuList items={toItems(nsList)} />
      {/await}
    </div>
  </div>
</div>
