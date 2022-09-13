<script lang="ts">
  import type { v1 } from '$lib/wailsjs/go/models';
  import type { PageData } from './$types';
  import Navigation from '$lib/components/navigation.svelte';

  export let data: PageData;
</script>

<Navigation ctx={data.ctx} ns={data.ns} title={data.name} />

<h1>{data.kind}/{data.name}</h1>
{#await data.describeP}
  <p>loading</p>
{:then describeStr}
  <pre>{describeStr}</pre>
{/await}

{#await data.yamlP}
  <p>loading</p>
{:then yamlStr}
  <pre>{yamlStr}</pre>
{/await}
