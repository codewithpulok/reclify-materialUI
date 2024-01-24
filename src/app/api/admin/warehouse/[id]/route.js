import { ApiError, credentialFetch, endpoints, serverAsyncWrapper } from 'src/utils/api/server';

// PUT: update warehoue by admin
export const PUT = serverAsyncWrapper(async (req, { params }) => {
  const body = await req.json();

  const response = await credentialFetch(`${endpoints.admin.warehouse(params.id)}`, {
    body: JSON.stringify(body),
    method: 'PUT',
  });

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});
