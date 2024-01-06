import { ApiError, serverAsyncWrapper } from 'src/utils/api';
import { getPrivateEndpoint, privateEndpoints } from 'src/utils/api/endpoints';

export const POST = serverAsyncWrapper(async (req) => {
  const body = await req.json();
  const response = await fetch(getPrivateEndpoint(privateEndpoints.auth.register), {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});
