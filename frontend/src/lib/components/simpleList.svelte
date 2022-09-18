<script lang="ts">
  import { goto } from '$app/navigation';

  export let items: { name: string; path: string }[];

  let activeIdx = -1;

  function onKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case 'KeyJ':
        console.log('plus');
        activeIdx = (activeIdx + 1) % items.length;
        break;
      case 'KeyK':
        if (activeIdx > 0 && items.length > 0) {
          activeIdx = (activeIdx - 1) % items.length;
        } else {
          activeIdx = items.length - 1;
        }
        break;
      case 'Enter':
        if (activeIdx > -1 && items.length > 0) {
          console.log('goto');
          goto(items[activeIdx].path);
        }
        break;
    }
  }
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="menu">
  <ul class="menu-list">
    {#each items as item, idx}
      <li><a class:is-active={idx == activeIdx} href={item.path}>{item.name}</a></li>
    {/each}
  </ul>
</div>
