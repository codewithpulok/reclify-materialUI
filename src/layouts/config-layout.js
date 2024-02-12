// ----------------------------------------------------------------------

import { getIconifyFunc } from 'src/components/common/iconify/utilities';

export const HEADER = {
  H_MOBILE: 64,
  H_DESKTOP: 80,
  H_DESKTOP_OFFSET: 80 - 16,
};

export const NAV = {
  W_VERTICAL: 280,
  W_MINI: 88,
};

export const ICONS = {
  warehouse: getIconifyFunc('solar:box-bold-duotone'),
  service: getIconifyFunc('ic:twotone-home-repair-service'),
  users: getIconifyFunc('solar:users-group-two-rounded-bold'),
  hot_deals: getIconifyFunc('solar:fire-bold-duotone'),
  messages: getIconifyFunc('solar:chat-round-line-bold-duotone'),
  region: getIconifyFunc('solar:earth-bold-duotone'),

  not_verified: getIconifyFunc('lucide:badge-minus'),
  not_featured: getIconifyFunc('iconamoon:star-off-fill'),
  not_rated: getIconifyFunc('tabler:diamond-off'),
  hidden: getIconifyFunc('solar:eye-closed-bold-duotone'),
  news: getIconifyFunc('iconamoon:news-duotone'),
  admin: getIconifyFunc('eos-icons:admin-outlined'),

  transaction: getIconifyFunc('solar:card-transfer-line-duotone'),
  verify: getIconifyFunc('solar:verified-check-bold-duotone'),
};
