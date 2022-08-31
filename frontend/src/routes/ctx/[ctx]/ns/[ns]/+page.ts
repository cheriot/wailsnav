import type { PageLoad } from './$types';
import { ResourceList } from '$lib/wailsjs/go/controllers/Kube';

export const load: PageLoad = async (pageLoad) => {
  const { ctx, ns } = pageLoad.params;
  return {
    ctx: ctx,
    resourceTablesP: ResourceList(ctx, ns, 'all') // TODO Why doesn't "po" work?
  };
};
