// components
import { getIconifyFunc } from 'src/components/common/iconify/utilities';
import SvgColor from 'src/components/common/svg-color';
// ----------------------------------------------------------------------

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
  news: () => <SvgColor src="/assets/icons/navbar/ic_blog.svg" />,
  admin: getIconifyFunc('eos-icons:admin-outlined'),

  transaction: getIconifyFunc('solar:card-transfer-line-duotone'),
  notification: getIconifyFunc('solar:bell-bing-bold-duotone'),

  verify_email: getIconifyFunc('solar:diploma-verified-bold-duotone'),
  seller_complete: getIconifyFunc('solar:bag-check-bold-duotone'),
  admin_approve: getIconifyFunc('solar:cart-check-bold-duotone'),
  customer_cancel: getIconifyFunc('solar:cart-cross-bold-duotone'),
  admin_cancel: getIconifyFunc('solar:cart-cross-bold-duotone'),
  seller_cancel: getIconifyFunc('solar:cart-cross-bold-duotone'),
  customer_purchase: getIconifyFunc('solar:cart-plus-bold-duotone'),
};
