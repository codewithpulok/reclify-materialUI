/**
 * Represents subscription details for a user.
 *
 * @typedef {Object} Plan
 * @property {string} subscription - The type of subscription (e.g., 'basic', 'premium').
 * @property {number} price - The price of the subscription (in the applicable currency).
 * @property {boolean} primary - Indicates whether this subscription is the user's primary subscription.
 * @property {PlanFeature[]} features
 */

/**
 * Represent feature in a plan
 * @typedef {Object} PlanFeature
 * @property {string} id
 * @property {string} title
 */
