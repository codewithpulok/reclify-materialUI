import { getIconify } from 'src/components/common/iconify/utilities';

/**
 * All icons for warehouse section
 */
export const ICONS = {
  verified: (width, sx) => getIconify('solar:verified-check-bold', width, sx),
  featured: (width, sx) => getIconify('solar:medal-ribbons-star-bold-duotone', width, sx),
  review: (width, sx) => getIconify('solar:chat-round-like-broken', width, sx),
  sort: (width, sx) => getIconify('solar:sort-vertical-outline', width, sx),
  back: (width, sx) => getIconify('solar:arrow-left-outline', width, sx),
  purchase: (width, sx) => getIconify('solar:arrow-right-outline', width, sx),
  edit: (width, sx) => getIconify('solar:pen-new-square-linear', width, sx),
  close: (width, sx) => getIconify('solar:close-circle-bold', width, sx),
  adminSettings: (width, sx) => getIconify('solar:settings-linear', width, sx),
  expand: (width, sx) => getIconify('solar:alt-arrow-down-line-duotone', width, sx),
};
