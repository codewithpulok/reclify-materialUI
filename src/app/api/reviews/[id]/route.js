import { headers } from 'next/headers';
import { ApiError, serverAsyncWrapper } from 'src/utils/api';
import { endpoints, getEndpoint } from 'src/utils/api/endpoints';

// update review by id
export const PUT = serverAsyncWrapper(async (req, { params }) => {
  const authorization = headers().get('authorization');
  const body = await req.json();

  const response = await fetch(getEndpoint(`${endpoints.reviews.update}`), {
    body: JSON.stringify(body),
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization,
    },
  });

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});

// delete review by id
export const DELETE = serverAsyncWrapper(async (req, { params }) => {
  const authorization = headers().get('authorization');
  const response = await fetch(getEndpoint(`${endpoints.reviews.delete}/${params.id}`), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization,
    },
  });

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});