import { TOKEN_STORAGE_KEY } from 'src/config-global';

/**
 * client side async wrapper
 * @param {ClientAsyncHandler<T, R>} handlerFunc
 * @returns {ClientAsyncReturn<T, R>}
 * @template T
 * @template R
 */
export const clientAsyncWrapper = (handlerFunc) => async (param) => {
  try {
    const response = await handlerFunc(param);

    // success response
    return { ...response };
  } catch (error) {
    console.log('Client Side Error: ', error);

    // failure response for - runtime error
    return {
      message: error?.message || 'Error in requesting the api',
      isError: true,
      statusCode: 500,
    };
  }
};

/**
 * fetch with credentials
 * @param {string} url
 * @param {RequestInit} config
 * @returns {Promise<Response>}
 */
export const credentialFetch = (url, config = {}) => {
  const headers = config?.headers || {};

  const token = sessionStorage.getItem(TOKEN_STORAGE_KEY);

  if (token) headers.authorization = `Bearer ${token}`;
  config.headers = headers;

  return fetch(url, config);
};
