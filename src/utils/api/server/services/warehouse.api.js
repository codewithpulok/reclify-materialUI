import { endpoints } from '../endpoints';
import { asyncWrapper } from '../helpers';

/** @type {AsyncReturn<{region: string, hasDiscount: boolean, verified: boolean, featured: boolean, visible: boolean}, Warehouse[]>} */
export const getAllWarehouses = asyncWrapper(async (params) => {
  const queryString = new URLSearchParams({
    region: params?.region || '',
    hasDiscount: params?.hasDiscount || '',
    verified: params?.verified || '',
    featured: params?.featured || '',
    visible: params?.visible || '',
  });
  const response = await fetch(`${endpoints.warehouses.root}?${queryString}`, {
    cache: 'no-cache',
  });

  if (!response?.ok) throw new Error('ERROR: Could not fetch warehouses');

  return response.json();
});

/** @type {AsyncReturn<string, Warehouse>} */
export const getWarehouse = asyncWrapper(async (id) => {
  const response = await fetch(endpoints.warehouses.details(id), {
    cache: 'no-cache',
  });

  if (!response?.ok) throw new Error('ERROR: Could not fetch warehouse');

  return response.json();
});
