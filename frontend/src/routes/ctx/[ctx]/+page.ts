import type { PageLoad } from './$types';

export const load: PageLoad = async (pageLoad) => {
  console.log('load', pageLoad);
  return pageLoad.params;
};
