import { getIconifyFunc } from 'src/components/common/iconify/utilities';

export const ICONS = {
  warehouse: getIconifyFunc('solar:box-bold-duotone'),
  transactions: getIconifyFunc('solar:card-transfer-bold-duotone'),
  membership: getIconifyFunc('solar:bill-list-bold'),

  website: getIconifyFunc('solar:earth-bold-duotone'),
  phone: getIconifyFunc('solar:phone-rounded-outline'),
  email: getIconifyFunc('tabler:mail'),
  send_message: getIconifyFunc('tabler:send'),
  verified: getIconifyFunc('solar:verified-check-bold'),

  settings: getIconifyFunc('solar:settings-bold'),

  profile: getIconifyFunc('solar:user-id-bold'),

  invoice: getIconifyFunc('solar:document-text-bold-duotone'),
};
