<script lang="ts">
  import type { PageData } from './$types';
  import Navigation from '$lib/components/navigation.svelte';
  import PrimaryTabs from '$lib/components/primaryTabs.svelte';

  export let data: PageData;

  let activeTab = 'Describe';
  let tabs = ['Describe', 'Yaml'];
  let dataPromises = [data.tabs.describeP, data.tabs.yamlP];
  $: activeIdx = tabs.indexOf(activeTab);
</script>

<Navigation ctx={data.ctx} ns={data.ns} kind={data.kind} title={data.name} />

<div class="section">
  <div class="container">
    <h1 class="title">{data.name}</h1>
    <h2 class="subtitle">{data.kind}</h2>

    <PrimaryTabs bind:activeTab tabs={['Describe', 'Yaml']} />

    {#await dataPromises[activeIdx]}
      <p>loading</p>
    {:then dataStr}
      <pre style="white-space: pre-wrap">{dataStr}</pre>
    {/await}
  </div>
</div>
