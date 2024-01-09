import { getIconify } from 'src/components/common/iconify/utilities';

/**
 * All icons for fields
 */
export const ICONS = {
  edit: (width, sx) => getIconify('solar:pen-new-square-linear', width, sx),
  close: (width, sx) => getIconify('solar:close-circle-bold', width, sx),
  expand: (width, sx) => getIconify('solar:alt-arrow-down-line-duotone', width, sx),
  add: (width, sx) => getIconify('solar:add-square-bold-duotone', width, sx),
  delete: (width, sx) => getIconify('solar:trash-bin-minimalistic-outline', width, sx),
};