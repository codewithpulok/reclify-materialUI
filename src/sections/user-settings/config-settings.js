import { getIconify } from 'src/components/common/iconify/utilities';

/**
 * All icons for settings section
 */
export const ICONS = {
  sort: (width) => getIconify('solar:sort-vertical-outline', width),
  userId: (width) => getIconify('solar:user-id-bold', width),
  bills: (width) => getIconify('solar:bill-list-bold', width),
  key: (width) => getIconify('ic:round-vpn-key', width),
  transactions: (width) => getIconify('solar:card-transfer-linear', width),
  search: (width) => getIconify('eva:search-fill', width),
  plus: (width) => getIconify('mingcute:add-line', width),
  showMore: (width) => getIconify('eva:arrow-ios-downward-fill', width),
  showLess: (width) => getIconify('eva:arrow-ios-upward-fill', width),
  current: (width) => getIconify('eva:star-fill', width),
  more: (width) => getIconify('eva:more-vertical-fill', width),
  eye: (width) => getIconify('solar:eye-bold', width),
  close: (width, sx) => getIconify('solar:close-circle-bold', width, sx),

  warehouse: (width, sx) => getIconify('solar:box-bold-duotone', width, sx),

  send_message: (width, sx) => getIconify('tabler:send', width, sx),
  profile: (width, sx) => getIconify('solar:user-circle-bold-duotone', width, sx),
  email: (width, sx) => getIconify('tabler:mail', width, sx),
  phone: (width, sx) => getIconify('solar:phone-bold-duotone', width, sx),
};
