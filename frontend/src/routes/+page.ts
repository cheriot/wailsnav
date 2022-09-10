import type { PageLoad } from './$types';
import { ContextList } from '$lib/wailsjs/go/main/Kube';

export const load: PageLoad = async () => {
  return {
    ctxListP: ContextList()
  };
};
