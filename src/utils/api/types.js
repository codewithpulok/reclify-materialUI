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
 * @typedef {Object} SuccessResponse
 * @property {boolean} success - indicate success response
 * @property {R} results - nececcery data with the response
 */

/**
 * Error Response for client side API
 * @typedef {Object} ErrorResponse
 * @property {boolean} isError - indicate error response
 * @property {number} statusCode - status code for the response
 * @property {any} message - message for the response
 */

/**
 * Client response type
 * @template RESULTS
 * @typedef {SuccessResponse<RESULTS>|ErrorResponse} ClientResponse
 */

/**
 * Client async wrapper handler function
 * @template T
 * @template R
 * @callback AsyncHandler
 * @param {T} param
 * @returns {Promise<ClientResponse<R>>}
 */

/**
 * Client async wrapper return function
 * @template T
 * @template R
 * @callback AsyncReturn
 * @param {T} param
 * @returns {Promise<ClientResponse<R>>}
 */
