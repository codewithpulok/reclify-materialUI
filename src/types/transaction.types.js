/**
 * Represents a transaction associated with a customer's purchase.
 *
 * @typedef {Object} Transaction
 * @property {string} id - A unique identifier for the transaction.
 * @property {Object} customer - Details of the customer making the purchase.
 * @property {string} customer.id - The unique identifier for the customer.
 * @property {string} customer.name - The name of the customer.
 * @property {string} customer.email - The email address of the customer.
 * @property {string} customer.photoURL - The URL of the customer's profile photo.
 * @property {number} createdAt - The timestamp of the transaction in milliseconds.
 * @property {number} price - The total price of the items in the transaction.
 * @property {"PENDING" | "COMPLETED" | "REFUNDED" | "CANCELED"} status - The status of the transaction ("PENDING", "COMPLETED", "REFUNDED", "CANCELED").
 * @property {number} userId - The user ID to which this transaction belongs.
 */
