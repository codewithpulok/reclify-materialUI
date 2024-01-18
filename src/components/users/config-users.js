import { getIconify } from 'src/components/common/iconify/utilities';

export const ICONS = {
  warehouse: (width, sx) => getIconify('solar:box-bold-duotone', width, sx),
  transactions: (width, sx) => getIconify('solar:card-transfer-bold-duotone', width, sx),

  phone: (width, sx) => getIconify('solar:phone-rounded-outline', width, sx),
  email: (width, sx) => getIconify('tabler:mail', width, sx),
  send_message: (width, sx) => getIconify('tabler:send', width, sx),
};
