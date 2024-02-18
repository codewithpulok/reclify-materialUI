/**
 * Create query string
 * @param {string} name
 * @param {string} value
 * @param {string} queryString
 * @returns {string}
 */
export const createQueryString = (name, value, queryString) => {
  const params = new URLSearchParams(queryString);

  if (value === null) {
    params.delete(name);
  } else {
    params.set(name, value);
  }

  return params.toString();
};
