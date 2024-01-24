import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { regions } from 'src/assets/data';
import { getIconify } from 'src/components/common/iconify/utilities';
import { getAvailableServiceTypes } from 'src/constant/service-types';
import { selectAuth } from 'src/redux-toolkit/features/auth/authSlice';
import { useAppSelector } from 'src/redux-toolkit/hooks';

// ----------------------------------------------------------------------

/**
 * @typedef {Object} Route
 * @property {string} title
 * @property {string} path
 * @property {JSX.Element} icon
 * @property {Route[]} children
 */

const ICONS = {
  warehouse: (width, sx) => getIconify('solar:box-bold-duotone', width, sx),
  service: (width, sx) => getIconify('ic:twotone-home-repair-service', width, sx),
  users: (width, sx) => getIconify('solar:users-group-two-rounded-bold', width, sx),
  hot_deals: (width, sx) => getIconify('solar:fire-bold-duotone', width, sx),
  messages: (width, sx) => getIconify('solar:chat-round-line-bold-duotone', width, sx),
  region: (width, sx) => getIconify('solar:earth-bold-duotone', width, sx),

  not_verified: (width, sx) => getIconify('lucide:badge-minus', width, sx),
  not_featured: (width, sx) => getIconify('iconamoon:star-off-fill', width, sx),
  not_rated: (width, sx) => getIconify('tabler:diamond-off', width, sx),
  hidden: (width, sx) => getIconify('solar:eye-closed-bold-duotone', width, sx),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { user } = useAppSelector(selectAuth);

  /**
   * admin all routes
   * @type {Route[]}
   */
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

  /**
   * admin warehouse routes
   * @type {Route[]}
   */
  const adminWarehouseRoutes = useMemo(
    () => [
      {
        title: 'Not Featured',
        path: paths.dashboard.warehouses.not_featured,
        icon: ICONS.not_featured(),
      },
      {
        title: 'Not Verified',
        path: paths.dashboard.warehouses.not_verified,
        icon: ICONS.not_verified(),
      },
      {
        title: 'Not Rated',
        path: paths.dashboard.warehouses.not_rated,
        icon: ICONS.not_rated(),
      },
      {
        title: 'Hidden',
        path: paths.dashboard.warehouses.hidden,
        icon: ICONS.hidden(),
      },
    ],
    []
  );

  /**
   * all routes
   * @type {Route[]}
   */
  const allRoutes = useMemo(
    () => [
      {
        title: 'Warehouses',
        path: paths.dashboard.warehouses.root,
        icon: ICONS.warehouse(),
        children: [
          // common warehouse routes
          {
            title: 'Hot Deals',
            path: paths.dashboard.warehouses.hot_deals,
            icon: ICONS.hot_deals(),
          },

          // region warehouse routes
          ...regions.map((r) => ({
            title: r.name,
            path: paths.dashboard.warehouses[r.code],
            icon: getIconify(r.icon, undefined, { rotate: `${r.rotate ? 90 * r.rotate : 0}deg` }),
          })),

          // admin warehouse routes
          ...(user?.userType === 'admin' ? adminWarehouseRoutes : []),
        ],
        defaultOpen: true,
      },
      {
        title: 'Services',
        path: paths.dashboard.services.root,
        icon: ICONS.service(),
        children: [
          // service type routes
          ...getAvailableServiceTypes().map((s) => ({
            title: s.label,
            path: paths.dashboard.services[s.value],
          })),
        ],
      },
      {
        title: 'Messages',
        path: paths.dashboard.messages.root,
        icon: ICONS.messages(),
      },

      // admin routes
      ...(user?.userType === 'admin' ? adminRoutes : []),
    ],
    [adminRoutes, adminWarehouseRoutes, user?.userType]
  );

  const data = useMemo(
    () => [
      {
        subheader: 'beta v1.0.0',
        items: allRoutes,
      },
    ],
    [allRoutes]
  );

  return data;
}
