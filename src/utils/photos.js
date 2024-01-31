const { PLACEHOLDER_WAREHOUSE_IMAGE } = require('src/config-global');

/**
 * get primary or fallback image
 * @param {Photo[]} photos
 */
export const getPrimaryPhoto = (photos = [], fallback = PLACEHOLDER_WAREHOUSE_IMAGE) => {
  let photo = null;
  try {
    if (!photos?.length) throw new Error('Invalid Photos');

    photo = photos?.find((p) => p?.primary);

    if (!photo) photo = photos[0];

    if (!photo?.link) throw new Error('Invalid Primary Photo');

    return photo.link;
  } catch (error) {
    return fallback;
  }
};
