import { PUBLIC_BACKEND_API } from 'src/config-global';

/**
 * login api handler
 * @param {object} body
 * @returns {Promise<{isError: boolean, isSuccess: boolean}>}
 */
const loginApi = async (body) => {
  try {
    const response = await fetch(`${PUBLIC_BACKEND_API}/api/auth/login`, {
      body: JSON.stringify(body),
      method: 'POST',
    });

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error('Utill Api Error: ', error);
    return { isError: true, message: error?.message || 'Something went to wrong', statusCode: 500 };
  }
};

export default loginApi;
