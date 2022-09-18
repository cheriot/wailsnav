<script lang="ts">
  import { kindName } from '$lib/urls';
  import type { app, v1 } from '$lib/wailsjs/go/models';
  import { keyboardListOnKeyDown } from '$lib/keyboardList';

  export let resourceTables: app.ResourceTable[];
  export let ctx: string;
  export let ns: string;

  type Row = { href: string; cells: any[]; combinedIdx: number };

  interface Resource {
    apiResource: v1.APIResource;
    subtitle: string;

    isError: boolean;

    headerNames: string[];
    rows: Row[];
  }

  function buildResource(rts: app.ResourceTable[]): Resource[] {
    // For keyboard navigation, combinedIdx tracks the index of a row among all the tables.
    let combinedIdx = 0;

    return rts.map((rt) => {
      let columnNames: string[] = [];
      let rows: Row[] = [];

      if (rt.table) {
        columnNames = rt.table.columnDefinitions.map((cd) => cd.name);
        rows = rt.table.rows.map((r, rIdx) => {
          let name = rt.tableRowNames[rIdx];
          let row = {
            href: `/ctx/${ctx}/ns/${ns}/obj/${kindName(rt.apiResource.kind, name)}`,
            cells: r.cells,
            combinedIdx: combinedIdx
          };

          combinedIdx += 1;
          return row;
        });
      }

      return {
        apiResource: rt.apiResource,
        subtitle: (rt.apiResource.group ?? '') + rt.apiResource.version,
        isError: rt.isError,
        headerNames: columnNames,
        rows: rows
      };
    });
  }

  function buildItems(resources: Resource[]): { href: string }[] {
    return resources.map((r) => r.rows).reduce((a: Row[], b: Row[]) => a.concat(b), []);
  }

  let resources = buildResource(resourceTables);

  // Keyboard navigation
  let items = buildItems(resources);
  let activeIdx = -1;
</script>

<svelte:window on:keydown={(e) => (activeIdx = keyboardListOnKeyDown(activeIdx, items, e))} />

{#each resources as r}
  {#if r.isError}
    <div class="notification is-danger">Error retrieving resource: {r.apiResource.name}.</div>
  {/if}

  {#if r.rows.length > 0}
    <h1 class="title">{r.apiResource.name}</h1>
    <h2 class="subtitle">{r.subtitle}</h2>

    <table class="table">
      <tr>
        {#each r.headerNames as headerName}
          <th>{headerName}</th>
        {/each}
      </tr>

      {#each r.rows as row}
        <tr class:is-selected={activeIdx == row.combinedIdx}>
          {#each row.cells as cell, colIdx}
            {#if colIdx == 0}
              <td>
                <a href={row.href}>
                  {cell}
                </a>
              </td>
            {:else}
              <td>{cell}</td>
            {/if}
          {/each}
        </tr>
      {/each}
    </table>
  {/if}
{/each}
