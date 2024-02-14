/**
 * @typedef {Object} NotificationType
 * @property {string} id
 * @property {string} message
 * @property {number} createdAt
 * @property {boolean} isRead
 * @property {NotificationTypeOptions} type
 * @property {Object} meta
 */

/**
 * @typedef {'VERIFY_EMAIL' | 'CUSTOMER_PURCHASE' | 'ADMIN_APPROVE' | 'CUSTOMER_TRANSACTION_CANCEL' | 'ADMIN_TRANSACTION_CANCEL' | 'SELLER_TRANSACTION_CANCEL'} NotificationTypeOptions
 */
