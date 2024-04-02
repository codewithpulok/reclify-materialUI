import { endpoints } from '../endpoints';
import { asyncWrapper } from '../helpers';

/** @type {AsyncReturn<undefined, NewsType[]>} */
export const getPosts = asyncWrapper(async () => {
  const response = await fetch(endpoints.posts.root, {
    cache: 'no-cache',
  });

  if (!response?.ok) throw new Error('ERROR: Could not fetch posts');

  return response.json();
});

/** @type {AsyncReturn<string, NewsType>} */
export const getPost = asyncWrapper(async (id) => {
  const response = await fetch(endpoints.posts.details(id), {
    cache: 'no-store',
  });

  if (!response?.ok) throw new Error(`ERROR: Could not fetch post:${id}`);

  return response.json();
});
