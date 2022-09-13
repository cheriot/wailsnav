<script lang="ts">
  import type { v1 } from '$lib/wailsjs/go/models';
  import type { PageData } from './$types';
  import { kindName } from '$lib/urls';
  import Navigation from '$lib/components/navigation.svelte';

  export let data: PageData;

  function resourceSubtitle(apiResource: v1.APIResource) {
    return (apiResource.group ?? '') + apiResource.version;
  }
</script>

<Navigation ctx={data.ctx} ns={data.ns} />

{#await data.resourceTablesP}
  loading
{:then resourceTables}
  {#each resourceTables as rt}
    <p>{rt.apiResource.name} {resourceSubtitle(rt.apiResource)}</p>
    <p>TODO handle rt.IsError</p>

    {#if rt.table}
      <table>
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
                  href="/ctx/{data.ctx}/ns/{data.ns}/obj/{kindName(
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
{/await}
