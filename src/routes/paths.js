// ----------------------------------------------------------------------

import { regions } from 'src/assets/data';

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  website: 'https://racklify.com',

  // Main Links
  about_us: '/about-us',
  contact_us: '/contact-us',
  faqs: '/faqs',
  terms: '/terms-and-conditions',
  privacy: '/privacy-policy',

  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
  },

  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    // users sections
    users: {
      root: `${ROOTS.DASHBOARD}/users`,
      sellers: `${ROOTS.DASHBOARD}/users/sellers`,
      customers: `${ROOTS.DASHBOARD}/users/customers`,
    },
    // warehouses section
    warehouses: {
      root: `${ROOTS.DASHBOARD}/warehouses`,
      create: `${ROOTS.DASHBOARD}/warehouses/create`,
      edit: `${ROOTS.DASHBOARD}/warehouses/edit`,
      hot_deals: `${ROOTS.DASHBOARD}/warehouses/hot-deals`,
      // warehouses by region
      ...regions.reduce(
        (prev, next) =>
          Object.assign(prev, { [next.code]: `${ROOTS.DASHBOARD}/warehouses/${next.code}` }),
        {}
      ),
    },
    // messages section
    messages: {
      root: `${ROOTS.DASHBOARD}/messages`,
    },
  },

  settings: {
    root: ROOTS.SETTINGS,
    general: `${ROOTS.SETTINGS}#general`,
    warehouses: `${ROOTS.SETTINGS}#warehouses`,
    billing: `${ROOTS.SETTINGS}#billing`,
    transactions: `${ROOTS.SETTINGS}#transactions`,
    security: `${ROOTS.SETTINGS}#security`,
  },
};
