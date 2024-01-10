/** @type {RegionType[]} */
export const regions = [
  { name: 'Midwest', code: 'midwest' },
  { name: 'Northeast', code: 'northeast' },
  { name: 'Northwest', code: 'northwest' },
  { name: 'Southeast', code: 'southeast' },
  { name: 'Southwest', code: 'southwest' },
];

/**
 * get region by region code
 * @param {string} code
 * @returns {RegionType | undefined}
 */
export const getRegionByCode = (code) => regions.find((r) => r.code === code);
