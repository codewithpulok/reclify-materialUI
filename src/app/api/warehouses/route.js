import { headers } from 'next/headers';

import { ApiError, endpoints, serverAsyncWrapper } from 'src/utils/api/server';

// create new warehouse
export const POST = serverAsyncWrapper(async (req) => {
  const body = await req.json();
  const authorization = headers().get('authorization');
  const response = await fetch(endpoints.warehouses.create, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization,
    },
  });

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});

// get all warehouses
export const GET = serverAsyncWrapper(async (req) => {
  const authorization = headers().get('authorization');

  const response = await fetch(endpoints.warehouses.list, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization,
    },
  });

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});
