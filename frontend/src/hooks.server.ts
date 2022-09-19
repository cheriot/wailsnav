import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // SPA mode (https://github.com/sveltejs/kit/tree/master/packages/adapter-static#spa-mode)
  const response = await resolve(event, {});
  return response;
};
