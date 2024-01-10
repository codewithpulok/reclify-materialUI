import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { regions } from 'src/assets/data';
import { getIconify } from 'src/components/common/iconify/utilities';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';

// ----------------------------------------------------------------------

const ICONS = {
  warehouse: (width, sx) => getIconify('solar:box-bold-duotone', width, sx),
  users: (width, sx) => getIconify('solar:users-group-two-rounded-bold', width, sx),
  hot_deals: (width, sx) => getIconify('solar:fire-bold-duotone', width, sx),
  messages: (width, sx) => getIconify('solar:chat-round-line-bold-duotone', width, sx),
  region: (width, sx) => getIconify('solar:earth-bold-duotone', width, sx),
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
        children: [
          {
            title: 'Hot Deals',
            path: paths.dashboard.warehouses.hot_deals,
            icon: ICONS.hot_deals(),
          },
          ...regions.map((r) => ({
            title: r.name,
            path: paths.dashboard.warehouses[r.code],
            icon: ICONS.region(),
          })),
        ],
      },
      {
        title: 'Messages',
        path: paths.dashboard.messages.root,
        icon: ICONS.messages(),
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
        children: [
          { title: 'Sellers', path: paths.dashboard.users.sellers },
          { title: 'Customers', path: paths.dashboard.users.customers },
        ],
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
          ...(user?.userType === 'admin' ? adminRoutes : []),
        ],
      },
    ],
    [adminRoutes, commonRoutes, user?.userType]
  );

  return data;
}
