/**
 * type def for next js request
 * @typedef {import('next/server').NextRequest} NextRequestType
 */

/**
 * type def for next request
 * @typedef {import('next/server').NextResponse} NextResponseType
 */

/**
 * Success Response for client side API
 * @template R
 * @typedef {Object} ClientSuccessResponse
 * @property {boolean} isSuccess - indicate success response
 * @property {R} results - nececcery data with the response
 */

/**
 * Error Response for client side API
 * @typedef {Object} ClientErrorResponse
 * @property {boolean} isError - indicate error response
 * @property {number} statusCode - status code for the response
 * @property {any} message - message for the response
 */

/**
 * Client response type
 * @template RESULTS
 * @typedef {ClientSuccessResponse<RESULTS>|ClientErrorResponse} ClientResponse
 */

/**
 * Client async wrapper handler function
 * @template T
 * @template R
 * @callback ClientAsyncHandler
 * @param {T} param
 * @returns {Promise<ClientResponse<R>>}
 */

/**
 * Client async wrapper return function
 * @template T
 * @template R
 * @callback ClientAsyncReturn
 * @param {T} param
 * @returns {Promise<ClientResponse<R>>}
 */
