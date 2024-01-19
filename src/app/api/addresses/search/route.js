import { ApiError, credentialFetch, endpoints, serverAsyncWrapper } from 'src/utils/api/server';

// GET: search for addresses
export const GET = serverAsyncWrapper(async (req) => {
  const { searchParams } = req.nextUrl;
  const searchQuery = searchParams.get('search');

  const response = await credentialFetch(`${endpoints.addresses.search}?search=${searchQuery}`);

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});
