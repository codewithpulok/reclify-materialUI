import { getIconify } from 'src/components/iconify/utilities';

/**
 * All icons for warehouse section
 */
export const ICONS = {
  verified: (width, sx) => getIconify('solar:verified-check-bold', width, sx),
  featured: (width, sx) => getIconify('solar:medal-ribbons-star-bold-duotone', width, sx),
  review: (width, sx) => getIconify('solar:chat-round-like-broken', width, sx),
  sort: (width, sx) => getIconify('solar:sort-vertical-outline', width, sx),
  back: (width, sx) => getIconify('solar:arrow-right-outline', width, sx),
};
