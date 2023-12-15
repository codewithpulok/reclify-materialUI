/**
 * Represents an invoice associated with a user's transaction.
 *
 * @typedef {Object} Invoice
 * @property {string} id - A unique identifier for the invoice.
 * @property {string} invoiceNumber - The invoice number in string format.
 * @property {number} createdAt - Timestamp in milliseconds indicating the creation date of the invoice.
 * @property {number} price - The total price of the items in the invoice.
 * @property {string} pdfUrl - The URL to the PDF version of the invoice.
 * @property {number} userId - The user ID to which this invoice belongs.
 */
