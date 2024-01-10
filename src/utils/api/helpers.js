import { NextResponse } from 'next/server';

// custom error object
export class ApiError extends Error {
  constructor(message = 'Something wents to wrong', code = 500) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
  }
}

/**
 * handler function for client response
 * @param {ClientResponse} response
 * @param {ResponseInit} config
 * @returns {NextResponse}
 */
export const clientResponse = (response, config) => NextResponse.json(response, config);

/**
 * server side async wrapper
 * @param {(req: NextRequestType, others: {params: object}) => Promise<any>} handlerFunc
 * @returns {(req: NextRequestType, others: {params: object}) => NextResponse<ClientResponse>}
 */
export const serverAsyncWrapper = (handlerFunc) => async (req, others) => {
  try {
    const response = await handlerFunc(req, others);

    // success response
    return clientResponse(
      {
        isSuccess: response?.success,
        results: response?.results,
        statusCode: response?.statusCode,
      },
      { status: response?.statusCode }
    );
  } catch (error) {
    console.log('Server Side Error: ', error);

    // failure response for - Api error
    if (error instanceof ApiError) {
      return clientResponse(
        {
          message: error.message,
          isError: true,
          statusCode: error.code,
        },
        { status: error?.statusCode }
      );
    }

    // failure response for - runtime error
    return clientResponse(
      {
        message: error?.message || 'Error in requesting the process',
        isError: true,
        statusCode: 500,
      },
      { status: 500 }
    );
  }
};

/**
 * client side async wrapper
 * @param {ClientAsyncHandler<T>} handlerFunc
 * @returns {ClientAsyncReturn<T>}
 * @template T
 */
export const clientAsyncWrapper = (handlerFunc) => async (param) => {
  try {
    const response = await handlerFunc(param);

    // success response
    return { ...response };
  } catch (error) {
    console.log('Client Side Error: ', error);

    // failure response for - runtime error
    return {
      message: error?.message || 'Error in requesting the api',
      isError: true,
      statusCode: 500,
    };
  }
};
