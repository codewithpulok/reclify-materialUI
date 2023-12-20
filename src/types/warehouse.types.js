/**
 * Represents information about Warehouse Info.
 * @typedef {Object} Warehouse
 * @property {string} id - The unique identifier for warehouse.
 * @property {string} name - The name of the warehouse, in this case, 'Ware House'.
 * @property {string} location - The location of the warehouse, e.g., 'City Center'.
 * @property {string} description - The description of the warehouse, e.g., 'Modern storage facility in the heart of the city.'.
 * @property {number} totalSpace - The total space of the warehouse, e.g., 5000.
 * @property {number} pricePerSquare - The price of the warehouse space per square, e.g., 1.5.
 * @property {Photo[]} photos - An array of photo objects representing the warehouse's photos.
 * @property {boolean} isVerified - warehouse is verified by admin or not
 * @property {boolean} isFeatured - Warehouse is featured or not.
 *
 */

/**
 * Represents a photo associated with Warehouse.
 * @typedef {Object} Photo
 * @property {string} id - The unique identifier for the photo.
 * @property {string} title - The title of the photo.
 * @property {string} coverUrl - The URL of the photo's cover image.
 */
