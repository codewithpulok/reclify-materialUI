/**
 * Represents a system user.
 *
 * @typedef {Object} User
 * @property {string} id - The unique identifier for the user.
 * @property {string} displayName - The display name of the user.
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user (Note: This should be stored securely and not exposed).
 * @property {string} avatar - The URL of the user's profile photo.
 * @property {string} phoneNumber - The phone number of the user.
 * @property {string} country - The country of residence for the user.
 * @property {string} address - The street address of the user.
 * @property {string} state - The state or province of the user.
 * @property {string} city - The city of residence for the user.
 * @property {string} zipCode - The ZIP or postal code of the user's address.
 * @property {string} about - A brief description or bio of the user.
 * @property {UserType} userType - The type of the user ('admin', 'customer', 'seller').
 * @property {string} region - The region of residence for the user.
 * @property {number} createdAt - The timestamp when the user account was created.
 * @property {number} updatedAt - The timestamp when the user account was last updated.
 * @property {Object} social - The social media links of the user.
 * @property {string} social.facebook - The Facebook profile link.
 * @property {string} social.instagram - The Instagram profile link.
 * @property {string} social.linkedin - The LinkedIn profile link.
 * @property {string} social.x - Additional social link.
 */

/**
 * User type
 * @typedef {'admin' | 'customer' | 'seller'} UserType
 */
