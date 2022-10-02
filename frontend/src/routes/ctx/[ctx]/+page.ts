import type { PageLoad } from './$types';
import { NamespaceList } from '$lib/wailsjs/go/main/Kube';

export const load: PageLoad = async (pageLoad) => {
  const ctx = pageLoad.params.ctx;
  return {
    ctx: ctx,
    remote: {
      nsListP: NamespaceList(ctx)
    },
  };
};
