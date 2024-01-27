/**
 * Restrict Negetive value on number input field
 * @param {number | string} v
 * @returns {number | string}
 */
export const restrictNegetiveValue = (v) => (v !== '' && Number(v) < 0 ? 0 : v);
