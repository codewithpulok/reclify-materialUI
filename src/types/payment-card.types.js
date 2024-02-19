/**
 * Represents a payment card associated with a user.
 *
 * @typedef {Object} PaymentCard
 * @property {string} id - A unique identifier for the card.
 * @property {boolean} isPrimary - Indicates whether this card is the user's primary card.
 * @property {string} cardHolder - The credit card holder name.
 * @property {string} last4 - last 4 id
 * @property {number} expirationMonth - The credit card expire month & year in milisecond timestamp format.
 * @property {number} expirationYear
 * @property {number} stripePaymentMethodId
 */
