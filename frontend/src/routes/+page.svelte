<script lang="ts">
  import { ContextList } from '$lib/wailsjs/go/controllers/Kube';

  let ctxListP = ContextList();
</script>

<h1>Select a kubernetes context:</h1>

<div>
  {#await ctxListP}
    loading
  {:then ctxList}
    <a href="/ctx/somename">{ctxList}</a>
  {/await}
</div>

<div>
  <a href="/about">About</a>
</div>
