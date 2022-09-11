import type { PageLoad } from './$types';
import { Describe, Yaml } from '$lib/wailsjs/go/main/Kube';
import { fromKindName } from '$lib/urls';

export const load: PageLoad = async (pageLoad) => {
  const { ctx, ns, kindName } = pageLoad.params;
  const { kind, name } = fromKindName(kindName);

  const data = {
    ctx: ctx,
    ns: ns,
    kind: kind,
    name: name
  };

  if (kind && name) {
    return {
      ...data,
      ...{
        describeP: Describe(ctx, ns, kind, name),
        yamlP: Yaml(ctx, ns, kind, name)
      }
    };
  } else {
    return {
      ...data,
      ...{
        describeP: Promise.reject('invalid kindname: ' + kindName),
        yamlP: Promise.reject('invalid kindname: ' + kindName)
      }
    };
  }
};
