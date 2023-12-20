import { getIconify } from 'src/components/common/iconify/utilities';

/**
 * All icons for the the warehouse
 */
export const ICONS = {
  view: (width, sx) => getIconify('solar:eye-bold', width, sx),
  duplicate: (width, sx) => getIconify('solar:copy-bold', width, sx),
  delete: (width, sx) => getIconify('solar:trash-bin-trash-bold', width, sx),
  edit: (width, sx) => getIconify('solar:pen-new-square-linear', width, sx),
  verified: (width, sx) => getIconify('solar:verified-check-bold', width, sx),
  featured: (width, sx) => getIconify('solar:medal-ribbons-star-bold-duotone', width, sx),
};
