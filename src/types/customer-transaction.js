/**
 * Represents a transaction object.
 *
 * @typedef {Object} CustomerTransaction
 * @property {string} id - The unique identifier for the transaction.
 * @property {string} warehouseId - The identifier of the warehouse associated with the transaction.
 * @property {Warehouse} warehouse
 * @property {string} sellerId - The identifier of the seller associated with the transaction.
 * @property {User} seller
 * @property {string} customerId - The identifier of the customer associated with the transaction.
 * @property {User} customer
 * @property {number} createdAt - The timestamp when the transaction was created (in milliseconds).
 * @property {number} updatedAt - The timestamp when the transaction was last updated (in milliseconds).
 * @property {CustomerTransactionStatus} status - The status of the transaction, which can be 'completed', 'pending', or 'declined'.
 * @property {number} price - The price of the transaction.
 */

/**
 * @typedef {'completed' | 'pending' | 'declined'} CustomerTransactionStatus
 */
