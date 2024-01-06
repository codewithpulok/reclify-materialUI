import { ApiError, serverAsyncWrapper } from 'src/utils/api';
import { getPrivateEndpoint, privateEndpoints } from 'src/utils/api/endpoints';

// update warehouse by id
export const PUT = serverAsyncWrapper(async (req) => {
  const body = await req.json();
  const response = await fetch(getPrivateEndpoint(privateEndpoints.warehouses.update), {
    body: JSON.stringify(body),
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});

// get warehouse by id
export const GET = serverAsyncWrapper(async (req) => {
  const response = await fetch(getPrivateEndpoint(privateEndpoints.warehouses.get), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});

// delete warehouse by id
export const DELETE = serverAsyncWrapper(async (req) => {
  const response = await fetch(getPrivateEndpoint(privateEndpoints.warehouses.delete), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});
