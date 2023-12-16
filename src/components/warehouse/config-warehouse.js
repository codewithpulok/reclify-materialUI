import { getIconify } from 'src/components/iconify/utilities';

/**
 * All icons for the the warehouse
 */
export const ICONS = {
  view: (width, sx) => getIconify('solar:eye-bold', width, sx),
  duplicate: (width, sx) => getIconify('solar:copy-bold', width, sx),
  delete: (width, sx) => getIconify('solar:trash-bin-trash-bold', width, sx),
  edit: (width, sx) => getIconify('solar:pen-new-square-linear', width, sx),
};
