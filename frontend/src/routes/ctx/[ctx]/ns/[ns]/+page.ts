import type { PageLoad } from './$types';
import { ResourceList } from '$lib/wailsjs/go/main/Kube';

export const load: PageLoad = async (pageLoad) => {
  const { ctx, ns } = pageLoad.params;
  return {
    ctx: ctx,
    ns: ns,
    resourceTablesP: ResourceList(ctx, ns, 'all') // TODO Why doesn't "po" work?
  };
};
