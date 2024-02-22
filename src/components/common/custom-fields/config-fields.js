import { getIconifyFunc } from 'src/components/common/iconify/utilities';

/**
 * All icons for fields
 */
export const ICONS = {
  edit: getIconifyFunc('solar:pen-new-square-linear'),
  close: getIconifyFunc('solar:close-circle-bold'),
  expand: getIconifyFunc('solar:alt-arrow-down-line-duotone'),
  add: getIconifyFunc('solar:add-square-bold-duotone'),
  delete: getIconifyFunc('solar:trash-bin-minimalistic-outline'),

  cover_edit: getIconifyFunc('solar:gallery-edit-line-duotone'),
  uploading: getIconifyFunc('line-md:uploading-loop'),
};
