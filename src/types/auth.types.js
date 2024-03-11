/**
 * Authentication type
 * @typedef {Object} AuthType
 * @property {null | AuthUser} user
 * @property {boolean} isLoading
 * @property {boolean} isAuthenticated
 * @property {null | string} token
 */

/**
 * Auth user object
 * @typedef {Object} AuthUser
 * @property {string} id
 * @property {string} email
 * @property {avatar | null} email
 * @property {string} firstName
 * @property {string} lastName
 * @property {UserType} userType
 * @property {string} serviceType
 * @property {string} serviceType
 * @property {PlanId} planId
 * @property {string} customerStripeId
 * @property {'NOT_SENT' | 'PENDING' | 'SUCCEDED' | 'FAILED'} stripeAccountStatus
 */
