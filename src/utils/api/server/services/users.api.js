import { endpoints } from '../endpoints';
import { asyncWrapper } from '../helpers';

/** @type {AsyncReturn<string, User>} */
export const getUser = asyncWrapper(async (id) => {
  const response = await fetch(endpoints.users.root(id), { cache: 'force-cache' });

  if (!response?.ok) throw new Error('ERROR: Could not fetch user');

  return response.json();
});
