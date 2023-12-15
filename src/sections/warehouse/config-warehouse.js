import { getIconify } from 'src/components/iconify/utilities';

/**
 * All icons for warehouse section
 */
export const ICONS = {
  verified: getIconify('solar:check-circle-bold'),
  featured: getIconify('solar:medal-ribbons-star-bold-duotone'),
  upload: getIconify('solar:upload-minimalistic-linear'),
  noImages: getIconify('tabler:photo-off'),
  close: getIconify('tabler:x', 14),
  review: getIconify('solar:chat-round-like-broken'),
  sort: getIconify('solar:sort-vertical-outline'),
  userId: getIconify('solar:user-id-bold'),
  bills: getIconify('solar:bill-list-bold'),
  key: getIconify('ic:round-vpn-key'),
  transactions: getIconify('solar:card-transfer-linear'),
};
