import type { PageLoad } from './$types';
import { ResourceList, Resource } from '$lib/wailsjs/go/main/Kube';

export const load: PageLoad = async (pageLoad) => {
  const { ctx, ns } = pageLoad.params;
  return {
    ctx: ctx,
    ns: ns,
    tabs: {
      resourceTablesP: ResourceList(ctx, ns, 'all'),
      resourceP: Resource(ctx, ns, 'Namespace', ns)
    }
  };
};
