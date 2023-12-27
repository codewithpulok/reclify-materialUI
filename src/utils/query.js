/**
 * Create query string
 * @param {string} name
 * @param {string} value
 * @param {string} queryString
 * @returns {string}
 */
export const createQueryString = (name, value, queryString) => {
  const params = new URLSearchParams(queryString);
  params.set(name, value);

  return params.toString();
};
