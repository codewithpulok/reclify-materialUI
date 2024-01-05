/**
 * Authentication type
 * @typedef {Object} AuthType
 * @property {null | AuthUser} user
 * @property {'jwt'} method
 * @property {boolean} loading
 * @property {boolean} authenticated
 * @property {boolean} unauthenticated
 * @property {(data: {}, token: string) => {}} login
 * @property {() => {}} logout
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
