// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
  NEWS: '/news',
  WAREHOUSES: '/warehouses',
  SERVICES: '/services',
  SEARCH: '/search',
};

// ----------------------------------------------------------------------

export const paths = {
  website: 'https://racklify.com',
  root: '/',

  // Page Links
  about_us: '/about-us',
  contact_us: '/contact-us',
  faqs: '/faqs',
  terms: '/terms-and-conditions',
  privacy: '/privacy-policy',
  media: '/media',
  rating_system: '/rating-system',
  subscriptions: '/#PRICING',
  supply_chain: '/supply-chain-logistics-definations',

  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
    forgot_password: `${ROOTS.AUTH}/forgot-password`,
    new_password: `${ROOTS.AUTH}/new-password`,
    email_verify: `${ROOTS.AUTH}/email-verify`,
    refresh: `${ROOTS.AUTH}/refresh`,
    onboarding: `${ROOTS.AUTH}/onboarding`,
    kyc: `${ROOTS.AUTH}/kyc`,
  },

  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    // users sections
    users: {
      root: `${ROOTS.DASHBOARD}/users`,
      sellers: `${ROOTS.DASHBOARD}/users/sellers`,
      customers: `${ROOTS.DASHBOARD}/users/customers`,
      seller: (id) => `${ROOTS.DASHBOARD}/users/sellers/${id}`,
      customer: (id) => `${ROOTS.DASHBOARD}/users/customers/${id}`,
    },

    // warehouses section
    warehouses: {
      root: `${ROOTS.DASHBOARD}/warehouses`,
      details: (id) => `${ROOTS.DASHBOARD}/warehouses/${id}`,
      create: `${ROOTS.DASHBOARD}/warehouses/create`,
      edit: (id) => `${ROOTS.DASHBOARD}/warehouses/edit/${id}`,
      clone: (id) => `${ROOTS.DASHBOARD}/warehouses/create/?clone=${id}`,
      hot_deals: `${ROOTS.DASHBOARD}/warehouses/hot-racks`,

      hidden: `${ROOTS.DASHBOARD}/warehouses/hidden`,
      not_verified: `${ROOTS.DASHBOARD}/warehouses/not-verified`,
      not_featured: `${ROOTS.DASHBOARD}/warehouses/not-featured`,
      not_rated: `${ROOTS.DASHBOARD}/warehouses/not-rated`,

      // warehouses by region
      region: (region) => `${ROOTS.DASHBOARD}/warehouses/region/${region}`,

      // warehouses by region scope
      regionScope: (scope) => `${ROOTS.DASHBOARD}/warehouses/${scope}`,
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

    // search section
    search: {
      root: `${ROOTS.DASHBOARD}/search`,
      results: (query) => `${ROOTS.DASHBOARD}/search?query=${query}`,
      warehouses: (query) => `${ROOTS.DASHBOARD}/search/warehouses?query=${query}`,
      users: (query) => `${ROOTS.DASHBOARD}/search/users?query=${query}`,
      services: (query) => `${ROOTS.DASHBOARD}/search/services?query=${query}`,
    },

    // news section
    news: {
      root: `${ROOTS.DASHBOARD}/news`,
      create: `${ROOTS.DASHBOARD}/news/create`,
      details: (id) => `${ROOTS.DASHBOARD}/news/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/news/edit/${id}`,
    },

    // WAREHOUSES
    transactions: {
      root: `${ROOTS.DASHBOARD}/transactions`,
      details: (id) => `${ROOTS.DASHBOARD}/transactions/${id}`,
    },
  },

  // SETTINGS
  settings: {
    root: ROOTS.SETTINGS,
    general: `${ROOTS.SETTINGS}#general`,
    warehouses: `${ROOTS.SETTINGS}#warehouses`,
    subscriptions: `${ROOTS.SETTINGS}#subscriptions`,
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
    hot_deals: `${ROOTS.WAREHOUSES}/hot-racks`,
    // warehouses by region
    region: (region) => `${ROOTS.WAREHOUSES}/region/${region}`,
    // warehouses by region scope
    regionScope: (scope) => `${ROOTS.WAREHOUSES}/${scope}`,
  },

  // SERVICES
  services: {
    root: `${ROOTS.SERVICES}`,
    details: (id) => `${ROOTS.SERVICES}/${id}`,
    // services by type
    type: (type) => `${ROOTS.SERVICES}/type/${type}`,
  },

  // SEARCH ROUTE
  search: {
    root: `${ROOTS.SEARCH}`,
    results: (query) => `${ROOTS.SEARCH}?query=${query}`,
    warehouses: (query) => `${ROOTS.SEARCH}/warehouses?query=${query}`,
    users: (query) => `${ROOTS.SEARCH}/users?query=${query}`,
    services: (query) => `${ROOTS.SEARCH}/services?query=${query}`,
  },

  // users sections
  users: {
    seller: (id) => `/users/seller/${id}`,
    customer: (id) => `/users/customer/${id}`,
  },
};
