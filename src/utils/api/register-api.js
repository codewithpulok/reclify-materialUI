import { getPublicEndpoint, publicEndpoints } from './endpoints';
import { clientAsyncWrapper } from './helpers';

/**
 * @typedef {Object} RegisterApiBody
 * @property {string} firstName - The first name.
 * @property {string} lastName - The last name.
 * @property {string} region - The region code. Must be one of the valid region codes.
 * @property {string} userType - The account type. Should be either 'customer' or 'seller'.
 * @property {string} email - The email address. Must be a valid email format.
 * @property {string} password - The password.
 */

/** @type {ClientAsyncReturn<RegisterApiBody>} */
const registerApi = clientAsyncWrapper(async (body) => {
  const response = await fetch(getPublicEndpoint(publicEndpoints.auth.register), {
    body: JSON.stringify(body),
    method: 'POST',
  });

  const jsonResponse = await response.json();
  return jsonResponse;
});

export default registerApi;
