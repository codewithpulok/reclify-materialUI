import { PRIVATE_BACKEND_API } from 'src/config-global';

/** Api Endpoints for private api */
export const endpoints = {
  plans: {
    root: `${PRIVATE_BACKEND_API}/plans`,
  },
  posts: {
    root: `${PRIVATE_BACKEND_API}/posts`,
  },
};
