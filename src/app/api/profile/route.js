import { ApiError, credentialFetch, endpoints, serverAsyncWrapper } from 'src/utils/api/server';

// PUT: update user profile
export const PUT = serverAsyncWrapper(async (req) => {
  const body = await req.json();

  const response = await credentialFetch(endpoints.profile.update, {
    body: JSON.stringify(body),
    method: 'PUT',
  });

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});

// GET: user profile details
export const GET = serverAsyncWrapper(async (req) => {
  const response = await credentialFetch(endpoints.profile.get);

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});
