import { getIconify } from 'src/components/iconify/utilities';

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
};
