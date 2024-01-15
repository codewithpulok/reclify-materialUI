import { getIconify } from 'src/components/common/iconify/utilities';

/**
 * All icons for warehouse users section
 */
export const ICONS = {
  profile: (width, sx) => getIconify('solar:user-id-bold', width, sx),
  warehouse: (width, sx) => getIconify('solar:box-bold-duotone', width, sx),
  membership: (width, sx) => getIconify('solar:bill-list-bold', width, sx),
  purchase: (width, sx) => getIconify('solar:bill-list-bold', width, sx),

  address: (width, sx) => getIconify('mingcute:location-fill', width, sx),
  email: (width, sx) => getIconify('fluent:mail-24-filled', width, sx),

  send_message: (width, sx) => getIconify('tabler:send', width, sx),
};
