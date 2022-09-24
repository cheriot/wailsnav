<script lang="ts">
  import { goto } from '$app/navigation';
  import { kindName } from '$lib/urls';
  import { Command } from '$lib/wailsjs/go/main/Kube';

  export let cmd = '';
  export let ctx = '';
  export let ns = '';
  export let kind = '';
  export let title = '';

  function buildBreadcrumbs(ctx: string, ns: string, kind: string, title: string) {
    let breadcrumbs: { name: string; href: string; isActive: boolean }[] = [];

    if (ctx) {
      breadcrumbs.push({ name: ctx, href: `/ctx/${ctx}`, isActive: false });
    }
    if (ns) {
      breadcrumbs.push({ name: ns, href: `/ctx/${ctx}/ns/${ns}`, isActive: false });
    }
    if (kind) {
      breadcrumbs.push({
        name: kind,
        href: `/ctx/${ctx}/ns/${ns}/query?q=${kind}`,
        isActive: false
      });
    }
    if (title) {
      breadcrumbs.push({ name: title, href: '', isActive: false });
    }
    if (breadcrumbs.length > 0) {
      breadcrumbs.unshift({ name: 'ctx', href: '/', isActive: false });
      breadcrumbs[breadcrumbs.length - 1].isActive = true;
    }

    return breadcrumbs;
  }

  $: breadcrumbs = buildBreadcrumbs(ctx, ns, kind, title);

  function onSubmit() {
    let p = Command(ctx, ns, kind, cmd).then((r) => {
      switch (r.commandResultType) {
        case 'ctx':
          if (r.name) {
            return goto(`/ctx${r.name}`);
          } else {
            return goto(`/`);
          }
        case 'query':
          return goto(`/ctx/${ctx}/ns/${r.ns}/query?q=${r.query}`);
        case 'obj':
          if (r.kind == 'Namespace') {
            return goto(`/ctx/${ctx}/ns/${r.name}`);
          } else {
            return goto(`/ctx/${ctx}/ns/${ns}/obj/${kindName(r.kind, r.name)}`);
          }
        case 'err':
          return Promise.reject(r.error);
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
  function onKeyDownInput(event: KeyboardEvent) {
    if (event.code == 'Escape') {
      cmd = '';
      cmdInput.blur();
      event.preventDefault();
    } else {
      // don't let typing trigger other keyboard commands
      event.stopPropagation();
    }
  }

  function onKeyDownGlobal(event: KeyboardEvent) {
    if (event.code == 'Semicolon') {
      cmdInput.focus();
      event.preventDefault();
    } else if (event.code == 'BracketLeft') {
      history.back();
      event.preventDefault();
    } else if (event.code == 'BracketRight') {
      history.forward();
      event.preventDefault();
    }
  }
</script>

<svelte:window on:keydown={onKeyDownGlobal} />

<nav class="navbar" aria-label="main navigation">
  <div class="navbar-start">
    <div class="navbar-item">
      <div class="field has-addons">
        <p class="control">
          <button class="button" on:click={() => history.back()}>&lt;</button>
        </p>
        <p class="control">
          <button class="button" on:click={() => history.forward()}>&gt;</button>
        </p>
      </div>
    </div>

    <div class="navbar-item breadcrumb" aria-label="breadcrumbs">
      <ul>
        {#each breadcrumbs as { name, href, isActive }}
          {#if isActive}
            <li class="is-active"><a {href} aria-current="page"> {name}</a></li>
          {:else}
            <li><a {href}> {name}</a></li>
          {/if}
        {/each}
      </ul>
    </div>

    <div class="navbar-item">
      <form on:submit|preventDefault={onSubmit}>
        <input
          class="input"
          type="text"
          bind:value={cmd}
          bind:this={cmdInput}
          on:keydown={onKeyDownInput}
          spellcheck="false"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
        />
      </form>
    </div>
  </div>

  <div class="navbar-end" />
</nav>

<style>
  .navbar-item.breadcrumb {
    margin: 0;
  }
</style>
