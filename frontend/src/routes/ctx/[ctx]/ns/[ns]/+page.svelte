<script lang="ts">
  import type { v1 } from '$lib/wailsjs/go/models';
  import type { PageData } from './$types';
  import { kindName } from '$lib/urls';
  import Navigation from '$lib/components/navigation.svelte';
  import ResourceTables from '$lib/components/resourceTables.svelte';

  export let data: PageData;

  function resourceSubtitle(apiResource: v1.APIResource) {
    return (apiResource.group ?? '') + apiResource.version;
  }
</script>

<Navigation ctx={data.ctx} ns={data.ns} />

<div class="section">
  <div class="container">
    {#await data.resourceTablesP}
      loading
    {:then resourceTables}
      <ResourceTables ctx={data.ctx} ns={data.ns} {resourceTables} />
    {:catch reason}
      <p>Error building table: {reason}</p>
    {/await}
  </div>
</div>
