import { getIconify } from 'src/components/common/iconify/utilities';

/**
 * All icons for warehouse users section
 */
export const ICONS = {
  profile: (width, sx) => getIconify('solar:user-id-bold', width, sx),
  warehouse: (width, sx) => getIconify('solar:box-bold-duotone', width, sx),
  membership: (width, sx) => getIconify('solar:bill-list-bold', width, sx),
  purchase: (width, sx) => getIconify('solar:bill-list-bold', width, sx),
  transactions: (width) => getIconify('solar:card-transfer-linear', width),

  address: (width, sx) => getIconify('mingcute:location-fill', width, sx),
  email: (width, sx) => getIconify('fluent:mail-24-filled', width, sx),

  send_message: (width, sx) => getIconify('tabler:send', width, sx),

  more: (width, sx) => getIconify('eva:more-vertical-fill', width, sx),
  close: (width, sx) => getIconify('solar:close-circle-bold', width, sx),
};
