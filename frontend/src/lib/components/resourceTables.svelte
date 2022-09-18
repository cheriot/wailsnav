<script lang="ts">
  import { kindName } from '$lib/urls';
  import type { app, v1 } from '$lib/wailsjs/go/models';

  export let resourceTables: app.ResourceTable[];
  export let ctx: string;
  export let ns: string;

  function resourceSubtitle(apiResource: v1.APIResource) {
    return (apiResource.group ?? '') + apiResource.version;
  }
  console.log('resourcetables', resourceTables);
</script>

{#each resourceTables as rt}
  {#if rt.isError}
    <div class="notification is-danger">Error retrieving resource: {rt.apiResource.name}.</div>
  {/if}

  {#if rt.table && rt.table.rows.length > 0}
    <h1 class="title">{rt.apiResource.name}</h1>
    <h2 class="subtitle">{resourceSubtitle(rt.apiResource)}</h2>
    <table class="table">
      <tr>
        {#each rt.table.columnDefinitions as cd}
          <th>{cd.name}</th>
        {/each}
      </tr>

      {#each rt.table.rows as r, rIdx}
        <tr>
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
        </tr>
      {/each}
    </table>
  {:else}
    <p class="has-text-weight-light">no {rt.apiResource.name}</p>
  {/if}
{/each}
