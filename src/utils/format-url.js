/**
 * @param {string} url
 * @returns {string}
 */
export const removeProtocol = (url) => {
  if (!url || typeof url !== 'string') return '';

  return url.replace(/^\/\/|^.*?:(\/\/)?/, '');
};
