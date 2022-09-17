import type { PageLoad } from './$types';
import { ResourceList } from '$lib/wailsjs/go/main/Kube';

export const load: PageLoad = async (pageLoad) => {
    const { ctx, ns } = pageLoad.params;
    const query = pageLoad.url.searchParams.get('q') || 'all'
    return {
        ctx: ctx,
        ns: ns,
        query: query,
        resourceTablesP: ResourceList(ctx, ns, query)
    };
};
