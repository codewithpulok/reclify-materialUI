import { getIconify } from 'src/components/common/iconify/utilities';

/**
 * All icons for warehouse section
 */
export const ICONS = {
  verified: (width, sx) => getIconify('solar:verified-check-bold', width, sx),
  unverified: (width, sx) => getIconify('solar:minus-circle-bold-duotone', width, sx),

  featured: (width, sx) => getIconify('solar:medal-ribbons-star-bold-duotone', width, sx),
  unfeatured: (width, sx) => getIconify('solar:minus-circle-bold-duotone', width, sx),

  visible: (width, sx) => getIconify('solar:eye-bold-duotone', width, sx),
  invisible: (width, sx) => getIconify('solar:eye-closed-bold-duotone', width, sx),

  review: (width, sx) => getIconify('solar:chat-round-like-broken', width, sx),
  sort: (width, sx) => getIconify('solar:sort-vertical-outline', width, sx),
  back: (width, sx) => getIconify('solar:arrow-left-outline', width, sx),
  purchase: (width, sx) => getIconify('solar:arrow-right-outline', width, sx),
  edit: (width, sx) => getIconify('solar:pen-new-square-linear', width, sx),
  close: (width, sx) => getIconify('solar:close-circle-bold', width, sx),
  adminSettings: (width, sx) => getIconify('solar:settings-linear', width, sx),
  expand: (width, sx) => getIconify('solar:alt-arrow-down-line-duotone', width, sx),
  rule: (width, sx) => getIconify('solar:danger-circle-line-duotone', width, sx),
  discount: (width, sx) => getIconify('ic:outline-discount', width, sx),

  warehouse: (width, sx) => getIconify('solar:box-bold-duotone', width, sx),

  hot_deals: (width, sx) => getIconify('solar:fire-bold-duotone', width, sx),

  diamond_fill: (width, sx) => getIconify('ic:twotone-diamond', width, sx),
  diamond_empty: (width, sx) => getIconify('ic:outline-diamond', width, sx),
};
