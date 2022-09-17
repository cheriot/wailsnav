<script lang="ts">
  import { kindName } from '$lib/urls';
  import type { app, v1 } from '$lib/wailsjs/go/models';

  export let resourceTables: app.ResourceTable[];
  export let ctx: string;
  export let ns: string;

  function resourceSubtitle(apiResource: v1.APIResource) {
    return (apiResource.group ?? '') + apiResource.version;
  }
</script>

{#each resourceTables as rt}
  <h1 class="title">{rt.apiResource.name}</h1>
  <h2 class="subtitle">{resourceSubtitle(rt.apiResource)}</h2>
  <p>TODO handle rt.IsError</p>

  {#if rt.table}
    <table class="table">
      <tr>
        {#each rt.table.columnDefinitions as cd}
          <th>{cd.name}</th>
        {/each}
      </tr>

      {#each rt.table.rows as r, rIdx}
        {#each r.cells as cell, colIdx}
          <td>
            {#if colIdx == 0}
              <a
                href="/ctx/{ctx}/ns/{ns}/obj/{kindName(
                  rt.apiResource.kind,
                  rt.tableRowNames[rIdx]
                )}">{cell}</a
              >
            {:else}
              {cell}
            {/if}
          </td>
        {/each}
      {/each}
    </table>
  {/if}
{/each}
