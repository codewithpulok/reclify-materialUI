import { getIconifyFunc } from '../common/iconify/utilities';

const ICONS = {
  verify_email: getIconifyFunc('solar:diploma-verified-bold-duotone'),
  seller_complete: getIconifyFunc('solar:bag-check-bold-duotone'),
  admin_approve: getIconifyFunc('solar:cart-check-bold-duotone'),
  customer_cancel: getIconifyFunc('solar:cart-cross-bold-duotone'),
  admin_cancel: getIconifyFunc('solar:cart-cross-bold-duotone'),
  seller_cancel: getIconifyFunc('solar:cart-cross-bold-duotone'),
  customer_purchase: getIconifyFunc('solar:cart-plus-bold-duotone'),
  notification: getIconifyFunc('solar:bell-bing-bold-duotone'),
};

export default ICONS;
