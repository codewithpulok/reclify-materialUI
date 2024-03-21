import { getIconifyFunc } from 'src/components/common/iconify/utilities';

/**
 * All icons for warehouse users section
 */
export const ICONS = {
  profile: getIconifyFunc('solar:user-id-bold'),
  warehouse: getIconifyFunc('solar:box-bold-duotone'),
  membership: getIconifyFunc('solar:bill-list-bold'),
  purchase: getIconifyFunc('solar:bill-list-bold'),
  transactions: getIconifyFunc('solar:card-transfer-linear'),

  address: getIconifyFunc('mingcute:location-fill'),
  email: getIconifyFunc('fluent:mail-24-filled'),

  send_message: getIconifyFunc('tabler:send'),

  more: getIconifyFunc('eva:more-vertical-fill'),
  close: getIconifyFunc('solar:close-circle-bold'),

  invoice: getIconifyFunc('solar:document-text-bold-duotone'),
};

/** @type {SxProps} */
export const TabsSx = {};
