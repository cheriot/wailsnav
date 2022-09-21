<script lang="ts">
  import type { PageData } from './$types';
  import Navigation from '$lib/components/navigation.svelte';

  export let data: PageData;

  let describeTab = { isActive: true, name: 'Describe', dataP: data.describeP };
  let yamlTab = { isActive: false, name: 'Yaml', dataP: data.yamlP };
  let tabs = [describeTab, yamlTab];
  $: activeTab = tabs.find((tab) => tab.isActive);

  function selectTab(tab: { isActive: boolean; name: string; dataP: Promise<string> }) {
    tabs = tabs.map((t) => {
      t.isActive = false;
      return t;
    });
    tab.isActive = true;
  }

  function onKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case 'KeyD':
        selectTab(describeTab);
        event.preventDefault();
        break;
      case 'KeyY':
        selectTab(yamlTab);
        event.preventDefault();
        break;
    }
  }
</script>

<svelte:window on:keydown={onKeyDown} />

<Navigation ctx={data.ctx} ns={data.ns} kind={data.kind} title={data.name} />

<div class="section">
  <div class="container">
    <h1 class="title">{data.name}</h1>
    <h2 class="subtitle">{data.kind}</h2>

    <div class="tabs is-fullwidth">
      <ul>
        {#each tabs as tab}
          <li class:is-active={tab.isActive}>
            <a href="" on:click={selectTab(tab)}>{tab.name}</a>
          </li>
        {/each}
      </ul>
    </div>
    {#await activeTab?.dataP}
      <p>loading</p>
    {:then dataStr}
      <pre>{dataStr}</pre>
    {/await}
  </div>
</div>
