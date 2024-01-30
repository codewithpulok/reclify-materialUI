import Iconify from 'src/components/common/iconify';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'Racklify News',
    icon: <Iconify icon="bxs:news" />,
    path: paths.news.root,
  },
  {
    title: 'Contact Us',
    icon: <Iconify icon="solar:help-bold-duotone" />,
    path: paths.contact_us,
  },
];
