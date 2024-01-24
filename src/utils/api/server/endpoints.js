import { PRIVATE_BACKEND_API } from 'src/config-global';

/** Api Endpoints for private api */
export const endpoints = {
  auth: {
    login: `${PRIVATE_BACKEND_API}/auth/login`,
    register: `${PRIVATE_BACKEND_API}/auth/signup`,
  },
  warehouses: {
    list: `${PRIVATE_BACKEND_API}/warehouse`,
    get: `${PRIVATE_BACKEND_API}/warehouse`,
    delete: `${PRIVATE_BACKEND_API}/warehouse`,
    create: `${PRIVATE_BACKEND_API}/warehouse`,
    update: `${PRIVATE_BACKEND_API}/warehouse`,
  },
  reviews: {
    delete: `${PRIVATE_BACKEND_API}/review`,
    create: `${PRIVATE_BACKEND_API}/review`,
    update: `${PRIVATE_BACKEND_API}/review`,
  },
  upload: {
    files: {
      get: `${PRIVATE_BACKEND_API}/file-upload`,
      list: `${PRIVATE_BACKEND_API}/file-upload`,
      upload: `${PRIVATE_BACKEND_API}/file-upload`,
      delete: `${PRIVATE_BACKEND_API}/file-upload`,
    },
  },
  addresses: {
    get: `${PRIVATE_BACKEND_API}/address`,
    search: `${PRIVATE_BACKEND_API}/address/search`,
    delete: `${PRIVATE_BACKEND_API}/address`,
    create: `${PRIVATE_BACKEND_API}/address`,
    update: `${PRIVATE_BACKEND_API}/address`,
  },
  admin: {
    warehouse: (id) => `${PRIVATE_BACKEND_API}/admin/warehouse/${id}`,
  },
  profile: {
    get: `${PRIVATE_BACKEND_API}/user/profile`,
    update: `${PRIVATE_BACKEND_API}/user/profile`,
  },
};
