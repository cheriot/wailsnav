<script lang="ts">
  import type { PageData } from './$types';
  import Navigation from '$lib/components/navigation.svelte';

  export let data: PageData;

  let describeTab = { isActive: true, name: 'Describe', dataP: data.tabs.describeP };
  let yamlTab = { isActive: false, name: 'Yaml', dataP: data.tabs.yamlP };
  let tabs = [describeTab, yamlTab];
  $: activeTab = tabs.find((tab) => tab.isActive);

  function selectTab(
    event: Event,
    tab: { isActive: boolean; name: string; dataP: Promise<string> }
  ) {
    // prevents the 'boop' sound the desktop app makes when hitting a key that doesn't do anything
    event.preventDefault();

    tabs = tabs.map((t) => {
      t.isActive = false;
      return t;
    });
    tab.isActive = true;
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.code == 'KeyD') {
      selectTab(event, describeTab);
    } else if (event.code == 'KeyY') {
      selectTab(event, yamlTab);
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
            <a
              href=""
              on:click={(e) => {
                selectTab(e, tab);
              }}>{tab.name}</a
            >
          </li>
        {/each}
      </ul>
    </div>
    {#await activeTab?.dataP}
      <p>loading</p>
    {:then dataStr}
      <pre style="white-space: pre-wrap">{dataStr}</pre>
    {/await}
  </div>
</div>
