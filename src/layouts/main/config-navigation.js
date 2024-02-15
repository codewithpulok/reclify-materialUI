// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/common/iconify';
import { ICONS } from '../config-layout';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'Racklify News',
    icon: ICONS.news(),
    path: paths.news.root,
  },
  {
    title: 'Contact Us',
    icon: <Iconify icon="solar:help-bold-duotone" />,
    path: paths.contact_us,
  },
];
