/**
 * Represents a service.
 * @typedef {Object} Service
 * @property {string} id
 * @property {string} type - The type of the service (e.g., "transportation").
 * @property {{[key: string]: boolean}} features - Features of the transportation service.
 * @property {Photo[]} photos - Array of photos associated with the transportation service.
 * @property {string} description - A description of the transportation service.
 * @property {Array<string>} keyFeatures - An array of key features of the transportation service.
 * @property {CustomerList[]} customerList - A string containing the names of clients associated with the transportation service.
 * @property {number} businessSize - The size of the transportation service's business.
 * @property {number} foundedYear - The year the transportation service was founded (between 1800 to the current year).
 * @property {string} cta - Call to action text for the transportation service.
 * @property {string} promoCode - A promotional code associated with the transportation service.
 */

/**
 * @typedef {Object} CustomerList
 * @property {string} name
 * @property {string} image
 */
