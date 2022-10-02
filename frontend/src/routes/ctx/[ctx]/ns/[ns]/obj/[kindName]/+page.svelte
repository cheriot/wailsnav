<script lang="ts">
  import type { PageData } from './$types';
  import type { app } from '$lib/wailsjs/go/models';
  import { resourceURI } from '$lib/urls';
  import Navigation from '$lib/components/navigation.svelte';
  import PrimaryTabs from '$lib/components/primaryTabs.svelte';

  export let data: PageData;

  let activeTab = 'Describe';
  let tabs = ['Describe', 'Yaml'];

  function activeContent(resource: app.KubeObject, activeTab: string): string {
    if (activeTab == 'Describe') {
      return resource.describe;
    } else if (activeTab == 'Yaml') {
      return resource.yaml;
    }
    return 'unknown tab';
  }

  console.log(data.tabs.resourceP);
</script>

<Navigation ctx={data.ctx} ns={data.ns} kind={data.kind} title={data.name} />

<div class="section">
  <div class="container">
    <h1 class="title">{data.name}</h1>
    <h2 class="subtitle">{data.kind}</h2>

    {#await data.tabs.resourceP}
      <!-- nothing -->
    {:then resource}
      {#if resource.relations.length > 0}
        Related
      {/if}
      {#each resource.relations as r}
        <a href={resourceURI(data.ctx, data.ns, r.groupKind.Kind, r.name)}>
          {r.groupKind.Kind}
        </a>
      {/each}
    {/await}

    <PrimaryTabs bind:activeTab {tabs} />

    {#await data.tabs.resourceP}
      <p>loading</p>
    {:then resource}
      <pre style="white-space: pre-wrap">{activeContent(resource, activeTab)}</pre>
    {/await}
  </div>
</div>
