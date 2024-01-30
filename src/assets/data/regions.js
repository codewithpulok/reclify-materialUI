/** @type {RegionType[]} */
export const regionScopes = [
  { name: 'United States', code: 'us', icon: 'emojione-monotone:flag-for-united-states' },
  { name: 'Global', code: 'global', icon: 'solar:global-bold-duotone' },
];

/** @type {RegionType[]} - United States Regions */
export const usRegions = [
  { name: 'Northeast', code: 'northeast', icon: 'ri:progress-2-line', rotate: 0 },
  { name: 'Northwest', code: 'northwest', icon: 'ri:progress-2-line', rotate: 3 },
  { name: 'Midwest', code: 'midwest', icon: 'ri:progress-8-line' },
  { name: 'Southeast', code: 'southeast', icon: 'ri:progress-2-line', rotate: 1 },
  { name: 'Southwest', code: 'southwest', icon: 'ri:progress-2-line', rotate: 2 },
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

/** @type {RegionType[]} */
export const regions = [
  { name: 'Northeast', code: 'northeast', icon: 'ri:progress-2-line', rotate: 0 },
  { name: 'Northwest', code: 'northwest', icon: 'ri:progress-2-line', rotate: 3 },
  { name: 'Midwest', code: 'midwest', icon: 'ri:progress-8-line' },
  { name: 'Southeast', code: 'southeast', icon: 'ri:progress-2-line', rotate: 1 },
  { name: 'Southwest', code: 'southwest', icon: 'ri:progress-2-line', rotate: 2 },
];

/**
 * get region by region code
 * @param {string} code
 * @returns {RegionType | undefined}
 */
export const getRegionByCode = (code) =>
  [...globalRegions, ...usRegions, ...regionScopes].find((r) => r.code === code);
