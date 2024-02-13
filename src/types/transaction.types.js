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
 * @property {TransactionStatus} status - The status of the transaction, which can be 'completed', 'pending', 'admin_pending' or 'cancelled'.
 * @property {number} area - The area (space) associated with the transaction.
 * @property {number} pricePerSquare - The price per square unit of the transaction area.
 * @property {TransactionPurchase} purchase
 */

/**
 * @typedef {'completed' | 'pending' | 'cancelled' | 'admin_pending'} TransactionStatus
 */

/**
 * @typedef {Object} TransactionPurchase
 * @property {number} month
 * @property {number} pallet
 * @property {number} price
 * @property {number} total
 * @property {number} discount
 * @property {number} amountDue
 * @property {number} selectedPrice
 * @property {'CARD' | 'ACH'} paymentType
 */
