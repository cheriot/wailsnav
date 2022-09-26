<script lang="ts">
  import type { PageData } from './$types';
  import Navigation from '$lib/components/navigation.svelte';
  import ResourceTables from '$lib/components/resourceTables.svelte';
  import PrimaryTabs from '$lib/components/primaryTabs.svelte';

  export let data: PageData;

  let activeTab = 'All';
</script>

<Navigation ctx={data.ctx} ns={data.ns} />

<div class="section">
  <div class="container">
    <PrimaryTabs bind:activeTab tabs={['All', 'Describe', 'Yaml']} />

    {#if activeTab == 'All'}
      {#await data.tabs.resourceTablesP}
        loading
      {:then resourceTables}
        <ResourceTables ctx={data.ctx} ns={data.ns} {resourceTables} />
      {:catch reason}
        <p>Error building table: {reason}</p>
      {/await}
    {/if}

    {#if activeTab == 'Describe'}
      {#await data.tabs.describeP}
        <p>loading</p>
      {:then dataStr}
        <pre style="white-space: pre-wrap">{dataStr}</pre>
      {:catch reason}
        <p>Error describing: {reason}</p>
      {/await}
    {/if}

    {#if activeTab == 'Yaml'}
      {#await data.tabs.yamlP}
        <p>loading</p>
      {:then dataStr}
        <pre style="white-space: pre-wrap">{dataStr}</pre>
      {:catch reason}
        <p>Error fetching yaml: {reason}</p>
      {/await}
    {/if}
  </div>
</div>
