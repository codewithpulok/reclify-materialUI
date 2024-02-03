import { PUBLIC_BACKEND_API } from 'src/config-global';

/** Api Endpoints for public api */
export const endpoints = {
  root: PUBLIC_BACKEND_API,
  auth: {
    root: '/auth',
    login: `/login`,
    register: `/register`,
    password: {
      change: '/reset-password',
    },
  },
  warehouses: {
    root: '/warehouse',
    list: `/`,
    create: `/`,
    own: `/own`,
    get: (id) => `/${id}`,
    delete: (id) => `/${id}`,
    update: (id) => `/${id}`,
  },
  reviews: {
    root: '/review',
    create: '/',
    delete: (id) => `/${id}`,
    update: (id) => `/${id}`,
  },
  address: {
    root: '/address',
    search: (query) => `/search?search=${query}`,
    create: '/',
    update: '/',
    get: (id) => `/${id}`,
    delete: (id) => `/${id}`,
  },
  file_upload: {
    root: '/file-upload',
    list: '/',
    create: '/',
    get: (id) => `/${id}`,
    delete: (id) => `/${id}`,
  },
  admin: {
    root: '/admin',
    warehouse: {
      update: (id) => `/warehouse/${id}`,
    },
    users: {
      list: '/users',
      get: (id) => `/users/${id}`,
    },
  },
  profile: {
    root: '/user/profile',
    update: '/',
    get: '/',
  },
  service: {
    root: '/services',
    list: '/',
    get: (id) => `/${id}`,
    own: `/own`,
    updateOwn: `/own`,
  },
  purchase: {
    root: '/purchase',
    create: '/',
  },
  transaction: {
    root: '/user/transaction',
    list: '/',
    cancel: (id) => `/cancel/${id}`,
    approve: (id) => `/approve/${id}`,
  },
  billing_info: {
    root: '/user/billing-info',
    list: `/`,
    create: '/',
    primary: `/primary`,
    get: (id) => `/${id}`,
    update: (id) => `/${id}`,
    delete: (id) => `/${id}`,
  },
  cards: {
    root: '/user/cards',
    list: '/',
    create: '/',
    primary: `/primary`,
    get: (id) => `/${id}`,
    update: (id) => `/${id}`,
    delete: (id) => `/${id}`,
  },
  plans: {
    root: '/plans',
    list: '/',
    create: '/',
    get: (id) => `/${id}`,
    upgrade: (id) => `/upgrade/${id}`,
    cancel: `/cancel`,
  },
  invoices: {
    root: '/invoices',
    list: '/',
  },
  blogs: {
    root: '/posts',
    list: '/',
    create: '/',
    get: (id) => `/${id}`,
    update: (id) => `/${id}`,
    delete: (id) => `/${id}`,
  },
};
