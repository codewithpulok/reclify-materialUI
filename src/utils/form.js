/**
 * Restrict Negetive value on number input field
 * @param {number | string} v
 * @returns {number}
 */
export const restrictNegetiveValue = (v) => {
  if (v === '') return v;

  return v !== '' && Number(v) < 0 ? 0 : Number(Number(v).toFixed(2));
};

/**
 * Restrict Percent value on number input field
 * @param {number | string} v
 * @returns {number}
 */
export const restrictPercentValue = (v) => {
  if (v === '') return v;

  const notNegetive = restrictNegetiveValue(v);

  return Number(notNegetive) > 100 ? 100 : notNegetive;
};

/**
 * Restrict max length on text input field
 * @param {number} max
 * @returns {(v: string) => string}
 */
export const restrictMaxLength = (max) => (v) => v.slice(0, max);
