<script lang="ts">
  import type { PageData } from './$types';
  import Navigation from '$lib/components/navigation.svelte';

  export let data: PageData;
</script>

<Navigation ctx={data.ctx} ns={data.ns} kind={data.kind} title={data.name} />

<div class="section">
  <div class="container">
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
  </div>
</div>
