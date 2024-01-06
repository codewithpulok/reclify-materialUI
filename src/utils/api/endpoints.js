import { PRIVATE_BACKEND_API, PUBLIC_BACKEND_API } from 'src/config-global';

/** Api Endpoints for public api */
export const publicEndpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
};

/**
 * Get Full public Api Endpoint
 * @param {string} endpoint
 * @returns {string}
 */
export const getPublicEndpoint = (endpoint) => `${PUBLIC_BACKEND_API}${endpoint}`;

/** Api Endpoints for private api */
export const privateEndpoints = {
  auth: {
    login: '/auth/login',
    register: '/users/signup',
  },
};

/**
 * Get Full private Api Endpoint
 * @param {string} endpoint
 * @returns {string}
 */
export const getPrivateEndpoint = (endpoint) => `${PRIVATE_BACKEND_API}${endpoint}`;
