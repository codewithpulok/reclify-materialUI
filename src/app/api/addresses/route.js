import { ApiError, credentialFetch, endpoints, serverAsyncWrapper } from 'src/utils/api/server';

// POST: create new address
export const POST = serverAsyncWrapper(async (req) => {
  const body = await req.json();

  const response = await credentialFetch(endpoints.addresses.create, {
    body: JSON.stringify(body),
    method: 'POST',
  });

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});
