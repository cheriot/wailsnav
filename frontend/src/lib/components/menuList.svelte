<script lang="ts">
  import { keyboardListOnKeyDown } from '$lib/keyboardList';

  export let items: { name: string; href: string }[];

  let activeIdx = -1;
</script>

<svelte:window
  on:keydown={(e) => {
    activeIdx = keyboardListOnKeyDown(activeIdx, items, e);
  }}
/>

<div class="menu">
  <ul class="menu-list">
    {#each items as item, idx}
      <li><a class:is-active={idx == activeIdx} href={item.href}>{item.name}</a></li>
    {/each}
  </ul>
</div>
