import { ApiError, credentialFetch, endpoints, serverAsyncWrapper } from 'src/utils/api/server';

export const dynamic = 'force-dynamic';

// GET: search for addresses
export const GET = serverAsyncWrapper(async (req) => {
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get('search');

  const response = await credentialFetch(`${endpoints.addresses.search}?search=${searchQuery}`);

  const jsonResponse = await response.json();

  if (jsonResponse.error) throw new ApiError(jsonResponse?.message, jsonResponse?.statusCode);

  return jsonResponse;
});
