<script lang="ts">
  import { keyboardListOnKeyDown } from '$lib/keyboardList';
  import { tick } from 'svelte';

  export let items: { name: string; href: string }[];

  let activeIdx = -1;
  let isFinding = false;
  let findStr = '';
  let findInput: HTMLInputElement;

  $: filteredItems = items.filter((item) => item.name.includes(findStr));
  $: activeIdx = activeIdx < filteredItems.length ? activeIdx : -1;

  function onKeyDownInput(event: KeyboardEvent) {
    if (event.code == 'Escape') {
      // cancel, reset
      findStr = '';
      findInput.blur();
      event.preventDefault();
    } else if (event.code == 'Enter') {
      // done (enable other keyboard commands)
      findInput.blur();
      event.preventDefault();
    } else {
      // don't let typing trigger other keyboard commands
      event.stopPropagation();
    }
  }
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.code == 'Slash') {
      isFinding = true;
      tick().then(() => {
        findInput.focus();
      });
      e.preventDefault();
    } else if (e.code == 'Escape' && isFinding) {
      isFinding = false;
      findStr = '';
      findInput.blur();
      e.preventDefault();
    } else {
      activeIdx = keyboardListOnKeyDown(activeIdx, filteredItems, e);
    }
  }}
/>

{#if isFinding}
  <p class="is-size-6">
    <span class="find-indicator">/</span>
    <input
      class="find has-text-dark is-size-6"
      bind:this={findInput}
      bind:value={findStr}
      on:keydown={onKeyDownInput}
      spellcheck="false"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
    />
  </p>
{/if}

<div class="menu">
  <ul class="menu-list">
    {#each filteredItems as item, idx}
      <li>
        <a class:is-active={idx == activeIdx} href={item.href}>{item.name}</a>
      </li>
    {/each}
  </ul>
</div>

<style>
  input.find {
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: hidden;
  }
  .find:focus {
    outline: none;
  }
</style>
