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
 * @property {string} firstName
 * @property {string} lastName
 * @property {AuthUserRole} role
 */

/**
 * Auth user role
 * @typedef {'admin' | 'customer' | 'seller'} AuthUserRole
 */
