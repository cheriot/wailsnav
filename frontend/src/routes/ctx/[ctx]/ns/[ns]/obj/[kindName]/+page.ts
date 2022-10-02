import type { PageLoad } from './$types';
// import { app } from '$lib/wailsjs/go/models';
import { Resource } from '$lib/wailsjs/go/main/Kube';
import type { app } from '$lib/wailsjs/go/models';
import { fromKindName } from '$lib/urls';

export const load: PageLoad = async (pageLoad) => {
  const { ctx, ns, kindName } = pageLoad.params;
  const { kind, name } = fromKindName(kindName);

  let resourceP: Promise<app.KubeObject>;
  if (kind && name) {
    resourceP = Resource(ctx, ns, kind, name);
  } else {
    resourceP = Promise.reject('invalid kindname: ' + kindName);
  }

  return {
    ctx: ctx,
    ns: ns,
    kind: kind,
    name: name,
    tabs: {
      resourceP
    }
  };
};
