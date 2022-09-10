import type { PageLoad } from './$types';
import { Describe } from '$lib/wailsjs/go/main/Kube';
import { fromKindName } from '$lib/urls';

export const load: PageLoad = async (pageLoad) => {
  const { ctx, ns, kindName } = pageLoad.params;
  const { kind, name } = fromKindName(kindName);
  const describeP =
    kind && name ? Describe(ctx, ns, kind, name) : Promise.reject('invalid kindname: ' + kindName);
  console.log('kindName load', kind, name, kindName);
  return {
    ctx: ctx,
    ns: ns,
    kind: kind,
    name: name,
    describeP: describeP
  };
};
