import { getIconifyFunc } from 'src/components/common/iconify/utilities';

/**
 * All icons for warehouse section
 */
export const ICONS = {
  verified: getIconifyFunc('solar:verified-check-bold'),
  unverified: getIconifyFunc('solar:minus-circle-bold-duotone'),

  featured: getIconifyFunc('solar:medal-ribbons-star-bold-duotone'),
  unfeatured: getIconifyFunc('solar:minus-circle-bold-duotone'),

  visible: getIconifyFunc('solar:eye-bold-duotone'),
  invisible: getIconifyFunc('solar:eye-closed-bold-duotone'),

  review: getIconifyFunc('solar:chat-round-like-broken'),
  sort: getIconifyFunc('solar:sort-vertical-outline'),
  back: getIconifyFunc('solar:arrow-left-outline'),
  purchase: getIconifyFunc('solar:arrow-right-outline'),
  edit: getIconifyFunc('solar:pen-new-square-linear'),
  close: getIconifyFunc('solar:close-circle-bold'),
  adminSettings: getIconifyFunc('solar:settings-bold'),
  expand: getIconifyFunc('solar:alt-arrow-down-line-duotone'),
  rule: getIconifyFunc('solar:danger-circle-line-duotone'),
  discount: getIconifyFunc('ic:outline-discount'),

  warehouse: getIconifyFunc('solar:box-bold-duotone'),

  hot_deals: getIconifyFunc('solar:fire-bold-duotone'),

  diamond_fill: getIconifyFunc('ic:twotone-diamond'),
  diamond_empty: getIconifyFunc('ic:outline-diamond'),
};
