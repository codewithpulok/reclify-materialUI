import { ApiError, credentialFetch, endpoints, serverAsyncWrapper } from 'src/utils/api/server';

// upload new files
export const POST = serverAsyncWrapper(async (req) => {
  const body = await req.formData();

  const response = await credentialFetch(
    endpoints.upload.files.upload,
    { body, method: 'POST' },
    false
  );

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});

// get all files
export const GET = serverAsyncWrapper(async () => {
  const response = await credentialFetch(endpoints.upload.files.list);

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});
