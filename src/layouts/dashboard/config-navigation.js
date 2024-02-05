import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { getRegionsByScope, regionScopes } from 'src/assets/data';
import { getIconify, getIconifyFunc } from 'src/components/common/iconify/utilities';
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
  warehouse: getIconifyFunc('solar:box-bold-duotone'),
  service: getIconifyFunc('ic:twotone-home-repair-service'),
  users: getIconifyFunc('solar:users-group-two-rounded-bold'),
  hot_deals: getIconifyFunc('solar:fire-bold-duotone'),
  messages: getIconifyFunc('solar:chat-round-line-bold-duotone'),
  region: getIconifyFunc('solar:earth-bold-duotone'),

  not_verified: getIconifyFunc('lucide:badge-minus'),
  not_featured: getIconifyFunc('iconamoon:star-off-fill'),
  not_rated: getIconifyFunc('tabler:diamond-off'),
  hidden: getIconifyFunc('solar:eye-closed-bold-duotone'),
  news: getIconifyFunc('bxs:news'),
  admin: getIconifyFunc('eos-icons:admin-outlined'),
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
        defaultOpen: true,
      },
      {
        title: 'News',
        path: paths.dashboard.news.root,
        icon: ICONS.news(),
      },
    ],
    []
  );

  /** @type {Route[]} */
  const notAdminRoutes = useMemo(
    () => [
      {
        title: 'Racklify News',
        path: paths.news.root,
        icon: ICONS.news(),
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
        title: 'Admin',
        path: '#',
        icon: ICONS.admin(),
        children: [
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
            title: 'Hot Racks',
            path: paths.dashboard.warehouses.hot_deals,
            icon: ICONS.hot_deals(),
          },

          // sub region warehouse routes (hiding global)
          ...regionScopes
            .filter((s) => s.code !== 'global')
            .map((s) => ({
              title: s.name,
              path: '#',
              icon: s.icon ? getIconify(s.icon) : undefined,
              defaultOpen: true,
              children: getRegionsByScope(s.code).map((r) => ({
                title: r.name,
                path: paths.dashboard.warehouses.region(r.code),
                icon: r.icon
                  ? getIconify(r.icon, undefined, { rotate: `${r.rotate ? 90 * r.rotate : 0}deg` })
                  : undefined,
              })),
            })),
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
            path: paths.dashboard.services.type(s.value),
            icon: s?.icon ? getIconify(s.icon) : undefined,
          })),
        ],
        defaultOpen: true,
      },
      // admin warehouse routes
      ...(user?.userType === 'admin' ? adminWarehouseRoutes : []),
      {
        title: 'Messages',
        path: paths.dashboard.messages.root,
        icon: ICONS.messages(),
      },
      // not admin route
      ...(user?.userType !== 'admin' ? notAdminRoutes : []),
      // admin routes
      ...(user?.userType === 'admin' ? adminRoutes : []),
    ],
    [adminRoutes, adminWarehouseRoutes, notAdminRoutes, user?.userType]
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
