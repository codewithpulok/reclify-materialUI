import { PRIVATE_BACKEND_API } from 'src/config-global';

/** Api Endpoints for private api */
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/users/signup',
  },
  warehouses: {
    list: '/warehouse',
    get: '/warehouse',
    delete: '/warehouse',
    create: '/warehouse',
    update: '/warehouse',
  },
};

/**
 * Get Full private Api Endpoint
 * @param {string} endpoint
 * @returns {string}
 */
export const getEndpoint = (endpoint) => `${PRIVATE_BACKEND_API}${endpoint}`;
