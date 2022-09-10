<script lang="ts">
  import type { v1 } from '$lib/wailsjs/go/models';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h1>{data.kind}/{data.name}</h1>
{#await data.describeP}
  <p>loading</p>
{:then describeStr}
  <pre>{describeStr}</pre>
{/await}
