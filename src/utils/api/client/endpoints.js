import { PUBLIC_BACKEND_API } from 'src/config-global';

/** Api Endpoints for public api */
export const endpoints = {
  auth: {
    login: `${PUBLIC_BACKEND_API}/auth/login`,
    register: `${PUBLIC_BACKEND_API}/auth/register`,
  },
  warehouses: {
    list: `${PUBLIC_BACKEND_API}/warehouses`,
    get: `${PUBLIC_BACKEND_API}/warehouses`,
    delete: `${PUBLIC_BACKEND_API}/warehouses`,
    create: `${PUBLIC_BACKEND_API}/warehouses`,
    update: `${PUBLIC_BACKEND_API}/warehouses`,
  },
  reviews: {
    delete: `${PUBLIC_BACKEND_API}/reviews`,
    create: `${PUBLIC_BACKEND_API}/reviews`,
    update: `${PUBLIC_BACKEND_API}/reviews`,
  },
};
