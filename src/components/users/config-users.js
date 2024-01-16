import { getIconify } from 'src/components/common/iconify/utilities';

export const ICONS = {
  warehouse: (width, sx) => getIconify('solar:box-bold-duotone', width, sx),
  transactions: (width, sx) => getIconify('solar:card-transfer-bold-duotone', width, sx),
};
