<script lang="ts">
  import { goto } from '$app/navigation';
  import { kindName } from '$lib/urls';
  import { Command } from '$lib/wailsjs/go/main/Kube';

  export let cmd = '';
  export let ctx = '';
  export let ns = '';
  export let kind = '';
  export let title = '';

  let breadcrumbs: { name: string; href: string; isActive: boolean }[] = [];
  if (ctx) {
    breadcrumbs.push({ name: ctx, href: `/ctx/${ctx}`, isActive: false });
  }
  if (ns) {
    breadcrumbs.push({ name: ns, href: `/ctx/${ctx}/ns/${ns}`, isActive: false });
  }
  if (kind) {
    breadcrumbs.push({ name: kind, href: '', isActive: false });
  }
  if (title) {
    breadcrumbs.push({ name: title, href: '', isActive: false });
  }
  if (breadcrumbs.length > 0) {
    breadcrumbs.unshift({ name: 'ctx', href: '/', isActive: false });
    breadcrumbs[breadcrumbs.length - 1].isActive = true;
  }

  function onSubmit() {
    let p = Command(ctx, ns, kind, cmd).then((r) => {
      switch (r.commandResultType) {
        case 'ctx':
          if (r.name) {
            return goto(`/ctx${r.name}`);
          } else {
            return goto(`/`);
          }
          break;
        case 'query':
          // TODO need a query page so go to the namespace page for now
          return goto(`/ctx/${ctx}/ns/${r.ns}`);
          break;
        case 'obj':
          if (r.kind == 'Namespace') {
            return goto(`/ctx/${ctx}/ns/${r.name}`);
          } else {
            return goto(`/ctx/${ctx}/ns/${ns}/obj/${kindName(r.kind, r.name)}`);
          }
          break;
        case 'err':
          return Promise.reject(r.error);
          break;
      }
    });

    p.catch((reason) => {
      console.log(`failed executing command '${cmd}': ${reason}`);
    });
    p.then(() => {
      cmd = '';
    });
  }

  let cmdInput: HTMLInputElement;
  function onKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case 'Semicolon':
        cmdInput.focus();
        event.preventDefault();
        break;
      case 'Escape':
        cmd = '';
        cmdInput.blur();
        break;
    }
  }
</script>

<div>
  <button class="button" on:click={(e) => history.back()}>&lt;</button>
  <button class="button" on:click={(e) => history.forward()}>&gt;</button>
</div>

<nav class="breadcrumb" aria-label="breadcrumbs">
  <ul>
    {#each breadcrumbs as { name, href, isActive }}
      {#if isActive}
        <li class="is-active"><a {href} aria-current="page"> {name}</a></li>
      {:else}
        <li><a {href}> {name}</a></li>
      {/if}
    {/each}
  </ul>
</nav>

<form on:submit|preventDefault={onSubmit}>
  <input type="text" bind:value={cmd} bind:this={cmdInput} />
</form>

<svelte:window on:keydown={onKeyDown} />
