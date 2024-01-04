import { getIconify } from 'src/components/common/iconify/utilities';

/**
 * All icons for the the user settings
 */
export const ICONS = {
  visacard: (width, sx) => getIconify('logos:visa', width, sx),
  mastercard: (width, sx) => getIconify('logos:mastercard', width, sx),
  more: (width, sx) => getIconify('eva:more-vertical-fill', width, sx),
  primary: (width, sx) => getIconify('eva:star-fill', width, sx),
  delete: (width, sx) => getIconify('solar:trash-bin-trash-bold', width, sx),
  edit: (width, sx) => getIconify('solar:pen-bold', width, sx),
  search: (width, sx) => getIconify('eva:search-fill', width, sx),
  plus: (width, sx) => getIconify('mingcute:add-line', width, sx),
  current: (width, sx) => getIconify('eva:star-fill', width, sx),

  verified: (width, sx) => getIconify('solar:verified-check-bold', width, sx),
  featured: (width, sx) => getIconify('solar:medal-ribbons-star-bold-duotone', width, sx),

  phone: (width, sx) => getIconify('solar:phone-rounded-outline', width, sx),
  email: (width, sx) => getIconify('tabler:mail', width, sx),

  close: (width, sx) => getIconify('solar:close-circle-bold', width, sx),

  feature: (width, sx) => getIconify('tabler:check', width, sx),
};
