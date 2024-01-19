import { ApiError, credentialFetch, endpoints, serverAsyncWrapper } from 'src/utils/api/server';

// PUT: update address
export const PUT = serverAsyncWrapper(async (req, { params }) => {
  const body = await req.json();

  const response = await credentialFetch(endpoints.warehouses.update, {
    body: JSON.stringify(body),
    method: 'PUT',
  });

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});

// GET: get address
export const GET = serverAsyncWrapper(async (req, { params }) => {
  const response = await credentialFetch(`${endpoints.addresses.get}/${params.id}`);

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});

// DELETE: delete address
export const DELETE = serverAsyncWrapper(async (_req, { params }) => {
  const response = await credentialFetch(`${endpoints.addresses.delete}/${params.id}`, {
    method: 'DELETE',
  });

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});
