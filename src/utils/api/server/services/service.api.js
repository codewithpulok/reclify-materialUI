import { endpoints } from '../endpoints';
import { asyncWrapper } from '../helpers';

/** @type {AsyncReturn<undefined, Service[]>} */
export const getServices = asyncWrapper(async (params) => {
  const response = await fetch(endpoints.services.root, {
    cache: 'no-store',
  });

  if (!response?.ok) throw new Error('ERROR: Could not fetch services');

  return response.json();
});

/** @type {AsyncReturn<string, Service>} */
export const getService = asyncWrapper(async (id) => {
  const response = await fetch(endpoints.services.details(id), {
    cache: 'no-store',
  });

  if (!response?.ok) throw new Error(`ERROR: Could not fetch service:${id}`);

  return response.json();
});
