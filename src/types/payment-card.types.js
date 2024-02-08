/**
 * Represents a payment card associated with a user.
 *
 * @typedef {Object} PaymentCard
 * @property {string} id - A unique identifier for the card.
 * @property {number} userId - The user ID to which this card belongs.
 * @property {boolean} isPrimary - Indicates whether this card is the user's primary card.
 * @property {string} cardHolder - The credit card holder name.
 * @property {string} cardNumber - The credit card number.
 * @property {number} expirationDate - The credit card expire month & year in milisecond timestamp format.
 * @property {number} cvv - The credit security number (cvv/cvc)
 */
