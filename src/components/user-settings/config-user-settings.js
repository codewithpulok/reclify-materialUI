import { getIconifyFunc } from 'src/components/common/iconify/utilities';

/**
 * All icons for the the user settings
 */
export const ICONS = {
  visacard: getIconifyFunc('logos:visa'),
  mastercard: getIconifyFunc('logos:mastercard'),
  more: getIconifyFunc('eva:more-vertical-fill'),
  primary: getIconifyFunc('eva:star-fill'),
  delete: getIconifyFunc('solar:trash-bin-trash-bold'),
  edit: getIconifyFunc('solar:pen-bold'),
  search: getIconifyFunc('eva:search-fill'),
  plus: getIconifyFunc('mingcute:add-line'),
  current: getIconifyFunc('eva:star-fill'),

  verified: getIconifyFunc('solar:verified-check-bold'),
  featured: getIconifyFunc('solar:medal-ribbons-star-bold-duotone'),

  close: getIconifyFunc('solar:close-circle-bold'),

  feature: getIconifyFunc('tabler:check'),

  send_message: getIconifyFunc('tabler:send'),
  email: getIconifyFunc('tabler:mail'),
  phone: getIconifyFunc('solar:phone-bold-duotone'),
  hot: getIconifyFunc('solar:fire-bold-duotone'),
};
