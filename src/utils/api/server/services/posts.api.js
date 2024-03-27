import { endpoints } from '../endpoints';
import { asyncWrapper } from '../helpers';

/** @type {AsyncReturn<undefined, NewsType[]>} */
export const getAllPosts = asyncWrapper(async () => {
  const response = await fetch(endpoints.posts.root, {
    cache: 'no-cache',
  });

  if (!response?.ok) throw new Error('ERROR: Could not fetch posts');

  return response.json();
});
