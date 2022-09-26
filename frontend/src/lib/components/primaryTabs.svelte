<script lang="ts">
  //   export let tabs: string[];
  export let activeTab: string;
  export let tabs: string[];

  type TabState = { isActive: boolean; name: string };

  let tabStates: TabState[] = tabs.map((name) => {
    return {
      isActive: false,
      name: name
    };
  });

  $: tabStates = tabStates.map((tab) => {
    if (activeTab.toLowerCase() == tab.name.toLowerCase()) {
      tab.isActive = true;
    } else {
      tab.isActive = false;
    }
    return tab;
  });

  function selectTab(event: Event, tab: TabState) {
    // prevents the 'boop' sound the desktop app makes when hitting a key that doesn't do anything
    event.preventDefault();
    activeTab = tab.name;
  }

  function onKeyDown(event: KeyboardEvent) {
    // event.code values: KeyD KeyY Semicolon
    if (event.code.startsWith('Key')) {
      let key = event.code[3].toLowerCase();
      let selectedTabState = tabStates.find((ts) => {
        return ts.name.toLowerCase().startsWith(key);
      });
      if (selectedTabState) {
        selectTab(event, selectedTabState);
      }
    }
  }
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="tabs is-fullwidth">
  <ul>
    {#each tabStates as ts}
      <li class:is-active={ts.isActive}>
        <a
          href=""
          on:click={(e) => {
            selectTab(e, ts);
          }}>{ts.name}</a
        >
      </li>
    {/each}
  </ul>
</div>
