import { getIconify } from 'src/components/common/iconify/utilities';

/**
 * All icons for fields
 */
export const ICONS = {
  edit: (width, sx) => getIconify('solar:pen-new-square-linear', width, sx),
  close: (width, sx) => getIconify('solar:close-circle-bold', width, sx),
};
