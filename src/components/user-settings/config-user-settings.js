import { getIconify } from 'src/components/iconify/utilities';

/**
 * All icons for the the user settings
 */
export const ICONS = {
  visacard: (width) => getIconify('logos:visa', width),
  mastercard: (width) => getIconify('logos:mastercard', width),
  more: (width) => getIconify('eva:more-vertical-fill', width),
  primary: (width) => getIconify('eva:star-fill', width),
  delete: (width) => getIconify('solar:trash-bin-trash-bold', width),
  edit: (width) => getIconify('solar:pen-bold', width),
  search: (width) => getIconify('eva:search-fill', width),
  plus: (width) => getIconify('mingcute:add-line', width),
  current: (width) => getIconify('eva:star-fill', width),
};
