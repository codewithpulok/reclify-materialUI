/**
 * Represents a transaction object.
 *
 * @typedef {Object} Transaction
 * @property {string} id - The unique identifier for the transaction.
 * @property {string} warehouseId - The identifier of the warehouse associated with the transaction.
 * @property {Warehouse} warehouse
 * @property {string} sellerId - The identifier of the seller associated with the transaction.
 * @property {User} seller
 * @property {string} customerId - The identifier of the customer associated with the transaction.
 * @property {User} customer
 * @property {number} createdAt - The timestamp when the transaction was created (in milliseconds).
 * @property {number} updatedAt - The timestamp when the transaction was last updated (in milliseconds).
 * @property {TransactionStatus} status - The status of the transaction, which can be 'completed', 'pending', or 'declined'.
 * @property {number} area - The area (space) associated with the transaction.
 * @property {number} pricePerSquare - The price per square unit of the transaction area.
 */

/**
 * @typedef {'completed' | 'pending' | 'declined' | 'cancelled'} TransactionStatus
 */
