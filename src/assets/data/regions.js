/** @type {RegionType[]} */
export const regionScopes = [
  { name: 'United States', code: 'us', icon: 'emojione-monotone:flag-for-united-states' },
  { name: 'Global', code: 'global', icon: 'solar:global-bold-duotone' },
];

/** @type {RegionType[]} - United States Regions */
export const usRegions = [
  {
    name: 'Northeast',
    code: 'northeast',
    icon: 'ri:progress-2-line',
    rotate: 0,
    states: ['PA', 'NJ', 'CT', 'RI', 'MA', 'NY', 'VT', 'ME', 'NH'],
  },
  {
    name: 'Midwest',
    code: 'midwest',
    icon: 'ri:progress-8-line',
    states: ['ND', 'DS', 'NE', 'KS', 'MN', 'IA', 'MO', 'WI', 'MI', 'IL', 'IN', 'OH'],
  },
  {
    name: 'West',
    code: 'West',
    icon: 'radix-icons:half-2',
    rotate: 0,
    states: ['MT', 'WY', 'CO', 'NM', 'ID', 'UT', 'AZ', 'WA', 'OR', 'CA', 'NV'],
  },
  {
    name: 'South',
    code: 'south',
    icon: 'radix-icons:half-2',
    rotate: 1,
    states: [
      'OK',
      'TX',
      'AR',
      'LA',
      'MS',
      'KY',
      'TN',
      'AL',
      'WV',
      'GA',
      'MD',
      'DE',
      'DC',
      'VA',
      'NA',
      'SC',
      'FL',
    ],
  },
  {
    name: 'Alaska/Hawaii',
    code: 'alaska-hawai',
    icon: 'circle-flags:us-ak',
    rotate: 0,
    states: ['AK', 'HI'],
  },
  {
    name: 'Territories',
    code: 'territories',
    icon: 'emojione-monotone:flag-for-us-virgin-islands',
    rotate: 0,
    states: ['AS', 'MP', 'GU', 'PR', 'VI'],
  },
];

/** @type {RegionType[]} - Global Regions */
export const globalRegions = [
  { name: 'Canada', code: 'canada' },
  { name: 'Latin America', code: 'latin-america' },
  { name: 'Europe', code: 'europe' },
  { name: 'Africa', code: 'africa' },
  { name: 'Middle East', code: 'middle-east' },
  { name: 'Asia', code: 'asia' },
];

export const getRegionsByScope = (code) => {
  switch (code) {
    case 'us':
      return usRegions;
    case 'global':
      return globalRegions;
    default:
      return [];
  }
};

// ----------------------------------------------------
// ----------------------------------------------------
// ----------------------------------------------------
// ----------------------------------------------------

/**
 * get region by region code
 * @param {string} code
 * @returns {RegionType | undefined}
 */
export const getRegionByCode = (code) =>
  [...globalRegions, ...usRegions, ...regionScopes].find((r) => r.code === code);

export const getRegionByStateCode = (code) =>
  usRegions.find((r) => {
    if (!Array.isArray(r?.states)) return false;

    return r?.states?.includes(code);
  });

export const getRegionScope = (code) => regionScopes.find((f) => f.code === code);
