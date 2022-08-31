<script lang="ts">
  import type { v1 } from '$lib/wailsjs/go/models';
  import type { PageData } from './$types';

  export let data: PageData;

  function resourceSubtitle(apiResource: v1.APIResource) {
    return (apiResource.group ?? '') + apiResource.version;
  }
</script>

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

        {#each rt.table.rows as r}
          {#each r.cells as cell}
            <td>{cell}</td>
          {/each}
        {/each}
      </table>
    {/if}
  {/each}
{/await}
