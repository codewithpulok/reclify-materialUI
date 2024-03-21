import { endpoints } from '../endpoints';
import { asyncWrapper } from '../helpers';

/** @type {AsyncReturn<undefined, Plan[]>} */
export const getAllPlans = asyncWrapper(async () => {
  const response = await fetch(endpoints.plans.root, { cache: 'force-cache' });

  if (!response?.ok) throw new Error('ERROR: Could not fetch plans');

  return response.json();
});
