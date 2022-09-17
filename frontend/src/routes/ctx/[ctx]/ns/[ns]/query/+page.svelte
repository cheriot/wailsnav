<script lang="ts">
  import type { PageData } from './$types';
  import Navigation from '$lib/components/navigation.svelte';
  import ResourceTables from '$lib/components/resourceTables.svelte';

  export let data: PageData;
</script>

<Navigation ctx={data.ctx} ns={data.ns} title={data.query} />

<div class="section">
  <div class="container">
    <h1 class="title">{data.query}</h1>
    {#await data.resourceTablesP}
      loading
    {:then resourceTables}
      <ResourceTables ctx={data.ctx} ns={data.ns} {resourceTables} />
    {/await}
  </div>
</div>
