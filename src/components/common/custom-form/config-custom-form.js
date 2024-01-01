import { getIconify } from 'src/components/common/iconify/utilities';

/**
 * All icons for the the user settings
 */
export const ICONS = {
  visacard: (width, sx) => getIconify('logos:visa', width, sx),
  mastercard: (width, sx) => getIconify('logos:mastercard', width, sx),

  close: (width, sx) => getIconify('solar:close-circle-bold', width, sx),
  dropdown: (width, sx) => getIconify('solar:alt-arrow-down-outline', width, sx),
};
