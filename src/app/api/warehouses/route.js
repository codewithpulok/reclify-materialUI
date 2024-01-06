import { ApiError, serverAsyncWrapper } from 'src/utils/api';
import { getPrivateEndpoint, privateEndpoints } from 'src/utils/api/endpoints';

// create new warehouse
export const POST = serverAsyncWrapper(async (req) => {
  const body = await req.json();
  const response = await fetch(getPrivateEndpoint(privateEndpoints.warehouses.create), {
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

// get all warehouses
export const GET = serverAsyncWrapper(async (req) => {
  const response = await fetch(getPrivateEndpoint(privateEndpoints.warehouses.list), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});
