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

    {#await data.tabs.resourceP}
      <p>loading</p>
    {:then resource}
      {#if activeTab == 'Describe'}
        <pre style="white-space: pre-wrap">{resource.describe}</pre>
      {/if}
      {#if activeTab == 'Yaml'}
        <pre style="white-space: pre-wrap">{resource.yaml}</pre>
      {/if}
    {:catch reason}
      <p>Error fetching resource: {reason}</p>
    {/await}
  </div>
</div>
