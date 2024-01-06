import { getPublicEndpoint, publicEndpoints } from './endpoints';
import { clientAsyncWrapper } from './helpers';

/**
 * login types
 * @typedef {Object} LoginApiBody
 * @property {string} email
 * @property {string} password
 */

/** @type {ClientAsyncReturn<LoginApiBody>} */
const loginApi = clientAsyncWrapper(async (body) => {
  const response = await fetch(getPublicEndpoint(publicEndpoints.auth.login), {
    body: JSON.stringify(body),
    method: 'POST',
  });

  const jsonResponse = await response.json();
  return jsonResponse;
});

export default loginApi;
