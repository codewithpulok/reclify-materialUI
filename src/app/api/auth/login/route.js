import { HOST_API } from 'src/config-global';
import { ApiError, asyncWrapper } from 'src/utils/api';

export const POST = asyncWrapper(async (req) => {
  const body = await req.json();
  const response = await fetch(`${HOST_API}/auth/login`, {
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
