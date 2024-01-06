import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { getIconify } from 'src/components/common/iconify/utilities';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';

// ----------------------------------------------------------------------

const ICONS = {
  warehouse: (width, sx) => getIconify('solar:box-bold-duotone', width, sx),
  users: (width, sx) => getIconify('solar:users-group-two-rounded-bold', width, sx),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { user } = useAppSelector(selectAuth);

  const commonRoutes = useMemo(
    () => [
      {
        title: 'Warehouses',
        path: paths.dashboard.warehouses.root,
        icon: ICONS.warehouse(),
      },
    ],
    []
  );

  const adminRoutes = useMemo(
    () => [
      {
        title: 'Users',
        path: '#',
        icon: ICONS.users(),
        children: [{ title: 'Sellers', path: paths.dashboard.users.sellers }],
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        subheader: 'overview v1.0.0',
        items: [
          // routes for all user
          ...commonRoutes,

          // if user role is admin then only show admin routes
          ...(user?.role === 'admin' ? adminRoutes : []),
        ],
      },
    ],
    [adminRoutes, commonRoutes, user?.role]
  );

  return data;
}
