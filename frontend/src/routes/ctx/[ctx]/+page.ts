import type { PageLoad } from './$types';
import { NamespaceList } from '$lib/wailsjs/go/controllers/Kube';

export const load: PageLoad = async (pageLoad) => {
  const ctx = pageLoad.params.ctx;
  return {
    ctx: ctx,
    nsListP: NamespaceList(ctx)
  };
};
