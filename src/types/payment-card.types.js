/**
 * Represents a payment card associated with a user.
 *
 * @typedef {Object} PaymentCard
 * @property {string} id - A unique identifier for the card.
 * @property {number} userId - The user ID to which this card belongs.
 * @property {boolean} primary - Indicates whether this card is the user's primary card.
 * @property {string} holder - The credit card holder name.
 * @property {string} number - The credit card number.
 * @property {number} expire - The credit card expire month & year.
 * @property {string} securityNumber - The credit security number (cvv/cvc)
 */
