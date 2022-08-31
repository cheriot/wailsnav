import type { PageLoad } from './$types';
import { ContextList } from '$lib/wailsjs/go/controllers/Kube';

export const load: PageLoad = async () => {
  return {
    ctxListP: ContextList()
  };
};
