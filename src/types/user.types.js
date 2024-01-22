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
 * @property {UserType} userType - The type of the user ('admin', 'customer', 'seller').
 * @property {Address} address - The street address of the user.
 * @property {string} about - A brief description or bio of the user.
 * @property {number} createdAt - The timestamp when the user account was created.
 * @property {number} updatedAt - The timestamp when the user account was last updated.
 * @property {Object} socials - The social media links of the user.
 * @property {string} socials.facebook - The Facebook profile link.
 * @property {string} socials.instagram - The Instagram profile link.
 * @property {string} socials.linkedin - The LinkedIn profile link.
 * @property {string} socials.x - Additional social link.
 */

/**
 * User type
 * @typedef {'admin' | 'customer' | 'seller'} UserType
 */
