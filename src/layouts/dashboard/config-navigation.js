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

  not_verified: (width, sx) => getIconify('lucide:badge-minus', width, sx),
  not_featured: (width, sx) => getIconify('iconamoon:star-off-fill', width, sx),
  hidden: (width, sx) => getIconify('solar:eye-closed-bold-duotone', width, sx),
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
        index: 0,
      },
      {
        title: 'Hot Deals',
        path: paths.dashboard.warehouses.hot_deals,
        icon: ICONS.hot_deals(),
      },
      ...regions.map((r) => ({
        title: r.name,
        path: paths.dashboard.warehouses[r.code],
        icon: getIconify(r.icon, undefined, { rotate: `${r.rotate ? 90 * r.rotate : 0}deg` }),
      })),
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
        title: 'Not Featured',
        path: paths.dashboard.warehouses.not_featured,
        icon: ICONS.not_featured(),
        index: 1,
      },
      {
        title: 'Not Verified',
        path: paths.dashboard.warehouses.not_verified,
        icon: ICONS.not_verified(),
        index: 2,
      },
      {
        title: 'Hidden',
        path: paths.dashboard.warehouses.hidden,
        icon: ICONS.hidden(),
        index: 3,
      },
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
        subheader: 'beta v1.0.0',
        items: [
          // routes for all user
          ...commonRoutes,

          // if user role is admin then only show admin routes
          ...(user?.userType === 'admin' ? adminRoutes : []),
        ].sort((a, b) => {
          if (a?.index === undefined) return 1;
          if (b?.index === undefined) return -1;

          return a.index - b.index;
        }),
      },
    ],
    [adminRoutes, commonRoutes, user?.userType]
  );

  return data;
}
