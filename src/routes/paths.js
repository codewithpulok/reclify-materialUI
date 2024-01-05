// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  WAREHOUSE: '/warehouse',
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
    jwt: {
      login: `${ROOTS.AUTH}/login`,
      register: `${ROOTS.AUTH}/register`,
    },
  },

  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    listing: `${ROOTS.DASHBOARD}/listing`,
    warehouse_users: `${ROOTS.DASHBOARD}/warehouse-users`,
  },

  // WAREHOUSE
  warehouse: {
    root: `${ROOTS.WAREHOUSE}`,
  },
};
