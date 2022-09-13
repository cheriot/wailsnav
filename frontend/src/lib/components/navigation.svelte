<script lang="ts">
  export let ctx = '';
  export let ns = '';
  export let title = '';

  let breadcrumbs: { name: string; href: string; isActive: boolean }[] = [];
  if (ctx) {
    breadcrumbs.push({ name: ctx, href: '/ctx/' + ctx, isActive: false });
  }
  if (ns) {
    breadcrumbs.push({ name: ns, href: '/ctx/' + ctx + '/ns/' + ns, isActive: false });
  }
  if (title) {
    breadcrumbs.push({ name: title, href: '', isActive: false });
  }
  if (breadcrumbs.length > 0) {
    breadcrumbs.unshift({ name: 'home', href: '/', isActive: false });
    breadcrumbs[breadcrumbs.length - 1].isActive = true;
  }
</script>

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
