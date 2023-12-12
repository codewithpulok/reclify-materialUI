import Iconify from 'src/components/iconify';

const icon = (name) => (
  // <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  <Iconify icon={name} />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

Iconify;

export const ICONS = {
  verified: icon('solar:check-circle-bold'),
  featured: icon('solar:medal-ribbons-star-bold-duotone'),
};
