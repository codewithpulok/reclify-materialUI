import Iconify from '../iconify/iconify';

const { default: SvgColor } = require('../svg-color');

const icon = (name) => (
  // <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  <Iconify icon={name} />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

Iconify;

export const ICONS = {
  view: icon('solar:eye-bold'),
  delete: icon('solar:trash-bin-trash-bold'),
};
