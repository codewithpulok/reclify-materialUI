/**
 * Represents an billing address
 *
 * @typedef {Object} BillingAddress
 * @property {string} id - The unique identifier for the address.
 * @property {number} userId - The user ID to which this address belongs.
 * @property {boolean} primary - Indicates whether this address is the user's primary address.
 * @property {string} fullName - The name associated with the address (e.g., "John Doe").
 * @property {string} phoneNumber - The phone number associated with the address.
 * @property {"home" | "office"} addressType - The type of address, either "home" or "office".
 * @property {Address} address - The complete address.
 */
