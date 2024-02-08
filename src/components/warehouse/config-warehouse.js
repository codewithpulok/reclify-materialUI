import { getIconifyFunc } from 'src/components/common/iconify/utilities';

/**
 * All icons for the the warehouse
 */
export const ICONS = {
  view: getIconifyFunc('solar:eye-bold'),
  duplicate: getIconifyFunc('solar:copy-bold'),
  delete: getIconifyFunc('solar:trash-bin-trash-bold'),
  edit: getIconifyFunc('solar:pen-new-square-linear'),
  settings: getIconifyFunc('solar:settings-bold'),

  verified: getIconifyFunc('solar:verified-check-bold'),
  featured: getIconifyFunc('solar:medal-ribbons-star-bold-duotone'),
  warehouse: getIconifyFunc('solar:box-bold-duotone'),
  menu: getIconifyFunc('solar:menu-dots-bold'),
  discount: getIconifyFunc('ic:outline-discount'),

  phone: getIconifyFunc('solar:phone-rounded-outline'),
  email: getIconifyFunc('tabler:mail'),
  send_message: getIconifyFunc('tabler:send'),
};
