import { headers } from 'next/headers';
import { ApiError, endpoints, getEndpoint, serverAsyncWrapper } from 'src/utils/api';

// create new reviews
export const POST = serverAsyncWrapper(async (req) => {
  const body = await req.json();
  const authorization = headers().get('authorization');
  const response = await fetch(getEndpoint(endpoints.reviews.create), {
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
