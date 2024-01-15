/** @type {RegionType[]} */
export const regions = [
  { name: 'Northeast', code: 'northeast', icon: 'ri:progress-2-line', rotate: 0 },
  { name: 'Northwest', code: 'northwest', icon: 'ri:progress-2-line', rotate: 3 },
  { name: 'Midwest', code: 'midwest', icon: 'ri:circle-line' },
  { name: 'Southeast', code: 'southeast', icon: 'ri:progress-2-line', rotate: 1 },
  { name: 'Southwest', code: 'southwest', icon: 'ri:progress-2-line', rotate: 2 },
];

/**
 * get region by region code
 * @param {string} code
 * @returns {RegionType | undefined}
 */
export const getRegionByCode = (code) => regions.find((r) => r.code === code);
