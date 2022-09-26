import type { PageLoad } from './$types';
import { ResourceList, Describe, Yaml } from '$lib/wailsjs/go/main/Kube';

export const load: PageLoad = async (pageLoad) => {
  const { ctx, ns } = pageLoad.params;
  return {
    ctx: ctx,
    ns: ns,
    tabs: {
      resourceTablesP: ResourceList(ctx, ns, 'all'),
      describeP: Describe(ctx, ns, 'Namespace', ns),
      yamlP: Yaml(ctx, ns, 'Namespace', ns)
    }
  };
};
