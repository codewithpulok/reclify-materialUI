// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
  NEWS: '/news',
  WAREHOUSES: '/warehouses',
  SERVICES: '/services',
};

// ----------------------------------------------------------------------

export const paths = {
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

      hidden: `${ROOTS.DASHBOARD}/warehouses/hidden`,
      not_verified: `${ROOTS.DASHBOARD}/warehouses/not-verified`,
      not_featured: `${ROOTS.DASHBOARD}/warehouses/not-featured`,
      not_rated: `${ROOTS.DASHBOARD}/warehouses/not-rated`,

      // warehouses by region
      region: (region) => `${ROOTS.DASHBOARD}/warehouses/region/${region}`,
    },

    // services section
    services: {
      root: `${ROOTS.DASHBOARD}/services`,
      details: (id) => `${ROOTS.DASHBOARD}/services/${id}`,

      // services by type
      type: (type) => `${ROOTS.DASHBOARD}/services/type/${type}`,
    },

    // messages section
    messages: {
      root: `${ROOTS.DASHBOARD}/messages`,
      thread: (id) => `${ROOTS.DASHBOARD}/messages?id=${id}`,
    },

    search: {
      root: `${ROOTS.DASHBOARD}/search`,
      warehouses: (query) => `${ROOTS.DASHBOARD}/search/warehouses?query=${query}`,
      users: (query) => `${ROOTS.DASHBOARD}/search/users?query=${query}`,
      services: (query) => `${ROOTS.DASHBOARD}/search/services?query=${query}`,
    },
  },

  // SETTINGS
  settings: {
    root: ROOTS.SETTINGS,
    general: `${ROOTS.SETTINGS}#general`,
    warehouses: `${ROOTS.SETTINGS}#warehouses`,
    billing: `${ROOTS.SETTINGS}#billing`,
    transactions: `${ROOTS.SETTINGS}#transactions`,
    security: `${ROOTS.SETTINGS}#security`,
  },

  // NEWS
  news: {
    root: ROOTS.NEWS,
    details: (slug) => `${ROOTS.NEWS}/${slug}`,
  },

  // WAREHOUSES
  warehouses: {
    root: `${ROOTS.WAREHOUSES}`,
    details: (id) => `${ROOTS.WAREHOUSES}/${id}`,
    hot_deals: `${ROOTS.WAREHOUSES}/hot-deals`,
    // warehouses by region
    region: (region) => `${ROOTS.WAREHOUSES}/region/${region}`,
  },

  // SERVICES
  services: {
    root: `${ROOTS.SERVICES}`,
    details: (id) => `${ROOTS.SERVICES}/${id}`,
    // services by type
    type: (type) => `${ROOTS.SERVICES}/type/${type}`,
  },
};
