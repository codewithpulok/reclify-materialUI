import { PRIVATE_BACKEND_API } from 'src/config-global';

/** Api Endpoints for private api */
export const endpoints = {
  plans: {
    root: `${PRIVATE_BACKEND_API}/plans`,
  },
  posts: {
    root: `${PRIVATE_BACKEND_API}/posts`,
    details: (id) => `${PRIVATE_BACKEND_API}/posts/${id}`,
  },
  warehouses: {
    root: `${PRIVATE_BACKEND_API}/warehouse`,
    details: (id) => `${PRIVATE_BACKEND_API}/warehouse/${id}`,
  },
  services: {
    root: `${PRIVATE_BACKEND_API}/services`,
    details: (id) => `${PRIVATE_BACKEND_API}/services/${id}`,
  },
  users: {
    root: (id) => `${PRIVATE_BACKEND_API}/users/${id}`,
  },
};
