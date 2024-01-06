import { ApiError, serverAsyncWrapper } from 'src/utils/api';
import { endpoints, getEndpoint } from 'src/utils/api/endpoints';

// update warehouse by id
export const PUT = serverAsyncWrapper(async (req, { params }) => {
  const body = await req.json();
  const response = await fetch(getEndpoint(`${endpoints.warehouses.update}/${params.id}`), {
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
export const GET = serverAsyncWrapper(async (req, { params }) => {
  const response = await fetch(getEndpoint(`${endpoints.warehouses.get}/${params.id}`), {
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
export const DELETE = serverAsyncWrapper(async (req, { params }) => {
  const response = await fetch(getEndpoint(`${endpoints.warehouses.delete}/${params.id}`), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});
