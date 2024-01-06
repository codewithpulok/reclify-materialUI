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
 * @typedef {Object} ClientSuccessResponse
 * @property {boolean} isSuccess - indicate success response
 * @property {T} results - nececcery data with the response
 * @template T
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
 * @typedef {ClientSuccessResponse | ClientErrorResponse} ClientResponse
 */

/**
 * Client async wrapper handler function
 * @callback ClientAsyncHandler
 * @param {T} param
 * @returns {Promise<ClientResponse>}
 * @template T
 */

/**
 * Client async wrapper return function
 * @callback ClientAsyncReturn
 * @param {T} param
 * @returns {Promise<ClientResponse>}
 * @template T
 */
