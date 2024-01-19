import { ApiError, credentialFetch, endpoints, serverAsyncWrapper } from 'src/utils/api/server';

// DELETE: single file
export const DELETE = serverAsyncWrapper(async (_req, { params }) => {
  const response = await credentialFetch(`${endpoints.upload.files.upload}/${params?.id}`, {
    method: 'DELETE',
  });

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});

// GET: single file
export const GET = serverAsyncWrapper(async (_req, { params }) => {
  const response = await credentialFetch(`${endpoints.upload.files.get}/${params?.id}`);

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});
