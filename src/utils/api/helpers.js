// custom error object
export class ApiError extends Error {
  constructor(message = 'Something wents to wrong', code = 500) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
  }
}

/**
 * async wrapper
 * @param {(req: NextRequestType) => Promise<any>} handlerFunc
 * @returns {(req: NextRequestType) => Promise<any>}
 */
export const asyncWrapper = (handlerFunc) => async (req) => {
  try {
    const response = await handlerFunc(req);
    // success response
    return Response.json({
      result: response,
      isSuccess: true,
    });
  } catch (error) {
    console.log('Server Side Error: ', error);
    // failure response for - programmer thrown error
    if (error instanceof ApiError) {
      return Response.json({
        message: error.message,
        isError: true,
        statusCode: error.code,
      });
    }
    // failure response for - runtime error
    return Response.json({
      message: error?.message || 'Error in requesting the process',
      isError: true,
      statusCode: 500,
    });
  }
};

/**
 * type def for next js request
 * @typedef {import('next/server').NextRequest} NextRequestType
 */

/**
 * type def for next request
 * @typedef {import('next/server').NextResponse} NextResponseType
 */
